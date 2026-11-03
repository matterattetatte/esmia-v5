#!/usr/bin/env node
/**
 * Built-HTML validator.
 *
 * Fails the build (non-zero exit) if any HTML file in `_site/` violates:
 * - balanced structural tags (<main>, <header>, <footer>, <nav>, <section>, <article>, <div>)
 * - exactly one <main>, <header>, <footer> per page
 * - at least one <h1> per page (unless explicitly excluded)
 * - descending heading outline without skipped levels or empty headings
 * - matching favicon MIME type (`image/x-icon` for `.ico`)
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SITE_DIR = path.resolve(import.meta.dirname, "..", "_site");
const STRUCTURAL_TAGS = ["main", "header", "footer", "nav", "section", "article", "div"];

function walkHtml(dir) {
	const files = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkHtml(full));
		else if (entry.isFile() && full.endsWith(".html")) files.push(full);
	}
	return files;
}

function stripNonMarkup(html) {
	return html
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
		.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

function validateFile(file) {
	const rel = path.relative(SITE_DIR, file);
	const raw = fs.readFileSync(file, "utf8");
	const html = stripNonMarkup(raw);
	const errors = [];

	// 0. JSON-LD blocks must parse cleanly
	for (const match of raw.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
		try {
			JSON.parse(match[1]);
		} catch (err) {
			errors.push(`invalid application/ld+json: ${err.message}`);
		}
	}

	// 0b. Canonical link present and absolute
	const canonicals = [...raw.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
	if (canonicals.length !== 1) {
		errors.push(`expected 1 <link rel="canonical">, found ${canonicals.length}`);
	} else if (!canonicals[0][1].startsWith("https://")) {
		errors.push(`canonical URL must be absolute https:// (got "${canonicals[0][1]}")`);
	}

	// 1. Landmarks: one main, one header, one footer
	for (const landmark of ["main", "header", "footer"]) {
		const count = (html.match(new RegExp(`<${landmark}\\b`, "gi")) || []).length;
		if (count !== 1) {
			errors.push(`expected 1 <${landmark}>, found ${count}`);
		}
	}

	// 2. Balanced structural tags
	const tagPattern = new RegExp(`<(\\/?)(${STRUCTURAL_TAGS.join("|")})\\b[^>]*>`, "gi");
	const stack = [];
	for (const match of html.matchAll(tagPattern)) {
		const isClose = match[1] === "/";
		const tag = match[2].toLowerCase();
		if (!isClose) {
			stack.push(tag);
		} else {
			const top = stack.pop();
			if (top !== tag) {
				errors.push(`unbalanced </${tag}> (expected </${top ?? "none"}>)`);
				break;
			}
		}
	}
	if (stack.length) {
		errors.push(`unclosed tag(s) at EOF: ${stack.map((t) => `<${t}>`).join(", ")}`);
	}

	// 3. Heading outline: at least one h1, no empty headings, no skipped levels
	const headings = [...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
		level: Number(m[1][1]),
		text: m[2].replace(/<[^>]+>/g, "").trim(),
	}));
	const h1Count = headings.filter((h) => h.level === 1).length;
	if (h1Count === 0 && rel !== "README/index.html") {
		errors.push("missing <h1>");
	}
	for (const h of headings) {
		if (!h.text) errors.push(`empty <h${h.level}>`);
	}
	for (let i = 1; i < headings.length; i += 1) {
		const prev = headings[i - 1].level;
		const curr = headings[i].level;
		if (curr > prev + 1) {
			errors.push(`skipped heading level: <h${prev}> → <h${curr}> ("${headings[i].text}")`);
		}
	}

	// 4. Favicon MIME check
	for (const icon of raw.matchAll(/<link\b[^>]*rel=["']icon["'][^>]*>/gi)) {
		const tag = icon[0];
		if (tag.includes(".ico") && /type=["']image\/png["']/i.test(tag)) {
			errors.push(`favicon.ico declared with mismatched type="image/png"`);
		}
	}

	return errors.map((e) => `${rel}: ${e}`);
}

const files = walkHtml(SITE_DIR);
const allErrors = files.flatMap(validateFile);

if (allErrors.length) {
	console.error(`HTML validation failed (${allErrors.length} error(s)):`);
	for (const err of allErrors) console.error(`  ✗ ${err}`);
	process.exit(1);
}

console.log(`HTML validation clean across ${files.length} built page(s).`);

// 5. Unique <title> across all built pages
const titles = new Map();
for (const file of files) {
	const rel = path.relative(SITE_DIR, file);
	const raw = fs.readFileSync(file, "utf8");
	const match = raw.match(/<title>([\s\S]*?)<\/title>/i);
	const title = match ? match[1].trim() : "";
	if (!title) {
		allErrors.push(`${rel}: missing <title>`);
	} else if (titles.has(title)) {
		allErrors.push(`${rel}: duplicate <title> "${title}" (also on ${titles.get(title)})`);
	} else {
		titles.set(title, rel);
	}
}
if (allErrors.length) {
	for (const err of allErrors) console.error(`  ✗ ${err}`);
	process.exit(1);
}

#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_DIR = path.join(ROOT, "_site");
const BASE_URL = "https://esmia.se";

const AI_CRAWLERS = [
	"GPTBot",
	"OAI-SearchBot",
	"ChatGPT-User",
	"ClaudeBot",
	"Claude-User",
	"Claude-SearchBot",
	"anthropic-ai",
	"PerplexityBot",
	"Perplexity-User",
	"Google-Extended",
	"Applebot-Extended",
	"CCBot",
	"Amazonbot",
	"Meta-ExternalAgent",
	"FacebookBot",
	"Bytespider",
	"PetalBot",
	"cohere-ai",
	"Diffbot",
	"Ai2Bot",
	"YouBot",
	"MistralAI-User",
];

const LLMS_SECTIONS = [
	"# Esmia HB",
	"## What we do",
	"## Contact",
	"## Booking",
	"## Products and prices (SEK)",
	"## Pages",
	"## Notes for agents",
];

const failures = [];
const assert = (condition, message) => {
	if (!condition) failures.push(message);
};

function readSiteFile(name) {
	const file = path.join(SITE_DIR, name);
	return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

function walkHtml(dir) {
	const files = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkHtml(full));
		else if (entry.isFile() && full.endsWith(".html")) files.push(full);
	}
	return files;
}

function pagePath(file) {
	const rel = path.relative(SITE_DIR, file).split(path.sep).join("/");
	if (rel === "index.html") return "/";
	if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
	return `/${rel}`;
}

function absoluteUrl(url) {
	return `${BASE_URL}${url}`;
}

function isExcludedPage(file) {
	const rel = path.relative(SITE_DIR, file).split(path.sep).join("/");
	return rel === "404.html" || rel === "README/index.html" || rel.startsWith("tags/");
}

function hasType(node, type) {
	const value = node?.["@type"];
	return value === type || (Array.isArray(value) && value.includes(type));
}

function findType(nodes, type) {
	return nodes.find((node) => hasType(node, type));
}

function collectJsonLd(value) {
	if (Array.isArray(value)) return value.flatMap(collectJsonLd);
	if (!value || typeof value !== "object") return [];
	const nodes = [value];
	if (Array.isArray(value["@graph"])) nodes.push(...value["@graph"].flatMap(collectJsonLd));
	return nodes;
}

function isNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}

function requireString(object, key, page, label = key) {
	assert(isNonEmptyString(object?.[key]), `${page}: ${label} must be a non-empty string`);
}

function requireAbsoluteUrl(value, page, label) {
	assert(
		isNonEmptyString(value) && value.startsWith(`${BASE_URL}/`),
		`${page}: ${label} must be an absolute ${BASE_URL} URL`
	);
}

function validateFoodEstablishment(node, page) {
	requireString(node, "name", page, "FoodEstablishment.name");
	requireAbsoluteUrl(node?.url, page, "FoodEstablishment.url");
	requireString(node, "email", page, "FoodEstablishment.email");
	requireString(node, "telephone", page, "FoodEstablishment.telephone");
	requireString(node, "foundingDate", page, "FoodEstablishment.foundingDate");
	assert(node?.address?.["@type"] === "PostalAddress", `${page}: FoodEstablishment.address must be PostalAddress`);
	for (const key of ["streetAddress", "postalCode", "addressLocality", "addressCountry"]) {
		requireString(node?.address, key, page, `FoodEstablishment.address.${key}`);
	}
	assert(
		node?.areaServed?.["@type"] === "City" && isNonEmptyString(node.areaServed.name),
		`${page}: FoodEstablishment.areaServed must be a City`
	);
	assert(
		Array.isArray(node?.sameAs) && node.sameAs.length > 0,
		`${page}: FoodEstablishment.sameAs must be a non-empty array`
	);
}

function validateBreadcrumb(node, page, canonical) {
	const items = node?.itemListElement;
	assert(Array.isArray(items) && items.length >= 2, `${page}: BreadcrumbList must have at least 2 items`);
	if (!Array.isArray(items)) return;
	for (const item of items) {
		assert(item?.["@type"] === "ListItem", `${page}: BreadcrumbList entries must be ListItem`);
		assert(
			Number.isInteger(item?.position) && item.position > 0,
			`${page}: BreadcrumbList position must be a positive integer`
		);
		requireString(item, "name", page, "BreadcrumbList.name");
		requireAbsoluteUrl(item?.item, page, "BreadcrumbList.item");
	}
	assert(items[0]?.item === `${BASE_URL}/`, `${page}: BreadcrumbList must start at ${BASE_URL}/`);
	assert(items.at(-1)?.item === canonical, `${page}: BreadcrumbList must end at ${canonical}`);
}

function validateFaq(node, page) {
	const questions = node?.mainEntity;
	assert(Array.isArray(questions) && questions.length > 0, `${page}: FAQPage must have at least one question`);
	if (!Array.isArray(questions)) return;
	for (const question of questions) {
		assert(question?.["@type"] === "Question", `${page}: FAQPage entries must be Question`);
		requireString(question, "name", page, "FAQPage.question.name");
		assert(
			question?.acceptedAnswer?.["@type"] === "Answer",
			`${page}: FAQPage.acceptedAnswer must be Answer`
		);
		requireString(question?.acceptedAnswer, "text", page, "FAQPage.acceptedAnswer.text");
	}
}

function validateItemList(node, page) {
	const items = node?.itemListElement;
	assert(Array.isArray(items) && items.length > 0, `${page}: ItemList must have at least one item`);
	if (!Array.isArray(items)) return;
	let pricedOffers = 0;
	for (const entry of items) {
		assert(entry?.["@type"] === "ListItem", `${page}: ItemList entries must be ListItem`);
		assert(
			Number.isInteger(entry?.position) && entry.position > 0,
			`${page}: ItemList position must be a positive integer`
		);
		assert(entry?.item?.["@type"] === "Product", `${page}: ItemList.item must be Product`);
		requireString(entry?.item, "name", page, "Product.name");
		if (entry?.item?.offers) {
			pricedOffers += 1;
			assert(entry.item.offers["@type"] === "Offer", `${page}: Product.offers must be Offer`);
			assert(
				isNonEmptyString(String(entry.item.offers.price ?? "")),
				`${page}: Product.offers.price must be set`
			);
			assert(
				entry.item.offers.priceCurrency === "SEK",
				`${page}: Product.offers.priceCurrency must be SEK`
			);
		}
	}
	assert(pricedOffers > 0, `${page}: ItemList must include at least one priced Offer`);
}

function validateBlogPosting(node, page, canonical) {
	requireString(node, "headline", page, "BlogPosting.headline");
	requireString(node, "description", page, "BlogPosting.description");
	assert(
		/^\d{4}-\d{2}-\d{2}$/.test(node?.datePublished ?? ""),
		`${page}: BlogPosting.datePublished must be YYYY-MM-DD`
	);
	assert(
		node?.mainEntityOfPage?.["@id"] === canonical,
		`${page}: BlogPosting.mainEntityOfPage must point at ${canonical}`
	);
	requireString(node?.author, "name", page, "BlogPosting.author.name");
	requireString(node?.publisher, "name", page, "BlogPosting.publisher.name");
}

const llms = readSiteFile("llms.txt");
assert(llms !== null, "missing _site/llms.txt");
if (llms) {
	for (const section of LLMS_SECTIONS) {
		assert(llms.includes(section), `llms.txt missing section "${section}"`);
	}
	for (const fact of ["norberto@esmia.se", "+46707223191", "Persikogatan 28", "https://esmia.se"]) {
		assert(llms.includes(fact), `llms.txt missing fact "${fact}"`);
	}
	assert(/\d+\s*kr\s*\/\s*(person|st|kg)/i.test(llms), "llms.txt missing published prices");
	assert(/\[[^\]]+\]\([^)]+\)/.test(llms), "llms.txt must contain at least one Markdown link");
	for (const url of [
		"https://esmia.se/products/",
		"https://esmia.se/about/",
		"https://esmia.se/news/",
		"https://esmia.se/legal/",
	]) {
		assert(llms.includes(url), `llms.txt missing page ${url}`);
	}
}

const robots = readSiteFile("robots.txt");
assert(robots !== null, "missing _site/robots.txt");
if (robots) {
	for (const bot of AI_CRAWLERS) {
		assert(robots.includes(`User-agent: ${bot}`), `robots.txt missing explicit policy for ${bot}`);
	}
	assert(/^Allow: \/$/m.test(robots), "robots.txt must allow / for named agents");
	assert(robots.includes("User-agent: *"), "robots.txt missing wildcard user-agent");
	assert(
		robots.includes("Sitemap: https://esmia.se/sitemap.xml"),
		"robots.txt missing sitemap directive"
	);
	assert(robots.includes("https://esmia.se/llms.txt"), "robots.txt missing llms.txt reference");
	assert(!/^Disallow: \/$/m.test(robots), "robots.txt must not disallow /");
}

const sitemap = readSiteFile("sitemap.xml");
assert(sitemap !== null, "missing _site/sitemap.xml");
const sitemapUrls = new Set();
if (sitemap) {
	assert(sitemap.trimStart().startsWith("<?xml"), "sitemap.xml must start with an XML declaration");
	assert(sitemap.includes("<urlset"), "sitemap.xml missing <urlset>");
	const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
	assert(locs.length > 0, "sitemap.xml has no <loc> entries");
	assert(new Set(locs).size === locs.length, "sitemap.xml contains duplicate <loc> entries");
	for (const loc of locs) {
		requireAbsoluteUrl(loc, "sitemap.xml", "loc");
		sitemapUrls.add(loc);
	}
	assert(
		!locs.some((loc) => loc.includes("/404") || loc.includes("/README/") || loc.includes("/tags/")),
		"sitemap.xml contains excluded routes"
	);
}

const htmlFiles = walkHtml(SITE_DIR).filter((file) => !isExcludedPage(file));
const expectedUrls = new Set();

for (const file of htmlFiles) {
	const url = pagePath(file);
	const canonical = absoluteUrl(url);
	const page = `${url} (${path.relative(SITE_DIR, file).split(path.sep).join("/")})`;
	const html = fs.readFileSync(file, "utf8");
	expectedUrls.add(url);

	const canonicals = [
		...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi),
	];
	assert(canonicals.length === 1, `${page}: expected 1 canonical link, found ${canonicals.length}`);
	if (canonicals.length === 1) {
		assert(canonicals[0][1] === canonical, `${page}: canonical ${canonicals[0][1]} must equal ${canonical}`);
	}

	for (const match of html.matchAll(
		/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/gi
	)) {
		assert(!/noindex|none/i.test(match[1]), `${page}: robots meta must not contain noindex`);
	}

	const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
	assert(Boolean(title), `${page}: missing <title>`);
	const description = html
		.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1]
		.trim();
	assert(Boolean(description), `${page}: missing meta description`);

	const lang = html.match(/<html\b[^>]*lang=["']([^"']+)["']/i)?.[1];
	assert(Boolean(lang), `${page}: missing <html lang>`);

	const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
	assert(h1s.length === 1, `${page}: expected 1 <h1>, found ${h1s.length}`);
	if (h1s.length === 1) {
		assert(h1s[0][1].replace(/<[^>]+>/g, "").trim().length > 0, `${page}: empty <h1>`);
	}
	for (const landmark of ["main", "header", "footer"]) {
		const count = (html.match(new RegExp(`<${landmark}\\b`, "gi")) || []).length;
		assert(count === 1, `${page}: expected 1 <${landmark}>, found ${count}`);
	}

	const nodes = [];
	for (const match of html.matchAll(
		/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
	)) {
		try {
			nodes.push(...collectJsonLd(JSON.parse(match[1])));
		} catch (error) {
			failures.push(`${page}: invalid JSON-LD: ${error.message}`);
		}
	}
	assert(nodes.length > 0, `${page}: no JSON-LD`);
	assert(
		nodes.some((node) => node["@context"] === "https://schema.org" || node["@context"] === "http://schema.org"),
		`${page}: no schema.org JSON-LD`
	);

	const food = findType(nodes, "FoodEstablishment");
	assert(Boolean(food), `${page}: missing FoodEstablishment JSON-LD`);
	if (food) validateFoodEstablishment(food, page);

	if (url !== "/") {
		const breadcrumb = findType(nodes, "BreadcrumbList");
		assert(Boolean(breadcrumb), `${page}: missing BreadcrumbList JSON-LD`);
		if (breadcrumb) validateBreadcrumb(breadcrumb, page, canonical);
	}

	if (url === "/") {
		const faq = findType(nodes, "FAQPage");
		assert(Boolean(faq), `${page}: missing FAQPage JSON-LD`);
		if (faq) validateFaq(faq, page);
	}

	if (url === "/products/") {
		const itemList = findType(nodes, "ItemList");
		assert(Boolean(itemList), `${page}: missing ItemList JSON-LD`);
		if (itemList) validateItemList(itemList, page);
	}

	if (url.startsWith("/news/") && url !== "/news/") {
		const posting = findType(nodes, "BlogPosting");
		assert(Boolean(posting), `${page}: missing BlogPosting JSON-LD`);
		if (posting) validateBlogPosting(posting, page, canonical);
	}
}

for (const url of expectedUrls) {
	assert(sitemapUrls.has(absoluteUrl(url)), `sitemap.xml missing ${absoluteUrl(url)}`);
}
for (const url of sitemapUrls) {
	assert(expectedUrls.has(url.slice(BASE_URL.length)), `sitemap.xml contains unexpected ${url}`);
}

const firebaseFile = path.join(ROOT, "firebase.json");
if (fs.existsSync(firebaseFile)) {
	const firebase = JSON.parse(fs.readFileSync(firebaseFile, "utf8"));
	for (const rule of firebase.hosting?.headers ?? []) {
		for (const header of rule.headers ?? []) {
			if (header.key?.toLowerCase() === "x-robots-tag") {
				assert(!/noindex/i.test(header.value ?? ""), "firebase.json must not send X-Robots-Tag: noindex");
			}
		}
	}
}

if (failures.length) {
	console.error(`Agentic readiness failed (${failures.length} issue(s)):`);
	for (const failure of failures) console.error(`  ✗ ${failure}`);
	process.exit(1);
}

console.log(
	`Agentic readiness passed across ${htmlFiles.length} page(s): llms.txt, robots.txt, sitemap.xml, canonicals, and JSON-LD are complete.`
);

#!/usr/bin/env node
/**
 * Hosting & Pre-Cutover Verification Harness.
 *
 * Verifies the exact hosting behavior (status codes, Content-Type headers,
 * security headers, cache-control headers, 301 SPA redirects, and real 404s)
 * either against an explicit `--url=https://...` (preview channel or production)
 * or by booting a local Firebase Hosting-compatible server reading `firebase.json`.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_DIR = path.join(ROOT, "_site");
const FIREBASE_CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "firebase.json"), "utf8")).hosting;

const MIME_MAP = {
	".html": "text/html; charset=utf-8",
	".txt": "text/plain; charset=utf-8",
	".xml": "application/xml; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".webp": "image/webp",
	".avif": "image/avif",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
};

function matchesSource(urlPath, pattern) {
	if (pattern === "**") return true;
	if (pattern === urlPath) return true;
	if (pattern === "/dist/**") return urlPath.startsWith("/dist/");
	if (pattern.startsWith("**/*.@(")) {
		const exts = pattern
			.slice("**/*.@(".length, -1)
			.split("|")
			.map((e) => `.${e.toLowerCase()}`);
		return exts.some((ext) => urlPath.toLowerCase().endsWith(ext));
	}
	return false;
}

function startFirebaseConfigServer() {
	const server = http.createServer((req, res) => {
		const u = new URL(req.url, "http://localhost");
		const pathname = u.pathname;

		// 1. Redirects from firebase.json
		for (const rule of FIREBASE_CONFIG.redirects || []) {
			if (pathname === rule.source) {
				res.statusCode = rule.type || 301;
				res.setHeader("Location", rule.destination);
				res.end();
				return;
			}
		}

		// 2. Resolve static file in _site/
		let filePath = path.join(SITE_DIR, pathname);
		if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
			filePath = path.join(filePath, "index.html");
		} else if (!fs.existsSync(filePath) && fs.existsSync(`${filePath}.html`)) {
			filePath = `${filePath}.html`;
		} else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, "index.html"))) {
			filePath = path.join(filePath, "index.html");
		}

		let status = 200;
		if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
			status = 404;
			filePath = path.join(SITE_DIR, "404.html");
		}

		const ext = path.extname(filePath).toLowerCase();
		if (MIME_MAP[ext]) {
			res.setHeader("Content-Type", MIME_MAP[ext]);
		}

    // 3. Apply headers from firebase.json in order (later rules override earlier ones)
    for (const rule of FIREBASE_CONFIG.headers || []) {
      if (matchesSource(pathname, rule.source)) {
        for (const h of rule.headers || []) {
          res.setHeader(h.key, h.value);
        }
      }
    }

    // Ensure 404 responses keep text/html even if the requested URL ended in .jpg/.webp
    if (status === 404) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "max-age=0, must-revalidate");
    }

		res.statusCode = status;
		if (req.method === "HEAD") {
			res.end();
			return;
		}
		res.end(fs.readFileSync(filePath));
	});

	return new Promise((resolve) => {
		server.listen(0, "127.0.0.1", () => {
			const { port } = server.address();
			resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
		});
	});
}

async function runChecks(baseUrl) {
	const failures = [];
	const assert = (cond, msg) => {
		if (!cond) failures.push(msg);
	};

	// 1. / (Homepage + security headers)
	{
		const res = await fetch(`${baseUrl}/`, { redirect: "manual" });
		assert(res.status === 200, `/ expected 200, got ${res.status}`);
		assert((res.headers.get("content-type") || "").includes("text/html"), `/ expected text/html`);
		assert(res.headers.get("x-frame-options") === "SAMEORIGIN", `/ missing X-Frame-Options: SAMEORIGIN`);
		assert(res.headers.get("x-content-type-options") === "nosniff", `/ missing X-Content-Type-Options: nosniff`);
		assert(
			res.headers.get("referrer-policy") === "strict-origin-when-cross-origin",
			`/ missing Referrer-Policy`
		);
		assert(
			(res.headers.get("content-security-policy") || "").includes("frame-ancestors 'self'"),
			`/ missing CSP frame-ancestors`
		);
		assert(
			res.headers.get("cache-control") === "max-age=0, must-revalidate",
			`/ expected Cache-Control max-age=0, must-revalidate`
		);
	}

	// 2. /robots.txt
	{
		const res = await fetch(`${baseUrl}/robots.txt`);
		const body = await res.text();
		assert(res.status === 200, `/robots.txt expected 200, got ${res.status}`);
		assert(
			(res.headers.get("content-type") || "").includes("text/plain"),
			`/robots.txt expected text/plain, got ${res.headers.get("content-type")}`
		);
		assert(body.includes("Sitemap: https://esmia.se/sitemap.xml"), `/robots.txt missing Sitemap directive`);
		assert(body.includes("User-agent: GPTBot"), `/robots.txt missing explicit AI crawler policy`);
	}

	// 3. /llms.txt
	{
		const res = await fetch(`${baseUrl}/llms.txt`);
		const body = await res.text();
		assert(res.status === 200, `/llms.txt expected 200, got ${res.status}`);
		assert(
			(res.headers.get("content-type") || "").includes("text/plain"),
			`/llms.txt expected text/plain, got ${res.headers.get("content-type")}`
		);
		assert(body.includes("norberto@esmia.se") && body.includes("295 kr / person"), `/llms.txt missing contact or price facts`);
	}

	// 4. /sitemap.xml
	{
		const res = await fetch(`${baseUrl}/sitemap.xml`);
		const body = await res.text();
		assert(res.status === 200, `/sitemap.xml expected 200, got ${res.status}`);
		assert(
			(res.headers.get("content-type") || "").includes("application/xml"),
			`/sitemap.xml expected application/xml, got ${res.headers.get("content-type")}`
		);
		assert(!body.includes("/README/") && !body.includes("/tags/"), `/sitemap.xml contains excluded routes`);
	}

	// 5. Unknown path -> real 404
	{
		const res = await fetch(`${baseUrl}/nope-does-not-exist`, { redirect: "manual" });
		const body = await res.text();
		assert(res.status === 404, `/nope-does-not-exist expected 404, got ${res.status}`);
		assert(body.includes("Sidan hittades inte"), `404 response did not render custom 404.html`);
	}

	// 6. Legacy SPA routes -> 301 redirects
	for (const [from, to] of [
		["/home", "/"],
		["/contact", "/about/"],
	]) {
		const res = await fetch(`${baseUrl}${from}`, { redirect: "manual" });
		assert(res.status === 301, `${from} expected 301, got ${res.status}`);
		const loc = res.headers.get("location") || "";
		assert(loc === to || loc.endsWith(to), `${from} expected Location ${to}, got ${loc}`);
	}

	// 7. Immutable cache on /dist/*
	const distFiles = fs.existsSync(path.join(SITE_DIR, "dist"))
		? fs.readdirSync(path.join(SITE_DIR, "dist"))
		: [];
	if (distFiles.length) {
		const res = await fetch(`${baseUrl}/dist/${distFiles[0]}`);
		assert(res.status === 200, `/dist/${distFiles[0]} expected 200`);
		assert(
			res.headers.get("cache-control") === "max-age=31536000, public, immutable",
			`/dist/${distFiles[0]} expected immutable Cache-Control`
		);
	}

	// 8. Every product image in _data/products.js resolves cleanly in the build
	const productsHtml = await (await fetch(`${baseUrl}/products/`)).text();
	const imgUrls = [...productsHtml.matchAll(/<img\b[^>]*src=["']([^"']+)["']/gi)].map((m) => m[1]);
	assert(imgUrls.length === 29, `/products/ expected 29 product <img> tags, found ${imgUrls.length}`);
	for (const imgUrl of imgUrls) {
		const res = await fetch(`${baseUrl}${imgUrl}`, { method: "HEAD" });
		assert(res.status === 200, `product image ${imgUrl} returned ${res.status}`);
	}

	if (failures.length) {
		console.error(`Hosting verification failed (${failures.length} issue(s)):`);
		for (const f of failures) console.error(`  ✗ ${f}`);
		process.exit(1);
	}

	console.log(`Hosting verification passed on ${baseUrl}: status codes, Content-Types, security headers, cache headers, 301 redirects, and real 404 all verified.`);
}

const urlArg = process.argv.slice(2).find((a) => a.startsWith("--url="));
if (urlArg) {
	await runChecks(urlArg.slice("--url=".length).replace(/\/$/, ""));
} else {
	const { server, baseUrl } = await startFirebaseConfigServer();
	try {
		await runChecks(baseUrl);
	} finally {
		server.close();
	}
}

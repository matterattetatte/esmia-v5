#!/usr/bin/env node
/**
 * Local Lighthouse harness.
 *
 * Serves the built site, then runs Lighthouse against it with a Chrome binary
 * pinned by version, so a score from one machine is comparable to a score from
 * another. Baselines are written to docs/baselines/ and committed.
 *
 * Reference configuration is MOBILE (Lighthouse's default), matching the target
 * scores and real traffic. Never compare a localhost audit to a production one.
 *
 *   npm run lighthouse                     # both pages, one run each
 *   npm run lighthouse -- --runs=3         # median of three runs
 *   npm run lighthouse -- /about /legal/   # arbitrary paths
 */
import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import process from "node:process";

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_DIR = path.join(ROOT, "_site");
const BASELINE_DIR = path.join(ROOT, "docs", "baselines");
const CHROME_VERSION = "156.0.8078.80";

/** Pages audited by default: slug -> path. */
const DEFAULT_PAGES = {
	home: "/",
	products: "/products/",
};

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

/**
 * The Chrome that `npm run lighthouse:chrome` installs, or a clear failure.
 *
 * The install layout differs per platform and the installer's `--path` does not
 * match what `computeExecutablePath()` expects, so the binary is located by
 * searching the pinned version's directory for a known executable name.
 */
function resolveChrome() {
	const cacheDir = path.join(ROOT, "chrome");
	const executableNames = new Set([
		"chrome",
		"chrome.exe",
		"Google Chrome for Testing",
		"Google Chrome for Testing.exe",
	]);

	try {
		const stack = [{ dir: cacheDir, depth: 0 }];
		while (stack.length) {
			const { dir, depth } = stack.pop();
			for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
				const full = path.join(dir, child.name);
				if (child.isFile() && executableNames.has(child.name) && full.includes(CHROME_VERSION)) {
					return full;
				}
				if (child.isDirectory() && depth < 5) {
					stack.push({ dir: full, depth: depth + 1 });
				}
			}
		}
	} catch {
		// fall through to the error below
	}
	console.error(
		`Pinned Chrome ${CHROME_VERSION} not found in ${cacheDir}.\n` +
			`Install it with:  npm run lighthouse:chrome\n` +
			`Pin a different version by editing CHROME_VERSION in scripts/lighthouse.mjs ` +
			`and the lighthouse:chrome script in package.json together.`
	);
	process.exit(1);
}

function getFreePort(preferred) {
	return new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.on("error", () => {
			// preferred port busy: let the OS pick
			const fallback = net.createServer();
			fallback.unref();
			fallback.on("error", reject);
			fallback.listen(0, "127.0.0.1", () => {
				const { port } = fallback.address();
				fallback.close(() => resolve(port));
			});
		});
		server.listen(preferred, "127.0.0.1", () => {
			const { port } = server.address();
			server.close(() => resolve(port));
		});
	});
}

async function waitForServer(url, timeoutMs = 20_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url, { method: "GET" });
			if (res.ok) return;
		} catch {
			// not up yet
		}
		await new Promise((resolve) => setTimeout(resolve, 200));
	}
	throw new Error(`Static server did not answer at ${url} within ${timeoutMs} ms`);
}

function buildSite() {
	if (fs.existsSync(path.join(SITE_DIR, "index.html"))) return;
	console.log("_site/ missing — building first…");
	execFileSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
}

function parseArgs(argv) {
	const paths = [];
	let runs = 1;
	let assert = false;
	let baseUrl = null;
	for (const arg of argv) {
		const runsMatch = arg.match(/^--runs=(\d+)$/);
		const baseMatch = arg.match(/^--base-url=(.+)$/);
		if (runsMatch) {
			runs = Math.max(1, Number(runsMatch[1]));
		} else if (baseMatch) {
			baseUrl = baseMatch[1].replace(/\/$/, "");
		} else if (arg === "--assert") {
			assert = true;
		} else if (arg.startsWith("-")) {
			console.error(`Unknown option: ${arg}`);
			process.exit(1);
		} else {
			paths.push(arg.startsWith("/") ? arg : `/${arg}`);
		}
	}
	const pages = paths.length
		? Object.fromEntries(
				paths.map((p) => [p.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home", p])
			)
		: DEFAULT_PAGES;
	return { pages, runs, assert, baseUrl };
}

async function auditPage({ url, port, runs, chromePath }) {
	const results = [];
	for (let i = 0; i < runs; i += 1) {
		const chrome = await chromeLauncher.launch({
			chromePath,
			chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
		});
		try {
			const runnerResult = await lighthouse(
				url,
				{ port: chrome.port, output: "json", logLevel: "error" },
				{ extends: "lighthouse:default" } // mobile form factor + mobile throttling
			);
			if (!runnerResult?.lhr) throw new Error(`Lighthouse returned no result for ${url}`);
			results.push(runnerResult);
		} finally {
			await chrome.kill();
		}
	}
	return results;
}

function median(values) {
	const sorted = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function summarise(results) {
	const lhr = results[0].lhr;
	const scores = {};
	for (const category of CATEGORIES) {
		const values = results.map((r) => (r.lhr.categories[category]?.score ?? 0) * 100);
		scores[category] = Math.round(median(values));
	}
	const audits = lhr.audits;
		return {
		url: lhr.finalDisplayedUrl || lhr.finalUrl,
		fetchedAt: new Date().toISOString(),
		lighthouseVersion: lhr.lighthouseVersion,
		chromeVersion: lhr.environment.hostUserAgent.match(/Chrome\/[\d.]+/)?.[0] ?? "unknown",
		formFactor: lhr.configSettings.formFactor,
		runs: results.length,
		scores,
		perRun: results.map((r) => {
			const out = {};
			for (const category of CATEGORIES) out[category] = Math.round((r.lhr.categories[category]?.score ?? 0) * 100);
			return out;
		}),
		metrics: {
			fcpMs: Math.round(audits["first-contentful-paint"]?.numericValue ?? 0),
			lcpMs: Math.round(audits["largest-contentful-paint"]?.numericValue ?? 0),
			tbtMs: Math.round(audits["total-blocking-time"]?.numericValue ?? 0),
			cls: Number((audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(4)),
			siMs: Math.round(audits["speed-index"]?.numericValue ?? 0),
			totalByteWeight: Math.round(audits["total-byte-weight"]?.numericValue ?? 0),
		},
		failingAudits: Object.values(audits)
			.filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === "binary")
			.map((a) => a.id),
	};
}

async function main() {
	const { pages, runs, assert, baseUrl } = parseArgs(process.argv.slice(2));
	const chromePath = resolveChrome();
	fs.mkdirSync(BASELINE_DIR, { recursive: true });

	let base = baseUrl;
	let server = null;
	let port = 0;

	if (!base) {
		buildSite();
		port = await getFreePort(4173);
		base = `http://localhost:${port}`;
		server = spawn(path.join(ROOT, "node_modules", ".bin", "serve"), ["_site", "-l", String(port), "--no-clipboard"], {
			cwd: ROOT,
			stdio: "ignore",
		});
	}

	const summaries = [];
	try {
		await waitForServer(`${base}/`);
		for (const [slug, pagePath] of Object.entries(pages)) {
			const url = `${base}${pagePath}`;
			process.stdout.write(`Auditing ${pagePath}${runs > 1 ? ` ×${runs}` : ""} …\n`);
			const results = await auditPage({ url, port, runs, chromePath });
			const summary = summarise(results);
			summaries.push({ slug, pagePath, summary });

			// Summary only: a full LHR is ~2 MB per run and adds nothing to a diff.
			const outFile = path.join(BASELINE_DIR, `${slug}.json`);
			fs.writeFileSync(outFile, `${JSON.stringify(summary, null, "\t")}\n`);
		}
	} finally {
		if (server) server.kill("SIGTERM");
	}

	// Report
	const header = ["page", ...CATEGORIES].map((h) => h.toUpperCase().padEnd(15)).join("");
	console.log(`\n${header}`);
	console.log("-".repeat(header.length));
	for (const { pagePath, summary } of summaries) {
		const cells = [pagePath, ...CATEGORIES.map((c) => String(summary.scores[c]))].map((c) => c.padEnd(15));
		console.log(cells.join(""));
		if (summary.failingAudits.length) {
			console.log(`  failing: ${summary.failingAudits.join(", ")}`);
		}
	}
	console.log(`\nWrote ${summaries.length} baseline(s) to docs/baselines/ (${summaries[0].summary.formFactor}, runs: ${runs}).`);

	if (assert) {
		const PAGE_WEIGHT_BUDGETS = {
			"/": 1_500_000,
			"/products/": 2_500_000,
		};
		const failures = [];
		for (const { pagePath, summary } of summaries) {
			for (const category of CATEGORIES) {
				if (summary.scores[category] < 100) {
					failures.push(`${pagePath} ${category} scored ${summary.scores[category]} (required 100)`);
				}
			}
			const budget = PAGE_WEIGHT_BUDGETS[pagePath];
			if (budget && summary.metrics.totalByteWeight > budget) {
				failures.push(
					`${pagePath} totalByteWeight ${summary.metrics.totalByteWeight} B exceeds budget ${budget} B`
				);
			}
		}
		if (failures.length) {
			console.error(`\nLighthouse assertion failed:`);
			for (const f of failures) console.error(`  ✗ ${f}`);
			process.exit(1);
		}
		console.log(`Lighthouse assertions passed: 100/100/100/100 and page-weight budgets met.`);
	}
}

await main();

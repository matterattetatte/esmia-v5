import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@playwright/test";

function resolvePinnedChrome() {
	const cacheDir = path.join(import.meta.dirname, "chrome");
	const executableNames = new Set([
		"chrome",
		"chrome.exe",
		"Google Chrome for Testing",
		"Google Chrome for Testing.exe",
	]);
	if (!fs.existsSync(cacheDir)) return undefined;
	const stack = [{ dir: cacheDir, depth: 0 }];
	while (stack.length) {
		const { dir, depth } = stack.pop();
		for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, child.name);
			if (child.isFile() && executableNames.has(child.name)) return full;
			if (child.isDirectory() && depth < 5) stack.push({ dir: full, depth: depth + 1 });
		}
	}
	return undefined;
}

const executablePath = resolvePinnedChrome();
const port = Number(process.env.PLAYWRIGHT_PORT || 4173);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

export default defineConfig({
	testDir: "./e2e",
	timeout: 30_000,
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [["github"], ["list"]] : "list",
	use: {
		baseURL,
		launchOptions: executablePath
			? { executablePath, args: ["--no-sandbox", "--disable-gpu"] }
			: { args: ["--no-sandbox", "--disable-gpu"] },
	},
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: `npm run build && npx serve _site -l ${port} --no-clipboard`,
				url: baseURL,
				reuseExistingServer: !process.env.CI,
				timeout: 60_000,
			},
});

import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@playwright/test";

function resolvePinnedChrome() {
	const cacheDir = path.join(import.meta.dirname, "chrome");
	if (!fs.existsSync(cacheDir)) return undefined;
	for (const entry of fs.readdirSync(cacheDir)) {
		const candidate = path.join(cacheDir, entry, "chrome-linux64", "chrome");
		if (fs.existsSync(candidate)) return candidate;
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

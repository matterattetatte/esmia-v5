import { defineConfig } from "@playwright/test";
import { resolvePinnedChrome } from "./scripts/resolve-chrome.mjs";

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

import fs from "node:fs";
import path from "node:path";

export const CHROME_VERSION = "156.0.8078.80";

const EXECUTABLE_NAMES = new Set([
	"chrome",
	"chrome.exe",
	"Google Chrome for Testing",
	"Google Chrome for Testing.exe",
]);

/**
 * Locate the pinned Chrome for Testing binary inside `./chrome/`.
 *
 * `@puppeteer/browsers install chrome@<version> --path ./chrome` creates
 * `chrome/linux-<version>/...` locally and `chrome/chrome/linux-<version>/...`
 * on fresh CI runners, so we walk up to 5 directory levels and match both the
 * executable filename and `CHROME_VERSION` in the resolved path.
 */
export function resolvePinnedChrome(rootDir = path.resolve(import.meta.dirname, "..")) {
	const cacheDir = path.join(rootDir, "chrome");
	if (!fs.existsSync(cacheDir)) return undefined;

	try {
		const stack = [{ dir: cacheDir, depth: 0 }];
		while (stack.length) {
			const { dir, depth } = stack.pop();
			for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
				const full = path.join(dir, child.name);
				if (child.isFile() && EXECUTABLE_NAMES.has(child.name) && full.includes(CHROME_VERSION)) {
					return full;
				}
				if (child.isDirectory() && depth < 5) {
					stack.push({ dir: full, depth: depth + 1 });
				}
			}
		}
	} catch {
		return undefined;
	}
	return undefined;
}

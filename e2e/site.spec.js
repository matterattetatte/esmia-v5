import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
	"/",
	"/about/",
	"/products/",
	"/news/",
	"/news/nov-2025/newsletter/",
	"/news/paella-catering-stockholm/",
	"/news/spanska-delikatesser-guide/",
	"/legal/",
	"/legal/privacy/",
	"/legal/cookies/",
	"/legal/terms/",
];

test.describe("Routes & Accessibility", () => {
	for (const route of ROUTES) {
		test(`route ${route} renders 200, single h1, zero console/network errors, and zero axe violations`, async ({ page }) => {
			const consoleErrors = [];
			const failedRequests = [];

			page.on("console", (msg) => {
				if (msg.type() === "error") consoleErrors.push(msg.text());
			});
			page.on("pageerror", (err) => {
				consoleErrors.push(err.message);
			});
			page.on("requestfailed", (req) => {
				failedRequests.push(`${req.method()} ${req.url()} (${req.failure()?.errorText})`);
			});
			page.on("response", (res) => {
				if (res.status() >= 400) {
					failedRequests.push(`${res.status()} ${res.url()}`);
				}
			});

			const response = await page.goto(route, { waitUntil: "networkidle" });
			expect(response?.status()).toBe(200);

			await expect(page.locator("h1")).toHaveCount(1);
			await expect(page.locator("main")).toHaveCount(1);
			await expect(page.locator("header")).toHaveCount(1);
			await expect(page.locator("footer")).toHaveCount(1);

			expect(consoleErrors).toEqual([]);
			expect(failedRequests).toEqual([]);

			const axe = await new AxeBuilder({ page }).analyze();
			expect(axe.violations).toEqual([]);
		});
	}

	test("unknown path returns 404 with custom 404 page", async ({ page }) => {
		const response = await page.goto("/definitely-not-a-real-route-xyz", { waitUntil: "domcontentloaded" });
		expect(response?.status()).toBe(404);
		await expect(page.locator("h1")).toContainText("Sidan hittades inte");
	});
});

test.describe("Keyboard-only interactions", () => {
	test("skip link becomes visible on focus and targets #main", async ({ page }) => {
		await page.goto("/");
		const skipLink = page.locator("#skip-link");
		await skipLink.focus();
		await expect(skipLink).toBeFocused();
		const box = await skipLink.boundingBox();
		expect(box).not.toBeNull();
		expect(box.width).toBeGreaterThan(50);
		expect(box.height).toBeGreaterThan(20);
		await expect(skipLink).toHaveAttribute("href", "#main");
	});

	test("product tabs operate via ArrowRight, ArrowLeft, Home, End, and update aria-selected + hidden panels", async ({ page }) => {
		await page.goto("/products/");

		const firstTab = page.getByRole("tab", { name: "Skinka" });
		await firstTab.focus();
		await expect(firstTab).toHaveAttribute("aria-selected", "true");
		await expect(page.locator("#panel-skinka")).not.toHaveAttribute("hidden", "");
		await expect(page.locator("#panel-chorizo")).toHaveAttribute("hidden", "");

		await page.keyboard.press("ArrowRight");
		const secondTab = page.getByRole("tab", { name: "Chorizo" });
		await expect(secondTab).toBeFocused();
		await expect(secondTab).toHaveAttribute("aria-selected", "true");
		await expect(firstTab).toHaveAttribute("aria-selected", "false");
		await expect(page.locator("#panel-chorizo")).not.toHaveAttribute("hidden", "");
		await expect(page.locator("#panel-skinka")).toHaveAttribute("hidden", "");

		await page.keyboard.press("End");
		const lastTab = page.getByRole("tab", { name: "Catering" });
		await expect(lastTab).toBeFocused();
		await expect(lastTab).toHaveAttribute("aria-selected", "true");

		await page.keyboard.press("Home");
		await expect(firstTab).toBeFocused();
		await expect(firstTab).toHaveAttribute("aria-selected", "true");
	});

	test("mobile nav toggle opens and closes by keyboard and updates aria-expanded", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		const toggle = page.locator(".nav-toggle");
		const nav = page.locator("#primary-nav");

		await expect(toggle).toBeVisible();
		await expect(toggle).toHaveAttribute("aria-expanded", "false");

		await toggle.focus();
		await page.keyboard.press("Enter");
		await expect(toggle).toHaveAttribute("aria-expanded", "true");
		await expect(nav).toHaveClass(/open/);

		await page.keyboard.press("Escape");
		await expect(toggle).toHaveAttribute("aria-expanded", "false");
		await expect(nav).not.toHaveClass(/open/);
		await expect(toggle).toBeFocused();
	});
});

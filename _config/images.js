import eleventyImage, { generateHTML } from "@11ty/eleventy-img";
import fs from "node:fs";
import path from "node:path";

/**
 * The site's one image pipeline.
 *
 * Sources live in `content/images/` and are referenced by a path relative to
 * that directory (e.g. `products/serrano500.jpg`). Everything else — formats,
 * widths, `srcset`, `sizes`, dimensions, lazy/eager — is decided by a preset,
 * so adding a photo never requires remembering a second convention.
 *
 * Usage:
 *   {% image "products/serrano500.jpg", "Serranoskinka skivad 500g", "card" %}
 *   {% image "background.webp", "Paella och tapas catering i Stockholm", "hero" %}
 *
 * The originals are never copied to the output, so a 5 MB camera JPEG only
 * ever reaches a visitor as an AVIF or WebP at a width the layout asked for.
 */

const SOURCE_DIR = path.join("content", "images");
const OUTPUT_DIR = path.join("_site", "img", "gen") + path.sep;
const URL_PATH = "/img/gen/";
const FORMATS = ["avif", "webp"];

const PRESETS = {
	// Full-bleed LCP image: eager, high priority, widest set.
	hero: {
		widths: [640, 1024, 1440, 1920],
		sizes: "100vw",
		loading: "eager",
		fetchpriority: "high",
	},
	// Illustrative image inside body copy (welcome section, news posts).
	figure: {
		widths: [400, 720, 1080],
		sizes: "(min-width: 60rem) 32rem, 90vw",
		loading: "lazy",
	},
	// One card in the product grid: auto-fit minmax(250px, 1fr).
	card: {
		widths: [250, 375, 500],
		sizes: "(min-width: 64rem) 25vw, (min-width: 40rem) 33vw, 90vw",
		loading: "lazy",
	},
};

/** Metadata keyed by source + width set, so two uses of one photo cost one pass. */
const metadataCache = new Map();

function resolveSource(src) {
	const file = path.join(SOURCE_DIR, src);
	return fs.existsSync(file) ? file : null;
}

async function metadataFor(file, widths) {
	const key = `${file}::${widths.join(",")}`;
	if (!metadataCache.has(key)) {
		metadataCache.set(
			key,
			eleventyImage(file, {
				widths,
				formats: FORMATS,
				outputDir: OUTPUT_DIR,
				urlPath: URL_PATH,
				// SVGs pass through byte-for-byte instead of being rasterised.
				svgShortCircuit: true,
			})
		);
	}
	return metadataCache.get(key);
}

function getPreset(name) {
	const preset = PRESETS[name];
	if (!preset) {
		throw new Error(
			`Unknown image preset "${name}". Known presets: ${Object.keys(PRESETS).join(", ")}`
		);
	}
	return preset;
}

export default function registerImages(eleventyConfig) {
	eleventyConfig.addAsyncShortcode(
		"image",
		async (src, alt, presetName = "card", extra = {}) => {
			const preset = getPreset(presetName);
			const file = resolveSource(src);
			if (!file) {
				// Loud enough to notice in a build log, quiet enough not to break a deploy.
				console.warn(`[images] missing source "${src}" (looked in ${SOURCE_DIR}/) — not rendered`);
				return "";
			}
			if (alt === undefined) {
				throw new Error(`[images] "${src}" needs an alt attribute (alt="" is fine for decorative).`);
			}

			const metadata = await metadataFor(file, preset.widths);

			const attributes = {
				alt,
				sizes: preset.sizes,
				loading: preset.loading,
				decoding: "async",
				...extra,
			};
			if (preset.fetchpriority) {
				attributes.fetchpriority = preset.fetchpriority;
			}

			const html = generateHTML(metadata, attributes);
			// Keep cards from reserving a huge box before the image arrives.
			return html.trim();
		}
	);

	eleventyConfig.addAsyncShortcode("imagePreload", async (src, presetName = "hero") => {
		const preset = getPreset(presetName);
		const file = resolveSource(src);
		if (!file) return "";

		const metadata = await metadataFor(file, preset.widths);
		const links = FORMATS.map((format) => {
			const entries = metadata[format];
			if (!entries) return "";
			const srcset = entries.map((entry) => `${entry.url} ${entry.width}w`).join(", ");
			return `<link rel="preload" as="image" type="${entries[0].sourceType || `image/${format}`}" imagesrcset="${srcset}" imagesizes="${preset.sizes}">`;
		});

		return links.filter(Boolean).join("\n\t\t");
	});

	eleventyConfig.addAsyncShortcode("imageUrl", async (src, presetName = "card") => {
		if (!src) return "";
		const preset = getPreset(presetName);
		const file = resolveSource(src);
		if (!file) return "";
		const metadata = await metadataFor(file, preset.widths);
		const entries = metadata.webp || metadata.avif || Object.values(metadata)[0];
		if (!entries || !entries.length) return "";
		return entries[entries.length - 1].url;
	});
}

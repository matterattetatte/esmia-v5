import assert from "node:assert/strict";
import test from "node:test";

import { parsePrice } from "../_config/filters.js";
import products from "../_data/products.js";

test("parsePrice extracts amount, currency, and unit across formats", () => {
	assert.deepEqual(parsePrice("115 kr / st"), { amount: "115", currency: "SEK", unit: "st" });
	assert.deepEqual(parsePrice("370kr / st"), { amount: "370", currency: "SEK", unit: "st" });
	assert.deepEqual(parsePrice("170 kr / kg"), { amount: "170", currency: "SEK", unit: "kg" });
	assert.deepEqual(parsePrice("295 kr / person"), { amount: "295", currency: "SEK", unit: "person" });
	assert.equal(parsePrice(""), null);
	assert.equal(parsePrice(null), null);
});

test("every priced product in _data/products.js parses cleanly without inventing prices", () => {
	let pricedCount = 0;
	let unpricedCount = 0;

	for (const [category, items] of Object.entries(products)) {
		for (const item of items) {
			if (item.price && item.price.trim()) {
				const parsed = parsePrice(item.price);
				assert.ok(parsed, `Failed to parse price "${item.price}" on "${item.name}" (${category})`);
				assert.equal(parsed.currency, "SEK");
				assert.match(parsed.amount, /^\d+$/);
				assert.ok(parsed.unit, `Expected unit on "${item.name}" (${item.price})`);
				pricedCount += 1;
			} else {
				assert.equal(parsePrice(item.price), null, `Must not invent price for "${item.name}"`);
				unpricedCount += 1;
			}
		}
	}

	assert.equal(pricedCount, 28);
	assert.equal(unpricedCount, 1);
});

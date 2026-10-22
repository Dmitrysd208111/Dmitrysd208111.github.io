# Third-party assets

## Product photography and source names

- Provider: [DummyJSON](https://dummyjson.com/docs/products).
- Source project: [Ovi/DummyJSON](https://github.com/Ovi/DummyJSON), MIT-licensed source project.
- Imported 20 October 2026, using the `laptops`, `smartphones`, `tablets`, and `mobile-accessories` categories.
- 38 source records are preserved in `products-source.json`. 96 original WebP images are copied into `public/images/products`.
- Complete per-file provenance: `src/data/image-sources.json`.
- Regeneration: `node scripts/prepare-catalog.mjs` from the repository root (requires internet access and overwrites generated catalog/assets).

The application code's MIT license does not grant rights to third-party product photographs, brand names, or trademarks. DummyJSON is an open demo dataset; independently verify image and brand rights before commercial reuse. No affiliation with the manufacturers is claimed.

Prices in rubles, available quantities, packaging variants, ratings, reviews counts, descriptions, promotional labels and service conditions are fictional. “New” means a new arrival in this demonstration catalog, not the release date of the device. Product photography corresponds to the original source model. This is not a live inventory or specification database. Apple AirPower is a concept present in the upstream demonstration dataset.

## Typeface

[Manrope](https://github.com/sharanda/manrope), by Mikhail Sharanda and contributors. Distributed locally through `@fontsource-variable/manrope` under the SIL Open Font License 1.1. The full license is in that package's `LICENSE` file and copied to `docs/licenses/Manrope-OFL.txt`.

## Icons and packages

Lucide icons: ISC license, [Lucide](https://lucide.dev/license). Dependency licenses are preserved in their npm packages. See `package-lock.json` for exact resolved versions.

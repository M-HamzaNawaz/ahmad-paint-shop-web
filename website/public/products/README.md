# Product photos — how to add them

The website is already wired to show real photos for every Kaizen product.
You just need to **save the image files into this folder** (`public/products/`)
with the exact filenames below.

- Save each file as **PNG**.
- Use the **exact filename** (lowercase, with hyphens).
- As soon as a file is in this folder, that product shows the real photo.
- A product whose file is missing simply shows the illustrated placeholder —
  nothing breaks, so you can add the photos one at a time.

## The 27 Kaizen images you sent — save each as:

| # | Product (image you sent) | Save the file as |
|---|--------------------------|------------------|
| 1 | ZEN Wall Putty Plus (white bucket, red lid) | `zen-wall-putty-plus.png` |
| 2 | ZEN Wall Putty — Fragrant (white bucket, grey lid) | `zen-putty-fragrant.png` |
| 3 | ZEN Wall Primer & Sealer (grey bucket) | `zen-wall-primer-sealer.png` |
| 4 | ZEN Stone Texture (white bucket) | `zen-stone-texture.png` |
| 5 | NEO Interior Plastic Emulsion (red) | `neo-interior-plastic-emulsion.png` |
| 6 | NEO Premium Interior Plastic Emulsion (blue) | `neo-premium-interior-emulsion.png` |
| 7 | NEO Silk Water Matt (teal, feather) | `neo-silk-water-matt.png` |
| 8 | NEO Stain Guard (orange, shield) | `neo-stain-guard.png` |
| 9 | NEO Primer & Sealer — Water Based (grey) | `neo-water-based-primer.png` |
| 10 | NEO Primer & Sealer — Oil Based (black) | `neo-wall-primer-oil.png` |
| 11 | NEO Acrylic Premium Wall Putty (green) | `neo-premium-wall-putty.png` |
| 12 | NEO Premium Sheesha Wall Putty (pink) | `neo-premium-sheesha-wall-putty.png` |
| 13 | NEO Power Guard Exterior Emulsion (yellow) | `neo-power-guard.png` |
| 14 | NEO Premium Exterior Emulsion (green) | `neo-premium-exterior-emulsion.png` |
| 15 | NEO Acrylic Premium Exterior Wall Putty (peach) | `neo-premium-exterior-wall-putty.png` |
| 16 | NEO Metallic Gloss Enamel (silver tin) | `neo-metallic-gloss-enamel.png` |
| 17 | NEO Premium Matt Enamel (green tin) | `neo-premium-matt-enamel.png` |
| 18 | NEO Red Oxide Primer (red/orange tin) | `neo-red-oxide-primer.png` |
| 19 | NEO Premium Wood Sealer (wood, tin) | `neo-premium-wood-sealer.png` |
| 20 | NEO Wood Varnish (wood, rectangular tin) | `neo-wood-varnish.png` |
| 21 | NEO Premium Wood Thinner (wood, rectangular tin) | `neo-wood-thinner.png` |
| 22 | NEO Premium Wood Gloss Lacquer (wood, tin) | `neo-wood-gloss-lacquer.png` |
| 23 | NEO Premium Wood Matt Lacquer (wood, tin) | `neo-wood-matt-lacquer.png` |
| 24 | ZEN Interior Emulsion (red bucket) | `zen-interior-emulsion.png` |
| 25 | ZEN Wall Care Interior Emulsion (blue bucket) | `zen-wall-care-interior-emulsion.png` |
| 26 | ZEN Gloss Enamel (white tin) | `zen-gloss-enamel.png` |
| 27 | ZEN Smooth Wall Putty (orange/tan bucket) | `zen-putty-smooth.png` |

> Image 26 (`zen-gloss-enamel.png`) is also used for **Zen Gloss Enamel —
> Special Shades**, so one file covers both products.

## Adding photos for other products later

To add a photo for any other product (e.g. a Nippon product), drop the image
file in this folder and add one line to `lib/productImages.ts`:

```ts
"product-id-here": "/products/your-file.png",
```

The product id is the last part of the product page URL
(e.g. `/product/neo-stain-guard-n920` → id is `neo-stain-guard-n920`).

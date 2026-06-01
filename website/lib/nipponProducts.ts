// Nippon Paint product list for Ahmad Paint House.
// Data from the Nippon Paint Ready Mix price list (Rest of Pakistan),
// effective 15 March 2026.
//
// Listed prices already INCLUDE 18% sales tax. The catalogue builder
// back-calculates the pre-tax retail price and tax amount automatically.

import type { RawProduct } from "./catalog";

export const NIPPON_RAW_PRODUCTS: RawProduct[] = [
  // ---- Interior Emulsions ----
  {
    srNo: 101,
    name: "Nippon Spot-less Matt Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Premium water-based matt emulsion with a stain-resistant, easy-to-clean finish for interior walls.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 2585 },
      { packSize: "4 Ltrs", totalPrice: 9225 },
      { packSize: "16 Ltrs", totalPrice: 34550 },
    ],
  },
  {
    srNo: 102,
    name: "Nippon EasyWash",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Washable interior emulsion that lets you wipe away marks and stains with ease.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 1980 },
      { packSize: "4 Ltrs", totalPrice: 7192 },
      { packSize: "16 Ltrs", totalPrice: 27640 },
    ],
  },
  {
    srNo: 103,
    name: "Nippon Perfect Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Smooth interior emulsion offering a flawless matt finish and good coverage.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 1544 },
      { packSize: "4 Ltrs", totalPrice: 5295 },
      { packSize: "16 Ltrs", totalPrice: 20555 },
    ],
  },
  {
    srNo: 104,
    name: "Nippon Matex Gold Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Popular interior emulsion delivering a smooth matt finish at great value.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1310 },
      { packSize: "3.64 Ltrs", totalPrice: 4530 },
      { packSize: "14.56 Ltrs", totalPrice: 17610 },
    ],
  },
  {
    srNo: 105,
    name: "Nippon Super Matex Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Upgraded Matex interior emulsion with improved coverage and a smooth matt finish.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 2660 },
      { packSize: "14.56 Ltrs", totalPrice: 10030 },
    ],
  },
  {
    srNo: 106,
    name: "Nippon Easy Coat Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Easy-to-apply interior emulsion for a neat, even matt finish.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 2277 },
      { packSize: "14.56 Ltrs", totalPrice: 8580 },
    ],
  },
  {
    srNo: 107,
    name: "Nippon Q Interior Emulsion",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description: "Economical interior emulsion for budget-friendly wall painting.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 640 },
      { packSize: "3.64 Ltrs", totalPrice: 2180 },
      { packSize: "14.56 Ltrs", totalPrice: 8250 },
    ],
  },
  {
    srNo: 108,
    name: "Nippon Matex Pro Emulsion - White Bucket",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Professional-grade interior emulsion for a smooth, durable wall finish.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 1740 },
      { packSize: "24 Kgs", totalPrice: 5800 },
    ],
  },
  {
    srNo: 109,
    name: "Nippon Matex Pro Emulsion - Standard",
    productLine: "",
    categorySlug: "interior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Professional-grade interior emulsion supplied in a standard pack for large jobs.",
    variants: [{ packSize: "24 Kgs", totalPrice: 5000 }],
  },

  // ---- Enamels (Matt Enamel) ----
  {
    srNo: 110,
    name: "Nippon Satin Glo Matt Enamel",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Premium matt enamel with a soft satin finish for wood and metal surfaces.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 2085 },
      { packSize: "3.64 Ltrs", totalPrice: 7870 },
      { packSize: "14.56 Ltrs", totalPrice: 30575 },
    ],
  },
  {
    srNo: 111,
    name: "Nippon Brilliance Matt Enamel",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Matt enamel that gives wood and metal a smooth, modern non-glossy finish.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1755 },
      { packSize: "3.64 Ltrs", totalPrice: 6050 },
    ],
  },

  // ---- Others (Textured & Decorative) ----
  {
    srNo: 112,
    name: "Nippon Texture Nippon'eon",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Decorative textured wall coating for stylish, patterned interior finishes.",
    variants: [{ packSize: "24 Kgs", totalPrice: 4761 }],
  },
  {
    srNo: 113,
    name: "Nippon Momento - Snow Frost",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Momento decorative finish in Snow Frost — an elegant shimmering wall effect.",
    variants: [{ packSize: "1 Ltr", totalPrice: 7222 }],
  },
  {
    srNo: 114,
    name: "Nippon Momento - Pearl Frost",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Momento decorative finish in Pearl Frost — a soft pearlescent wall effect.",
    variants: [{ packSize: "1 Ltr", totalPrice: 7222 }],
  },
  {
    srNo: 115,
    name: "Nippon Momento - Gold Frost",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Momento decorative finish in Gold Frost — a warm metallic wall effect.",
    variants: [{ packSize: "1 Ltr", totalPrice: 7222 }],
  },

  // ---- Exterior Emulsions ----
  {
    srNo: 116,
    name: "Nippon Weatherbond",
    productLine: "",
    categorySlug: "exterior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Durable exterior emulsion that protects walls against rain, sun and weathering.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 2010 },
      { packSize: "4 Ltrs", totalPrice: 7020 },
      { packSize: "16 Ltrs", totalPrice: 26300 },
    ],
  },
  {
    srNo: 117,
    name: "Nippon Weatherbond Advance",
    productLine: "",
    categorySlug: "exterior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Advanced exterior emulsion with enhanced weather and dirt resistance.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 1566 },
      { packSize: "4 Ltrs", totalPrice: 5466 },
      { packSize: "16 Ltrs", totalPrice: 20500 },
    ],
  },
  {
    srNo: 118,
    name: "Nippon Q Exterior Emulsion",
    productLine: "",
    categorySlug: "exterior-emulsions",
    brand: "Nippon",
    note: null,
    description: "Economical exterior emulsion for everyday weather protection.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 1365 },
      { packSize: "4 Ltrs", totalPrice: 4870 },
      { packSize: "16 Ltrs", totalPrice: 18415 },
    ],
  },
  {
    srNo: 119,
    name: "Nippon Tilelac (Textured)",
    productLine: "",
    categorySlug: "exterior-emulsions",
    brand: "Nippon",
    note: null,
    description:
      "Textured exterior coating that gives walls a durable decorative finish.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 2794 },
      { packSize: "20 Kgs", totalPrice: 7847 },
    ],
  },

  // ---- Primers / Sealers ----
  {
    srNo: 120,
    name: "Nippon Expresskote Sealer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Fast-drying wall sealer that prepares surfaces for a long-lasting paint finish.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 2300 },
      { packSize: "4 Ltrs", totalPrice: 8590 },
    ],
  },
  {
    srNo: 121,
    name: "Nippon Hydro Primer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Water-based primer that seals and prepares walls for top-coat painting.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1776 },
      { packSize: "3.64 Ltrs", totalPrice: 6657 },
    ],
  },
  {
    srNo: 122,
    name: "Nippon Vinilex 5100 Wall Sealer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Reliable wall sealer that improves adhesion and finish of the top coat.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 990 },
      { packSize: "4 Ltrs", totalPrice: 3600 },
      { packSize: "16 Ltrs", totalPrice: 13490 },
    ],
  },
  {
    srNo: 123,
    name: "Nippon Vinilex 5200 Wall Sealer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Premium wall sealer for strong adhesion and a smooth painted finish.",
    variants: [{ packSize: "16 Ltrs", totalPrice: 10460 }],
  },
  {
    srNo: 124,
    name: "Nippon Hi-Bond Wall Primer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "High-bonding wall primer that seals surfaces for excellent paint adhesion.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1540 },
      { packSize: "3.64 Ltrs", totalPrice: 5235 },
      { packSize: "14.56 Ltrs", totalPrice: 19570 },
    ],
  },
  {
    srNo: 125,
    name: "Nippon Red Oxide Primer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Anti-rust red oxide primer that protects metal surfaces before painting.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1200 },
      { packSize: "3.64 Ltrs", totalPrice: 4230 },
      { packSize: "14.56 Ltrs", totalPrice: 15890 },
    ],
  },
  {
    srNo: 126,
    name: "Nippon Synthetic Undercoat",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Synthetic undercoat that creates a smooth base for enamel top coats.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1030 },
      { packSize: "3.64 Ltrs", totalPrice: 3710 },
    ],
  },
  {
    srNo: 127,
    name: "Nippon Coloured Undercoat",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Coloured undercoat that improves the depth and coverage of the top coat.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 480 },
      { packSize: "5 Ltrs", totalPrice: 2160 },
    ],
  },
  {
    srNo: 128,
    name: "Nippon Q Primer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: null,
    description:
      "Economical primer that seals and prepares walls before painting.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1740 },
      { packSize: "3.64 Ltrs", totalPrice: 6660 },
    ],
  },
  {
    srNo: 129,
    name: "Nippon Momento Primer",
    productLine: "",
    categorySlug: "primers",
    brand: "Nippon",
    note: "For use with Nippon Momento decorative finishes only",
    description:
      "Specialised primer formulated as a base for Momento decorative finishes.",
    variants: [{ packSize: "1 Ltr", totalPrice: 1604 }],
  },

  // ---- Putty ----
  {
    srNo: 130,
    name: "Nippon ACS Putty",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: null,
    description:
      "Acrylic wall putty that smooths walls for a flawless paint finish.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 1675 },
      { packSize: "20 Kgs", totalPrice: 5780 },
      { packSize: "28 Kgs", totalPrice: 8150 },
    ],
  },
  {
    srNo: 131,
    name: "Nippon Hi-Bond Acrylic Putty",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: null,
    description:
      "High-bonding acrylic putty for an ultra-smooth interior wall surface.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 1790 },
      { packSize: "20 Kgs", totalPrice: 6180 },
    ],
  },
  {
    srNo: 132,
    name: "Nippon Weatherbond Exterior Putty",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: null,
    description:
      "Weather-resistant exterior putty that smooths walls before painting.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 2050 },
      { packSize: "20 Kgs", totalPrice: 7230 },
    ],
  },
  {
    srNo: 133,
    name: "Nippon Extreme Wall Putty",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: "Available in Lahore only",
    description:
      "Hard-wearing wall putty for a smooth, durable wall surface.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 1340 },
      { packSize: "20 Kgs", totalPrice: 4880 },
    ],
  },
  {
    srNo: 134,
    name: "Nippon Wall Putty A-100",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: null,
    description: "Economical wall putty for everyday wall preparation.",
    variants: [
      { packSize: "5 Kgs", totalPrice: 1195 },
      { packSize: "20 Kgs", totalPrice: 4365 },
    ],
  },
  {
    srNo: 135,
    name: "Nippon Project Putty - Standard",
    productLine: "",
    categorySlug: "putty",
    brand: "Nippon",
    note: null,
    description:
      "Wall putty supplied in a standard pack for large painting projects.",
    variants: [{ packSize: "20 Kgs", totalPrice: 3580 }],
  },

  // ---- Wood Care (Sealer, Thinner, Lacquer) ----
  {
    srNo: 136,
    name: "Nippon Timber Finish Wood Sealer",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Wood sealer that prepares timber surfaces for lacquer or varnish.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1930 },
      { packSize: "3.64 Ltrs", totalPrice: 6955 },
    ],
  },
  {
    srNo: 137,
    name: "Nippon Timber Finish Thinner",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Thinner for adjusting the consistency of Timber Finish wood products.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1180 },
      { packSize: "3.64 Ltrs", totalPrice: 4270 },
    ],
  },
  {
    srNo: 138,
    name: "Nippon OP-1 Thinner",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "General-purpose thinner for solvent-based paints and enamels.",
    variants: [
      { packSize: "1 Ltr", totalPrice: 1240 },
      { packSize: "4 Ltrs", totalPrice: 4315 },
    ],
  },
  {
    srNo: 139,
    name: "Nippon Timber Finish Matt Lacquer",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Matt lacquer that protects wood with a natural, non-glossy finish.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1995 },
      { packSize: "3.64 Ltrs", totalPrice: 7305 },
    ],
  },
  {
    srNo: 140,
    name: "Nippon Timber Finish C W Lacquer",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Clear wood lacquer that protects and enhances timber surfaces.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 2010 },
      { packSize: "3.64 Ltrs", totalPrice: 7195 },
    ],
  },
  {
    srNo: 141,
    name: "Nippon Synthetic Clear Varnish",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Clear synthetic varnish that gives wood a durable protective coating.",
    variants: [
      { packSize: "750 ml", totalPrice: 1210 },
      { packSize: "3 Ltrs", totalPrice: 4320 },
    ],
  },
  {
    srNo: 142,
    name: "Nippon Timber Finish PU Varnish - Gloss",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Polyurethane wood varnish with a tough, high-gloss protective finish.",
    variants: [{ packSize: "750 ml", totalPrice: 1475 }],
  },
  {
    srNo: 143,
    name: "Nippon Timber Finish PU Varnish - Matt",
    productLine: "",
    categorySlug: "wood-care",
    brand: "Nippon",
    note: null,
    description:
      "Polyurethane wood varnish with a durable, natural matt finish.",
    variants: [{ packSize: "750 ml", totalPrice: 1660 }],
  },

  // ---- Enamels (Top Coats) ----
  {
    srNo: 144,
    name: "Nippon Hydrogloss Enamel",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Water-based gloss enamel for a low-odour, durable finish on wood and metal.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1300 },
      { packSize: "3.64 Ltrs", totalPrice: 5000 },
    ],
  },
  {
    srNo: 145,
    name: "Nippon Platone High Gloss Enamel",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Premium high-gloss enamel for a brilliant, hard-wearing finish.",
    variants: [
      { packSize: "0.91 Ltr", totalPrice: 1555 },
      { packSize: "3.64 Ltrs", totalPrice: 5525 },
    ],
  },
  {
    srNo: 146,
    name: "Nippon Q Enamel (Regular & Premium Shades)",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Versatile gloss enamel for wood and metal in a wide range of shades.",
    variants: [
      { packSize: "0.25 Ltr", totalPrice: 330 },
      { packSize: "0.91 Ltr", totalPrice: 1250 },
      { packSize: "3.64 Ltrs", totalPrice: 4810 },
      { packSize: "14.56 Ltrs", totalPrice: 18400 },
    ],
  },
  {
    srNo: 147,
    name: "Nippon Q Enamel (Metallic Shades Only)",
    productLine: "",
    categorySlug: "enamels",
    brand: "Nippon",
    note: null,
    description:
      "Gloss enamel in striking metallic shades for decorative wood and metal.",
    variants: [
      { packSize: "0.25 Ltr", totalPrice: 340 },
      { packSize: "0.91 Ltr", totalPrice: 1285 },
      { packSize: "3.64 Ltrs", totalPrice: 4920 },
    ],
  },

  // ---- Others (Special Surfaces) ----
  {
    srNo: 148,
    name: "Nippon Slate Finish - Satin",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Satin slate finish for a stylish decorative effect on cementitious surfaces and stone.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 3420 },
      { packSize: "14.56 Ltrs", totalPrice: 13170 },
    ],
  },
  {
    srNo: 149,
    name: "Nippon Slate Finish - Gloss",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Glossy slate finish for a rich decorative effect on cementitious surfaces and stone.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 5600 },
      { packSize: "14.56 Ltrs", totalPrice: 19755 },
    ],
  },
  {
    srNo: 150,
    name: "Nippon FlexiSeal Elastomeric Membrane",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Flexible elastomeric waterproofing membrane for roofs and exterior surfaces.",
    variants: [{ packSize: "3.64 Ltrs", totalPrice: 4891 }],
  },
  {
    srNo: 151,
    name: "Nippon Bituminous Solution",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Bituminous waterproofing solution for protecting surfaces against moisture.",
    variants: [
      { packSize: "3.64 Ltrs", totalPrice: 3290 },
      { packSize: "20 Ltrs", totalPrice: 15760 },
    ],
  },
  {
    srNo: 152,
    name: "Nippon Momento Tool Kit",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "Application tool kit for creating Nippon Momento decorative wall finishes.",
    variants: [{ packSize: "1 Tool Kit", totalPrice: 726 }],
  },
  {
    srNo: 153,
    name: "Nippon Moisture Killer Kit DIY",
    productLine: "",
    categorySlug: "others",
    brand: "Nippon",
    note: null,
    description:
      "DIY kit (pack of 5) to treat and control damp and moisture on walls.",
    variants: [{ packSize: "Pack of 5", totalPrice: 7000 }],
  },
];

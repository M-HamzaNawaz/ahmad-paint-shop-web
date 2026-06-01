// Rich product details — features, specifications and colour shades.
// Extracted from the Kaizen Paint product brochures.
//
// Colour hex values are approximate (for on-screen display only).
// Printed / actual paint colours may vary slightly.

import type { ColorShade, ProductDetails } from "./types";

/** Shorthand to build a colour shade. */
const s = (name: string, code: string, hex: string): ColorShade => ({
  name,
  code,
  hex,
});

// ---- Gloss Enamel — standard shades --------------------------------------
const GLOSS_STANDARD: ColorShade[] = [
  s("White", "2201", "#FBFBF6"),
  s("Off White", "2202", "#E9E1D1"),
  s("Fresh Cream", "2203", "#E7D6AC"),
  s("Patio Grey", "2204", "#AEB6B3"),
  s("Oyster Grey", "2205", "#A9A39A"),
  s("Beige", "2207", "#A98C6E"),
  s("Volcanic Rock", "2209", "#B8BDBC"),
  s("Golden Brown", "2210", "#9A6A48"),
  s("Brown", "2211", "#4A3A30"),
  s("Smoke Grey", "2212", "#6E8488"),
  s("Port Blue", "2213", "#5C9BC4"),
  s("Champagne Brown", "2214", "#6E6257"),
  s("Creamy White", "2216", "#ECDFC2"),
  s("Fresh Caramel", "2217", "#C9A067"),
  s("Black", "2218", "#1E1E1E"),
  s("Ash White", "2219", "#CFCEC3"),
  s("Day Break", "2220", "#D9CCBA"),
  s("Coriander", "2221", "#978A78"),
  s("Red Oxide", "2222", "#7C4A40"),
  s("Fresh Blue", "2223", "#BAD2D5"),
  s("Warm Green", "2225", "#3E5E54"),
  s("Hazy Grey", "2226", "#CCCEC9"),
  s("Cappuccino", "2227", "#9C8575"),
  s("Forest Green", "2228", "#8AA06A"),
  s("Bahama Brown", "2229", "#5E4438"),
  s("Mandarin Blue", "2233", "#2E5A77"),
  s("Pink", "2248", "#EBC0C7"),
  s("Polish Brown", "2249", "#B07D5B"),
  s("Off White Classic", "2287", "#EEE4CF"),
  s("Clay", "2288", "#B7AD97"),
  s("Post Office Red", "2289", "#A23A38"),
  s("Warm Blue", "2290", "#3E86B8"),
  s("Diyar", "2292", "#B99B7D"),
  s("Antique White", "2294", "#E6DBC7"),
  s("Sea Green", "2296", "#79B193"),
  s("Middle Blue", "5026", "#1F6FA0"),
];

// ---- Gloss Enamel — special signal shades --------------------------------
const GLOSS_SPECIAL: ColorShade[] = [
  s("Golden Yellow", "2293", "#E8A92A"),
  s("Orange", "2295", "#DD6A2C"),
  s("Signal Red", "2206", "#A93F3E"),
  s("Signal Green", "2291", "#2E7048"),
  s("New Signal Red", "5025", "#B23A37"),
];

// ---- Gloss Enamel — metallic shades --------------------------------------
const GLOSS_METALLIC: ColorShade[] = [
  s("Sparkling Silver", "2401", "#C8CFC9"),
  s("Brown Sheen", "2402", "#6F7A63"),
  s("Gold Dust", "2403", "#C7A23E"),
  s("Shiny Green", "2404", "#8FB8AE"),
  s("Copper", "2405", "#B07A3C"),
  s("Champagne", "2406", "#C9BE94"),
  s("Ocean Blue", "2407", "#3E97A8"),
  s("Shamp-M", "2408", "#A9AE7E"),
];

// ---- Wall Care Interior Emulsion shades ----------------------------------
const WALL_CARE_SHADES: ColorShade[] = [
  s("White", "1201", "#FBFAF5"),
  s("Honey Drop", "1202", "#D69B6A"),
  s("Ivory", "1203", "#E9D9B3"),
  s("Light Mushroom", "1204", "#BFB29B"),
  s("Rose Pink", "1205", "#D9BCB2"),
  s("Off White", "1206", "#F0E7CE"),
  s("Warm Yellow", "1207", "#F0B94E"),
  s("Cosmic Blue", "1208", "#A9C6C9"),
  s("Ash White", "1209", "#DAD8CC"),
  s("Summer Pink", "1210", "#E8B4AC"),
  s("Star Dust", "1211", "#C2D0CE"),
  s("Rose Petal", "1212", "#E4CBB6"),
  s("Magnolia", "1213", "#EDE3C8"),
  s("Sand Stone", "1214", "#C2B49B"),
  s("Peach Cream", "1215", "#ECD4B5"),
  s("Badami", "1216", "#DCD3BF"),
  s("Elegance", "1217", "#D7D6C7"),
  s("Gardenia", "1218", "#F2DFAF"),
  s("Pale Cream", "1219", "#F0DCA7"),
  s("Pastel Green", "1220", "#C2C99F"),
  s("Cool Lime", "1221", "#C5CF9D"),
  s("Pretty Pink", "1222", "#E8C2B0"),
  s("Barley Beige", "1223", "#D8CDB3"),
  s("Charisma", "1224", "#CAD2CF"),
  s("Ravi Blue", "1225", "#6BA0C0"),
  s("Mallow", "1226", "#B6AEBE"),
  s("Deep Red", "1227", "#B2504C"),
  s("Parasol", "1228", "#B7B0C0"),
  s("Opal Lilac", "1229", "#BFBFC9"),
  s("Cockle Shell", "1230", "#D6CFBC"),
  s("Fresh Green", "1231", "#BCCB99"),
  s("Tea Rose", "1232", "#B7A89D"),
  s("Ice Grey", "1233", "#CACFC5"),
  s("Cameo", "1234", "#CBA989"),
  s("Coral Reef", "1235", "#D88B5A"),
  s("Warm Orange", "1236", "#C16E54"),
  s("Aqua White", "1237", "#CFDAD1"),
  s("Old Linen", "1238", "#C9C3A7"),
  s("Fresh Peach", "1239", "#E4C6AD"),
  s("Sand Pink", "1240", "#E0CABA"),
  s("Persona", "1241", "#C9D0CD"),
  s("Orchid White", "1242", "#EBE2CF"),
  s("White Chocolate", "1243", "#D7CBB7"),
  s("Sesame", "1244", "#E6D9BD"),
  s("Tranquil", "1245", "#C8B8C0"),
  s("Twine Beige", "1246", "#BFA993"),
  s("Chocolate", "1247", "#6E4D44"),
  s("Moon & Stars", "1248", "#B9C2BB"),
  s("Brown Tint", "1249", "#E6D6C1"),
  s("Blushing Peach", "1250", "#E59E93"),
  s("Lime Green", "1251", "#CFC963"),
];

// ---- Premium Exterior Emulsion shades ------------------------------------
const EXTERIOR_SHADES: ColorShade[] = [
  s("White", "3101", "#FBFBF6"),
  s("Off White", "3102", "#EDE6D1"),
  s("Ash White", "3103", "#DCDCD1"),
  s("Magnolia", "3104", "#ECE2C7"),
  s("Sugar Cane", "3105", "#D9CBA7"),
  s("Sand Stone", "3106", "#9C8E75"),
  s("Silver Mist", "3107", "#C8C6B7"),
  s("Tea Rose", "3108", "#BFA89B"),
  s("Goose Wing", "3109", "#8C968F"),
  s("Moorland", "3110", "#7C7057"),
  s("Warm Beige", "3111", "#B49E77"),
  s("Avocado", "3112", "#4C5E36"),
  s("Roof Tile", "3113", "#A23E44"),
  s("Deer Skin", "3114", "#6E5444"),
  s("Solid Brown", "3115", "#5C3E2C"),
  s("Cameo", "3116", "#C99E75"),
  s("Old Line", "3117", "#C7B188"),
  s("Portland", "3118", "#C6C0AD"),
  s("Tile Red", "3119", "#C7372E"),
  s("Autumn Stone", "3120", "#D8C299"),
  s("Warm Blue", "3121", "#2E4A6E"),
  s("Red Oxide", "3122", "#9A3A38"),
  s("Almond", "3123", "#DACDB3"),
  s("Pearl", "3124", "#E4DCC7"),
  s("Sahara Sand", "3125", "#B7B5A3"),
  s("Clay", "3126", "#C0BAA7"),
  s("Charcoal", "3127", "#5E5A51"),
  s("Terracotta", "3128", "#BE6E44"),
  s("Sky Grey", "3129", "#C9C6C1"),
  s("Silk Stone", "3130", "#D8D0BF"),
  s("Golden", "3131", "#C7A869"),
  s("Blue Green", "3132", "#7C9CAE"),
  s("Fresh Lilac", "3133", "#CBC2C8"),
  s("Empress", "3134", "#E6B85E"),
  s("Willow Grey", "3135", "#9AA099"),
  s("Shadow Grey", "3136", "#BCC4C1"),
  s("Peach", "3137", "#E6B487"),
  s("Cool Peach", "3138", "#EBCDB7"),
  s("Spice", "3139", "#D2622C"),
  s("Golden Tinge", "3140", "#E6D2A7"),
  s("Lychee", "3141", "#E2D2BB"),
  s("Fifth Avenue", "3142", "#D5CFC1"),
  s("Choco Malt", "3143", "#D27E4A"),
  s("Southern Alps", "3144", "#9C4E54"),
  s("Cappuccino", "3145", "#A57067"),
  s("Khaki's", "3146", "#B08A3A"),
  s("Gobi Sand", "3147", "#E0B86D"),
  s("Tanzania", "3148", "#7E8C54"),
  s("Kenyan Leaves", "3149", "#3E6E3C"),
  s("Zembezi Rocks", "3150", "#8A9A5D"),
  s("Monterrey", "3151", "#9A7A3C"),
  s("Ivory", "3152", "#E8DBB5"),
  s("Mushroom", "3153", "#DAD2C1"),
  s("Milk Mocha", "3154", "#C2B5A1"),
  s("Brick Stone", "3155", "#9C8275"),
  s("Vistasik Brown", "3156", "#C99A65"),
  s("Cobble Stone", "3157", "#AE9E91"),
  s("Boutique", "3158", "#5E4E40"),
  s("Beige", "3159", "#BCAE96"),
  s("Coffee Candy", "3160", "#E0D2B5"),
];

// ---- Zen Emulsion shades -------------------------------------------------
const ZEN_EMULSION_SHADES: ColorShade[] = [
  s("White", "1701", "#FBFAF6"),
  s("Off White", "1702", "#EFE7CE"),
  s("Ash White", "1703", "#DCDACD"),
  s("Badami", "1704", "#D8CBAD"),
  s("Blush White", "1705", "#E6D0C1"),
  s("Moon Flower", "1706", "#E8C0AD"),
  s("Biscuit", "1707", "#E4D6B5"),
  s("Oriental Spice", "1708", "#C9886A"),
  s("Tea Rose", "1709", "#B8A89D"),
  s("Lilac", "1710", "#CFCDD9"),
  s("Lime Fizz", "1711", "#AEC585"),
  s("Sea Blue", "1712", "#7EBAD4"),
  s("Cameo", "1713", "#D9C29F"),
  s("Terracotta", "1714", "#B06A48"),
  s("Beige", "1738", "#CFC1A3"),
  s("Lavender White", "1739", "#D8D6DB"),
  s("Rose Petal", "1740", "#EAD5C5"),
  s("Peanut Butter", "1741", "#E8DCC1"),
  s("Apple White", "1742", "#DEE0C1"),
  s("Cool Blue", "1743", "#BCD7DE"),
  s("Pearl White", "1744", "#EDE6D1"),
  s("Mansion Gold", "1766", "#C28A52"),
  s("Lacquered Maple", "1767", "#C98A4E"),
  s("Carnival Pink", "1768", "#B06A86"),
  s("Willow Branch", "1769", "#8C9A54"),
  s("Lavender Print", "1770", "#8E88B4"),
  s("Cherry Blossom", "1771", "#E6BEBF"),
  s("Fresh Pasta", "1773", "#DCCF93"),
  s("Goose Wing", "1802", "#AEB6B1"),
  s("Chocolate", "1803", "#6E5246"),
  s("Apple Green", "1804", "#7EBE8E"),
  s("Peel Orange", "1805", "#E29A85"),
  s("KAN Red", "1806", "#C75A6E"),
  s("KAN Pink", "1807", "#C99CB3"),
  s("New Ash White", "1811", "#CDCFC8"),
  s("Sand Stone", "1735", "#BCAE95"),
  s("Cockle Shell", "1736", "#D6CFBC"),
  s("Peach Cream", "1737", "#ECD6BB"),
];

// ---- Shared specifications -----------------------------------------------
const APPLICATION_CONDITIONS = [
  { label: "Temperature", value: "10–35 °C" },
  { label: "Humidity", value: "Less than 80%" },
];

// ---- Product details by product id ---------------------------------------
export const PRODUCT_DETAILS: Record<string, ProductDetails> = {
  "zen-gloss-enamel-n311": {
    overview:
      "Gloss Enamel is a high-quality solvent-based enamel with a brilliant gloss finish, suitable for all types of interior and exterior wood and metal surfaces. Its highly washable surface lets you wipe off common household stains easily, while superior flow and levelling ensure a smooth, uniform finish. Contains no added lead, mercury or chrome.",
    features: [
      {
        title: "Brilliant Gloss",
        description: "A luminous, high-shine finish that brightens every surface.",
      },
      {
        title: "Exceptional Washability",
        description: "Wipe off the most common household stains with ease.",
      },
      {
        title: "Enhanced Durability",
        description: "Excellent endurance for heavy-traffic surfaces.",
      },
      {
        title: "Non-Yellowing",
        description: "Holds its true colour for an extended time span.",
      },
    ],
    recommendedAreas:
      "Heavy-traffic interior and exterior wood and metal surfaces — doors, walls, windows, architraves, grills and gates.",
    specs: [
      { label: "Finish", value: "Brilliant gloss" },
      { label: "Base", value: "Solvent-based" },
      { label: "Drying time", value: "Touch dry 2–3 hours" },
      { label: "Recoat", value: "After 16 hours" },
      { label: "Coverage", value: "12–14 m²/Litre per coat" },
      { label: "Thinner", value: "Mineral Turpentine" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [{ label: "Standard Shades", shades: GLOSS_STANDARD }],
  },

  "zen-gloss-enamel-special-shades-n311": {
    overview:
      "Zen Gloss Enamel in five vivid signal shades — a brilliant, durable, high-gloss solvent-based finish for wood and metal surfaces where bold colour matters. Contains no added lead, mercury or chrome.",
    features: [
      {
        title: "Vivid Signal Shades",
        description: "Bright, eye-catching colours with a brilliant gloss.",
      },
      {
        title: "Exceptional Washability",
        description: "Wipe off the most common household stains with ease.",
      },
      {
        title: "Enhanced Durability",
        description: "Excellent endurance for heavy-traffic surfaces.",
      },
      {
        title: "Non-Yellowing",
        description: "Holds its true colour for an extended time span.",
      },
    ],
    recommendedAreas:
      "Interior and exterior wood and metal surfaces — doors, windows, grills and gates.",
    specs: [
      { label: "Finish", value: "Brilliant gloss" },
      { label: "Base", value: "Solvent-based" },
      { label: "Drying time", value: "Touch dry 2–3 hours" },
      { label: "Recoat", value: "After 16 hours" },
      { label: "Coverage", value: "12–14 m²/Litre per coat" },
      { label: "Thinner", value: "Mineral Turpentine" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [{ label: "Special Signal Shades", shades: GLOSS_SPECIAL }],
  },

  "neo-premium-gloss-metallic-finish-n421": {
    overview:
      "Neo Premium Gloss Metallic Finish adds a striking metallic sheen to wood and metal surfaces. A solvent-based gloss enamel with shimmering pigments for a premium decorative effect on doors, grills, gates and feature surfaces.",
    features: [
      {
        title: "Metallic Sheen",
        description: "Shimmering pigments give a rich, premium decorative look.",
      },
      {
        title: "Brilliant Gloss",
        description: "A luminous, high-shine finish on wood and metal.",
      },
      {
        title: "Enhanced Durability",
        description: "Excellent endurance for decorative and feature surfaces.",
      },
      {
        title: "Non-Yellowing",
        description: "Holds its true colour for an extended time span.",
      },
    ],
    recommendedAreas:
      "Decorative interior and exterior wood and metal surfaces — doors, grills, gates and feature panels.",
    specs: [
      { label: "Finish", value: "Metallic gloss" },
      { label: "Base", value: "Solvent-based" },
      { label: "Drying time", value: "Touch dry 2–3 hours" },
      { label: "Recoat", value: "After 16 hours" },
      { label: "Coverage", value: "12–14 m²/Litre per coat" },
      { label: "Thinner", value: "Mineral Turpentine" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [
      { label: "Metallic Shades", metallic: true, shades: GLOSS_METALLIC },
    ],
  },

  "zen-wall-care-interior-emulsion-n950": {
    overview:
      "Kaizen Wall Care Interior Emulsion is an attractive matt-finish coating that expertly covers surface imperfections in walls and ceilings. An excellent water-based matt finish with great coverage and excellent value for money. Contains no added lead, mercury or chrome.",
    features: [
      {
        title: "Smooth Matt Finish",
        description: "An excellent, even water-based matt finish.",
      },
      {
        title: "Great Coverage",
        description: "Unmatched spreading rate covers a greater area per pack.",
      },
      {
        title: "Excellent Value for Money",
        description: "A cost-effective coating for everyday painting.",
      },
    ],
    recommendedAreas:
      "All interior masonry surfaces including brickwork, plaster, cement and wallboards.",
    specs: [
      { label: "Finish", value: "Smooth matt" },
      { label: "Base", value: "Water-based" },
      { label: "Drying time", value: "2–3 hours between coats" },
      { label: "Coverage", value: "14–16 m²/Litre per coat" },
      { label: "Thinner", value: "Clean water" },
      { label: "Dilution", value: "Roller 25–40%" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [{ label: "Available Shades", shades: WALL_CARE_SHADES }],
  },

  "neo-premium-exterior-emulsion-n925": {
    overview:
      "Kaizen Premium Exterior Emulsion is a 100% acrylic-based emulsion designed to withstand the weathering effects of rainfall, humidity and varying temperatures. Its superior formulation resists dirt build-up and provides enhanced anti-fungal and algae protection for a long-lasting finish on exterior masonry.",
    features: [
      {
        title: "Excellent Weathering Resistance",
        description: "Powerful additives protect against extreme weather.",
      },
      {
        title: "High Colour Retention",
        description: "High-quality pigments keep colours true for longer.",
      },
      {
        title: "Low Dirt Pickup",
        description: "Maintains its original appearance against the elements.",
      },
      {
        title: "Anti-Fungal & Algae Protection",
        description: "Guards against fungus, algae and mildew growth.",
      },
    ],
    recommendedAreas:
      "All exterior masonry surfaces including brickwork, plaster and cement rendering.",
    specs: [
      { label: "Finish", value: "Matt" },
      { label: "Base", value: "100% acrylic, water-based" },
      { label: "Drying time", value: "2–3 hours between coats" },
      { label: "Coverage", value: "16–18 m²/Litre per coat" },
      { label: "Diluent", value: "Clean water" },
      { label: "Dilution", value: "Roller 25–40%" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [{ label: "Available Shades", shades: EXTERIOR_SHADES }],
  },

  "zen-interior-emulsion-n914": {
    overview:
      "Kaizen Zen Emulsion is formulated to give a smooth, beautiful matt finish to interior surfaces, delivering good coverage at an affordable price. Quick and easy to apply, and contains no added lead, mercury or chrome.",
    features: [
      {
        title: "Smooth Matt Finish",
        description: "An excellent, even water-based matt finish.",
      },
      {
        title: "Exemplary Coverage",
        description: "Unmatched spreading rate covers a greater area per pack.",
      },
      {
        title: "Value for Money",
        description: "A cost-effective coating that is easy to apply.",
      },
    ],
    recommendedAreas:
      "All interior masonry surfaces including brickwork, plaster, cement and wallboards.",
    specs: [
      { label: "Finish", value: "Smooth matt" },
      { label: "Base", value: "Water-based" },
      { label: "Drying time", value: "2–3 hours between coats" },
      { label: "Coverage", value: "9–11 m²/kg per coat" },
      { label: "Thinner", value: "Clean water" },
      { label: "Dilution", value: "Roller 25–40%" },
      { label: "No. of coats", value: "2 or more" },
      ...APPLICATION_CONDITIONS,
    ],
    colorGroups: [{ label: "Available Shades", shades: ZEN_EMULSION_SHADES }],
  },
};

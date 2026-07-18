export type CategorySlug =
  | "bakery-biscuits"
  | "premium-cookies"
  | "gluten-free"
  | "healthy-snacks"
  | "gift-packs";

export interface WeightOption {
  label: string;
  grams: number;
  price: number; // INR
  mrp: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: CategorySlug;
  description: string;
  ingredients: string[];
  nutrition: { label: string; per100g: string }[];
  fssai: string;
  veg: boolean;
  glutenFree: boolean;
  weights: WeightOption[];
  rating: number;
  reviewCount: number;
  stock: number;
  bestseller?: boolean;
  isNew?: boolean;
  art: { base: string; accent: string; variant: "round" | "square" | "heart" | "box" | "bar" };
  tags: string[];
}

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  blurb: string;
  emoji: string;
}[] = [
  {
    slug: "bakery-biscuits",
    name: "Bakery Biscuits",
    blurb: "Slow-baked classics from our stone ovens",
    emoji: "🥮",
  },
  {
    slug: "premium-cookies",
    name: "Premium Cookies",
    blurb: "Chunky, buttery, unapologetically indulgent",
    emoji: "🍪",
  },
  {
    slug: "gluten-free",
    name: "Gluten-Free",
    blurb: "Certified gluten-free, full flavour",
    emoji: "🌾",
  },
  {
    slug: "healthy-snacks",
    name: "Healthy Snacks",
    blurb: "Protein-rich bites for active lives",
    emoji: "💪",
  },
  {
    slug: "gift-packs",
    name: "Gift Packs",
    blurb: "Hand-tied hampers for every occasion",
    emoji: "🎁",
  },
];

const NUTRITION_BASE = (
  kcal: number,
  protein: number,
  carbs: number,
  sugar: number,
  fat: number,
): Product["nutrition"] => [
  { label: "Energy", per100g: `${kcal} kcal` },
  { label: "Protein", per100g: `${protein} g` },
  { label: "Carbohydrates", per100g: `${carbs} g` },
  { label: "— of which sugars", per100g: `${sugar} g` },
  { label: "Total Fat", per100g: `${fat} g` },
  { label: "Sodium", per100g: "0.3 g" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "butter-melt-bakery-biscuits",
    name: "Butter Melt Bakery Biscuits",
    tagline: "Our signature slow-baked butter classic",
    category: "bakery-biscuits",
    description:
      "Twice-folded French butter, stone-ground flour and a 14-hour rest give these biscuits their legendary melt. Baked golden every morning in small batches.",
    ingredients: ["Refined wheat flour", "Butter (22%)", "Cane sugar", "Milk solids", "Baking powder", "Sea salt"],
    nutrition: NUTRITION_BASE(498, 7, 62, 20, 24),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "200 g", grams: 200, price: 149, mrp: 179 },
      { label: "400 g", grams: 400, price: 279, mrp: 339 },
      { label: "800 g Family", grams: 800, price: 499, mrp: 619 },
    ],
    rating: 4.8,
    reviewCount: 1284,
    stock: 240,
    bestseller: true,
    art: { base: "#DDA341", accent: "#8A5A36", variant: "round" },
    tags: ["butter", "classic", "tea-time"],
  },
  {
    slug: "jeera-crunch-biscuits",
    name: "Jeera Crunch Biscuits",
    tagline: "Toasted cumin, feather-light crunch",
    category: "bakery-biscuits",
    description:
      "A savoury tea-time staple elevated — hand-toasted cumin folded through short, flaky dough. Pairs beautifully with masala chai.",
    ingredients: ["Refined wheat flour", "Butter", "Cumin seeds (3%)", "Sugar", "Salt", "Yeast"],
    nutrition: NUTRITION_BASE(462, 8, 60, 8, 20),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "200 g", grams: 200, price: 119, mrp: 139 },
      { label: "400 g", grams: 400, price: 219, mrp: 269 },
    ],
    rating: 4.6,
    reviewCount: 861,
    stock: 310,
    art: { base: "#C99A54", accent: "#6B4226", variant: "round" },
    tags: ["savoury", "jeera", "tea-time"],
  },
  {
    slug: "shahi-atta-biscuits",
    name: "Shahi Whole-Wheat Atta Biscuits",
    tagline: "Rustic whole-wheat, royal taste",
    category: "bakery-biscuits",
    description:
      "Stone-milled atta, desi ghee and jaggery — the biscuit your grandmother would approve of, baked to a deep amber crust.",
    ingredients: ["Whole wheat flour", "Desi ghee", "Jaggery", "Milk", "Cardamom", "Baking soda"],
    nutrition: NUTRITION_BASE(455, 9, 64, 18, 18),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "250 g", grams: 250, price: 139, mrp: 169 },
      { label: "500 g", grams: 500, price: 259, mrp: 319 },
    ],
    rating: 4.7,
    reviewCount: 642,
    stock: 180,
    isNew: true,
    art: { base: "#B07B3E", accent: "#54331D", variant: "square" },
    tags: ["atta", "jaggery", "ghee"],
  },
  {
    slug: "triple-chocolate-chunk-cookies",
    name: "Triple Chocolate Chunk Cookies",
    tagline: "Three chocolates. Zero restraint.",
    category: "premium-cookies",
    description:
      "Belgian dark, silky milk and white chocolate chunks in a brown-butter dough with a molten centre. Warm for 8 seconds for peak indulgence.",
    ingredients: ["Wheat flour", "Belgian chocolate (32%)", "Brown butter", "Muscovado sugar", "Free-range eggs", "Vanilla bean", "Sea salt"],
    nutrition: NUTRITION_BASE(524, 6, 58, 32, 28),
    fssai: "Lic. No. 10023456789012",
    veg: false,
    glutenFree: false,
    weights: [
      { label: "Box of 4", grams: 260, price: 349, mrp: 399 },
      { label: "Box of 8", grams: 520, price: 649, mrp: 749 },
      { label: "Box of 12", grams: 780, price: 899, mrp: 1099 },
    ],
    rating: 4.9,
    reviewCount: 2107,
    stock: 96,
    bestseller: true,
    art: { base: "#5C3A21", accent: "#2B1810", variant: "round" },
    tags: ["chocolate", "indulgent", "gifting"],
  },
  {
    slug: "salted-caramel-butter-cookies",
    name: "Salted Caramel Butter Cookies",
    tagline: "Golden caramel with a whisper of salt",
    category: "premium-cookies",
    description:
      "House-made caramel is swirled through cultured-butter dough and finished with Himalayan pink salt for a sweet-savoury finish.",
    ingredients: ["Wheat flour", "Cultured butter", "House caramel (18%)", "Cane sugar", "Cream", "Pink salt"],
    nutrition: NUTRITION_BASE(512, 6, 60, 30, 26),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "Box of 6", grams: 330, price: 449, mrp: 529 },
      { label: "Box of 12", grams: 660, price: 799, mrp: 999 },
    ],
    rating: 4.8,
    reviewCount: 1490,
    stock: 122,
    art: { base: "#D9A247", accent: "#B06B2F", variant: "round" },
    tags: ["caramel", "premium", "gifting"],
  },
  {
    slug: "pistachio-rose-shortbread",
    name: "Pistachio Rose Shortbread",
    tagline: "Persian-inspired, impossibly tender",
    category: "premium-cookies",
    description:
      "Sicilian pistachios and hand-picked rose petals in crumbly shortbread — our most photographed cookie, and our florist's favourite.",
    ingredients: ["Wheat flour", "Butter", "Pistachio (14%)", "Rose petals", "Icing sugar", "Cardamom"],
    nutrition: NUTRITION_BASE(508, 8, 55, 24, 27),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "Box of 6", grams: 300, price: 499, mrp: 599 },
      { label: "Box of 12", grams: 600, price: 899, mrp: 1149 },
    ],
    rating: 4.9,
    reviewCount: 733,
    stock: 64,
    isNew: true,
    art: { base: "#A8B36A", accent: "#C4708A", variant: "heart" },
    tags: ["pistachio", "rose", "luxury"],
  },
  {
    slug: "almond-flour-gf-biscuits",
    name: "Almond Flour Biscuits",
    tagline: "Certified gluten-free, gloriously nutty",
    category: "gluten-free",
    description:
      "Blanched almond flour and a touch of honey create a delicate, naturally gluten-free biscuit baked in our dedicated GF line.",
    ingredients: ["Almond flour (62%)", "Honey", "Butter", "Tapioca starch", "Vanilla", "Salt"],
    nutrition: NUTRITION_BASE(536, 14, 38, 16, 36),
    fssai: "Lic. No. 10023456789013",
    veg: true,
    glutenFree: true,
    weights: [
      { label: "180 g", grams: 180, price: 299, mrp: 349 },
      { label: "360 g", grams: 360, price: 549, mrp: 659 },
    ],
    rating: 4.7,
    reviewCount: 512,
    stock: 88,
    bestseller: true,
    art: { base: "#E3C083", accent: "#8A5A36", variant: "round" },
    tags: ["gluten-free", "almond", "keto-friendly"],
  },
  {
    slug: "ragi-choco-gf-cookies",
    name: "Ragi Choco Chip Cookies",
    tagline: "Millet power meets chocolate joy",
    category: "gluten-free",
    description:
      "Sprouted finger-millet flour, jaggery and dark choco chips — a guilt-light cookie kids and nutritionists agree on.",
    ingredients: ["Sprouted ragi flour (48%)", "Jaggery", "Cold-pressed coconut oil", "Dark choco chips", "Flax seed", "Baking soda"],
    nutrition: NUTRITION_BASE(472, 9, 62, 22, 20),
    fssai: "Lic. No. 10023456789013",
    veg: true,
    glutenFree: true,
    weights: [
      { label: "200 g", grams: 200, price: 249, mrp: 299 },
      { label: "400 g", grams: 400, price: 459, mrp: 559 },
    ],
    rating: 4.6,
    reviewCount: 388,
    stock: 140,
    art: { base: "#7A4B33", accent: "#3E2415", variant: "round" },
    tags: ["gluten-free", "ragi", "kids"],
  },
  {
    slug: "protein-oat-power-bars",
    name: "Protein Oat Power Bars",
    tagline: "12 g protein. Baked, never fried.",
    category: "healthy-snacks",
    description:
      "Rolled oats, whey isolate, dates and almond butter pressed into a chewy baked bar. The gym-bag essential trusted by 40+ fitness studios.",
    ingredients: ["Rolled oats", "Whey protein isolate (20%)", "Dates", "Almond butter", "Chia seeds", "Dark chocolate drizzle"],
    nutrition: NUTRITION_BASE(438, 24, 48, 18, 16),
    fssai: "Lic. No. 10023456789014",
    veg: true,
    glutenFree: true,
    weights: [
      { label: "Pack of 6", grams: 270, price: 399, mrp: 459 },
      { label: "Pack of 12", grams: 540, price: 729, mrp: 899 },
      { label: "Gym Box 24", grams: 1080, price: 1349, mrp: 1699 },
    ],
    rating: 4.7,
    reviewCount: 951,
    stock: 200,
    bestseller: true,
    art: { base: "#9C7A45", accent: "#54331D", variant: "bar" },
    tags: ["protein", "gym", "no-fry"],
  },
  {
    slug: "seed-crunch-multigrain-thins",
    name: "Seed Crunch Multigrain Thins",
    tagline: "Five seeds, seven grains, zero maida",
    category: "healthy-snacks",
    description:
      "Wafer-thin crisps loaded with pumpkin, sunflower, flax, sesame and chia over a seven-grain base. Your cheese board's best friend.",
    ingredients: ["Multigrain flour blend", "Pumpkin seeds", "Sunflower seeds", "Flax", "Sesame", "Chia", "Olive oil", "Sea salt"],
    nutrition: NUTRITION_BASE(452, 13, 54, 6, 19),
    fssai: "Lic. No. 10023456789014",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "150 g", grams: 150, price: 199, mrp: 229 },
      { label: "300 g", grams: 300, price: 369, mrp: 449 },
    ],
    rating: 4.5,
    reviewCount: 427,
    stock: 175,
    art: { base: "#C2A164", accent: "#6B4226", variant: "square" },
    tags: ["multigrain", "seeds", "savoury"],
  },
  {
    slug: "royal-heritage-gift-hamper",
    name: "Royal Heritage Gift Hamper",
    tagline: "Twelve signatures in a keepsake box",
    category: "gift-packs",
    description:
      "Our grandest hamper — twelve signature bakes in a hand-finished walnut-tone keepsake box with gold foiling, ribbon and a personalised note card.",
    ingredients: ["Assortment of 12 signature biscuits & cookies", "See individual sleeves for details"],
    nutrition: NUTRITION_BASE(498, 8, 58, 24, 25),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "Classic (1.2 kg)", grams: 1200, price: 1799, mrp: 2199 },
      { label: "Grand (2 kg)", grams: 2000, price: 2799, mrp: 3499 },
    ],
    rating: 4.9,
    reviewCount: 356,
    stock: 42,
    bestseller: true,
    art: { base: "#8E5B2E", accent: "#DDB25A", variant: "box" },
    tags: ["gifting", "festive", "premium"],
  },
  {
    slug: "festive-mithai-fusion-box",
    name: "Festive Mithai-Fusion Box",
    tagline: "Where mithai meets patisserie",
    category: "gift-packs",
    description:
      "Gulab-jamun filled cookies, kesar-pista shortbread and rose-petal nankhatai in a jewel-toned festive box. Limited seasonal run.",
    ingredients: ["Assorted fusion cookies", "Kesar", "Pistachio", "Rose", "Khoya", "See sleeves for full details"],
    nutrition: NUTRITION_BASE(515, 8, 60, 30, 26),
    fssai: "Lic. No. 10023456789012",
    veg: true,
    glutenFree: false,
    weights: [
      { label: "Box of 9", grams: 540, price: 999, mrp: 1249 },
      { label: "Box of 16", grams: 960, price: 1649, mrp: 1999 },
    ],
    rating: 4.8,
    reviewCount: 289,
    stock: 58,
    isNew: true,
    art: { base: "#A34A3F", accent: "#DDB25A", variant: "box" },
    tags: ["festive", "fusion", "gifting"],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getByCategory = (cat: CategorySlug) =>
  PRODUCTS.filter((p) => p.category === cat);

export const getRelated = (product: Product, n = 4) =>
  PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  )
    .concat(PRODUCTS.filter((p) => p.category !== product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, n);

export const categoryName = (slug: CategorySlug) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

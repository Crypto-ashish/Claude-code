export interface Review {
  name: string;
  city: string;
  rating: number;
  text: string;
  product: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Ananya Sharma",
    city: "Mumbai",
    rating: 5,
    text: "The Triple Chocolate Chunk cookies arrived warm-smelling and vanished in one evening. Honestly the closest thing to a Parisian bakery I've had delivered in India.",
    product: "Triple Chocolate Chunk Cookies",
  },
  {
    name: "Rajdeep Singh",
    city: "Ludhiana",
    rating: 5,
    text: "We stock GoldenCrumb at all three of our cafés now. Customers specifically ask for the Butter Melt biscuits with their cappuccinos. Wholesale team is superb.",
    product: "Butter Melt Bakery Biscuits",
  },
  {
    name: "Dr. Meera Iyer",
    city: "Bengaluru",
    rating: 5,
    text: "As a nutritionist I recommend the Protein Oat bars to clients — clean label, real 12 g protein, and they actually taste like dessert. Rare combination.",
    product: "Protein Oat Power Bars",
  },
  {
    name: "Kabir Malhotra",
    city: "Delhi",
    rating: 4,
    text: "Sent the Royal Heritage Hamper to five clients for Diwali. The gold-foiled box alone made the impression — two of them called just to ask where it was from.",
    product: "Royal Heritage Gift Hamper",
  },
  {
    name: "Sofia D'Souza",
    city: "Goa",
    rating: 5,
    text: "Being celiac, finding biscuits that don't taste 'gluten-free' is a miracle. The almond flour ones are genuinely delicious, not just tolerable.",
    product: "Almond Flour Biscuits",
  },
  {
    name: "Harpreet Kaur",
    city: "Chandigarh",
    rating: 5,
    text: "Ordered Monday, delivered Wednesday, biscuits crisp as if baked that morning. The packaging is so beautiful I've kept the tins.",
    product: "Pistachio Rose Shortbread",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  category: string;
  emoji: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "science-of-the-perfect-crunch",
    title: "The Science of the Perfect Crunch",
    excerpt:
      "Why do our biscuits snap just so? A journey into butter lamination, oven curves and the 14-hour dough rest.",
    date: "2026-06-28",
    readMins: 6,
    category: "Craft",
    emoji: "🔬",
    body: [
      "Every GoldenCrumb biscuit begins its life 14 hours before it meets the oven. That overnight rest lets stone-ground flour hydrate fully, relaxing gluten so the bite shatters instead of shattering your patience.",
      "Our master bakers laminate cultured butter through the dough in two folds — enough for flaky lightness, restrained enough to keep the crumb tight. Then comes the oven curve: a hot 210°C start for lift, easing to 160°C so the centre dries evenly.",
      "The result is what we call the 'clean snap' — a biscuit that breaks with a crisp report, releases its aroma instantly, and melts within four seconds. Yes, we timed it.",
    ],
  },
  {
    slug: "jaggery-vs-refined-sugar",
    title: "Jaggery vs Refined Sugar: What We Choose and Why",
    excerpt:
      "The unrefined story behind our Shahi Atta biscuits, and how traditional sweeteners change flavour, colour and nutrition.",
    date: "2026-06-12",
    readMins: 5,
    category: "Ingredients",
    emoji: "🍯",
    body: [
      "Jaggery is not just 'healthier sugar' — it's a flavour in its own right. Its molasses depth gives our Shahi Atta biscuits their amber crust and toffee finish that white sugar simply cannot replicate.",
      "We source ours from a single co-operative in rural Maharashtra, boiled in small pans the same week it ships to our bakery. Minerals like iron and potassium survive this gentle processing.",
      "Where a recipe needs clean sweetness — our shortbreads, for instance — we still use fine cane sugar. The right sweetener for the right bake: that's the whole philosophy.",
    ],
  },
  {
    slug: "5-minute-cookie-dessert-recipes",
    title: "5 Desserts You Can Build on Our Cookies in 5 Minutes",
    excerpt:
      "From salted-caramel ice-cream sandwiches to a no-bake tiramisu crumble — dinner-party magic with zero baking.",
    date: "2026-05-30",
    readMins: 4,
    category: "Recipes",
    emoji: "🍨",
    body: [
      "1. The 8-Second Melt: microwave a Triple Chocolate Chunk cookie for eight seconds, top with vanilla ice cream and pink salt.",
      "2. Ice-cream sandwiches: two Salted Caramel cookies, one scoop, roll the edges in crushed pistachio. Freeze 10 minutes.",
      "3. Cheat's tiramisu: layer crushed Butter Melt biscuits with coffee-whipped mascarpone. Dust with cocoa. Refrigerate while you eat dinner.",
      "4. Shortbread parfait: alternate Pistachio Rose shortbread crumbs with Greek yogurt and honey.",
      "5. Power-bar 'nice cream' bowl: blend frozen bananas, top with a crumbled Protein Oat bar. Breakfast or dessert — we won't tell.",
    ],
  },
  {
    slug: "inside-our-gluten-free-bakery-line",
    title: "Inside Our Dedicated Gluten-Free Line",
    excerpt:
      "Separate mills, separate ovens, separate air handling — what 'certified gluten-free' actually means at GoldenCrumb.",
    date: "2026-05-14",
    readMins: 7,
    category: "Manufacturing",
    emoji: "🌾",
    body: [
      "Cross-contamination is the silent enemy of gluten-free baking. A biscuit can contain zero wheat ingredients and still carry enough airborne flour to harm a celiac customer.",
      "That's why our GF line lives in a physically separate wing: dedicated mills for almond and ragi flour, dedicated ovens, positive-pressure air handling, and batch testing to below 10 ppm gluten — stricter than the 20 ppm legal threshold.",
      "Every GF batch ships with its test certificate number printed on the sleeve. Scan the QR code and you can read the lab report for the exact batch in your hands.",
    ],
  },
];

export const FAQS: { q: string; a: string; topic: string }[] = [
  {
    topic: "Orders",
    q: "How long does delivery take?",
    a: "Metro cities receive orders in 2–3 working days; the rest of India in 3–6 working days. Every biscuit is baked to order, never warehoused for more than 48 hours.",
  },
  {
    topic: "Orders",
    q: "Can I modify or cancel my order?",
    a: "Orders can be modified or cancelled within 2 hours of placing them — after that our bakers have already started your batch. Reach us on WhatsApp for the fastest help.",
  },
  {
    topic: "Payments",
    q: "Which payment methods do you accept?",
    a: "We accept UPI, all major credit/debit cards, net banking and popular wallets via Razorpay. Cash on Delivery is available on orders up to ₹2,000.",
  },
  {
    topic: "Payments",
    q: "Do you provide GST invoices?",
    a: "Yes — tick 'I need a GST invoice' at checkout and enter your GSTIN. The invoice is emailed instantly and available in your dashboard.",
  },
  {
    topic: "Products",
    q: "Are your gluten-free products safe for celiacs?",
    a: "Yes. Our gluten-free range is baked in a physically separate facility and every batch is lab-tested to below 10 ppm gluten. The batch certificate number is printed on each sleeve.",
  },
  {
    topic: "Products",
    q: "What is the shelf life of your biscuits?",
    a: "3–4 months unopened, thanks to nitrogen-flushed packs. Once opened, enjoy within 10 days — though most packs don't survive 10 minutes.",
  },
  {
    topic: "Wholesale",
    q: "How do I stock GoldenCrumb in my café or store?",
    a: "Register through our Dealer Registration page. Our partnerships team responds within one working day with trade pricing, MOQs and a sample box.",
  },
  {
    topic: "Wholesale",
    q: "Is there a minimum order for bulk purchases?",
    a: "Bulk pricing starts at 50 units per SKU. Corporate gifting programs start at 25 hampers with free personalisation.",
  },
  {
    topic: "Returns",
    q: "What is your return policy?",
    a: "If anything arrives damaged or below our standards, send a photo within 48 hours and we'll replace it free or refund you in full — no returns needed, keep the biscuits.",
  },
];

export interface Coupon {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
}

export const COUPONS: Coupon[] = [
  { code: "WELCOME10", label: "10% off your first order", type: "percent", value: 10, minOrder: 499 },
  { code: "CRUMB150", label: "₹150 off orders above ₹999", type: "flat", value: 150, minOrder: 999 },
  { code: "FESTIVE20", label: "20% off gift packs above ₹1,499", type: "percent", value: 20, minOrder: 1499 },
];

export const STATS = [
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 220000, suffix: "+", label: "Orders Delivered" },
  { value: 40, suffix: "+", label: "Artisan Products" },
  { value: 12, suffix: "", label: "Years of Baking" },
];

export const INSTAGRAM_POSTS = [
  { emoji: "🍪", caption: "Fresh batch, 6 AM", likes: "2.4k" },
  { emoji: "🎁", caption: "Diwali hampers are live", likes: "5.1k" },
  { emoji: "🥛", caption: "Dunk responsibly", likes: "1.8k" },
  { emoji: "👩‍🍳", caption: "Meet our head baker", likes: "3.2k" },
  { emoji: "🌾", caption: "GF line tour", likes: "1.5k" },
  { emoji: "🍫", caption: "Belgian delivery day", likes: "4.7k" },
];

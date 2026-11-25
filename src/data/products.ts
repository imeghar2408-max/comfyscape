import { ProductItem, ProductCategory, SizePriceOption } from '../types/product';
import { PILLOW_PRODUCTS, PILLOW_CATEGORIES } from './pillows';

export { PILLOW_PRODUCTS, PILLOW_CATEGORIES };

export const PRICE_ON_ENQUIRY_LABEL = 'Price on enquiry';

/**
 * Standard Comfyscape mattress sizes and dimensions.
 * Update individual `price` values inside each mattress's `sizePricing` array
 * once actual prices are finalized. Leaving `price: null` displays "Price on enquiry".
 */
export const STANDARD_MATTRESS_DIMENSIONS = {
  Single: '72 × 36 inches',
  Double: '72 × 48 inches',
  Queen: '78 × 60 inches',
  King: '78 × 72 inches',
} as const;

export const SLEEP_CATEGORIES = [
  {
    id: 'bed' as ProductCategory,
    name: 'Beds & Mattresses',
    shortName: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80',
    description: 'Precision ergonomic mattresses crafted for optimal spine alignment and pressure-free sleep.',
  },
  {
    id: 'pillow' as ProductCategory,
    name: 'Pillows',
    shortName: 'Pillows',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
    description: 'Memory foam, latex, contour, microfiber, fiber, and cooling pillows for restorative neck support.',
  },
  {
    id: 'comforter' as ProductCategory,
    name: 'Luxury Comforters',
    shortName: 'Comforters',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80',
    description: 'All-season breathable microfiber comforters and reversible duvets.',
  },
];

export const BENEFIT_FILTERS = [
  'All',
  'Latex Mattress',
  'Orthopedic Mattress',
  'Spring Mattress',
  'Enhanced Sleep Tech',
  'Active Recovery',
  'Value Comfort',
];

export const SERIES_FILTERS = [
  'All',
  'Royale',
  'Pro Spinetech',
  'Springfresh',
  'Nexa Plus',
  'FitRest Plus',
  'Durafirm',
  'Champ',
  'Ortho Pro Latex',
  'Ortho',
  'Utsav Comfort',
];

/**
 * Helper to create a clean per-size pricing array for a mattress.
 * Pass actual prices per size when available; omitted sizes remain `null` ("Price on enquiry").
 */
function createMattressSizePricing(prices?: Partial<Record<'Single' | 'Double' | 'Queen' | 'King', number | null>>): SizePriceOption[] {
  return [
    { size: 'Single', dimensions: STANDARD_MATTRESS_DIMENSIONS.Single, price: prices?.Single ?? null },
    { size: 'Double', dimensions: STANDARD_MATTRESS_DIMENSIONS.Double, price: prices?.Double ?? null },
    { size: 'Queen', dimensions: STANDARD_MATTRESS_DIMENSIONS.Queen, price: prices?.Queen ?? null },
    { size: 'King', dimensions: STANDARD_MATTRESS_DIMENSIONS.King, price: prices?.King ?? null },
  ];
}

/**
 * Mattress products — each mattress stores its own individual per-size pricing in `sizePricing`.
 * Replace `null` with numeric prices (e.g. `Single: 8500, Double: 10500, ...`) when available.
 */
export const MATTRESS_PRODUCTS: ProductItem[] = [
  // 1. Ortho Pro Latex Mattress
  {
    id: 'ortho-pro-latex',
    name: 'Ortho Pro Latex Mattress',
    slug: 'ortho-pro-latex-mattress',
    category: 'bed',
    kicker: 'MEDIUM-FIRM FEEL · NATURAL LATEX',
    series: 'Ortho Pro Latex',
    benefit: 'Latex Mattress',
    feel: 'Medium Firm',
    look: 'Euro Top',
    type: 'Latex',
    thicknessOptions: [5, 6, 8, 10],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Healthy Breathability', iconName: 'breathable' },
      { text: 'Sleep Cooler With Pure Natural Latex', iconName: 'latex' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Crafted with natural latex foam, the Ortho Pro Latex mattress delivers responsive push-back support with climate-regulating pin-cores.',
    density: 'Pin-Core Natural Latex + 35D High Resilience Base',
    coverFabric: '350 GSM Organic Cotton Knitted Jacquard',
    coreMaterial: 'Natural Rubber Latex Core',
    isBestseller: true,
  },

  // 2. Durafirm Classic Mattress
  {
    id: 'durafirm-classic',
    name: 'Durafirm Classic Mattress',
    slug: 'durafirm-classic-mattress',
    category: 'bed',
    kicker: 'FIRM FEEL · ORTHOPEDIC SUPPORT',
    series: 'Durafirm',
    benefit: 'Orthopedic Mattress',
    feel: 'Firm',
    look: 'Tight Top',
    type: 'Foam',
    thicknessOptions: [4, 5, 6, 8],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Comfortable Top Feel', iconName: 'fabric' },
      { text: 'Knitted Fabric with High Resilience', iconName: 'shield' },
    ],
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Durable bonded orthopedic foundation designed to support straight posture and help reduce morning spinal stiffness.',
    density: '85D High-Density Bonded Core',
    coverFabric: 'Heavy Belgian Damask Quilted Cover',
    coreMaterial: 'Thermo-bonded Virgin Orthopedic Foam',
    isBestseller: true,
  },

  // 3. Dual Mattress
  {
    id: 'dual-mattress',
    name: 'Dual Mattress',
    slug: 'dual-mattress',
    category: 'bed',
    kicker: 'DUAL COMFORT · ORTHOPEDIC SUPPORT',
    series: 'Ortho',
    benefit: 'Enhanced Sleep Tech',
    feel: 'Medium Soft',
    look: 'Tight Top',
    type: 'Foam',
    thicknessOptions: [5, 6, 8],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'VPF Technology Core', iconName: 'vpf' },
      { text: 'Pressure-Relieving Ergonomic Support', iconName: 'pressure' },
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Dual-comfort reversible design: firm on one side for spine support, medium soft on the other side for plush relaxation.',
    density: '32D Resilient Soft / 75D Firm Dual Profile',
    coverFabric: 'Breathable Honeycomb Air-Mesh Ticking',
    coreMaterial: 'Variable Pressure Foaming (VPF) Core',
    isBestseller: true,
  },

  // 4. Ortho Genius Grid Mattress
  {
    id: 'ortho-genius-grid',
    name: 'Ortho Genius Grid Mattress',
    slug: 'ortho-genius-grid-mattress',
    category: 'bed',
    kicker: 'MEDIUM FIRM · GENIUS GRID TECH',
    series: 'Nexa Plus',
    benefit: 'Enhanced Sleep Tech',
    feel: 'Medium Firm',
    look: 'Euro Top',
    type: 'Hybrid',
    thicknessOptions: [6, 8, 10, 12],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Breathable Smart Grid Surface', iconName: 'antiMite' },
      { text: 'Balanced Pressure Relief', iconName: 'pressure' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Hyper-elastic gel grid adapts dynamically to your posture while promoting open airflow for cooler sleep.',
    density: 'Smart Gel Grid + 40D Ortho Foam Base',
    coverFabric: 'Cool-Touch Tencel Jacquard Quilting',
    coreMaterial: 'Hyper-Elastic Polymer Smart Grid',
    isBestseller: false,
  },

  // 5. Pro Spinetech Classic Mattress
  {
    id: 'pro-spinetech-classic',
    name: 'Pro Spinetech Classic Mattress',
    slug: 'pro-spinetech-classic-mattress',
    category: 'bed',
    kicker: 'MEDIUM-FIRM FEEL · ACTIVE RECOVERY',
    series: 'Pro Spinetech',
    benefit: 'Active Recovery',
    feel: 'Medium Firm',
    look: 'Euro Top',
    type: 'Latex',
    thicknessOptions: [5, 6, 8, 10],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Comfortable Knitted Fabric', iconName: 'fabric' },
      { text: 'Pure Natural Latex Comfort Layer', iconName: 'latex' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Spine-supporting mattress combining natural latex resilience with a dense orthopedic core for restorative sleep.',
    density: 'Natural Rubber Latex + 80D Ortho Bonded Core',
    coverFabric: 'Antimicrobial Damask Fabric',
    coreMaterial: 'Spinal Alignment Latex & Ortho Core',
    isBestseller: true,
  },

  // 6. Ortho Mattress
  {
    id: 'ortho-mattress',
    name: 'Ortho Mattress',
    slug: 'ortho-mattress',
    category: 'bed',
    kicker: 'MEDIUM-FIRM · ORTHOPEDIC SUPPORT',
    series: 'Ortho',
    benefit: 'Orthopedic Mattress',
    feel: 'Medium Firm',
    look: 'Tight Top',
    type: 'Foam',
    thicknessOptions: [4, 5, 6, 8],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Improved Breathability Channels', iconName: 'breathable' },
      { text: 'Breathable Sleep Airflow', iconName: 'airflow' },
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Direct orthopedic support with aerated channels for continuous airflow throughout the night.',
    density: '32D High Resilience Open Cell Foam',
    coverFabric: 'Breathable Microfiber Stretch Knit',
    coreMaterial: 'Precision Contoured Ortho Foam Core',
    isBestseller: false,
  },

  // 7. Royale Pocket Spring Mattress
  {
    id: 'royale-pocket-spring',
    name: 'Royale Pocket Spring Mattress',
    slug: 'royale-pocket-spring-mattress',
    category: 'bed',
    kicker: 'GENTLE FEEL · POCKET SPRING',
    series: 'Royale',
    benefit: 'Spring Mattress',
    feel: 'Gentle',
    look: 'Euro Top',
    type: 'Spring',
    thicknessOptions: [8, 10, 12],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Individually Encased Pocket Coils', iconName: 'pressure' },
      { text: 'Reduced Partner Motion Transfer', iconName: 'shield' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Individually wrapped pocket springs paired with a plush euro-top layer for responsive cushioning and reduced motion transfer.',
    density: 'Independent Pocket Coils + 35D Foam Encasement',
    coverFabric: 'Soft Knitted Luxury Ticking',
    coreMaterial: 'Independent Pocket Springs + High Loft Foam',
    isBestseller: true,
  },

  // 8. Natural Coconut Coir Spine Mattress
  {
    id: 'natural-coir-spine',
    name: 'Natural Coconut Coir Mattress',
    slug: 'natural-coconut-coir-mattress',
    category: 'bed',
    kicker: 'BREATHABLE COIR · FIRM FEEL',
    series: 'Springfresh',
    benefit: 'Value Comfort',
    feel: 'Firm',
    look: 'Tight Top',
    type: 'Coir',
    thicknessOptions: [4, 5, 6],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Natural Rubberized Coir Mesh', iconName: 'breathable' },
      { text: 'Natural Airflow & Ventilation', iconName: 'airflow' },
    ],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Made from rubberized coconut coir fibers offering natural ventilation, springiness, and firm back support.',
    density: 'High-Density Coir Core + 28D Cushion Layer',
    coverFabric: 'Natural Bamboo Viscose Knitted Cover',
    coreMaterial: 'Rubberized Coir Fiber',
    isBestseller: false,
  },

  // 9. Memory Cloud Rest Mattress
  {
    id: 'memory-cloud-ortho',
    name: 'Memory Cloud Rest Mattress',
    slug: 'memory-cloud-rest-mattress',
    category: 'bed',
    kicker: 'CLOUD CONTOURING · MEDIUM-SOFT FEEL',
    series: 'FitRest Plus',
    benefit: 'Active Recovery',
    feel: 'Medium Soft',
    look: 'Euro Top',
    type: 'Memory',
    thicknessOptions: [6, 8, 10],
    availableSizes: ['Single', 'Double', 'Queen', 'King', 'Custom Size'],
    sizePricing: createMattressSizePricing({
      Single: null,
      Double: null,
      Queen: null,
      King: null,
    }),
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Thermosensitive Memory Foam', iconName: 'pressure' },
      { text: 'Gentle Shoulder & Hip Contouring', iconName: 'latex' },
    ],
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Contouring comfort engineered with temperature-sensitive memory foam that adapts smoothly to your sleeping posture.',
    density: '60D Visco-Elastic Memory Foam over 35D Base',
    coverFabric: 'Soft Breathable Microfiber Cover',
    coreMaterial: 'Gel-Infused Visco-Elastic Memory Foam',
    isBestseller: true,
  },
];

export const COMFORTER_PRODUCTS: ProductItem[] = [
  {
    id: 'all-season-comforter',
    name: 'All-Season Microfiber Comforter',
    slug: 'all-season-microfiber-comforter',
    category: 'comforter',
    kicker: 'MICROFIBER FILL · ALL SEASON WARMTH',
    series: 'Champ',
    benefit: 'Value Comfort',
    feel: 'Gentle',
    look: 'Euro Top',
    type: 'Microfiber',
    materialFilling: '350 GSM Virgin Conjugated Microfiber',
    dimensions: 'Single (60 × 90 in) / King (90 × 100 in)',
    availableSizes: ['Single', 'King'],
    variants: [
      { name: 'Single', dimensions: '60 × 90 inches', price: null },
      { name: 'King', dimensions: '90 × 100 inches', price: null },
    ],
    price: null,
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Soft 350 GSM Virgin Microfiber', iconName: 'fabric' },
      { text: 'Box-Stitched Anti-Shift Filling', iconName: 'shield' },
    ],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Lightweight all-season warmth suitable for AC rooms and mild winters, with box quilting to keep filling evenly distributed.',
    density: '350 GSM Virgin Conjugated Microfiber',
    coverFabric: 'Peach-Finished Microfiber Shell',
    coreMaterial: 'Hypoallergenic Hollow Conjugate Fiber',
    isBestseller: true,
  },
  {
    id: 'dualtone-reversible-comforter',
    name: 'Dual-Tone Reversible Comforter',
    slug: 'dualtone-reversible-comforter',
    category: 'comforter',
    kicker: 'DUAL COLOR · SOFT BRUSHED FABRIC',
    series: 'Utsav Comfort',
    benefit: 'Value Comfort',
    feel: 'Gentle',
    look: 'Tight Top',
    type: 'Microfiber',
    materialFilling: '300 GSM Siliconized Virgin Polyfill',
    dimensions: 'Single (60 × 90 in) / King (90 × 100 in)',
    availableSizes: ['Single', 'King'],
    variants: [
      { name: 'Single', dimensions: '60 × 90 inches', price: null },
      { name: 'King', dimensions: '90 × 100 inches', price: null },
    ],
    price: null,
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Reversible Dual Neutral Palette', iconName: 'fabric' },
      { text: 'Easy-Care Soft Brushed Outer Fabric', iconName: 'shield' },
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Flip between two complementary neutral hues crafted with soft brushed microfiber for everyday bedroom comfort.',
    density: '300 GSM Microfiber Fill',
    coverFabric: 'Brushed Micro-Poly Taffeta',
    coreMaterial: 'Siliconized Virgin Polyfill',
    isBestseller: false,
  },
];

/**
 * Unified catalogue array combining Mattresses, Pillows, and Comforters.
 */
export const PRODUCTS: ProductItem[] = [
  ...MATTRESS_PRODUCTS,
  ...PILLOW_PRODUCTS,
  ...COMFORTER_PRODUCTS,
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): ProductItem[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductDetailPath(product: ProductItem): string {
  if (product.category === 'pillow') {
    return `/pillows/${product.slug}`;
  }
  if (product.category === 'comforter') {
    return `/comforters/${product.slug}`;
  }
  return `/mattresses/${product.slug}`;
}

export function hasAvailablePrice(price: number | null | undefined): price is number {
  return typeof price === 'number' && !Number.isNaN(price) && price > 0;
}

export function formatPrice(price: number | null | undefined): string {
  if (!hasAvailablePrice(price)) {
    return PRICE_ON_ENQUIRY_LABEL;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Returns the lowest available numeric price for a product across its sizePricing,
 * variants, or base price. Returns `null` if no prices have been set yet.
 */
export function getProductDisplayPrice(product: ProductItem): number | null {
  const candidates: number[] = [];

  if (product.sizePricing) {
    for (const option of product.sizePricing) {
      if (hasAvailablePrice(option.price)) {
        candidates.push(option.price);
      }
    }
  }

  if (product.variants) {
    for (const variant of product.variants) {
      if (hasAvailablePrice(variant.price)) {
        candidates.push(variant.price);
      }
    }
  }

  if (hasAvailablePrice(product.price)) {
    candidates.push(product.price);
  }

  if (hasAvailablePrice(product.startingPrice)) {
    candidates.push(product.startingPrice);
  }

  if (candidates.length === 0) {
    return null;
  }

  return Math.min(...candidates);
}

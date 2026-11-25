import { ProductItem, PillowSubCategory } from '../types/product';

/**
 * Supported pillow categories for the Comfyscape Pillow Catalogue.
 * Add products to PILLOW_PRODUCTS below and assign one or more categories
 * from this list — filtering and category tabs update automatically.
 */
export const PILLOW_CATEGORIES: readonly PillowSubCategory[] = [
  'Memory Foam Pillows',
  'Microfiber Pillows',
  'Fiber Pillows',
  'Latex Pillows',
  'Contour Pillows',
  'Cooling Pillows',
];

/**
 * Comfyscape Pillow Catalogue Data.
 *
 * Pricing note:
 * - Set `price: null` (or variant `price: null`) wherever prices are currently unavailable;
 *   the UI automatically displays "Price on enquiry".
 * - When prices become available, replace `null` with a numeric value (e.g. `1499`).
 *
 * Template for adding a new pillow product:
 * {
 *   id: 'unique-pillow-id',
 *   name: 'Product Name',
 *   slug: 'product-name-slug',
 *   category: 'pillow',
 *   pillowCategories: ['Microfiber Pillows'], // Choose from PILLOW_CATEGORIES
 *   kicker: 'CATEGORY · FEEL',
 *   feel: 'Medium Soft',
 *   type: 'Microfiber',
 *   materialFilling: 'Material / filling description',
 *   dimensions: '24 × 16 inches',
 *   availableSizes: ['Standard'],
 *   variants: [
 *     { name: 'Standard', dimensions: '24 × 16 inches', price: null },
 *   ],
 *   price: null,
 *   bullets: [
 *     { text: 'Key feature 1', iconName: 'fabric' },
 *   ],
 *   images: ['/assets/your-pillow-image.jpg'],
 *   description: 'Clear description of the pillow.',
 * }
 */
export const PILLOW_PRODUCTS: ProductItem[] = [
  {
    id: 'ortho-contour-pillow',
    name: 'Ortho Contour Cervical Pillow',
    slug: 'ortho-contour-cervical-pillow',
    category: 'pillow',
    pillowCategories: ['Contour Pillows', 'Memory Foam Pillows'],
    kicker: 'CONTOUR · ERGONOMIC NECK SUPPORT',
    series: 'Ortho',
    feel: 'Medium Firm',
    type: 'Memory',
    materialFilling: 'Molded Therapeutic Memory Foam',
    dimensions: '24 × 16 inches',
    availableSizes: ['Standard', 'Large'],
    variants: [
      {
        name: 'Standard',
        dimensions: '24 × 16 inches',
        price: null,
      },
      {
        name: 'Large',
        dimensions: '27 × 18 inches',
        price: null,
      },
    ],
    price: null,
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Dual-Wave Cervical Spine Cradle', iconName: 'pressure' },
      { text: 'Molded High-Density Memory Foam', iconName: 'shield' },
    ],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629949009765-40fc74c9521b?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Ergonomic contoured pillow designed to support natural cervical alignment and reduce morning neck stiffness.',
    density: '55D High-Density Molded Memory Foam',
    coverFabric: 'Removable Breathable Bamboo Fabric Outer Cover',
    coreMaterial: 'Molded Therapeutic Memory Core',
    isBestseller: true,
  },
  {
    id: 'pure-latex-pillow',
    name: 'Pure Natural Latex Sleeping Pillow',
    slug: 'pure-natural-latex-sleeping-pillow',
    category: 'pillow',
    pillowCategories: ['Latex Pillows'],
    kicker: 'NATURAL LATEX · RESPONSIVE COMFORT',
    series: 'Ortho Pro Latex',
    feel: 'Medium Soft',
    type: 'Latex',
    materialFilling: 'Natural Rubber Latex',
    dimensions: '24 × 16 inches',
    availableSizes: ['Standard', 'King'],
    variants: [
      {
        name: 'Standard',
        dimensions: '24 × 16 inches',
        price: null,
      },
      {
        name: 'King',
        dimensions: '28 × 18 inches',
        price: null,
      },
    ],
    price: null,
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Breathable Pin-Core Airway Grid', iconName: 'breathable' },
      { text: 'Naturally Resilient Latex Support', iconName: 'antiMite' },
    ],
    images: [
      'https://images.unsplash.com/photo-1629949009765-40fc74c9521b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Natural rubber latex pillow with pin-core aeration for resilient, breathable head and neck support.',
    density: 'Natural Rubber Latex',
    coverFabric: 'Organic Cotton Knitted Cover',
    coreMaterial: 'Aerated Natural Latex Pillow Mold',
    isBestseller: false,
  },
  {
    id: 'cool-gel-pillow',
    name: 'Cool Gel Infused Memory Pillow',
    slug: 'cool-gel-infused-memory-pillow',
    category: 'pillow',
    pillowCategories: ['Cooling Pillows', 'Memory Foam Pillows'],
    kicker: 'COOLING · MEMORY FOAM COMFORT',
    series: 'Nexa Plus',
    feel: 'Medium Soft',
    type: 'Memory',
    materialFilling: 'Gel-Infused Visco-Elastic Memory Foam',
    dimensions: '24 × 16 inches',
    availableSizes: ['Standard'],
    variants: [
      {
        name: 'Standard',
        dimensions: '24 × 16 inches',
        price: null,
      },
    ],
    price: null,
    startingPrice: null,
    originalPrice: null,
    bullets: [
      { text: 'Cooling Hydro-Gel Top Layer', iconName: 'airflow' },
      { text: 'Adapts to Head & Neck Contour', iconName: 'pressure' },
    ],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629949009765-40fc74c9521b?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Memory foam pillow infused with cooling gel to help maintain a comfortable sleep surface through the night.',
    density: '60D Visco Foam with Hydro-Gel Inlay',
    coverFabric: 'Cooling Mesh Outer Cover',
    coreMaterial: 'Thermosensitive Gel Memory Foam',
    isBestseller: false,
  },
];

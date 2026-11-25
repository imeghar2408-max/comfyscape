import { ProductItem, PillowCategoryName, ProductImage } from '../types/product';
import memoryFoamPillowImage from '../images/pillow- mem.png';
import contourPillowImage from '../images/Contour Pillow.png';
import latexPillowImage from '../images/latex pillow.png';
import fiberPillowImage from '../images/Fiber Pillow.png';
import microfiberPillowImage from '../images/Microfiber Pillow.png';
import microfiberPillowDetail from '../images/microfiber pillow 2.png';
import coolingPillowImage from '../images/cooling pillow.png';
import coolingPillowDetail from '../images/cooling pillow 2.png';

/**
 * Supported pillow categories for the Comfyscape Pillow Catalogue.
 * The UI automatically hides any category that currently has zero products.
 */
export const PILLOW_CATEGORIES: readonly PillowCategoryName[] = [
  'Memory Foam Pillow',
  'Fiber Pillow',
  'Microfiber Pillow',
  'Latex Pillow',
  'Contour Pillow',
  'Cooling Pillow',
];

/**
 * Creates a local image entry when photography is available, otherwise placeholder slots.
 */
function createPillowImageSlots(
  productName: string,
  image?: string,
  additionalImages: { src: string; label: string }[] = []
): ProductImage[] {
  if (image) {
    return [
      {
        src: image,
        alt: `${productName} — primary view`,
        label: 'Primary View',
      },
      ...additionalImages.map(({ src, label }) => ({
        src,
        alt: `${productName} — ${label.toLowerCase()}`,
        label,
      })),
    ];
  }

  return [
    {
      src: null,
      alt: `${productName} — primary view`,
      label: 'Primary View',
    },
    {
      src: null,
      alt: `${productName} — side profile`,
      label: 'Side Profile',
    },
    {
      src: null,
      alt: `${productName} — fabric detail`,
      label: 'Fabric Detail',
    },
  ];
}

/**
 * Comfyscape Pillow Catalogue Data (Editable Placeholder Entries).
 *
 * How to customize with confirmed Comfyscape inventory:
 * - Edit or remove any entry below to match actual stock.
 * - Replace `price: null` with numeric values (e.g. `1299`) once pricing is confirmed.
 *   Leaving `price: null` displays "Price on enquiry".
 * - Import confirmed local product images from `src/images`.
 * - Only populate `warranty` once officially confirmed.
 */
export const PILLOW_PRODUCTS: ProductItem[] = [
  {
    id: 'memory-foam-pillow',
    slug: 'memory-foam-pillow',
    name: 'Memory Foam Pillow',
    category: 'pillow',
    pillowCategories: ['Memory Foam Pillow'],
    shortDescription:
      'Supportive memory foam pillow shaped for steady head and neck cushioning.',
    description:
      'A classic memory foam sleeping pillow that gently adapts to the shape of the head and neck. Specifications and dimensions below can be customized to match final Comfyscape inventory.',
    images: createPillowImageSlots('Memory Foam Pillow', memoryFoamPillowImage),
    materialType: 'Memory Foam',
    material: 'Molded Visco-Elastic Memory Foam',
    firmness: 'Medium Firm',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
      { name: 'Large', dimensions: '27 × 17 inches', price: null },
    ],
    price: null,
    features: [
      'Visco-elastic memory foam core',
      'Adaptive head and neck support',
      'Removable washable outer cover',
    ],
    coverInfo: 'Breathable knitted fabric outer cover (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'contour-memory-foam-pillow',
    slug: 'contour-memory-foam-pillow',
    name: 'Contour Pillow',
    category: 'pillow',
    pillowCategories: ['Contour Pillow', 'Memory Foam Pillow'],
    shortDescription:
      'Dual-height contoured memory foam pillow shaped for cervical neck support.',
    description:
      'Designed with an ergonomic dual-height wave profile to cradle the natural curve of the neck for back and side sleepers. Editable catalogue entry ready for confirmed product specifications.',
    images: createPillowImageSlots('Contour Pillow', contourPillowImage),
    materialType: 'Memory Foam',
    material: 'Contoured Memory Foam Core',
    firmness: 'Medium Firm',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
      { name: 'Large', dimensions: '27 × 18 inches', price: null },
    ],
    price: null,
    features: [
      'Ergonomic dual-height contour shape',
      'Supports natural neck alignment',
      'Removable outer zip cover',
    ],
    coverInfo: 'Soft knitted removable outer cover (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'latex-pillow',
    slug: 'latex-pillow',
    name: 'Latex Pillow',
    category: 'pillow',
    pillowCategories: ['Latex Pillow'],
    shortDescription:
      'Naturally resilient pin-core latex pillow offering breathable, buoyant support.',
    description:
      'A responsive latex pillow with pin-core aeration holes for airflow and consistent bounce without flattening. Editable catalogue entry ready for confirmed product specifications.',
    images: createPillowImageSlots('Latex Pillow', latexPillowImage),
    materialType: 'Latex',
    material: 'Pin-Core Latex Foam',
    firmness: 'Medium Firm',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
      { name: 'King', dimensions: '28 × 18 inches', price: null },
    ],
    price: null,
    features: [
      'Responsive latex core with steady bounce',
      'Pin-core ventilation for airflow',
      'Breathable fabric outer cover',
    ],
    coverInfo: 'Cotton-blend knitted cover (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'microfiber-pillow',
    slug: 'microfiber-pillow',
    name: 'Microfiber Pillow',
    category: 'pillow',
    pillowCategories: ['Microfiber Pillow'],
    shortDescription:
      'Plush, lightweight microfiber-filled pillow with a soft, cloud-like feel.',
    description:
      'Filled with fine, soft microfiber clusters for gentle cushioning suited to sleepers who prefer a plush, cozy loft. Editable catalogue entry ready for confirmed product specifications.',
    images: createPillowImageSlots('Microfiber Pillow', microfiberPillowImage, [
      { src: microfiberPillowDetail, label: 'Fill Detail' },
    ]),
    materialType: 'Microfiber',
    material: 'Fine Conjugated Microfiber Filling',
    firmness: 'Soft',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
      { name: 'King', dimensions: '28 × 18 inches', price: null },
    ],
    price: null,
    features: [
      'Soft, lightweight microfiber filling',
      'Plush loft for everyday comfort',
      'Smooth cotton-blend outer shell',
    ],
    coverInfo: 'Brushed woven fabric shell (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'fiber-pillow',
    slug: 'fiber-pillow',
    name: 'Fiber Pillow',
    category: 'pillow',
    pillowCategories: ['Fiber Pillow'],
    shortDescription:
      'Everyday hollow-fiber sleeping pillow with easy maintenance and balanced loft.',
    description:
      'A practical, lightweight fiber pillow designed for regular daily use across bedrooms and guest rooms. Editable catalogue entry ready for confirmed product specifications.',
    images: createPillowImageSlots('Fiber Pillow', fiberPillowImage),
    materialType: 'Fiber',
    material: 'Hollow Siliconized Fiber Filling',
    firmness: 'Medium Soft',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
    ],
    price: null,
    features: [
      'Lightweight hollow fiber fill',
      'Balanced medium-soft loft',
      'Easy-care everyday construction',
    ],
    coverInfo: 'Breathable woven outer shell (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'cooling-pillow',
    slug: 'cooling-pillow',
    name: 'Cooling Pillow',
    category: 'pillow',
    pillowCategories: ['Cooling Pillow', 'Memory Foam Pillow'],
    shortDescription:
      'Ventilated gel-infused memory foam pillow designed for a cooler sleep surface.',
    description:
      'Combines contouring memory foam with cooling gel infusion and a breathable outer cover to help reduce heat buildup during sleep. Editable catalogue entry ready for confirmed product specifications.',
    images: createPillowImageSlots('Cooling Pillow', coolingPillowImage, [
      { src: coolingPillowDetail, label: 'Cooling Detail' },
    ]),
    materialType: 'Memory Foam',
    material: 'Gel-Infused Memory Foam',
    firmness: 'Medium Soft',
    dimensions: '24 × 16 inches',
    variants: [
      { name: 'Standard', dimensions: '24 × 16 inches', price: null },
      { name: 'Large', dimensions: '27 × 17 inches', price: null },
    ],
    price: null,
    features: [
      'Gel-infused memory foam core',
      'Ventilated structure for heat dissipation',
      'Cool-touch breathable outer cover',
    ],
    coverInfo: 'Breathable cooling-weave outer cover (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
];

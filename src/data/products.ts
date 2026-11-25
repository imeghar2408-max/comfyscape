import {
  MattressCategoryName,
  MattressSizeOption,
  PillowCategoryName,
  ProductCategory,
  ProductImage,
  ProductItem,
} from '../types/product';
import allSeasonComforterImage from '../images/All-Season Microfiber Comforter.png';
import reversibleComforterImage from '../images/Reversible Microfiber Comforter.png';
import {
  DEFAULT_MATTRESS_DIMENSIONS,
  MATTRESS_CATEGORIES,
  MATTRESS_PRODUCTS,
} from './mattressesCatalogue';
import { PILLOW_CATEGORIES, PILLOW_PRODUCTS } from './pillows';

export {
  DEFAULT_MATTRESS_DIMENSIONS,
  MATTRESS_CATEGORIES,
  MATTRESS_PRODUCTS,
  PILLOW_CATEGORIES,
  PILLOW_PRODUCTS,
};

export const PRICE_ON_ENQUIRY_LABEL = 'Price on enquiry';

/**
 * Top-level sleep categories for Comfyscape.
 */
export const SLEEP_CATEGORIES = [
  {
    id: 'bed' as ProductCategory,
    name: 'Mattresses',
    shortName: 'Mattresses',
    description:
      'Orthopedic, foam, memory foam, latex, spring, hybrid, grid, dual comfort, foldable, diwan, and baby mattresses.',
  },
  {
    id: 'pillow' as ProductCategory,
    name: 'Pillows',
    shortName: 'Pillows',
    description:
      'Memory foam, contour, latex, microfiber, fiber, and cooling pillows.',
  },
  {
    id: 'comforter' as ProductCategory,
    name: 'Comforters',
    shortName: 'Comforters',
    description: 'Breathable microfiber and reversible all-season comforters.',
  },
];

function createComforterImageSlots(
  productName: string,
  image?: string
): ProductImage[] {
  if (image) {
    return [
      {
        src: image,
        alt: `${productName} — primary view`,
        label: 'Primary View',
      },
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
      alt: `${productName} — folded detail`,
      label: 'Folded Detail',
    },
  ];
}

/**
 * Comforter Catalogue Data (Editable Placeholder Entries).
 */
export const COMFORTER_PRODUCTS: ProductItem[] = [
  {
    id: 'all-season-microfiber-comforter',
    slug: 'all-season-microfiber-comforter',
    name: 'All-Season Microfiber Comforter',
    category: 'comforter',
    shortDescription:
      'Lightweight all-season microfiber comforter with box-stitched quilting.',
    description:
      'Designed for year-round comfort in air-conditioned rooms and mild winters, with box quilting to help keep filling evenly distributed. Editable catalogue entry.',
    images: createComforterImageSlots(
      'All-Season Microfiber Comforter',
      allSeasonComforterImage
    ),
    materialType: 'Microfiber',
    material: 'Hollow Conjugated Microfiber Filling',
    firmness: 'Soft',
    dimensions: 'Single (60 × 90 in) / King (90 × 100 in)',
    variants: [
      { name: 'Single', dimensions: '60 × 90 inches', price: null },
      { name: 'King', dimensions: '90 × 100 inches', price: null },
    ],
    price: null,
    features: [
      'Lightweight all-season microfiber fill',
      'Box-stitched anti-shift quilting',
      'Soft brushed outer shell',
    ],
    coverInfo: 'Soft brushed microfiber shell (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
  },
  {
    id: 'reversible-microfiber-comforter',
    slug: 'reversible-microfiber-comforter',
    name: 'Reversible Microfiber Comforter',
    category: 'comforter',
    shortDescription:
      'Dual-tone reversible microfiber comforter crafted for everyday bedroom comfort.',
    description:
      'Flip between two complementary neutral shades with soft brushed microfiber fabric and lightweight polyfill insulation. Editable catalogue entry.',
    images: createComforterImageSlots(
      'Reversible Microfiber Comforter',
      reversibleComforterImage
    ),
    materialType: 'Microfiber',
    material: 'Siliconized Microfiber Fill',
    firmness: 'Soft',
    dimensions: 'Single (60 × 90 in) / King (90 × 100 in)',
    variants: [
      { name: 'Single', dimensions: '60 × 90 inches', price: null },
      { name: 'King', dimensions: '90 × 100 inches', price: null },
    ],
    price: null,
    features: [
      'Dual-tone reversible finish',
      'Lightweight everyday warmth',
      'Easy-care soft outer fabric',
    ],
    coverInfo: 'Brushed microfiber outer fabric (editable placeholder)',
    warranty: null,
    isPlaceholderEntry: true,
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
 * Resolves the price for a specific mattress size + thickness combination.
 * Thickness-specific price (`priceByThickness[thickness]`) takes priority over the
 * flat size price (`sizeOption.price`). Returns `null` if unavailable.
 */
export function getMattressVariantPrice(
  sizeOption?: MattressSizeOption,
  thicknessInches?: number | null
): number | null {
  if (!sizeOption) return null;

  if (
    typeof thicknessInches === 'number' &&
    sizeOption.priceByThickness &&
    thicknessInches in sizeOption.priceByThickness
  ) {
    const thicknessPrice = sizeOption.priceByThickness[thicknessInches];
    if (hasAvailablePrice(thicknessPrice)) {
      return thicknessPrice;
    }
  }

  return hasAvailablePrice(sizeOption.price) ? sizeOption.price : null;
}

/**
 * Returns the lowest available numeric price across all variants/sizes of a product,
 * or `null` if no numeric price has been set yet.
 */
export function getProductDisplayPrice(product: ProductItem): number | null {
  const candidates: number[] = [];

  if (product.sizeOptions) {
    for (const opt of product.sizeOptions) {
      if (hasAvailablePrice(opt.price)) {
        candidates.push(opt.price);
      }
      if (opt.priceByThickness) {
        for (const value of Object.values(opt.priceByThickness)) {
          if (hasAvailablePrice(value)) {
            candidates.push(value);
          }
        }
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

  if (candidates.length === 0) {
    return null;
  }

  return Math.min(...candidates);
}

/**
 * Returns only mattress categories that currently have at least one product.
 * Prevents empty categories from appearing in navigation or filter bars.
 */
export function getAvailableMattressCategories(): {
  name: MattressCategoryName;
  count: number;
}[] {
  return MATTRESS_CATEGORIES.map((name) => ({
    name,
    count: MATTRESS_PRODUCTS.filter((m) => m.mattressCategories?.includes(name)).length,
  })).filter((entry) => entry.count > 0);
}

/**
 * Returns only pillow categories that currently have at least one product.
 */
export function getAvailablePillowCategories(): {
  name: PillowCategoryName;
  count: number;
}[] {
  return PILLOW_CATEGORIES.map((name) => ({
    name,
    count: PILLOW_PRODUCTS.filter((p) => p.pillowCategories?.includes(name)).length,
  })).filter((entry) => entry.count > 0);
}

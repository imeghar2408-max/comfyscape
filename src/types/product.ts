/**
 * Structured product types for the Comfyscape Catalogue.
 * Covers Mattresses (bed), Pillows (pillow), and Comforters (comforter).
 *
 * All pricing fields accept `null` when pricing is unavailable,
 * which causes the UI to display "Price on enquiry".
 */

export type ProductCategory = 'bed' | 'pillow' | 'comforter';

export type ProductFirmness =
  | 'Soft'
  | 'Medium Soft'
  | 'Medium Firm'
  | 'Firm'
  | 'Dual Feel (Medium Soft / Firm)';

export type MattressCategoryName =
  | 'Orthopedic Mattresses'
  | 'Foam Mattresses'
  | 'Memory Foam Mattresses'
  | 'Latex Mattresses'
  | 'Spring & Hybrid Mattresses'
  | 'Grid Mattresses'
  | 'Dual Comfort Mattresses'
  | 'Rebonded Mattresses'
  | 'HR Foam Mattresses'
  | 'Foldable & Diwan Mattresses'
  | 'Baby Mattresses';

export type PillowCategoryName =
  | 'Memory Foam Pillow'
  | 'Fiber Pillow'
  | 'Microfiber Pillow'
  | 'Latex Pillow'
  | 'Contour Pillow'
  | 'Cooling Pillow';

export type MaterialCategory =
  | 'Foam'
  | 'Memory Foam'
  | 'Latex'
  | 'Pocket Spring'
  | 'Hybrid'
  | 'Polymer Grid'
  | 'Rebonded Foam'
  | 'HR Foam'
  | 'Microfiber'
  | 'Fiber';

export interface ProductLayer {
  name: string;
  description: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

/**
 * Configurable size option for mattresses.
 * Supports flat size pricing (`price`) or independent thickness-specific pricing (`priceByThickness`).
 * Leave prices `null` to display "Price on enquiry".
 */
export interface MattressSizeOption {
  size: string; // e.g. "Single", "Double", "Queen", "King", "Diwan Standard", "Crib Standard"
  dimensions: string; // e.g. "72 × 36 inches"
  price: number | null;
  priceByThickness?: Partial<Record<number, number | null>>;
}

/**
 * Optional variant for pillows or comforters (e.g., Standard, Large, King).
 * Leave `price: null` to display "Price on enquiry".
 */
export interface ProductVariant {
  name: string;
  dimensions?: string;
  firmness?: ProductFirmness;
  price: number | null;
}

/**
 * Product image entry.
 * Replace `src` with an actual Comfyscape image path (e.g. "/assets/products/ortho-foam-1.jpg").
 * When `src` is `null` or empty, the UI renders a clean temporary placeholder showing `label`.
 */
export interface ProductImage {
  src: string | null;
  alt: string;
  label: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;

  /**
   * Catalogue classifications used for navigation and filtering.
   */
  mattressCategories?: MattressCategoryName[];
  pillowCategories?: PillowCategoryName[];

  /**
   * Editable descriptions.
   */
  shortDescription: string;
  description: string;

  /**
   * Multiple images per product (real image paths or clean temporary placeholders).
   */
  images: ProductImage[];

  /**
   * Core material classification (used for filtering) and descriptive material info.
   */
  materialType: MaterialCategory;
  material: string;

  /**
   * Optional layer-by-layer construction breakdown (rendered only when populated).
   */
  layers?: ProductLayer[];

  firmness?: ProductFirmness;
  thicknessOptions?: number[]; // in inches, e.g. [5, 6, 8]

  /**
   * Mattress size options with dimensions and variant-specific pricing.
   */
  sizeOptions?: MattressSizeOption[];

  /**
   * Pillow/comforter dimensions and optional variants.
   */
  dimensions?: string;
  variants?: ProductVariant[];

  /**
   * Base / fallback price (null = "Price on enquiry").
   */
  price?: number | null;

  /**
   * 2–3 concise, factual product features shown on cards and product pages.
   */
  features: string[];

  /**
   * Outer cover / fabric information (if known).
   */
  coverInfo?: string;

  /**
   * Warranty information — leave `null` unless officially verified.
   */
  warranty?: string | null;

  /**
   * Additional product specifications (rendered only when populated).
   */
  additionalSpecs?: ProductSpecification[];

  /**
   * Marks placeholder catalogue entries that are meant to be updated with confirmed inventory details.
   */
  isPlaceholderEntry?: boolean;
}

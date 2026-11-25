/**
 * Structured product types for Comfyscape Catalogue
 * Covering Mattresses (bed), Pillows (pillow), and Comforters (comforter)
 */

export type ProductCategory = 'bed' | 'pillow' | 'comforter';

export type ProductFeel = 'Firm' | 'Medium Firm' | 'Medium Soft' | 'Gentle';
export type ProductLook = 'Tight Top' | 'Euro Top';
export type ProductType =
  | 'Foam'
  | 'Spring'
  | 'Coir'
  | 'Latex'
  | 'Memory'
  | 'Hybrid'
  | 'Microfiber'
  | 'Fiber';

export type MattressSizeKey = 'Single' | 'Double' | 'Queen' | 'King';

export type PillowSubCategory =
  | 'Memory Foam Pillows'
  | 'Microfiber Pillows'
  | 'Fiber Pillows'
  | 'Latex Pillows'
  | 'Contour Pillows'
  | 'Cooling Pillows';

export interface ProductBullet {
  text: string;
  iconName: 'breathable' | 'latex' | 'pressure' | 'fabric' | 'antiMite' | 'vpf' | 'airflow' | 'shield';
}

/**
 * Per-size pricing option for mattresses.
 * Set `price` to a number when available, or `null` to display "Price on enquiry".
 */
export interface SizePriceOption {
  size: MattressSizeKey;
  dimensions: string; // e.g. "72 × 36 inches"
  price: number | null;
  originalPrice?: number | null;
}

/**
 * Optional variant for pillows or comforters (e.g., Standard, Large, King, or loft variants).
 * Set `price` to a number when available, or `null` to display "Price on enquiry".
 */
export interface ProductVariant {
  name: string;
  dimensions?: string;
  feel?: ProductFeel;
  price: number | null;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  kicker?: string;
  series?: string;
  benefit?: string;
  feel?: ProductFeel;
  look?: ProductLook;
  type: ProductType;
  thicknessOptions?: number[]; // e.g. [5, 6, 8, 10] for mattresses
  availableSizes: string[]; // e.g. ["Single", "Double", "Queen", "King"]
  /**
   * Individual size-based pricing for mattresses.
   * Each standard size (Single, Double, Queen, King) holds its own price.
   */
  sizePricing?: SizePriceOption[];
  /**
   * Pillow-specific metadata
   */
  pillowCategories?: PillowSubCategory[];
  materialFilling?: string;
  dimensions?: string;
  variants?: ProductVariant[];
  /**
   * Base / fallback price (null = "Price on enquiry")
   */
  price?: number | null;
  startingPrice?: number | null;
  originalPrice?: number | null;
  discountText?: string;
  discountBadgeType?: 'percent' | 'flat';
  warrantyYears?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  bullets: ProductBullet[];
  images: string[];
  description: string;
  density?: string;
  coverFabric?: string;
  coreMaterial?: string;
  isBestseller?: boolean;
}

export interface ActiveFilters {
  category: ProductCategory;
  benefit: string;
  series: string;
  pillowCategory: string;
  feel: string;
  look: string;
  size: string;
  thickness: string;
  type: string;
  warranty: string;
  searchQuery: string;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'name';
}

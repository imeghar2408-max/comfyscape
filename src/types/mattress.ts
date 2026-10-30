/**
 * Mattress data types and interfaces for Comfyscape Catalogue
 */

export type MattressCategory = 
  | 'all'
  | 'foam'
  | 'rebonded'
  | 'coir'
  | 'memory-foam'
  | 'hybrid';

export interface MattressSizeOption {
  name: string; // e.g. "Single", "Queen", "King"
  dimensionsInches: string; // e.g. "72\" x 36\""
  dimensionsCm: string; // e.g. "183 x 91 cm"
  recommendedFor: string;
}

export interface MattressThicknessOption {
  thicknessInches: number; // e.g. 5, 6, 8, 10
  description: string; // e.g. "Optimal standard comfort"
}

export interface MattressSpec {
  label: string;
  value: string;
}

export interface Mattress {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'foam' | 'rebonded' | 'coir' | 'memory-foam' | 'hybrid';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  currency: string;
  images: string[];
  firmness: 'Plush (Soft)' | 'Medium Soft' | 'Medium Firm' | 'Firm' | 'Extra Firm';
  firmnessScore: number; // 1 to 10
  material: string;
  quality: string;
  density: string; // e.g. "32D High Resilience Foam" or "85D Heavy Density Rebonded"
  coverFabric: string;
  warrantyYears: number;
  availableThicknesses: MattressThicknessOption[];
  availableSizes: MattressSizeOption[];
  keyFeatures: string[];
  specifications: MattressSpec[];
  idealFor: string[];
  featured: boolean;
  bestseller?: boolean;
}

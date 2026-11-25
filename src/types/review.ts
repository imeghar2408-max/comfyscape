/**
 * Types for the Comfyscape customer review system.
 * Structured for straightforward migration from local storage to a backend API.
 */

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // Integer from 1 to 5
  comment: string;
  createdAt: string; // ISO 8601 timestamp
}

export interface CreateReviewInput {
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
}

export interface ProductReviewSummary {
  averageRating: number;
  totalReviews: number;
}

export type ReviewSortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

import {
  CreateReviewInput,
  ProductReview,
  ProductReviewSummary,
  ReviewSortOption,
} from '../types/review';

/**
 * Storage key for temporary client-side review persistence.
 * Starts completely empty — no seeded or sample reviews are ever injected.
 */
const REVIEWS_STORAGE_KEY = 'comfyscape_product_reviews_v1';

/**
 * Repository contract so this local prototype adapter can be replaced
 * with a real backend API / database without modifying UI components.
 */
export interface ReviewRepository {
  getReviewsByProduct(productId: string): ProductReview[];
  addReview(input: CreateReviewInput): ProductReview;
  getSummary(productId: string): ProductReviewSummary | null;
}

function readAllStoredReviews(): ProductReview[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is ProductReview =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.productId === 'string' &&
        typeof item.authorName === 'string' &&
        typeof item.rating === 'number' &&
        item.rating >= 1 &&
        item.rating <= 5 &&
        typeof item.comment === 'string' &&
        typeof item.createdAt === 'string'
    );
  } catch {
    return [];
  }
}

function writeAllStoredReviews(reviews: ProductReview[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Ignore storage quota / privacy mode errors gracefully
  }
}

function generateReviewId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `rev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Temporary local browser persistence adapter.
 *
 * Limitation: Reviews submitted here are stored only in the current user's browser
 * (localStorage) and are not synchronized across devices or verified against purchases.
 * Replace this implementation with backend API calls when a database is connected.
 */
export const reviewService: ReviewRepository = {
  getReviewsByProduct(productId: string): ProductReview[] {
    return readAllStoredReviews().filter((review) => review.productId === productId);
  },

  addReview(input: CreateReviewInput): ProductReview {
    const authorName = input.authorName.trim();
    const comment = input.comment.trim();
    const rating = Math.round(input.rating);

    if (!authorName) {
      throw new Error('Please enter your name.');
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      throw new Error('Please select a rating between 1 and 5 stars.');
    }
    if (!comment) {
      throw new Error('Please write your review before submitting.');
    }

    const newReview: ProductReview = {
      id: generateReviewId(),
      productId: input.productId,
      authorName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    const existing = readAllStoredReviews();
    writeAllStoredReviews([newReview, ...existing]);
    return newReview;
  },

  getSummary(productId: string): ProductReviewSummary | null {
    const reviews = this.getReviewsByProduct(productId);
    if (reviews.length === 0) return null;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: Number((sum / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
    };
  },
};

export function sortReviews(
  reviews: ProductReview[],
  sortBy: ReviewSortOption
): ProductReview[] {
  const copy = [...reviews];
  switch (sortBy) {
    case 'oldest':
      return copy.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case 'highest':
      return copy.sort(
        (a, b) =>
          b.rating - a.rating ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'lowest':
      return copy.sort(
        (a, b) =>
          a.rating - b.rating ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'newest':
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

import React, { useEffect, useMemo, useState } from 'react';
import { Star, MessageSquareText, Info, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../../types/product';
import { ProductReview, ReviewSortOption } from '../../types/review';
import {
  formatReviewDate,
  reviewService,
  sortReviews,
} from '../../services/reviewService';

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
  category: ProductCategory;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productName,
  category,
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [sortBy, setSortBy] = useState<ReviewSortOption>('newest');

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // Load actual stored reviews for this product (starts empty)
  useEffect(() => {
    setReviews(reviewService.getReviewsByProduct(productId));
    setAuthorName('');
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setErrorMessage(null);
    setSubmittedNotice(false);
  }, [productId]);

  const sortedReviews = useMemo(
    () => sortReviews(reviews, sortBy),
    [reviews, sortBy]
  );

  const summary = useMemo(() => {
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
    return {
      averageRating: Number((sum / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
    };
  }, [reviews]);

  const itemNoun =
    category === 'bed' ? 'mattress' : category === 'pillow' ? 'pillow' : 'comforter';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmittedNotice(false);

    const trimmedName = authorName.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your name before submitting a review.');
      return;
    }
    if (trimmedName.length < 2) {
      setErrorMessage('Please enter at least 2 characters for your name.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setErrorMessage('Please select a star rating from 1 to 5.');
      return;
    }
    if (!trimmedComment) {
      setErrorMessage('Please write your review before submitting.');
      return;
    }
    if (trimmedComment.length < 10) {
      setErrorMessage('Please write at least 10 characters in your review.');
      return;
    }

    try {
      const created = reviewService.addReview({
        productId,
        authorName: trimmedName,
        rating,
        comment: trimmedComment,
      });

      setReviews((prev) => [created, ...prev]);
      setAuthorName('');
      setRating(0);
      setHoveredRating(0);
      setComment('');
      setSubmittedNotice(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to save review. Please try again.'
      );
    }
  };

  const renderStaticStars = (value: number, sizeClass = 'w-4 h-4') => (
    <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.round(value)
              ? 'text-amber-500 fill-amber-500'
              : 'text-slate-300'
          }`}
        />
      ))}
    </div>
  );

  const activeStarPreview = hoveredRating || rating;

  return (
    <section
      id="customer-reviews"
      aria-labelledby="reviews-heading"
      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8"
    >
      {/* Header & Rating Summary (only displayed when actual reviews exist) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-1">
            Customer Feedback
          </span>
          <h2
            id="reviews-heading"
            className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
          >
            Customer Reviews
          </h2>
        </div>

        {summary && (
          <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#EAE3D8] rounded-xl px-4 py-3">
            <div className="text-center pr-3 border-r border-[#EAE3D8]">
              <span className="block text-2xl font-bold text-[#0B2F57] leading-none">
                {summary.averageRating.toFixed(1)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                out of 5
              </span>
            </div>
            <div>
              {renderStaticStars(summary.averageRating, 'w-4 h-4')}
              <span className="block text-xs text-slate-600 mt-1">
                Based on {summary.totalReviews}{' '}
                {summary.totalReviews === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Layout: Review List + Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Reviews List or Clean Empty State */}
        <div className="lg:col-span-7 space-y-5">
          {sortedReviews.length === 0 ? (
            <div className="bg-[#FAF8F5] border border-[#EAE3D8] rounded-xl p-8 text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE3D8] flex items-center justify-center mx-auto text-[#8C7456]">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1F1C18]">
                Be the first to review this {itemNoun}.
              </h3>
              <p className="text-xs sm:text-sm text-[#665F55] max-w-md mx-auto leading-relaxed">
                No customer reviews have been submitted for the {productName} yet. Share your
                experience using the review form.
              </p>
            </div>
          ) : (
            <>
              {/* Sort control */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700">
                  Showing {sortedReviews.length}{' '}
                  {sortedReviews.length === 1 ? 'review' : 'reviews'}
                </span>

                {sortedReviews.length > 1 && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <label htmlFor="review-sort" className="font-medium">
                      Sort by:
                    </label>
                    <select
                      id="review-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as ReviewSortOption)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rated</option>
                      <option value="lowest">Lowest Rated</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Actual submitted reviews */}
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <article
                    key={review.id}
                    className="p-5 rounded-xl border border-slate-200 bg-[#FAF8F5]/60 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="block text-sm font-bold text-slate-900">
                          {review.authorName}
                        </span>
                        <div className="mt-1 flex items-center gap-2">
                          {renderStaticStars(review.rating, 'w-3.5 h-3.5')}
                          <span className="text-[11px] font-medium text-slate-500">
                            {RATING_LABELS[review.rating]}
                          </span>
                        </div>
                      </div>
                      <time
                        dateTime={review.createdAt}
                        className="text-[11px] text-slate-500 shrink-0"
                      >
                        {formatReviewDate(review.createdAt)}
                      </time>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Write a Review Form */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#EAE3D8] rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
              Write a Review
            </h3>
            <p className="text-xs text-[#665F55] mt-0.5">
              Share your honest feedback on the {productName}.
            </p>
          </div>

          {submittedNotice && (
            <div
              role="status"
              className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg p-3"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>Thank you! Your review has been added.</span>
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg p-3"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Star Rating Input */}
            <div>
              <span className="block text-xs font-semibold text-slate-800 mb-1.5">
                Your Rating <span className="text-rose-600">*</span>
              </span>
              <div
                className="flex items-center gap-1"
                role="radiogroup"
                aria-label="Select star rating from 1 to 5"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= activeStarPreview;
                  return (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} ${star === 1 ? 'star' : 'stars'} — ${RATING_LABELS[star]}`}
                      onClick={() => {
                        setRating(star);
                        setErrorMessage(null);
                      }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          isFilled
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300 hover:text-amber-400'
                        }`}
                      />
                    </button>
                  );
                })}
                {activeStarPreview > 0 && (
                  <span className="ml-2 text-xs font-medium text-slate-600">
                    {activeStarPreview}/5 · {RATING_LABELS[activeStarPreview]}
                  </span>
                )}
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label
                htmlFor="review-author-name"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Your Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="review-author-name"
                type="text"
                required
                maxLength={80}
                value={authorName}
                onChange={(e) => {
                  setAuthorName(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter your display name"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              />
            </div>

            {/* Review Text */}
            <div>
              <label
                htmlFor="review-comment"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Your Review <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                required
                maxLength={1000}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={`What did you think about the comfort, support, or quality of this ${itemNoun}?`}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B2F57] hover:bg-[#133F72] text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-colors shadow-xs"
            >
              Submit Review
            </button>

            <p className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Note: In this catalogue version, submitted reviews are saved locally in your
                browser and are not shared across devices until backend storage is connected.
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

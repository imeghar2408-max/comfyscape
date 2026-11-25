import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Wind, Droplets, Shield, Layers, ArrowRight } from 'lucide-react';
import { ProductItem, ProductBullet } from '../../types/product';
import {
  formatPrice,
  getProductDetailPath,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../../data/products';
import { MattressEnquiryLink } from '../common/MattressEnquiryLink';

interface ProductCardProps {
  product: ProductItem;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  /**
   * Optional legacy callback. By default clicking the card or CTA navigates directly
   * to the product's detail page.
   */
  onSelectSize?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const detailPath = getProductDetailPath(product);
  const displayPrice = getProductDisplayPrice(product);
  const showDiscount =
    hasAvailablePrice(displayPrice) &&
    hasAvailablePrice(product.originalPrice) &&
    Boolean(product.discountText);

  const renderBulletIcon = (iconName: ProductBullet['iconName']) => {
    switch (iconName) {
      case 'breathable':
      case 'airflow':
        return <Wind className="w-3.5 h-3.5 text-slate-500" />;
      case 'latex':
        return <Droplets className="w-3.5 h-3.5 text-purple-600" />;
      case 'pressure':
      case 'vpf':
        return <Layers className="w-3.5 h-3.5 text-indigo-500" />;
      case 'antiMite':
      case 'shield':
      case 'fabric':
      default:
        return <Shield className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  // Quiet unboxed metadata line for pillows/comforters or mattresses
  const kickerText =
    product.kicker ||
    [
      product.category === 'pillow' && product.pillowCategories?.[0]
        ? product.pillowCategories[0]
        : product.series,
      product.feel,
    ]
      .filter(Boolean)
      .join(' · ');

  return (
    <article className="group bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* 1. Image container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-slate-100 overflow-hidden">
        {showDiscount && product.discountText && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-sm shadow-xs ${
                product.discountBadgeType === 'flat'
                  ? 'bg-[#6A0DAD] text-white'
                  : 'bg-[#7B2CBF] text-white'
              }`}
            >
              {product.discountText}
            </span>
          </div>
        )}

        {/* Wishlist Heart on Top-Right */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-xs shadow-xs border border-slate-200 ${
              isWishlisted
                ? 'text-rose-500 fill-rose-500'
                : 'text-slate-500 hover:text-rose-500 hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        )}

        <Link to={detailPath} className="block w-full h-full focus:outline-none">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* 2. Card Content Body (clickable to product detail page) */}
      <Link
        to={detailPath}
        className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 focus:outline-none"
      >
        <div>
          {/* Top Kicker */}
          {kickerText && (
            <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase truncate mb-1">
              {kickerText}
            </div>
          )}

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0066B2] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Unboxed quick specification summary */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-1.5">
            {product.category === 'pillow' ? (
              <>
                {product.materialFilling && (
                  <span className="truncate max-w-full">{product.materialFilling}</span>
                )}
                {product.dimensions && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.dimensions}</span>
                  </>
                )}
              </>
            ) : (
              <>
                {product.feel && <span>{product.feel}</span>}
                {product.look && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.look}</span>
                  </>
                )}
                {product.type && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.type}</span>
                  </>
                )}
              </>
            )}
          </div>

          {/* Two bullet features */}
          {product.bullets.length > 0 && (
            <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-100">
              {product.bullets.slice(0, 2).map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {renderBulletIcon(bullet.iconName)}
                  </span>
                  <span className="truncate">{bullet.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Row */}
        <div className="pt-2">
          {hasAvailablePrice(displayPrice) ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {product.category === 'bed' ? `From ${formatPrice(displayPrice)}` : formatPrice(displayPrice)}
              </span>
              {hasAvailablePrice(product.originalPrice) && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {showDiscount && product.discountText && (
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {product.discountText}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className="text-base sm:text-lg font-bold text-[#0B2F57] tracking-tight">
                {formatPrice(null)}
              </span>
              {product.category === 'bed' && (
                <span className="text-[11px] text-slate-500">4 sizes available</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* 3. Full-Width Solid Blue Action Button navigating directly to Product Detail Page */}
      <Link
        to={detailPath}
        className={`w-full bg-[#0071C1] hover:bg-[#005B9C] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 transition-colors duration-150 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071C1] ${
          product.category === 'bed' ? '' : 'rounded-b-xl'
        }`}
      >
        <span>{product.category === 'bed' ? 'SELECT SIZE & VIEW DETAILS' : 'VIEW DETAILS'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* 4. Subtle contextual WhatsApp enquiry link under every mattress card */}
      {product.category === 'bed' && (
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-slate-100 text-center">
          <MattressEnquiryLink productName={product.name} />
        </div>
      )}
    </article>
  );
};

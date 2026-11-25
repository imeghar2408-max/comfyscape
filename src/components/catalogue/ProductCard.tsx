import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { ProductItem } from '../../types/product';
import {
  formatPrice,
  getMattressVariantPrice,
  getProductDetailPath,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../../data/products';
import { ProductImageDisplay } from '../common/ProductImageDisplay';
import { MattressEnquiryLink } from '../common/MattressEnquiryLink';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const detailPath = getProductDetailPath(product);
  const isMattress = product.category === 'bed';

  // Default selected size for mattresses (prefer Queen if available, else first size)
  const sizeOptions = product.sizeOptions ?? [];
  const defaultSize =
    sizeOptions.find((s) => s.size === 'Queen')?.size || sizeOptions[0]?.size || '';

  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  const activeSizeOption = isMattress
    ? sizeOptions.find((s) => s.size === selectedSize) || sizeOptions[0]
    : undefined;

  const defaultThickness =
    isMattress && product.thicknessOptions && product.thicknessOptions.length > 0
      ? product.thicknessOptions.includes(6)
        ? 6
        : product.thicknessOptions[0]
      : null;

  const activeVariant =
    !isMattress && product.variants && product.variants.length > 0
      ? product.variants[0]
      : undefined;

  const displayPrice = isMattress
    ? getMattressVariantPrice(activeSizeOption, defaultThickness)
    : getProductDisplayPrice(product);

  const thicknessSummary =
    isMattress && product.thicknessOptions && product.thicknessOptions.length > 0
      ? product.thicknessOptions.length === 1
        ? `${product.thicknessOptions[0]}"`
        : `${Math.min(...product.thicknessOptions)}" – ${Math.max(...product.thicknessOptions)}"`
      : null;

  const primaryCategoryLabel = isMattress
    ? product.mattressCategories?.[0]
    : product.category === 'pillow'
      ? product.pillowCategories?.[0]
      : 'Comforter';

  return (
    <article className="group bg-white rounded-xl border border-[#E6DFD4] hover:border-[#CFC3B2] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* 1. Product Image — visual focus, zero promotional clutter */}
      <Link
        to={detailPath}
        className="block relative aspect-[4/3] bg-[#F4EFEA] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57]"
      >
        <ProductImageDisplay
          image={product.images[0]}
          productName={product.name}
          category={product.category}
          variant="card"
          className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      </Link>

      {/* 2. Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category & quick specs line */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] font-medium text-[#7A7369]">
            {primaryCategoryLabel && (
              <span className="uppercase tracking-wider font-semibold text-[#8C7456]">
                {primaryCategoryLabel}
              </span>
            )}
            {product.firmness && (
              <>
                <span aria-hidden="true">·</span>
                <span>{product.firmness}</span>
              </>
            )}
            {thicknessSummary && (
              <>
                <span aria-hidden="true">·</span>
                <span>{thicknessSummary} thick</span>
              </>
            )}
          </div>

          {/* Simple Descriptive Product Name */}
          <Link
            to={detailPath}
            className="block focus:outline-none focus-visible:underline"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1C18] group-hover:text-[#0B2F57] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#5A534B] leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* 2–3 Factual Product Features */}
          {product.features.length > 0 && (
            <ul className="pt-2.5 border-t border-[#F1ECE4] space-y-1.5">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#4A453F]"
                >
                  <Check className="w-3.5 h-3.5 text-[#8C7456] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Details: Compact Size Selector (Mattresses) + Price */}
        <div className="space-y-3 pt-2 border-t border-[#F1ECE4]">
          {isMattress && sizeOptions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#7A7369]">
                <span className="font-semibold uppercase tracking-wider">Size</span>
                {activeSizeOption && <span>{activeSizeOption.dimensions}</span>}
              </div>
              <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Select size for ${product.name}`}>
                {sizeOptions.map((opt) => {
                  const isSelected = activeSizeOption?.size === opt.size;
                  return (
                    <button
                      key={opt.size}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSize(opt.size)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
                        isSelected
                          ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                          : 'bg-[#FAF8F5] text-[#4A453F] border-[#E0D7CB] hover:border-[#8C7456]'
                      }`}
                    >
                      {opt.size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!isMattress && product.dimensions && (
            <div className="text-[11px] text-[#7A7369]">
              <span className="font-semibold text-[#4A453F]">Dimensions:</span>{' '}
              {product.dimensions}
            </div>
          )}

          {/* Price or "Price on enquiry" */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-base sm:text-lg font-bold text-[#0B2F57] tracking-tight">
              {hasAvailablePrice(displayPrice)
                ? formatPrice(displayPrice)
                : formatPrice(null)}
            </span>
            {isMattress && activeSizeOption && (
              <span className="text-[11px] text-[#7A7369]">
                {activeSizeOption.size}
                {defaultThickness ? ` · ${defaultThickness}"` : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Primary View Details CTA */}
      <Link
        to={detailPath}
        className="w-full bg-[#0B2F57] hover:bg-[#133F72] text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-4 transition-colors duration-150 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57]"
      >
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* 4. Subtle contextual WhatsApp enquiry link */}
      <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-[#EAE3D8] text-center">
        <MattressEnquiryLink
          productName={product.name}
          sizeLabel={isMattress ? activeSizeOption?.size : undefined}
          variantName={!isMattress ? activeVariant?.name : undefined}
          dimensions={
            isMattress
              ? activeSizeOption?.dimensions
              : activeVariant?.dimensions || product.dimensions
          }
          thicknessInches={isMattress ? defaultThickness : null}
          price={displayPrice}
        />
      </div>
    </article>
  );
};

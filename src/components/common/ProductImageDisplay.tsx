import React, { useState } from 'react';
import { BedDouble, Cloud, Layers, Image as ImageIcon } from 'lucide-react';
import { ProductCategory, ProductImage } from '../../types/product';

interface ProductImageDisplayProps {
  image?: ProductImage;
  productName: string;
  category: ProductCategory;
  variant?: 'card' | 'hero' | 'thumbnail';
  className?: string;
}

/**
 * Renders an actual product image when `image.src` is configured,
 * or a clean, clearly marked temporary placeholder until Comfyscape
 * product photography is added.
 */
export const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({
  image,
  productName,
  category,
  variant = 'card',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  const hasValidImage = Boolean(image?.src && image.src.trim().length > 0 && !hasError);

  if (hasValidImage && image?.src) {
    return (
      <img
        src={image.src}
        alt={image.alt || productName}
        loading={variant === 'hero' ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center ${className}`}
      />
    );
  }

  const renderCategoryIcon = (sizeClass: string) => {
    switch (category) {
      case 'pillow':
        return <Cloud className={`${sizeClass} text-[#8C7456]`} strokeWidth={1.5} />;
      case 'comforter':
        return <Layers className={`${sizeClass} text-[#8C7456]`} strokeWidth={1.5} />;
      case 'bed':
      default:
        return <BedDouble className={`${sizeClass} text-[#8C7456]`} strokeWidth={1.5} />;
    }
  };

  const viewLabel = image?.label || 'Product View';

  if (variant === 'thumbnail') {
    return (
      <div
        className={`w-full h-full bg-[#F4EFEA] flex flex-col items-center justify-center p-1.5 text-center select-none ${className}`}
      >
        {renderCategoryIcon('w-4 h-4')}
        <span className="text-[9px] font-medium text-[#6B6359] leading-tight mt-1 line-clamp-2">
          {viewLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#F7F3ED] via-[#F2ECE3] to-[#EAE2D6] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden ${className}`}
    >
      {/* Subtle architectural frame lines */}
      <div className="absolute inset-3 border border-[#DED4C6]/80 rounded-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-[85%]">
        <div
          className={`rounded-2xl bg-white/80 border border-[#E5DDD0] flex items-center justify-center shadow-2xs ${
            variant === 'hero' ? 'w-16 h-16 mb-4' : 'w-12 h-12 mb-3'
          }`}
        >
          {renderCategoryIcon(variant === 'hero' ? 'w-8 h-8' : 'w-6 h-6')}
        </div>

        <span
          className={`font-serif font-semibold text-[#1F1C18] leading-snug ${
            variant === 'hero' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
          }`}
        >
          {productName}
        </span>

        <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C7456] font-semibold mt-1.5">
          {viewLabel}
        </span>

        <span className="inline-flex items-center gap-1.5 text-[11px] text-[#7A7369] mt-3">
          <ImageIcon className="w-3 h-3" />
          <span>Temporary Placeholder · Image Coming Soon</span>
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { BRAND_CONFIG } from '../../config/contact';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * Reusable Comfyscape brand logo component.
 * Uses the company's official logo image from BRAND_CONFIG.logoUrl.
 * - `light` variant blends cleanly onto light backgrounds using mix-blend-multiply.
 * - `dark` variant frames the logo inside a crisp white surface for dark backgrounds (e.g., Footer).
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
}) => {
  const containerHeightClasses = {
    sm: 'h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
  }[size];

  const imageHeightClasses = {
    sm: 'h-24',
    md: 'h-28 sm:h-32',
    lg: 'h-40 sm:h-48',
  }[size];

  const logoContent = (
    <span
      className={`inline-flex items-center overflow-hidden ${containerHeightClasses}`}
    >
      <img
        src={BRAND_CONFIG.logoUrl}
        alt="ComfyScape Mattress — Better Sleep, Better Life"
        className={`${imageHeightClasses} w-auto max-w-none object-contain select-none ${
          variant === 'light' ? 'mix-blend-multiply' : ''
        }`}
      />
    </span>
  );

  if (variant === 'dark') {
    return (
      <span
        className={`inline-flex items-center bg-white rounded-lg px-2.5 py-1 shadow-xs ${className}`}
      >
        {logoContent}
      </span>
    );
  }

  return <span className={`inline-flex items-center ${className}`}>{logoContent}</span>;
};

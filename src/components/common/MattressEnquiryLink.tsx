import React from 'react';
import {
  buildProductEnquiryWhatsAppUrl,
  ProductEnquiryParams,
} from '../../utils/whatsapp';

interface MattressEnquiryLinkProps extends ProductEnquiryParams {
  className?: string;
}

/**
 * Subtle, reusable contextual WhatsApp enquiry line displayed under mattress cards
 * and on product detail pages. Dynamically builds a pre-filled WhatsApp message
 * with the product name and currently selected variant details.
 */
export const MattressEnquiryLink: React.FC<MattressEnquiryLinkProps> = ({
  productName,
  sizeLabel,
  dimensions,
  thicknessInches,
  variantName,
  price,
  className = '',
}) => {
  const whatsappUrl = buildProductEnquiryWhatsAppUrl({
    productName,
    sizeLabel,
    dimensions,
    thicknessInches,
    variantName,
    price,
  });

  return (
    <p className={`text-xs text-slate-500 ${className}`}>
      For more enquiries,{' '}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="font-medium text-[#0B2F57] underline underline-offset-2 decoration-[#0B2F57]/40 hover:text-[#0066B2] hover:decoration-[#0066B2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] rounded-xs"
      >
        Contact us
      </a>
    </p>
  );
};

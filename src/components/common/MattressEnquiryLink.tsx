import React from 'react';
import { getMattressEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface MattressEnquiryLinkProps {
  productName: string;
  className?: string;
}

/**
 * Subtle, reusable contextual WhatsApp enquiry line for mattress cards and detail pages.
 * Dynamically builds a mattress-specific pre-filled WhatsApp message from productName.
 */
export const MattressEnquiryLink: React.FC<MattressEnquiryLinkProps> = ({
  productName,
  className = '',
}) => {
  const whatsappUrl = getMattressEnquiryWhatsAppUrl(productName);

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

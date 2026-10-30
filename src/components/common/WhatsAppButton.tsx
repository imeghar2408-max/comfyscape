import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralWhatsAppUrl, getProductWhatsAppUrl } from '../../utils/whatsapp';

interface WhatsAppButtonProps {
  label?: string;
  productName?: string;
  size?: string;
  thickness?: string;
  customMessage?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'floating';
  sizeStyle?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  title?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label,
  productName,
  size,
  thickness,
  customMessage,
  variant = 'primary',
  sizeStyle = 'md',
  className = '',
  showIcon = true,
  title,
}) => {
  // Determine target URL
  let href = '';
  if (customMessage) {
    href = buildWhatsAppUrl(customMessage);
  } else if (productName) {
    href = getProductWhatsAppUrl(productName, size, thickness);
  } else {
    href = getGeneralWhatsAppUrl();
  }

  // Determine button text
  const text = label || (productName ? `Enquire about ${productName}` : 'Enquire on WhatsApp');

  // Styles based on variant
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-full',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-full',
    lg: 'text-base px-7 py-3.5 gap-2.5 rounded-full shadow-md hover:shadow-lg',
  }[sizeStyle];

  const variantClasses = {
    // WhatsApp signature emerald with subtle luxury styling
    primary: 'bg-[#25D366] hover:bg-[#20BE5B] text-white shadow-sm hover:-translate-y-0.5 focus-visible:ring-[#25D366]',
    // Sophisticated dark charcoal with emerald accent
    dark: 'bg-[#242220] hover:bg-[#34302C] text-[#FAF8F5] shadow-sm hover:-translate-y-0.5 focus-visible:ring-[#242220]',
    // Warm sand / cream tone
    secondary: 'bg-[#EFE8DF] hover:bg-[#E5DBD0] text-[#242220] focus-visible:ring-[#8C7456]',
    // Refined subtle border
    outline: 'border border-[#25D366] text-[#1FA652] hover:bg-[#25D366]/10 focus-visible:ring-[#25D366]',
    // Floating circular button in corner
    floating: 'fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BE5B] text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-[#25D366]',
  }[variant];

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Comfyscape on WhatsApp"
        className={`${baseClasses} ${variantClasses} ${className}`}
        title={title || "Chat with our mattress specialist on WhatsApp"}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {showIcon && <MessageCircle className={sizeStyle === 'lg' ? 'w-5 h-5' : sizeStyle === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      <span>{text}</span>
    </a>
  );
};

import { BRAND_CONFIG } from '../config/contact';
import { formatPrice, hasAvailablePrice } from '../data/products';

/**
 * Builds a direct WhatsApp click-to-chat URL with a pre-encoded message.
 * Format: https://wa.me/PHONE_NUMBER?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const number = overrideNumber || BRAND_CONFIG.contact.whatsappRawNumber;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Convenience helper for general business enquiries
 */
export function getGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(BRAND_CONFIG.whatsappTemplates.generalEnquiry);
}

/**
 * Convenience helper for specific mattress enquiries
 */
export function getProductWhatsAppUrl(productName: string, size?: string, thickness?: string): string {
  const message = BRAND_CONFIG.whatsappTemplates.productEnquiry(productName, size, thickness);
  return buildWhatsAppUrl(message);
}

/**
 * Convenience helper for custom dimensions
 */
export function getCustomSizeWhatsAppUrl(productName?: string): string {
  const message = BRAND_CONFIG.whatsappTemplates.customSizeEnquiry(productName);
  return buildWhatsAppUrl(message);
}

export interface ProductEnquiryParams {
  productName: string;
  sizeLabel?: string;
  dimensions?: string;
  thicknessInches?: number | null;
  variantName?: string;
  price?: number | null;
}

/**
 * Builds a detailed pre-filled WhatsApp enquiry URL containing the product name,
 * selected size/variant, dimensions, thickness (if applicable), and price (or a note
 * stating the customer is enquiring about the price when unavailable).
 */
export function buildProductEnquiryWhatsAppUrl({
  productName,
  sizeLabel,
  dimensions,
  thicknessInches,
  variantName,
  price,
}: ProductEnquiryParams): string {
  const lines: string[] = [
    `Hello Comfyscape! I am interested in the *${productName}*.`,
  ];

  if (sizeLabel && dimensions) {
    lines.push(`- Size: ${sizeLabel} (${dimensions})`);
  } else if (sizeLabel) {
    lines.push(`- Size: ${sizeLabel}`);
  } else if (variantName && dimensions) {
    lines.push(`- Variant: ${variantName} (${dimensions})`);
  } else if (variantName) {
    lines.push(`- Variant: ${variantName}`);
  } else if (dimensions) {
    lines.push(`- Dimensions: ${dimensions}`);
  }

  if (thicknessInches) {
    lines.push(`- Thickness: ${thicknessInches} inches`);
  }

  if (hasAvailablePrice(price)) {
    lines.push(`- Price: ${formatPrice(price)}`);
    lines.push('Could you please share availability and further details?');
  } else {
    lines.push('- Price: Enquiring about the price');
    lines.push('Could you please share the price, availability, and further details?');
  }

  return buildWhatsAppUrl(lines.join('\n'));
}

/**
 * Generates the dynamic pre-filled WhatsApp enquiry message for a specific mattress.
 * Example: "Hello, I'm interested in the Comfyscape Comfort Plus mattress. Please share more details about this product."
 */
export function getMattressEnquiryMessage(productName: string): string {
  const normalizedName = productName.trim().replace(/\s+mattress$/i, '');
  return `Hello, I'm interested in the Comfyscape ${normalizedName} mattress. Please share more details about this product.`;
}

/**
 * Builds the direct WhatsApp URL (https://wa.me/919310008171?text=...) for a specific mattress.
 */
export function getMattressEnquiryWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(getMattressEnquiryMessage(productName));
}


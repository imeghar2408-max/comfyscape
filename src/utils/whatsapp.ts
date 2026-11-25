import { BRAND_CONFIG } from '../config/contact';
import { formatPrice, hasAvailablePrice } from '../data/products';

/**
 * Builds a direct WhatsApp click-to-chat URL with a properly URL-encoded message.
 * Uses the shared business WhatsApp number from BRAND_CONFIG (919310008171).
 * Format: https://wa.me/919310008171?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const number = overrideNumber || BRAND_CONFIG.contact.whatsappRawNumber;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Convenience helper for general business enquiries.
 */
export function getGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(BRAND_CONFIG.whatsappTemplates.generalEnquiry);
}

/**
 * Convenience helper for custom dimension enquiries.
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
 * Generates the structured pre-filled WhatsApp enquiry message dynamically from
 * product data and the customer's currently selected variant.
 *
 * Example:
 * Hello, I am interested in the Orthopedic Foam Mattress.
 *
 * Size: Queen
 * Dimensions: 78 × 60 inches
 * Thickness: 6 inches
 * Price: Price on enquiry
 *
 * Please share more details.
 */
export function buildProductEnquiryMessage({
  productName,
  sizeLabel,
  dimensions,
  thicknessInches,
  variantName,
  price,
}: ProductEnquiryParams): string {
  const detailLines: string[] = [];

  if (sizeLabel) {
    detailLines.push(`Size: ${sizeLabel}`);
  } else if (variantName) {
    detailLines.push(`Variant: ${variantName}`);
  }

  if (dimensions) {
    detailLines.push(`Dimensions: ${dimensions}`);
  }

  if (typeof thicknessInches === 'number' && thicknessInches > 0) {
    detailLines.push(`Thickness: ${thicknessInches} inches`);
  }

  if (hasAvailablePrice(price)) {
    detailLines.push(`Price: ${formatPrice(price)}`);
  } else {
    detailLines.push('Price: Price on enquiry (please share current pricing)');
  }

  return [
    `Hello, I am interested in the ${productName}.`,
    '',
    ...detailLines,
    '',
    'Please share more details.',
  ].join('\n');
}

/**
 * Builds the full WhatsApp URL (https://wa.me/919310008171?text=...) for a specific
 * product and its currently selected variant.
 */
export function buildProductEnquiryWhatsAppUrl(params: ProductEnquiryParams): string {
  return buildWhatsAppUrl(buildProductEnquiryMessage(params));
}

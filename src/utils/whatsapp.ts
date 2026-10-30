import { BRAND_CONFIG } from '../config/contact';

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

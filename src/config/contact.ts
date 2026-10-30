/**
 * Central configuration for Comfyscape brand and contact information.
 * All phone numbers, emails, addresses, and WhatsApp integration settings are configured here.
 */

export const BRAND_CONFIG = {
  name: 'COMFYSCAPE',
  tagline: 'Better Sleep, Better Life.',
  subtitle: 'Handcrafted mattresses designed for restorative, spine-aligning comfort.',
  foundedYear: 2021,

  // Contact details (Placeholder values as per project specs)
  contact: {
    // Phone number in international format for WhatsApp wa.me (digits only, with country code, no + or dashes)
    whatsappRawNumber: '15552345678',
    whatsappFormatted: '+1 (555) 234-5678',
    phoneFormatted: '+1 (555) 234-5678',
    phoneTelLink: 'tel:+15552345678',
    email: 'enquiry@comfyscape.com',
    address: {
      line1: 'Comfyscape Studio & Experience Lounge',
      line2: '450 Artisan Bedding Boulevard, Suite 12',
      city: 'Comfort District',
      statePostal: 'CA 90210',
      country: 'United States',
    },
    businessHours: {
      weekdays: 'Monday – Friday: 9:00 AM – 7:00 PM',
      saturday: 'Saturday: 10:00 AM – 6:00 PM',
      sunday: 'Sunday: 11:00 AM – 4:00 PM',
    },
  },

  // Default WhatsApp message templates
  whatsappTemplates: {
    generalEnquiry: "Hello Comfyscape! I visited your website and would like to enquire about your mattress collection and pricing.",
    productEnquiry: (productName: string, size?: string, thickness?: string) => {
      let msg = `Hello Comfyscape! I am interested in the *${productName}* mattress.`;
      if (size && thickness) {
        msg += ` Specifically for ${size} size (${thickness} thickness).`;
      } else if (size) {
        msg += ` Specifically for ${size} size.`;
      } else if (thickness) {
        msg += ` Specifically in ${thickness} thickness.`;
      }
      msg += ` Could you please share the pricing, availability, and delivery details?`;
      return msg;
    },
    customSizeEnquiry: (productName?: string) => {
      if (productName) {
        return `Hello Comfyscape! I am interested in getting a custom size quote for the *${productName}* mattress. My bed frame dimensions are: `;
      }
      return `Hello Comfyscape! I would like to enquire about ordering a custom-dimension mattress for my bed frame.`;
    },
  },
};

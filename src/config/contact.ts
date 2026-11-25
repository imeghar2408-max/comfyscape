/**
 * Central configuration for Comfyscape brand and contact information.
 * All phone numbers, emails, addresses, and WhatsApp integration settings are configured here.
 */

export const BRAND_CONFIG = {
  name: 'COMFYSCAPE',
  tagline: 'Better Sleep, Better Life.',
  subtitle: 'Handcrafted mattresses designed for restorative, spine-aligning comfort.',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_10.14.10_PM_8bedb4d5.jpeg',
  foundedYear: 2021,

  // Contact details
  contact: {
    // Phone number in international format for WhatsApp wa.me (digits only, with country code, no + or dashes)
    whatsappRawNumber: '919310008171',
    whatsappFormatted: '+91 93100 08171',
    phoneFormatted: '+91 93100 08171',
    phoneTelLink: 'tel:+919310008171',
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

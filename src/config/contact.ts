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
    address:
      'Opposite Mahakal Mandir, Bhora Kalan, Nurpur Bahora, Haryana 122413, India.',
    mapsUrl:
      'https://www.google.com/maps/place/Comfy+Mattress/@28.3011525,76.8299622,17z/data=!3m1!4b1!4m6!3m5!1s0x390d395910ca4d71:0x8b8e84144566a52a!8m2!3d28.3011525!4d76.8299622!16s%2Fg%2F11sfb4rgb8',
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

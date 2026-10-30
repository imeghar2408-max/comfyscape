import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/contact';
import { MATTRESSES } from '../data/mattresses';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    mattressModel: MATTRESSES[0]?.name || '',
    sizePreference: 'Queen (78" × 60")',
    thickness: '6 Inches',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    let text = `Hello Comfyscape! My name is ${formData.fullName || 'Customer'}.`;
    text += `\nI am inquiring about the *${formData.mattressModel}* mattress.`;
    text += `\n- Preferred Size: ${formData.sizePreference}`;
    text += `\n- Preferred Thickness: ${formData.thickness}`;
    if (formData.phone) text += `\n- Contact Phone: ${formData.phone}`;
    if (formData.message) text += `\n- Note: ${formData.message}`;
    text += `\nCould you please provide pricing, timeline, and delivery guidance?`;

    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const faqs = [
    {
      question: 'How do I place an order or negotiate a quote with Comfyscape?',
      answer: 'We operate as a personalized mattress maker rather than a faceless automated checkout. Simply browse our catalogue and click any WhatsApp button to initiate a chat with our mattress specialist. We will confirm your bed measurements, quote transparent factory prices, and coordinate direct delivery.',
    },
    {
      question: 'Can you manufacture mattresses in custom non-standard sizes?',
      answer: 'Yes! Over 35% of our mattresses are built to custom dimensions. Whether you have an antique four-poster cot, an imported California King frame, or a custom carpenter wooden bed, provide your exact length and width in inches, and we will tailor it to fit seamlessly.',
    },
    {
      question: 'What is the difference between Rebonded Foam and High-Resilience (HR) Foam?',
      answer: 'High-Resilience (HR) foam (32D) has responsive bounce and buoyant cushioning, making it easy to turn. Rebonded foam (85D–90D) is ultra-dense, stiff, and unyielding—ideal for people with persistent lumbar pain, slipped discs, or those who prefer firm spine correction.',
    },
    {
      question: 'What warranty is offered on Comfyscape mattresses?',
      answer: 'Comfyscape mattresses come with a 5 to 10-year anti-sag guarantee depending on the specific model. We stand firmly behind the density and structural integrity of our certified cores.',
    },
    {
      question: 'Do you deliver to my location?',
      answer: 'We arrange door-to-door delivery with protective waterproof wrapping. Message us on WhatsApp with your city or postal code to verify transit times and delivery schedules.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#F4EFEA] border-b border-[#EAE3D8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-4" />
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F1C18] leading-tight">
              Contact Comfyscape
            </h1>
            <p className="text-base sm:text-lg text-[#615A52] leading-relaxed">
              Have questions about foam density, custom dimensions, or need a quote? Reach out via WhatsApp, phone, or submit an enquiry below.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#25D366]/40 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#25D366] block">
                Instant Chat
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18] mt-1">
                WhatsApp Desk
              </h3>
              <p className="text-xs text-[#7A7369] mt-1">
                Fastest channel for photos, custom dimensions, and immediate quotations.
              </p>
            </div>
            <div>
              <WhatsAppButton
                label="Open WhatsApp Chat"
                variant="primary"
                sizeStyle="sm"
                className="w-full"
              />
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE3D8] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456] mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7456] block">
                Direct Line
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18] mt-1">
                Call Support
              </h3>
              <p className="text-xs text-[#7A7369] mt-1">
                Speak directly with our sleep product consultant.
              </p>
            </div>
            <div>
              <a
                href={BRAND_CONFIG.contact.phoneTelLink}
                className="block text-center text-xs font-semibold py-2 px-3 border border-[#D5C6B3] hover:border-[#1F1C18] rounded-full text-[#1F1C18] transition-colors"
              >
                {BRAND_CONFIG.contact.phoneFormatted}
              </a>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE3D8] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456] mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7456] block">
                Written Enquiries
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18] mt-1">
                Email
              </h3>
              <p className="text-xs text-[#7A7369] mt-1">
                Institutional, trade, or hospitality specifications.
              </p>
            </div>
            <div>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="block text-center text-xs font-semibold py-2 px-3 border border-[#D5C6B3] hover:border-[#1F1C18] rounded-full text-[#1F1C18] truncate transition-colors"
              >
                {BRAND_CONFIG.contact.email}
              </a>
            </div>
          </div>

          {/* Card 4: Studio Location */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE3D8] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456] mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7456] block">
                Experience Studio
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18] mt-1">
                Showroom
              </h3>
              <p className="text-xs text-[#7A7369] mt-1 leading-relaxed">
                {BRAND_CONFIG.contact.address.line1}, {BRAND_CONFIG.contact.address.city}
              </p>
            </div>
            <div className="text-[11px] text-[#7A7369]">
              <span>{BRAND_CONFIG.contact.businessHours.weekdays}</span>
            </div>
          </div>

        </div>

        {/* Form and Hours Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Enquiry Form (Frontend UI) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#EAE3D8] shadow-xs">
            
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold block">
                Personalized Quotation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1C18] mt-1">
                Send a Mattress Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#7A7369] mt-1">
                Fill in your mattress needs. You can submit directly on WhatsApp for immediate discussion or leave your request here.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#FAF8F5] border border-[#EAE3D8] rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-[#EAF7EE] text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F1C18]">
                  Enquiry Received!
                </h3>
                <p className="text-sm text-[#575047] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName || 'valued customer'}</strong>. Our mattress specialist will review your request regarding the <strong>{formData.mattressModel}</strong> and respond shortly.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-[#8C7456] underline"
                  >
                    Submit another enquiry
                  </button>
                  <WhatsAppButton
                    label="Continue on WhatsApp for Faster Reply"
                    variant="primary"
                    sizeStyle="sm"
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 555-0192"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Mattress Model */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                      Mattress Model
                    </label>
                    <select
                      value={formData.mattressModel}
                      onChange={(e) => setFormData({ ...formData, mattressModel: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                    >
                      {MATTRESSES.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                      <option value="Custom Requirement">Other / Custom Concept</option>
                    </select>
                  </div>

                  {/* Size Preference */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                      Size
                    </label>
                    <select
                      value={formData.sizePreference}
                      onChange={(e) => setFormData({ ...formData, sizePreference: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                    >
                      <option value="Single (72&quot; × 36&quot;)">Single (72&quot; × 36&quot;)</option>
                      <option value="Double (72&quot; × 48&quot;)">Double (72&quot; × 48&quot;)</option>
                      <option value="Queen (78&quot; × 60&quot;)">Queen (78&quot; × 60&quot;)</option>
                      <option value="King (78&quot; × 72&quot;)">King (78&quot; × 72&quot;)</option>
                      <option value="Custom Dimensions">Custom Dimensions</option>
                    </select>
                  </div>

                  {/* Thickness */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                      Thickness
                    </label>
                    <select
                      value={formData.thickness}
                      onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                    >
                      <option value="5 Inches">5 Inches</option>
                      <option value="6 Inches">6 Inches (Standard)</option>
                      <option value="8 Inches">8 Inches (Plush)</option>
                      <option value="10 Inches">10 Inches (Luxury)</option>
                    </select>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F1C18] mb-1.5">
                    Message or Custom Dimensions
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Include any specific spine concerns, delivery address, or non-standard bed frame measurements..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* WhatsApp Direct Submit */}
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5B] text-white text-sm font-medium px-6 py-3 rounded-full transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (Instant)</span>
                  </button>

                  {/* Standard Form Submit */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#242220] hover:bg-[#38332D] text-white text-sm font-medium px-6 py-3 rounded-full transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#8C7B6B] pt-1">
                  We never spam or share your contact details. Responses are provided directly by Comfyscape specialists.
                </p>

              </form>
            )}

          </div>

          {/* Right Info: Working Hours & Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Working Hours */}
            <div className="bg-white p-7 rounded-2xl border border-[#EAE3D8] space-y-4">
              <div className="flex items-center gap-2 text-[#8C7456]">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Consultation Hours</h3>
              </div>
              <ul className="text-xs sm:text-sm text-[#575047] space-y-2.5 divide-y divide-[#F2ECE3]">
                <li className="flex justify-between pt-2">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-[#1F1C18]">9:00 AM – 7:00 PM</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Saturday</span>
                  <span className="font-semibold text-[#1F1C18]">10:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Sunday</span>
                  <span className="font-semibold text-[#1F1C18]">11:00 AM – 4:00 PM</span>
                </li>
              </ul>
              <p className="text-[11px] text-[#7A7369] pt-2">
                WhatsApp inquiries sent outside business hours are answered early the following morning.
              </p>
            </div>

            {/* Visit Studio */}
            <div className="bg-[#F4EFEA] p-7 rounded-2xl border border-[#EAE3D8] space-y-3">
              <div className="flex items-center gap-2 text-[#8C7456]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Experience Lounge</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Want to test foam firmness in person? Visit our lounge to feel our multi-layer cutouts and talk with mattress artisans.
              </p>
              <div className="text-xs text-[#1F1C18] font-medium pt-1">
                <p>{BRAND_CONFIG.contact.address.line1}</p>
                <p>{BRAND_CONFIG.contact.address.line2}</p>
                <p>{BRAND_CONFIG.contact.address.city}, {BRAND_CONFIG.contact.address.statePostal}</p>
              </div>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto space-y-6 pt-8 border-t border-[#EAE3D8]">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1C18]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#EAE3D8] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#1F1C18] hover:text-[#6D553C] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8C7456] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8C7456] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#575047] leading-relaxed border-t border-[#F2ECE3] pt-4 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

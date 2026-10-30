import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Feather, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/contact';
import { getFeaturedMattresses } from '../data/mattresses';
import { MattressCard } from '../components/mattress/MattressCard';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { getCustomSizeWhatsAppUrl } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const featuredMattresses = getFeaturedMattresses();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F4EFEA] border-b border-[#EAE3D8] overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-[#FAF8F5]/80 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Brand Statement */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unboxed Brand Sub-Kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
                <span>Handcrafted Luxury Bedding</span>
                <span aria-hidden="true">·</span>
                <span>Direct From Workshop</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] font-bold leading-[1.12]">
                Better Sleep,<br />
                <span className="italic font-normal text-[#6D553C]">Better Life.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5A534B] leading-relaxed max-w-xl">
                Welcome to <strong>Comfyscape</strong>. We craft premium mattresses with certified high-resilience foams, natural coconut coir, and orthopedic rebonded cores. Built for deeper rest, proper spinal alignment, and everyday vitality.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/mattresses"
                  className="inline-flex items-center justify-center gap-2 bg-[#242220] hover:bg-[#38342E] text-[#FAF8F5] text-sm font-medium px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>Explore Mattresses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <WhatsAppButton
                  label="Enquire on WhatsApp"
                  variant="primary"
                  sizeStyle="lg"
                />

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center text-sm font-medium text-[#4A443C] hover:text-[#1F1C18] border border-[#D5C6B3] hover:border-[#1F1C18] px-5 py-3.5 rounded-full transition-colors"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#EAE3D8] grid grid-cols-3 gap-4 text-xs text-[#6B6359]">
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">100%</span>
                  <span>Virgin Certified Foams</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">Up to 10y</span>
                  <span>Anti-Sag Warranty</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">Custom</span>
                  <span>Any Size Tailored</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                  alt="Comfyscape luxury mattress bedroom"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating highlight card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#EAE3D8] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7456] font-semibold block">Crafted for Wellness</span>
                    <h2 className="text-sm font-serif font-bold text-[#1F1C18]">Zero-Sag Ergonomic Cores</h2>
                  </div>
                  <Link
                    to="/mattresses"
                    className="text-xs text-[#8C7456] hover:text-[#5E4D38] font-medium flex items-center gap-1 group"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT BRIEF SECTION */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual preview of materials */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden border border-[#EAE3D8] shadow-md aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
                  alt="Comfyscape handcrafted mattress quality"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-xs font-serif italic max-w-sm">
                    &ldquo;Sleep isn&apos;t just rest—it&apos;s biological restoration. We build mattresses that honor that science.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Text description */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold">
                Our Craft & Philosophy
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1C18] font-bold">
                Honest Materials, Unmatched Comfort.
              </h2>
              
              <p className="text-sm sm:text-base text-[#575047] leading-relaxed">
                At Comfyscape, we believe everyone deserves a restful night without the confusion of inflated retail gimmicks. We work directly with certified mattress materials—from high-density rebonded foam for spine correction, to responsive open-cell foam and cooling natural coconut coir.
              </p>

              <p className="text-sm sm:text-base text-[#575047] leading-relaxed">
                Whether you need a standard Queen size or a custom-measured mattress for a bespoke wooden cot, our specialists handle each request with personal attention and transparent consultation.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <Link
                  to="/about"
                  className="text-sm font-semibold text-[#1F1C18] hover:text-[#6D553C] underline underline-offset-4 flex items-center gap-1.5"
                >
                  <span>Learn more about our craftsmanship</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED MATTRESSES SECTION */}
      <section className="py-20 bg-[#F4EFEA] border-t border-b border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-2">
                Curated Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
                Featured Mattresses
              </h2>
              <p className="text-sm text-[#665F55] mt-1 max-w-lg">
                Explore our most sought-after sleep foundations, designed for distinct postures, firmness desires, and thermal comfort.
              </p>
            </div>

            <Link
              to="/mattresses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F1C18] hover:text-[#6D553C] transition-colors"
            >
              <span>View Full Catalogue ({getFeaturedMattresses().length}+ models)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Featured Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredMattresses.map((mattress) => (
              <MattressCard key={mattress.id} mattress={mattress} />
            ))}
          </div>

          {/* Under-grid note */}
          <div className="mt-12 text-center">
            <p className="text-xs text-[#7A7369]">
              Every mattress includes choice of thickness (5&quot;, 6&quot;, 8&quot;, 10&quot;) and bespoke size manufacturing upon request.
            </p>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE COMFYSCAPE */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold">
              The Comfyscape Advantage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
              Why Choose Comfyscape?
            </h2>
            <p className="text-sm text-[#665F55]">
              We craft every mattress with a commitment to sleep health, honest specifications, and lifelong support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Certified Raw Materials
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Zero harmful chemicals, no cheap cardboard or clay fillers. We use only 100% pure virgin polyurethane, high-density rebonded foam, and natural sterilized coir.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Multiple Comfort Profiles
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                From cloud-soft memory foam that absorbs all partner motion, to firm orthopedic rebonded foam for chronic lumbar relief—there is a perfect match for every body.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Maximize2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Custom Dimension Tailoring
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Have an antique bed, custom carpenter cot, or international bed frame? We craft non-standard dimensions down to the exact inch without extreme surcharges.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Direct WhatsApp Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Skip confusing retail sales pitches. Discuss your sleep preferences, room dimensions, and get honest transparent quotes directly on WhatsApp.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CUSTOM SIZE BANNER */}
      <section className="bg-[#242220] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#2C2925] p-8 sm:p-12 rounded-2xl border border-[#403B35]">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8B8A6] font-semibold">
                Bespoke Mattress Tailoring
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
                Need a non-standard size for your bed frame?
              </h2>
              <p className="text-sm text-[#BDB2A3] leading-relaxed">
                We manufacture custom length, width, and thickness specifications for imported bed frames, heritage wood cots, and luxury spaces. Send us your measurements on WhatsApp for an immediate quote.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getCustomSizeWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5B] text-white text-sm font-medium px-6 py-3.5 rounded-full transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Custom Size Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION (HOMEPAGE) */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
              Ready to Upgrade Your Sleep?
            </h2>
            <p className="text-sm sm:text-base text-[#665F55]">
              Contact our sleep specialists today for product guidance, material comparisons, and bulk quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Phone */}
            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-[#1F1C18]">Call Us Directly</h3>
              <p className="text-xs text-[#7A7369]">Mon–Sat, 9am–7pm</p>
              <a
                href={BRAND_CONFIG.contact.phoneTelLink}
                className="inline-block text-sm font-bold text-[#1F1C18] hover:text-[#6D553C] pt-1"
              >
                {BRAND_CONFIG.contact.phoneFormatted}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#25D366]/40 shadow-xs text-center space-y-2 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-[10px] uppercase font-bold tracking-wider py-0.5 px-2.5 rounded-full">
                Fastest Response
              </span>
              <div className="w-10 h-10 mx-auto rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-[#1F1C18]">WhatsApp Chat</h3>
              <p className="text-xs text-[#7A7369]">Direct chat with specialist</p>
              <div className="pt-2">
                <WhatsAppButton
                  label="Message Us"
                  variant="primary"
                  sizeStyle="sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-[#1F1C18]">Email Enquiries</h3>
              <p className="text-xs text-[#7A7369]">Trade & institutional inquiries</p>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="inline-block text-xs font-medium text-[#1F1C18] hover:text-[#6D553C] pt-2 truncate max-w-full"
              >
                {BRAND_CONFIG.contact.email}
              </a>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="text-xs font-semibold text-[#8C7456] hover:text-[#5E4D38] underline underline-offset-4"
            >
              Or visit our Experience Lounge & Contact Page →
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Feather,
  Maximize2,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/contact';
import { MATTRESS_PRODUCTS, PILLOW_PRODUCTS } from '../data/products';
import { CategorySelector } from '../components/catalogue/CategorySelector';
import { ProductCard } from '../components/catalogue/ProductCard';
import { BuildMattressCard } from '../components/catalogue/BuildMattressCard';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const featuredMattresses = MATTRESS_PRODUCTS.slice(0, 3);
  const featuredPillows = PILLOW_PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F4EFEA] border-b border-[#EAE3D8] overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#FAF8F5]/80 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Brand Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
                <span>Handcrafted Luxury Bedding</span>
                <span aria-hidden="true">·</span>
                <span>Direct From Workshop</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] font-bold leading-[1.12]">
                Better Sleep,
                <br />
                <span className="italic font-normal text-[#6D553C]">Better Life.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5A534B] leading-relaxed max-w-xl">
                Welcome to <strong>Comfyscape</strong>. Explore our collection of mattresses,
                ergonomic pillows, and breathable all-season comforters crafted for restful sleep
                and everyday comfort.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/mattresses"
                  className="inline-flex items-center justify-center gap-2 bg-[#0B2F57] hover:bg-[#133F72] text-[#FAF8F5] text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <WhatsAppButton
                  label="Enquire on WhatsApp"
                  variant="primary"
                  sizeStyle="lg"
                />

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center text-sm font-semibold text-[#4A443C] hover:text-[#1F1C18] border border-[#D5C6B3] hover:border-[#1F1C18] px-5 py-3.5 rounded-full transition-colors"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#EAE3D8] grid grid-cols-3 gap-4 text-xs text-[#6B6359]">
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">4 Sizes</span>
                  <span>Single, Double, Queen &amp; King</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">Custom</span>
                  <span>Tailored Bed Dimensions</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#1F1C18] block">Direct</span>
                  <span>WhatsApp Consultation</span>
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

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#EAE3D8] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7456] font-semibold block">
                      Crafted for Wellness
                    </span>
                    <h2 className="text-sm font-serif font-bold text-[#1F1C18]">
                      Ergonomic Sleep Foundations
                    </h2>
                  </div>
                  <Link
                    to="/mattresses"
                    className="text-xs text-[#0066B2] hover:text-[#004B80] font-bold flex items-center gap-1 group"
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

      {/* 2. DISCOVER SLEEP CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <CategorySelector
          activeCategory="bed"
          onSelectCategory={(category) => {
            if (category === 'pillow') {
              navigate('/pillows');
            } else {
              navigate(`/mattresses?category=${category}`);
            }
          }}
          onViewAllClick={() => {
            navigate('/mattresses');
          }}
        />
      </section>

      {/* 3. FEATURED MATTRESSES GRID */}
      <section className="py-16 bg-[#F4EFEA] border-t border-b border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-1">
                Curated Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
                Featured Mattresses
              </h2>
              <p className="text-sm text-[#665F55] mt-1">
                Select any mattress to explore specifications, compare sizes, and enquire on WhatsApp.
              </p>
            </div>

            <Link
              to="/mattresses"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0066B2] hover:text-[#004B80] uppercase tracking-wider transition-colors"
            >
              <span>Explore All Mattresses ({MATTRESS_PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMattresses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            <BuildMattressCard />
          </div>
        </div>
      </section>

      {/* 4. PILLOW CATALOGUE PREVIEW */}
      {featuredPillows.length > 0 && (
        <section className="py-16 bg-[#FAF8F5] border-b border-[#EAE3D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-1">
                  Neck &amp; Head Support
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
                  Explore Our Pillows
                </h2>
                <p className="text-sm text-[#665F55] mt-1">
                  Thoughtfully crafted pillows designed to pair with your mattress for balanced alignment.
                </p>
              </div>

              <Link
                to="/pillows"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0066B2] hover:text-[#004B80] uppercase tracking-wider transition-colors"
              >
                <span>View Pillow Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPillows.map((pillow) => (
                <ProductCard key={pillow.id} product={pillow} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WHY CHOOSE COMFYSCAPE */}
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
              We craft every mattress with a commitment to sleep comfort, honest specifications, and direct customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Quality Materials
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Selected virgin foams, high-density orthopedic cores, natural coir, and latex options built for lasting comfort.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Multiple Comfort Profiles
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                From gentle, pressure-relieving memory foam to firm orthopedic support — find the feel that suits your sleep posture.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Maximize2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Standard &amp; Custom Sizes
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Available in Single, Double, Queen, and King sizes, with custom dimension enquiries available on request.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7456]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Direct WhatsApp Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Speak directly with our team on WhatsApp for transparent quotes, product guidance, and size assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
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
              Contact our team today for mattress and pillow recommendations, custom measurements, and pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                <WhatsAppButton label="Message Us" variant="primary" sizeStyle="sm" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-sm text-[#1F1C18]">Email Enquiries</h3>
              <p className="text-xs text-[#7A7369]">General &amp; bulk enquiries</p>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="inline-block text-xs font-medium text-[#1F1C18] hover:text-[#6D553C] pt-2 truncate max-w-full"
              >
                {BRAND_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

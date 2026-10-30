import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Layers, 
  HeartHandshake, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2 
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/contact';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#F4EFEA] border-b border-[#EAE3D8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About Us' }]} className="mb-4" />
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
              Our Heritage & Philosophy
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F1C18] leading-tight">
              Crafting Sleep Foundations for a Better Life.
            </h1>
            <p className="text-base sm:text-lg text-[#615A52] leading-relaxed">
              At Comfyscape, we believe restorative sleep is the bedrock of everyday energy, clarity, and well-being. Here is our story, materials, and commitment to you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold">
              The Comfyscape Story
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1F1C18]">
              Born Out of a Need for Mattress Transparency.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#575047] leading-relaxed">
              <p>
                For decades, the mattress industry has masked simple materials behind complex jargon, astronomical showroom markups, and arbitrary labels. Customers often found themselves buying mattresses that began sagging after a few short months.
              </p>
              <p>
                <strong>Comfyscape</strong> was founded to provide an honest alternative. We build and supply mattresses directly to homeowners, hospitality projects, and architects. We clearly disclose our foam densities—whether it is 32D high-resilience foam, 85D orthopedic rebonded cores, or natural sterilized rubberized coconut coir.
              </p>
              <p>
                No gimmicks, no middleman markups. Just reliable craftsmanship designed to cradle your spine in proper physiological alignment night after night.
              </p>
            </div>

            <div className="pt-2">
              <WhatsAppButton
                label="Speak With Our Mattress Craftsman"
                variant="primary"
                sizeStyle="md"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#EAE3D8] shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Comfyscape workshop craft and natural materials"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-medium tracking-wide">
                  Workshop standard: Hand-inspected seams, certified virgin foams & organic ticking.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Values */}
        <div className="bg-[#F4EFEA] rounded-2xl border border-[#EAE3D8] p-8 sm:p-12">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1F1C18]">
              The Four Pillars of Comfyscape
            </h2>
            <p className="text-sm text-[#665F55]">
              These foundational pillars guide every mattress model in our catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Purity of Foam</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                We only use 100% virgin raw materials without chalk, clay, or calcium carbonate fillers that cause premature sagging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Ergonomic Health</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Collaborating with orthopedic guidelines to calibrate resistance that preserves the natural S-curve of the human spine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <Maximize2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Custom Sizing</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Bedrooms come in all dimensions. We manufacture custom cots, heritage bed sizes, and luxury master profiles to exact inches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C7456]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Direct Support</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Direct phone and WhatsApp consultation allows personalized advice, truthful quotes, and straightforward warranty support.
              </p>
            </div>
          </div>
        </div>

        {/* Mattress Material Guide Breakdown */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold">
              Material Anatomy
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1F1C18]">
              Understanding What Is Inside Your Mattress
            </h2>
            <p className="text-sm text-[#665F55]">
              Different sleep requirements call for different core architectures. Here is how our four main technologies compare:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-2">
              <span className="text-xs font-semibold text-[#8C7456] uppercase tracking-wider">01. High-Resilience (HR) Foam</span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Open-Cell Buoyant Bounce</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Constructed with micro-cellular pores that snap back instantly. Prevents sinking, distributes weight evenly, and allows continuous ventilation.
              </p>
              <Link to="/mattresses?category=foam" className="text-xs font-semibold text-[#1F1C18] hover:text-[#8C7456] flex items-center gap-1 pt-2">
                <span>Explore HR Foam models</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-2">
              <span className="text-xs font-semibold text-[#8C7456] uppercase tracking-wider">02. Rebonded Foam Core</span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Orthopedic Medical Rigidity</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Steam-sanitized high-pressure foam chips compressed to 85D–90D. Yields a flat, unbending foundation recommended for chronic lower back and lumbar stiffness.
              </p>
              <Link to="/mattresses?category=rebonded" className="text-xs font-semibold text-[#1F1C18] hover:text-[#8C7456] flex items-center gap-1 pt-2">
                <span>Explore Rebonded models</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-2">
              <span className="text-xs font-semibold text-[#8C7456] uppercase tracking-wider">03. Natural Coconut Coir</span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Natural Cooling & Cross-Ventilation</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Rubberized natural coconut husk fiber provides natural air passages. Eliminates body heat buildup, highly durable, and 100% eco-conscious.
              </p>
              <Link to="/mattresses?category=coir" className="text-xs font-semibold text-[#1F1C18] hover:text-[#8C7456] flex items-center gap-1 pt-2">
                <span>Explore Coir models</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3D8] space-y-2">
              <span className="text-xs font-semibold text-[#8C7456] uppercase tracking-wider">04. Visco-Elastic Memory Foam</span>
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">Zero Motion Pressure Dissolution</h3>
              <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                Temperature-sensitive memory cells mold gently to shoulder and hip curves. Completely absorbs tossing and turning, allowing uninterrupted sleep for couples.
              </p>
              <Link to="/mattresses?category=memory-foam" className="text-xs font-semibold text-[#1F1C18] hover:text-[#8C7456] flex items-center gap-1 pt-2">
                <span>Explore Memory Foam models</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#242220] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl font-bold text-white">
              Ready to find your ideal Comfyscape mattress?
            </h3>
            <p className="text-sm text-[#BDB2A3]">
              Browse our complete catalogue or message us with your room requirements and comfort goals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/mattresses"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#242220] hover:bg-[#EFE8DF] text-sm font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <span>View Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppButton
              label="Chat on WhatsApp"
              variant="primary"
              sizeStyle="md"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

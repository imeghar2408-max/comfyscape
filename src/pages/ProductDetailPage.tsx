import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getMattressBySlug, 
  MATTRESSES 
} from '../data/mattresses';
import { 
  ShieldCheck, 
  Check, 
  Maximize2, 
  Layers, 
  Info, 
  ArrowLeft, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { MattressCard } from '../components/mattress/MattressCard';
import { MattressSizeOption, MattressThicknessOption } from '../types/mattress';
import { getCustomSizeWhatsAppUrl } from '../utils/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const mattress = slug ? getMattressBySlug(slug) : undefined;

  // Selected gallery image index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Selected size & thickness options
  const [selectedSize, setSelectedSize] = useState<MattressSizeOption | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<MattressThicknessOption | null>(null);

  // Reset defaults on slug change
  useEffect(() => {
    if (mattress) {
      setSelectedImageIndex(0);
      setSelectedSize(mattress.availableSizes[0] || null);
      setSelectedThickness(mattress.availableThicknesses[1] || mattress.availableThicknesses[0] || null);
    }
  }, [slug, mattress]);

  if (!mattress) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#FAF8F5]">
        <h2 className="font-serif text-2xl font-bold text-[#1F1C18] mb-2">Mattress Not Found</h2>
        <p className="text-sm text-[#7A7369] mb-6">The requested mattress model could not be found.</p>
        <Link
          to="/mattresses"
          className="inline-flex items-center gap-2 bg-[#242220] text-white text-sm px-5 py-2.5 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  // Related products (same category or featured, excluding current)
  const relatedMattresses = MATTRESSES.filter(m => m.id !== mattress.id).slice(0, 3);

  // Approximate relative price calculation for demonstration based on thickness/size
  const calculateIndicativePrice = () => {
    let base = mattress.startingPrice;
    if (selectedSize) {
      if (selectedSize.name === 'Double') base *= 1.25;
      else if (selectedSize.name === 'Queen') base *= 1.45;
      else if (selectedSize.name === 'King') base *= 1.70;
      else if (selectedSize.name === 'Custom Size') return 'Custom Quote';
    }
    if (selectedThickness && selectedThickness.thicknessInches > 6) {
      base *= 1 + (selectedThickness.thicknessInches - 6) * 0.12;
    }
    return `${mattress.currency}${Math.round(base)}`;
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Top Breadcrumb row */}
      <div className="bg-[#F4EFEA] border-b border-[#EAE3D8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Catalogue', to: '/mattresses' },
              { label: mattress.categoryLabel, to: `/mattresses?category=${mattress.category}` },
              { label: mattress.name },
            ]}
          />
          <button
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-1 text-xs text-[#7A7369] hover:text-[#1F1C18] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0EBE3] border border-[#EAE3D8] shadow-sm">
              <img
                src={mattress.images[selectedImageIndex] || mattress.images[0]}
                alt={`${mattress.name} - view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Bestseller Badge */}
              {mattress.bestseller && (
                <span className="absolute top-4 left-4 bg-[#242220] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm">
                  Bestseller
                </span>
              )}

              {/* Density Pill */}
              <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#242220] text-xs font-semibold py-1 px-3 rounded-md border border-[#E8E1D7] shadow-xs">
                Density: {mattress.density}
              </span>
            </div>

            {/* Thumbnail Row */}
            {mattress.images.length > 1 && (
              <div className="flex items-center gap-3">
                {mattress.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#242220] ring-2 ring-[#242220]/20'
                        : 'border-[#EAE3D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Assurance Strip */}
            <div className="bg-white rounded-xl border border-[#EAE3D8] p-5 grid grid-cols-3 gap-4 text-center">
              <div>
                <ShieldCheck className="w-5 h-5 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-semibold text-[#1F1C18]">{mattress.warrantyYears} Years</span>
                <span className="text-[11px] text-[#7A7369]">Anti-Sag Guarantee</span>
              </div>
              <div className="border-x border-[#F2ECE3]">
                <Layers className="w-5 h-5 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-semibold text-[#1F1C18]">{mattress.density}</span>
                <span className="text-[11px] text-[#7A7369]">Calibrated Density</span>
              </div>
              <div>
                <Sparkles className="w-5 h-5 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-semibold text-[#1F1C18]">Non-Toxic</span>
                <span className="text-[11px] text-[#7A7369]">Certified Materials</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & WhatsApp Action (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              {/* Unboxed category & metadata */}
              <div className="flex items-center gap-2 text-xs text-[#8C7456] font-semibold uppercase tracking-wider mb-2">
                <span>{mattress.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Spine Ergonomics</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18] leading-tight">
                {mattress.name}
              </h1>

              <p className="text-sm text-[#7D7060] italic font-serif mt-1">
                {mattress.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-white p-5 rounded-xl border border-[#EAE3D8]">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A8275] block">
                    Indicative Price ({selectedSize?.name || 'Standard'} / {selectedThickness ? `${selectedThickness.thicknessInches}"` : '6"'})
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-bold text-[#1F1C18]">
                      {calculateIndicativePrice()}
                    </span>
                    {selectedSize?.name !== 'Custom Size' && (
                      <span className="text-xs text-[#7A7369]">Est. Catalogue Price</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8C7456] font-semibold uppercase block">Direct Maker Rate</span>
                  <span className="text-xs text-[#7A7369]">No retail markups</span>
                </div>
              </div>

              <p className="text-[11px] text-[#998E7F] mt-2 pt-2 border-t border-[#F2ECE3] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8C7456] shrink-0" />
                <span>Final price negotiable for bulk, custom sizes, or delivery logistics.</span>
              </p>
            </div>

            {/* Firmness Meter */}
            <div className="bg-white p-5 rounded-xl border border-[#EAE3D8] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#1F1C18]">Firmness Level:</span>
                <span className="font-bold text-[#8C7456]">{mattress.firmness} ({mattress.firmnessScore} / 10)</span>
              </div>

              {/* Visual meter bar */}
              <div className="relative w-full h-2 bg-[#EFE8DF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D5C6B3] via-[#8C7456] to-[#242220] rounded-full"
                  style={{ width: `${mattress.firmnessScore * 10}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8C7B6B]">
                <span>Plush / Soft (1)</span>
                <span>Medium (5)</span>
                <span>Extra Firm (10)</span>
              </div>
            </div>

            {/* Interactive Thickness Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#1F1C18] uppercase tracking-wider">
                Select Thickness
              </label>
              <div className="grid grid-cols-3 gap-2">
                {mattress.availableThicknesses.map((th) => {
                  const isSelected = selectedThickness?.thicknessInches === th.thicknessInches;
                  return (
                    <button
                      key={th.thicknessInches}
                      type="button"
                      onClick={() => setSelectedThickness(th)}
                      className={`p-3 rounded-lg text-left border transition-all ${
                        isSelected
                          ? 'border-[#242220] bg-white ring-1 ring-[#242220] shadow-xs'
                          : 'border-[#EAE3D8] bg-[#FAF8F5] hover:bg-white text-[#575047]'
                      }`}
                    >
                      <span className="block font-bold text-sm text-[#1F1C18]">
                        {th.thicknessInches} Inches
                      </span>
                      <span className="block text-[10px] text-[#7A7369] mt-0.5 truncate">
                        {th.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#1F1C18] uppercase tracking-wider">
                  Select Bed Size
                </label>
                {selectedSize && (
                  <span className="text-xs text-[#8C7456] font-medium">
                    {selectedSize.dimensionsInches} ({selectedSize.dimensionsCm})
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {mattress.availableSizes.map((sz) => {
                  const isSelected = selectedSize?.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`p-2.5 rounded-lg text-left border transition-all ${
                        isSelected
                          ? 'border-[#242220] bg-white ring-1 ring-[#242220] shadow-xs'
                          : 'border-[#EAE3D8] bg-[#FAF8F5] hover:bg-white text-[#575047]'
                      }`}
                    >
                      <span className="block font-bold text-xs text-[#1F1C18]">
                        {sz.name}
                      </span>
                      <span className="block text-[10px] text-[#7A7369]">
                        {sz.dimensionsInches}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRIMARY CALL TO ACTION: Direct WhatsApp Enquiry with pre-filled product name, size, thickness */}
            <div className="pt-2 space-y-3">
              <WhatsAppButton
                productName={mattress.name}
                size={selectedSize?.name}
                thickness={selectedThickness ? `${selectedThickness.thicknessInches}"` : undefined}
                label={`Enquire via WhatsApp — ${mattress.name}`}
                variant="primary"
                sizeStyle="lg"
                className="w-full text-center"
              />

              <div className="flex items-center justify-center gap-4 text-xs text-[#7A7369]">
                <span>✓ Pre-filled model details</span>
                <span>✓ Instant quotation</span>
                <span>✓ Direct negotiation</span>
              </div>
            </div>

            {/* Custom Sizing note */}
            <div className="p-4 bg-[#F2ECE3]/80 rounded-xl border border-[#E0D7CA] text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#242220]">
                <Maximize2 className="w-4 h-4 text-[#8C7456]" />
                <span>Need Custom Bed Cot Measurements?</span>
              </div>
              <p className="text-[#665F55] leading-relaxed">
                If your bed frame has custom dimensions, we handcraft mattresses to any exact measurement.
              </p>
              <a
                href={getCustomSizeWhatsAppUrl(mattress.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-[#8C7456] hover:text-[#5E4D38] underline"
              >
                Request custom dimension quote for this model →
              </a>
            </div>

          </div>

        </div>

        {/* DETAILED SPECIFICATIONS & DESCRIPTION TABS / SECTIONS */}
        <div className="mt-16 pt-12 border-t border-[#EAE3D8] space-y-12">
          
          {/* Detailed Description */}
          <div className="max-w-4xl space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1F1C18]">
              Product Overview & Sleep Science
            </h2>
            <p className="text-sm sm:text-base text-[#575047] leading-relaxed">
              {mattress.fullDescription}
            </p>
          </div>

          {/* Key Features & Benefits */}
          <div className="bg-white rounded-2xl border border-[#EAE3D8] p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-[#1F1C18] mb-6">
              Key Features & Engineered Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mattress.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#D5C6B3] flex items-center justify-center text-[#8C7456] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm text-[#474037] leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-2xl border border-[#EAE3D8] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-[#1F1C18]">
                Technical Specifications
              </h3>
              <span className="text-xs text-[#7A7369] flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Factory Grade Tested
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs sm:text-sm">
              {mattress.specifications.map((spec, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-2.5 border-b border-[#F2ECE3]">
                  <span className="text-[#7A7369] font-medium">{spec.label}</span>
                  <span className="text-[#1F1C18] font-semibold text-right max-w-xs">{spec.value}</span>
                </div>
              ))}
              <div className="flex items-baseline justify-between py-2.5 border-b border-[#F2ECE3]">
                <span className="text-[#7A7369] font-medium">Foam Density</span>
                <span className="text-[#1F1C18] font-semibold">{mattress.density}</span>
              </div>
              <div className="flex items-baseline justify-between py-2.5 border-b border-[#F2ECE3]">
                <span className="text-[#7A7369] font-medium">Outer Cover</span>
                <span className="text-[#1F1C18] font-semibold">{mattress.coverFabric}</span>
              </div>
              <div className="flex items-baseline justify-between py-2.5 border-b border-[#F2ECE3]">
                <span className="text-[#7A7369] font-medium">Warranty</span>
                <span className="text-[#1F1C18] font-semibold">{mattress.warrantyYears} Years Direct Replacement</span>
              </div>
            </div>
          </div>

          {/* Who is this mattress ideal for? */}
          <div className="bg-[#F4EFEA] rounded-2xl border border-[#EAE3D8] p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-[#1F1C18] mb-4">
              Recommended Sleeping Postures
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mattress.idealFor.map((rec, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#EAE3D8] text-xs text-[#575047] leading-relaxed">
                  <span className="block font-bold text-[#8C7456] mb-1">Target Profile 0{idx + 1}</span>
                  {rec}
                </div>
              ))}
            </div>
          </div>

          {/* Related Mattresses Recommendation */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8C7456] font-semibold block">Explore More</span>
                <h3 className="font-serif text-2xl font-bold text-[#1F1C18]">
                  Other Mattresses You Might Like
                </h3>
              </div>
              <Link
                to="/mattresses"
                className="text-xs font-semibold text-[#1F1C18] hover:text-[#6D553C] underline underline-offset-4"
              >
                View all models →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMattresses.map((item) => (
                <MattressCard key={item.id} mattress={item} />
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

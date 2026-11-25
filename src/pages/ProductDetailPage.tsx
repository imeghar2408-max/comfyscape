import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  DEFAULT_MATTRESS_DIMENSIONS,
  PRODUCTS,
  formatPrice,
  getMattressVariantPrice,
  getProductBySlug,
  hasAvailablePrice,
} from '../data/products';
import { MattressSizeOption, ProductVariant } from '../types/product';
import {
  ArrowLeft,
  Check,
  Info,
  Layers,
  MessageSquare,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductImageDisplay } from '../components/common/ProductImageDisplay';
import { ProductCard } from '../components/catalogue/ProductCard';
import { SelectSizeModal } from '../components/catalogue/SelectSizeModal';
import { MattressEnquiryLink } from '../components/common/MattressEnquiryLink';
import { ProductReviewsSection } from '../components/reviews/ProductReviewsSection';
import { buildProductEnquiryWhatsAppUrl } from '../utils/whatsapp';

const FALLBACK_MATTRESS_SIZES: MattressSizeOption[] = [
  { size: 'Single', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Single, price: null },
  { size: 'Double', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Double, price: null },
  { size: 'Queen', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Queen, price: null },
  { size: 'King', dimensions: DEFAULT_MATTRESS_DIMENSIONS.King, price: null },
];

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('Queen');
  const [selectedThickness, setSelectedThickness] = useState<number | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const mattressSizes: MattressSizeOption[] =
    product?.category === 'bed'
      ? product.sizeOptions && product.sizeOptions.length > 0
        ? product.sizeOptions
        : FALLBACK_MATTRESS_SIZES
      : [];

  const productVariants: ProductVariant[] = product?.variants || [];

  // Reset gallery and variant selections when switching products
  useEffect(() => {
    if (!product) return;
    setSelectedImageIndex(0);
    setSelectedVariantIndex(0);

    if (product.category === 'bed') {
      const sizes =
        product.sizeOptions && product.sizeOptions.length > 0
          ? product.sizeOptions
          : FALLBACK_MATTRESS_SIZES;
      const defaultSize =
        sizes.find((s) => s.size === 'Queen')?.size || sizes[0]?.size || 'Single';
      setSelectedSize(defaultSize);
    }

    if (product.thicknessOptions && product.thicknessOptions.length > 0) {
      setSelectedThickness(
        product.thicknessOptions.includes(6) ? 6 : product.thicknessOptions[0]
      );
    } else {
      setSelectedThickness(null);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#FAF8F5]">
        <h2 className="font-serif text-2xl font-bold text-[#1F1C18] mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-[#665F55] mb-6">
          The requested item could not be found in our catalogue.
        </p>
        <Link
          to="/mattresses"
          className="inline-flex items-center gap-2 bg-[#0B2F57] text-white text-sm px-5 py-2.5 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const isMattress = product.category === 'bed';
  const isPillow = product.category === 'pillow';

  const activeMattressSize = isMattress
    ? mattressSizes.find((s) => s.size === selectedSize) || mattressSizes[0]
    : undefined;

  const activeVariant =
    !isMattress && productVariants.length > 0
      ? productVariants[selectedVariantIndex] || productVariants[0]
      : undefined;

  const activePrice: number | null = isMattress
    ? getMattressVariantPrice(activeMattressSize, selectedThickness)
    : activeVariant
      ? activeVariant.price
      : product.price ?? null;

  const activeDimensions = isMattress
    ? activeMattressSize?.dimensions
    : activeVariant?.dimensions || product.dimensions;

  const whatsappUrl = buildProductEnquiryWhatsAppUrl({
    productName: product.name,
    sizeLabel: isMattress ? activeMattressSize?.size : undefined,
    variantName: !isMattress ? activeVariant?.name : undefined,
    dimensions: activeDimensions,
    thicknessInches: isMattress ? selectedThickness : null,
    price: activePrice,
  });

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const categoryLabel = isMattress
    ? 'Mattresses'
    : isPillow
      ? 'Pillows'
      : 'Comforters';

  const categoryLink = isPillow
    ? '/pillows'
    : `/mattresses?category=${product.category}`;

  const subCategories = isMattress
    ? product.mattressCategories ?? []
    : isPillow
      ? product.pillowCategories ?? []
      : [];

  // Build technical specifications strictly from populated fields (never fabricating missing values)
  const specificationRows: { label: string; value: string }[] = [
    ...(subCategories.length > 0
      ? [{ label: 'Category', value: subCategories.join(', ') }]
      : []),
    { label: isPillow ? 'Filling / Material' : 'Material', value: product.material },
    ...(product.firmness ? [{ label: 'Firmness', value: product.firmness }] : []),
    ...(isMattress && product.thicknessOptions && product.thicknessOptions.length > 0
      ? [
          {
            label: 'Thickness Options',
            value: product.thicknessOptions.map((t) => `${t} inches`).join(', '),
          },
        ]
      : []),
    ...(activeDimensions
      ? [
          {
            label: isMattress ? 'Selected Dimensions' : 'Dimensions',
            value: activeDimensions,
          },
        ]
      : []),
    ...(product.coverInfo ? [{ label: 'Cover Information', value: product.coverInfo }] : []),
    ...(product.warranty ? [{ label: 'Warranty', value: product.warranty }] : []),
    ...(product.additionalSpecs ?? []),
  ];

  const activeImage = product.images[selectedImageIndex] || product.images[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Top Breadcrumb bar */}
      <div className="bg-white border-b border-[#EAE3D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Catalogue', to: '/mattresses' },
              { label: categoryLabel, to: categoryLink },
              { label: product.name },
            ]}
          />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-1 text-xs text-[#665F55] hover:text-[#1F1C18] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Interactive Gallery */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFEA] border border-[#E6DFD4] shadow-xs">
              <ProductImageDisplay
                image={activeImage}
                productName={product.name}
                category={product.category}
                variant="hero"
              />
            </div>

            {/* Interactive Thumbnail Strip */}
            {product.images.length > 1 && (
              <div
                className="flex items-center gap-3 overflow-x-auto pb-1"
                role="tablist"
                aria-label={`${product.name} product images`}
              >
                {product.images.map((img, idx) => {
                  const isActive = selectedImageIndex === idx;
                  return (
                    <button
                      key={`${img.label}-${idx}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View ${img.label}`}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] ${
                        isActive
                          ? 'border-[#0B2F57] ring-2 ring-[#0B2F57]/15'
                          : 'border-[#E6DFD4] opacity-75 hover:opacity-100 hover:border-[#C8B8A6]'
                      }`}
                    >
                      <ProductImageDisplay
                        image={img}
                        productName={product.name}
                        category={product.category}
                        variant="thumbnail"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Concise Key Attributes Bar */}
            <div className="bg-white rounded-xl border border-[#E6DFD4] p-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <Layers className="w-4 h-4 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-bold text-[#1F1C18]">
                  {product.firmness || 'Standard'}
                </span>
                <span className="text-[11px] text-[#7A7369]">Firmness</span>
              </div>
              <div className="border-x border-[#EFEAE1]">
                <Ruler className="w-4 h-4 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-bold text-[#1F1C18] truncate px-1">
                  {activeDimensions || 'Standard'}
                </span>
                <span className="text-[11px] text-[#7A7369]">Dimensions</span>
              </div>
              <div>
                <ShieldCheck className="w-4 h-4 text-[#8C7456] mx-auto mb-1" />
                <span className="block text-xs font-bold text-[#1F1C18] truncate px-1">
                  {product.warranty || product.materialType}
                </span>
                <span className="text-[11px] text-[#7A7369]">
                  {product.warranty ? 'Warranty' : 'Material Type'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info, Selectors, Pricing & WhatsApp Enquiry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Header */}
            <div className="space-y-2.5">
              {subCategories.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8C7456]">
                  {subCategories.map((cat, idx) => (
                    <React.Fragment key={cat}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{cat}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#5A534B] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selected Variant Price Card */}
            <div className="bg-white p-5 rounded-xl border border-[#E6DFD4] shadow-2xs space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#7A7369] font-semibold block">
                {isMattress && activeMattressSize
                  ? `${activeMattressSize.size} · ${activeMattressSize.dimensions}${
                      selectedThickness ? ` · ${selectedThickness} inches` : ''
                    }`
                  : activeVariant
                    ? `${activeVariant.name}${
                        activeVariant.dimensions ? ` · ${activeVariant.dimensions}` : ''
                      }`
                    : activeDimensions
                      ? `Dimensions: ${activeDimensions}`
                      : 'Selected Configuration'}
              </span>

              <div className="text-2xl sm:text-3xl font-bold text-[#0B2F57] tracking-tight">
                {formatPrice(activePrice)}
              </div>

              <p className="text-xs text-[#665F55] pt-2 border-t border-[#F1ECE4] flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8C7456] shrink-0 mt-0.5" />
                <span>
                  {hasAvailablePrice(activePrice)
                    ? 'Contact us on WhatsApp to confirm availability, delivery, or custom dimensions.'
                    : 'Pricing varies by size and configuration. Enquire directly on WhatsApp for current pricing.'}
                </span>
              </p>
            </div>

            {/* Interactive Mattress Size Selector */}
            {isMattress && mattressSizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#1F1C18] uppercase tracking-wider">
                    Select Size
                  </label>
                  {activeMattressSize && (
                    <span className="text-xs font-medium text-[#0B2F57]">
                      {activeMattressSize.dimensions}
                    </span>
                  )}
                </div>

                <div
                  className="grid grid-cols-2 gap-2.5"
                  role="radiogroup"
                  aria-label="Mattress size options"
                >
                  {mattressSizes.map((option) => {
                    const isSelected = activeMattressSize?.size === option.size;
                    const variantPrice = getMattressVariantPrice(
                      option,
                      selectedThickness
                    );

                    return (
                      <button
                        key={option.size}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSize(option.size)}
                        className={`relative p-3.5 rounded-xl text-left border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] focus-visible:ring-offset-1 ${
                          isSelected
                            ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-sm'
                            : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#1F1C18]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm">{option.size}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span
                          className={`block text-xs mt-0.5 ${
                            isSelected ? 'text-slate-200' : 'text-[#665F55]'
                          }`}
                        >
                          {option.dimensions}
                        </span>
                        <span
                          className={`block text-xs font-semibold mt-1.5 pt-1.5 border-t ${
                            isSelected
                              ? 'border-white/15 text-white'
                              : 'border-[#F1ECE4] text-[#0B2F57]'
                          }`}
                        >
                          {formatPrice(variantPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Variant Selector for Pillows / Comforters */}
            {!isMattress && productVariants.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-[#1F1C18] uppercase tracking-wider">
                  Select Size / Variant
                </label>

                <div
                  className="grid grid-cols-2 gap-2.5"
                  role="radiogroup"
                  aria-label="Product variant options"
                >
                  {productVariants.map((variant, idx) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={variant.name}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`relative p-3.5 rounded-xl text-left border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] focus-visible:ring-offset-1 ${
                          isSelected
                            ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-sm'
                            : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#1F1C18]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm">{variant.name}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                          )}
                        </div>
                        {variant.dimensions && (
                          <span
                            className={`block text-xs mt-0.5 ${
                              isSelected ? 'text-slate-200' : 'text-[#665F55]'
                            }`}
                          >
                            {variant.dimensions}
                          </span>
                        )}
                        <span
                          className={`block text-xs font-semibold mt-1.5 pt-1.5 border-t ${
                            isSelected
                              ? 'border-white/15 text-white'
                              : 'border-[#F1ECE4] text-[#0B2F57]'
                          }`}
                        >
                          {formatPrice(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Thickness Selector for Mattresses */}
            {isMattress &&
              product.thicknessOptions &&
              product.thicknessOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#1F1C18] uppercase tracking-wider">
                      Select Thickness
                    </label>
                    {selectedThickness && (
                      <span className="text-xs font-medium text-[#0B2F57]">
                        {selectedThickness} inches
                      </span>
                    )}
                  </div>
                  <div
                    className="grid grid-cols-4 gap-2"
                    role="radiogroup"
                    aria-label="Mattress thickness options"
                  >
                    {product.thicknessOptions.map((th) => {
                      const isSelected = selectedThickness === th;
                      return (
                        <button
                          key={th}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedThickness(th)}
                          className={`py-2.5 px-2 rounded-lg text-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F57] ${
                            isSelected
                              ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                              : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#1F1C18]'
                          }`}
                        >
                          <span className="block font-bold text-xs">{th}&quot;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Prominent WhatsApp Enquiry CTA + Subtle Contact Line */}
            <div className="pt-1 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20BE5B] text-white text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span>Enquire on WhatsApp</span>
              </a>

              {isMattress && (
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(true)}
                  className="w-full bg-white hover:bg-[#FAF8F5] text-[#0B2F57] border border-[#D5C6B3] hover:border-[#0B2F57] text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-colors"
                >
                  Need a Custom Bed Size?
                </button>
              )}

              <MattressEnquiryLink
                productName={product.name}
                sizeLabel={isMattress ? activeMattressSize?.size : undefined}
                variantName={!isMattress ? activeVariant?.name : undefined}
                dimensions={activeDimensions}
                thicknessInches={isMattress ? selectedThickness : null}
                price={activePrice}
                className="text-center pt-1"
              />
            </div>

            {/* Key Product Features */}
            {product.features.length > 0 && (
              <div className="bg-white p-5 rounded-xl border border-[#E6DFD4] space-y-2.5">
                <span className="text-xs font-bold text-[#1F1C18] uppercase tracking-wider block">
                  Key Features
                </span>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A453F]"
                    >
                      <Check className="w-4 h-4 text-[#8C7456] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Lower Detailed Sections */}
        <div className="mt-16 pt-12 border-t border-[#EAE3D8] space-y-10">
          {/* Layer-by-Layer Construction (only shown if populated) */}
          {product.layers && product.layers.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E6DFD4] p-6 sm:p-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-1">
                Construction Overview
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1C18] mb-6">
                Layer-by-Layer Structure
              </h2>

              <div className="space-y-3">
                {product.layers.map((layer, index) => (
                  <div
                    key={layer.name}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#0B2F57] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#1F1C18]">{layer.name}</h3>
                      <p className="text-xs sm:text-sm text-[#5A534B] mt-0.5 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Product Specifications Table */}
          {specificationRows.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E6DFD4] p-6 sm:p-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C7456] font-semibold block mb-1">
                Technical Details
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1C18] mb-6">
                Specifications &amp; Material Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs sm:text-sm">
                {specificationRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 py-2.5 border-b border-[#F1ECE4]"
                  >
                    <span className="text-[#665F55] font-medium">{row.label}</span>
                    <span className="text-[#1F1C18] font-semibold text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Available Sizes Table for Mattresses */}
          {isMattress && mattressSizes.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E6DFD4] p-6 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1C18] mb-1.5">
                Available Sizes &amp; Dimensions
              </h2>
              <p className="text-xs sm:text-sm text-[#665F55] mb-5">
                Select any row to update your chosen size above.
                {selectedThickness ? ` Showing prices for ${selectedThickness}" thickness.` : ''}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#EAE3D8] text-[11px] uppercase tracking-wider text-[#7A7369]">
                      <th className="py-2.5 px-3 font-semibold">Size</th>
                      <th className="py-2.5 px-3 font-semibold">Dimensions</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1ECE4]">
                    {mattressSizes.map((option) => {
                      const isSelected = activeMattressSize?.size === option.size;
                      const variantPrice = getMattressVariantPrice(
                        option,
                        selectedThickness
                      );

                      return (
                        <tr
                          key={option.size}
                          onClick={() => setSelectedSize(option.size)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#0B2F57]/5 font-semibold'
                              : 'hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <td className="py-3 px-3 text-[#1F1C18] flex items-center gap-2">
                            <span>{option.size}</span>
                            {isSelected && (
                              <span className="text-[10px] uppercase tracking-wider text-[#0B2F57] font-bold">
                                Selected
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-[#5A534B]">{option.dimensions}</td>
                          <td className="py-3 px-3 text-right text-[#0B2F57] font-semibold">
                            {formatPrice(variantPrice)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Genuine Customer Reviews Section (starts empty, no fabricated reviews) */}
          <ProductReviewsSection
            productId={product.id}
            productName={product.name}
            category={product.category}
          />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#1F1C18]">
                  More {categoryLabel}
                </h2>
                <Link
                  to={categoryLink}
                  className="text-xs font-semibold text-[#0B2F57] hover:underline"
                >
                  View all {categoryLabel.toLowerCase()} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Custom Size Enquiry Modal */}
      {isMattress && (
        <SelectSizeModal
          product={product}
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
        />
      )}
    </div>
  );
};

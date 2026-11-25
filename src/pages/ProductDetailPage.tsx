import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getProductBySlug,
  PRODUCTS,
  formatPrice,
  hasAvailablePrice,
  STANDARD_MATTRESS_DIMENSIONS,
} from '../data/products';
import { SizePriceOption, ProductVariant } from '../types/product';
import {
  Check,
  Layers,
  Info,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/catalogue/ProductCard';
import { SelectSizeModal } from '../components/catalogue/SelectSizeModal';
import { MattressEnquiryLink } from '../components/common/MattressEnquiryLink';
import { buildProductEnquiryWhatsAppUrl } from '../utils/whatsapp';

const FALLBACK_MATTRESS_SIZES: SizePriceOption[] = [
  { size: 'Single', dimensions: STANDARD_MATTRESS_DIMENSIONS.Single, price: null },
  { size: 'Double', dimensions: STANDARD_MATTRESS_DIMENSIONS.Double, price: null },
  { size: 'Queen', dimensions: STANDARD_MATTRESS_DIMENSIONS.Queen, price: null },
  { size: 'King', dimensions: STANDARD_MATTRESS_DIMENSIONS.King, price: null },
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

  const mattressSizes: SizePriceOption[] =
    product?.category === 'bed'
      ? product.sizePricing && product.sizePricing.length > 0
        ? product.sizePricing
        : FALLBACK_MATTRESS_SIZES
      : [];

  const productVariants: ProductVariant[] = product?.variants || [];

  // Reset selections when navigating to another product
  useEffect(() => {
    if (!product) return;
    setSelectedImageIndex(0);
    setSelectedVariantIndex(0);

    if (product.category === 'bed') {
      const sizes =
        product.sizePricing && product.sizePricing.length > 0
          ? product.sizePricing
          : FALLBACK_MATTRESS_SIZES;
      const defaultSize = sizes.find((s) => s.size === 'Queen')?.size || sizes[0]?.size || 'Single';
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
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
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

  // Active size / variant details and price
  const activeMattressSize = isMattress
    ? mattressSizes.find((s) => s.size === selectedSize) || mattressSizes[0]
    : undefined;

  const activeVariant =
    !isMattress && productVariants.length > 0
      ? productVariants[selectedVariantIndex] || productVariants[0]
      : undefined;

  const activePrice: number | null = isMattress
    ? activeMattressSize?.price ?? null
    : activeVariant
      ? activeVariant.price
      : product.price ?? product.startingPrice ?? null;

  const activeOriginalPrice: number | null = isMattress
    ? activeMattressSize?.originalPrice ?? null
    : product.originalPrice ?? null;

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

  // Build technical specifications dynamically so missing info is never fabricated
  const specificationRows: { label: string; value: string }[] = [
    ...(product.series ? [{ label: 'Series', value: product.series }] : []),
    ...(isPillow && product.pillowCategories && product.pillowCategories.length > 0
      ? [{ label: 'Pillow Category', value: product.pillowCategories.join(', ') }]
      : []),
    ...(product.materialFilling
      ? [{ label: 'Material / Filling', value: product.materialFilling }]
      : []),
    ...(product.coreMaterial
      ? [{ label: 'Core Material', value: product.coreMaterial }]
      : []),
    ...(product.density ? [{ label: 'Density / Composition', value: product.density }] : []),
    ...(product.coverFabric ? [{ label: 'Outer Cover Fabric', value: product.coverFabric }] : []),
    ...(product.feel ? [{ label: 'Firmness / Feel', value: product.feel }] : []),
    ...(isMattress && product.look ? [{ label: 'Finish / Style', value: product.look }] : []),
    ...(isMattress && product.thicknessOptions && product.thicknessOptions.length > 0
      ? [
          {
            label: 'Available Thicknesses',
            value: product.thicknessOptions.map((t) => `${t} inches`).join(', '),
          },
        ]
      : []),
    ...(activeDimensions
      ? [
          {
            label: isMattress ? 'Selected Size Dimensions' : 'Dimensions',
            value: activeDimensions,
          },
        ]
      : []),
    ...(product.warrantyYears
      ? [{ label: 'Warranty', value: `${product.warrantyYears} Years` }]
      : []),
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Top Breadcrumb bar */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Sleep Essentials', to: '/mattresses' },
              { label: categoryLabel, to: categoryLink },
              { label: product.name },
            ]}
          />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Gallery + Key Attributes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} - view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />

              {hasAvailablePrice(activePrice) &&
                hasAvailablePrice(activeOriginalPrice) &&
                product.discountText && (
                  <span className="absolute top-4 left-4 bg-[#7B2CBF] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-xs">
                    {product.discountText}
                  </span>
                )}

              {product.series && (
                <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-semibold py-1 px-3 rounded-md border border-slate-200 shadow-xs">
                  Series: {product.series}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#0B2F57] ring-2 ring-[#0B2F57]/20'
                        : 'border-slate-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Attribute Summary Strip */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-3 gap-4 text-center">
              <div>
                <Layers className="w-5 h-5 text-[#0066B2] mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">
                  {product.feel || 'Balanced'}
                </span>
                <span className="text-[11px] text-slate-500">Firmness / Feel</span>
              </div>
              <div className="border-x border-slate-100">
                <Sparkles className="w-5 h-5 text-[#0066B2] mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{product.type}</span>
                <span className="text-[11px] text-slate-500">
                  {isPillow ? 'Filling Type' : 'Core Type'}
                </span>
              </div>
              <div>
                {product.warrantyYears ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-[#0066B2] mx-auto mb-1" />
                    <span className="block text-xs font-bold text-slate-900">
                      {product.warrantyYears} Years
                    </span>
                    <span className="text-[11px] text-slate-500">Warranty</span>
                  </>
                ) : (
                  <>
                    <Ruler className="w-5 h-5 text-[#0066B2] mx-auto mb-1" />
                    <span className="block text-xs font-bold text-slate-900 truncate px-1">
                      {isMattress ? '4 Standard Sizes' : activeDimensions || 'Standard'}
                    </span>
                    <span className="text-[11px] text-slate-500">Dimensions</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Title, Price, Size/Variant Selector, WhatsApp Enquiry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Unboxed Metadata */}
            <div>
              {product.kicker && (
                <div className="text-xs font-bold text-[#E85D04] uppercase tracking-wider mb-1.5">
                  {product.kicker}
                </div>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>

              {isPillow && product.pillowCategories && product.pillowCategories.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mt-2">
                  {product.pillowCategories.map((cat, idx) => (
                    <React.Fragment key={cat}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{cat}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                {product.description}
              </p>
            </div>

            {/* Dynamic Price Box */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                {isMattress && activeMattressSize
                  ? `Selected: ${activeMattressSize.size} (${activeMattressSize.dimensions})${selectedThickness ? ` · ${selectedThickness}"` : ''}`
                  : activeVariant
                    ? `Selected: ${activeVariant.name}${activeVariant.dimensions ? ` (${activeVariant.dimensions})` : ''}`
                    : activeDimensions
                      ? `Dimensions: ${activeDimensions}`
                      : 'Catalogue Price'}
              </span>

              <div className="flex items-baseline gap-2.5 mt-1.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-[#0B2F57] tracking-tight">
                  {formatPrice(activePrice)}
                </span>
                {hasAvailablePrice(activePrice) && hasAvailablePrice(activeOriginalPrice) && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(activeOriginalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-2.5 pt-2.5 border-t border-slate-100 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#0066B2] shrink-0 mt-0.5" />
                <span>
                  {hasAvailablePrice(activePrice)
                    ? 'Contact us on WhatsApp to confirm availability, delivery, or custom size options.'
                    : 'Pricing varies by size and configuration. Enquire directly on WhatsApp for the latest price.'}
                </span>
              </p>
            </div>

            {/* Interactive Mattress Size Selector (Single, Double, Queen, King) */}
            {isMattress && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Mattress Size
                  </label>
                  {activeMattressSize && (
                    <span className="text-xs font-medium text-[#0066B2]">
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
                            : 'border-slate-200 bg-white hover:border-slate-400 text-slate-800'
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
                            isSelected ? 'text-slate-200' : 'text-slate-500'
                          }`}
                        >
                          {option.dimensions}
                        </span>
                        <span
                          className={`block text-xs font-semibold mt-1.5 pt-1.5 border-t ${
                            isSelected
                              ? 'border-white/15 text-white'
                              : 'border-slate-100 text-[#0B2F57]'
                          }`}
                        >
                          {formatPrice(option.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Variant Selector for Pillows / Comforters (when variants exist) */}
            {!isMattress && productVariants.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Variant / Size
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
                            : 'border-slate-200 bg-white hover:border-slate-400 text-slate-800'
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
                              isSelected ? 'text-slate-200' : 'text-slate-500'
                            }`}
                          >
                            {variant.dimensions}
                          </span>
                        )}
                        <span
                          className={`block text-xs font-semibold mt-1.5 pt-1.5 border-t ${
                            isSelected
                              ? 'border-white/15 text-white'
                              : 'border-slate-100 text-[#0B2F57]'
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
            {isMattress && product.thicknessOptions && product.thicknessOptions.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Thickness
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {product.thicknessOptions.map((th) => {
                    const isSelected = selectedThickness === th;
                    return (
                      <button
                        key={th}
                        type="button"
                        onClick={() => setSelectedThickness(th)}
                        className={`py-2.5 px-2 rounded-lg text-center border-2 transition-all ${
                          isSelected
                            ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-400 text-slate-700'
                        }`}
                      >
                        <span className="block font-bold text-xs">{th}&quot;</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary WhatsApp Enquiry Button */}
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
                  className="w-full bg-white hover:bg-slate-50 text-[#0B2F57] border border-slate-300 hover:border-[#0B2F57] text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-colors"
                >
                  Need a Custom Bed Size?
                </button>
              )}

              {isMattress && (
                <MattressEnquiryLink
                  productName={product.name}
                  className="text-center pt-1"
                />
              )}
            </div>

            {/* Product Highlights */}
            {product.bullets.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Key Highlights
                </span>
                {product.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 space-y-10">
          {specificationRows.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Specifications &amp; Material Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs sm:text-sm">
                {specificationRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 py-2.5 border-b border-slate-100"
                  >
                    <span className="text-slate-500 font-medium">{row.label}</span>
                    <span className="text-slate-900 font-semibold text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Mattress Sizes Reference Table */}
          {isMattress && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Available Mattress Sizes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                Click any size row to select it above and enquire directly on WhatsApp.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                      <th className="py-2.5 px-3 font-semibold">Size</th>
                      <th className="py-2.5 px-3 font-semibold">Dimensions</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mattressSizes.map((option) => {
                      const isSelected = activeMattressSize?.size === option.size;
                      return (
                        <tr
                          key={option.size}
                          onClick={() => setSelectedSize(option.size)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#0B2F57]/5 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-3 text-slate-900 flex items-center gap-2">
                            <span>{option.size}</span>
                            {isSelected && (
                              <span className="text-[10px] uppercase tracking-wider text-[#0066B2] font-bold">
                                Selected
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-600">{option.dimensions}</td>
                          <td className="py-3 px-3 text-right text-[#0B2F57] font-semibold">
                            {formatPrice(option.price)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Related Models */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  More {categoryLabel}
                </h2>
                <Link
                  to={categoryLink}
                  className="text-xs font-bold text-[#0066B2] hover:underline"
                >
                  View all {categoryLabel.toLowerCase()} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
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

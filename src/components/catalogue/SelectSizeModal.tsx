import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductItem, MattressSizeOption } from '../../types/product';
import {
  DEFAULT_MATTRESS_DIMENSIONS,
  formatPrice,
  getMattressVariantPrice,
  getProductDetailPath,
} from '../../data/products';
import { buildProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import { ProductImageDisplay } from '../common/ProductImageDisplay';

interface SelectSizeModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_SIZES: MattressSizeOption[] = [
  { size: 'Single', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Single, price: null },
  { size: 'Double', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Double, price: null },
  { size: 'Queen', dimensions: DEFAULT_MATTRESS_DIMENSIONS.Queen, price: null },
  { size: 'King', dimensions: DEFAULT_MATTRESS_DIMENSIONS.King, price: null },
];

export const SelectSizeModal: React.FC<SelectSizeModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Custom Size');
  const [selectedThickness, setSelectedThickness] = useState<number | null>(6);
  const [customDimensions, setCustomDimensions] = useState<string>('');

  const sizeOptions =
    product?.sizeOptions && product.sizeOptions.length > 0
      ? product.sizeOptions
      : FALLBACK_SIZES;

  useEffect(() => {
    if (product) {
      setSelectedSize('Custom Size');
      setSelectedThickness(
        product.thicknessOptions && product.thicknessOptions.length > 0
          ? product.thicknessOptions.includes(6)
            ? 6
            : product.thicknessOptions[0]
          : null
      );
      setCustomDimensions('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const activeSizeOption = sizeOptions.find((s) => s.size === selectedSize);
  const activePrice =
    selectedSize === 'Custom Size'
      ? null
      : getMattressVariantPrice(activeSizeOption, selectedThickness);

  const activeDimensions =
    selectedSize === 'Custom Size'
      ? customDimensions.trim() || 'Custom dimensions'
      : activeSizeOption?.dimensions;

  const whatsappUrl = buildProductEnquiryWhatsAppUrl({
    productName: product.name,
    sizeLabel: selectedSize,
    dimensions: activeDimensions,
    thicknessInches: selectedThickness,
    price: activePrice,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6DFD4] max-h-[90vh] overflow-y-auto space-y-6"
        role="dialog"
        aria-modal="true"
        aria-label={`Custom size enquiry for ${product.name}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Quick Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-[#EFEAE1]">
          <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border border-[#EAE3D8] shrink-0">
            <ProductImageDisplay
              image={product.images[0]}
              productName={product.name}
              category={product.category}
              variant="thumbnail"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7456]">
              Size &amp; Dimension Enquiry
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1C18]">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className="text-base font-bold text-[#0B2F57]">
                {formatPrice(activePrice)}
              </span>
              <span className="text-xs text-[#665F55]">
                ({selectedSize}
                {activeDimensions ? ` · ${activeDimensions}` : ''}
                {selectedThickness ? ` · ${selectedThickness}"` : ''})
              </span>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-[#1F1C18] uppercase tracking-wider">
            1. Select Size
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {sizeOptions.map((option) => {
              const isSelected = selectedSize === option.size;
              const optionPrice = getMattressVariantPrice(option, selectedThickness);
              return (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                      : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#4A453F]'
                  }`}
                >
                  <span className="block font-bold text-xs">{option.size}</span>
                  <span
                    className={`block text-[11px] mt-0.5 ${
                      isSelected ? 'text-slate-200' : 'text-[#7A7369]'
                    }`}
                  >
                    {option.dimensions}
                  </span>
                  <span
                    className={`block text-[11px] font-semibold mt-1 ${
                      isSelected ? 'text-white' : 'text-[#0B2F57]'
                    }`}
                  >
                    {formatPrice(optionPrice)}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setSelectedSize('Custom Size')}
              className={`col-span-2 p-3 rounded-xl text-left border transition-all ${
                selectedSize === 'Custom Size'
                  ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                  : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#4A453F]'
              }`}
            >
              <span className="block font-bold text-xs">Custom Size</span>
              <span
                className={`block text-[11px] mt-0.5 ${
                  selectedSize === 'Custom Size' ? 'text-slate-200' : 'text-[#7A7369]'
                }`}
              >
                Tailored to your bed frame dimensions · Price on enquiry
              </span>
            </button>
          </div>

          {selectedSize === 'Custom Size' && (
            <div className="pt-2">
              <label className="block text-[11px] font-medium text-[#5A534B] mb-1">
                Enter your bed frame dimensions (Length × Width in inches):
              </label>
              <input
                type="text"
                value={customDimensions}
                onChange={(e) => setCustomDimensions(e.target.value)}
                placeholder="e.g. 75 × 62 inches"
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DED5C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              />
            </div>
          )}
        </div>

        {/* Thickness Selection */}
        {product.thicknessOptions && product.thicknessOptions.length > 0 && (
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-[#1F1C18] uppercase tracking-wider">
              2. Select Thickness
            </label>
            <div className="grid grid-cols-4 gap-2">
              {product.thicknessOptions.map((th) => {
                const isSelected = selectedThickness === th;
                return (
                  <button
                    key={th}
                    type="button"
                    onClick={() => setSelectedThickness(th)}
                    className={`py-2.5 px-2 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                        : 'border-[#E0D7CB] bg-white hover:border-[#8C7456] text-[#4A453F]'
                    }`}
                  >
                    <span className="block font-bold text-xs">{th} in</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>

          <Link
            to={getProductDetailPath(product)}
            onClick={onClose}
            className="w-full border border-[#DED5C8] hover:border-[#0B2F57] text-[#4A453F] hover:text-[#1F1C18] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Product Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

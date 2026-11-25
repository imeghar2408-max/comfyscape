import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductItem, SizePriceOption } from '../../types/product';
import {
  formatPrice,
  getProductDetailPath,
  STANDARD_MATTRESS_DIMENSIONS,
} from '../../data/products';
import { buildProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface SelectSizeModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SIZES: SizePriceOption[] = [
  { size: 'Single', dimensions: STANDARD_MATTRESS_DIMENSIONS.Single, price: null },
  { size: 'Double', dimensions: STANDARD_MATTRESS_DIMENSIONS.Double, price: null },
  { size: 'Queen', dimensions: STANDARD_MATTRESS_DIMENSIONS.Queen, price: null },
  { size: 'King', dimensions: STANDARD_MATTRESS_DIMENSIONS.King, price: null },
];

export const SelectSizeModal: React.FC<SelectSizeModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Queen');
  const [selectedThickness, setSelectedThickness] = useState<number | null>(6);
  const [customDimensions, setCustomDimensions] = useState<string>('');

  const sizeOptions = product?.sizePricing && product.sizePricing.length > 0
    ? product.sizePricing
    : DEFAULT_SIZES;

  useEffect(() => {
    if (product) {
      const hasQueen = sizeOptions.some((s) => s.size === 'Queen');
      setSelectedSize(hasQueen ? 'Queen' : sizeOptions[0]?.size || 'Single');
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
  const activePrice = selectedSize === 'Custom Size' ? null : (activeSizeOption?.price ?? null);
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
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6"
        role="dialog"
        aria-modal="true"
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
        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg border border-slate-200"
          />
          <div>
            {product.kicker && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B2F57]">
                {product.kicker}
              </span>
            )}
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className="text-lg font-bold text-[#0B2F57]">
                {formatPrice(activePrice)}
              </span>
              <span className="text-xs text-slate-500">
                ({selectedSize}
                {activeDimensions ? ` · ${activeDimensions}` : ''}
                {selectedThickness ? ` · ${selectedThickness}"` : ''})
              </span>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            1. Select Size
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {sizeOptions.map((option) => {
              const isSelected = selectedSize === option.size;
              return (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-[#0B2F57] bg-[#0B2F57] text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block font-bold text-xs">{option.size}</span>
                  <span
                    className={`block text-[11px] mt-0.5 ${
                      isSelected ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {option.dimensions}
                  </span>
                  <span
                    className={`block text-[11px] font-semibold mt-1 ${
                      isSelected ? 'text-white' : 'text-[#0B2F57]'
                    }`}
                  >
                    {formatPrice(option.price)}
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
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="block font-bold text-xs">Custom Size</span>
              <span
                className={`block text-[11px] mt-0.5 ${
                  selectedSize === 'Custom Size' ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                Tailored to your bed frame dimensions · Price on enquiry
              </span>
            </button>
          </div>

          {selectedSize === 'Custom Size' && (
            <div className="pt-2">
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Enter your bed frame dimensions (Length × Width in inches):
              </label>
              <input
                type="text"
                value={customDimensions}
                onChange={(e) => setCustomDimensions(e.target.value)}
                placeholder="e.g. 75 × 62 inches"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              />
            </div>
          )}
        </div>

        {/* Thickness Selection */}
        {product.thicknessOptions && product.thicknessOptions.length > 0 && (
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
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
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold text-xs">{th} Inches</span>
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
            className="w-full border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Product Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { ProductItem } from '../../types/product';
import {
  formatPrice,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../../data/products';
import { buildProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface CompareModalProps {
  products: ProductItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  products,
  isOpen,
  onClose,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    products[0]?.id || '',
    products[1]?.id || '',
  ]);

  if (!isOpen) return null;

  const handleSelectProduct = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const selectedProducts = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as ProductItem[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close comparison"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-[#0066B2] uppercase tracking-wider">
            Side-by-Side Analysis
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            Compare Mattresses
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare core materials, firmness feel, thickness options, and pricing to find your ideal match.
          </p>
        </div>

        {/* Product selector dropdowns */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
          {[0, 1].map((colIndex) => (
            <div key={colIndex} className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase">
                Mattress {colIndex + 1}
              </label>
              <select
                value={selectedIds[colIndex]}
                onChange={(e) => handleSelectProduct(colIndex, e.target.value)}
                className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.feel ? `(${p.feel})` : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 text-slate-400 font-semibold uppercase text-[10px] w-1/4">
                  Feature
                </th>
                {selectedProducts.map((p) => {
                  const displayPrice = getProductDisplayPrice(p);
                  return (
                    <th key={p.id} className="py-3 px-3 text-slate-900 font-bold w-3/8 text-sm">
                      <div className="space-y-2">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200"
                        />
                        <span className="block font-serif line-clamp-1">{p.name}</span>
                        <div className="text-sm text-[#0B2F57] font-bold">
                          {hasAvailablePrice(displayPrice)
                            ? `From ${formatPrice(displayPrice)}`
                            : formatPrice(null)}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Feel & Firmness</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 font-medium text-slate-800">
                    {p.feel || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Core Material</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-slate-600">
                    {p.coreMaterial || p.type}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Look & Finish</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-slate-600">
                    {p.look || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Available Thickness</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-slate-600">
                    {p.thicknessOptions && p.thicknessOptions.length > 0
                      ? `${p.thicknessOptions.join('", ')}"`
                      : '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Available Sizes</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-slate-600">
                    {p.sizePricing
                      ? p.sizePricing.map((s) => s.size).join(', ')
                      : p.availableSizes.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Direct Consultation</td>
                {selectedProducts.map((p) => {
                  const displayPrice = getProductDisplayPrice(p);
                  const waUrl = buildProductEnquiryWhatsAppUrl({
                    productName: p.name,
                    price: displayPrice,
                  });
                  return (
                    <td key={p.id} className="py-3 px-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BE5B] text-white text-[11px] font-bold py-2 px-3 rounded-lg shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

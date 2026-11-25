import React, { useEffect, useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { ProductItem } from '../../types/product';
import {
  formatPrice,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../../data/products';
import { buildProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import { ProductImageDisplay } from '../common/ProductImageDisplay';

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

  useEffect(() => {
    if (products.length >= 2 && (!selectedIds[0] || !selectedIds[1])) {
      setSelectedIds([products[0].id, products[1].id]);
    }
  }, [products]);

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
      <div className="relative bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6DFD4] max-h-[92vh] overflow-y-auto space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close comparison"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-semibold text-[#8C7456] uppercase tracking-[0.2em]">
            Side-by-Side Comparison
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1F1C18] mt-1">
            Compare Mattresses
          </h2>
          <p className="text-xs text-[#665F55] mt-0.5">
            Compare materials, firmness, thickness options, and available sizes side by side.
          </p>
        </div>

        {/* Product selector dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#EFEAE1]">
          {[0, 1].map((colIndex) => (
            <div key={colIndex} className="space-y-1">
              <label className="text-[11px] font-bold text-[#4A453F] uppercase tracking-wider">
                Mattress {colIndex + 1}
              </label>
              <select
                value={selectedIds[colIndex]}
                onChange={(e) => handleSelectProduct(colIndex, e.target.value)}
                className="w-full text-xs font-medium py-2.5 px-3 bg-[#FAF8F5] border border-[#DED5C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.firmness ? `(${p.firmness})` : ''}
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
              <tr className="border-b border-[#EAE3D8]">
                <th className="py-3 px-3 text-[#7A7369] font-semibold uppercase text-[10px] w-1/4">
                  Specification
                </th>
                {selectedProducts.map((p) => {
                  const displayPrice = getProductDisplayPrice(p);
                  return (
                    <th key={p.id} className="py-3 px-3 text-[#1F1C18] font-bold w-3/8 text-sm align-top">
                      <div className="space-y-2">
                        <div className="w-full h-28 rounded-lg overflow-hidden border border-[#EAE3D8]">
                          <ProductImageDisplay
                            image={p.images[0]}
                            productName={p.name}
                            category={p.category}
                            variant="thumbnail"
                          />
                        </div>
                        <span className="block font-serif">{p.name}</span>
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
            <tbody className="divide-y divide-[#F1ECE4]">
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">Category</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-[#5A534B]">
                    {p.mattressCategories?.join(', ') || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">Firmness</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 font-medium text-[#1F1C18]">
                    {p.firmness || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">Material</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-[#5A534B]">
                    {p.material}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">Available Thickness</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-[#5A534B]">
                    {p.thicknessOptions && p.thicknessOptions.length > 0
                      ? p.thicknessOptions.map((t) => `${t}"`).join(', ')
                      : '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">Available Sizes</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-3 text-[#5A534B]">
                    {p.sizeOptions && p.sizeOptions.length > 0
                      ? p.sizeOptions.map((s) => s.size).join(', ')
                      : '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#4A453F]">WhatsApp Enquiry</td>
                {selectedProducts.map((p) => {
                  const defaultSize = p.sizeOptions?.find((s) => s.size === 'Queen') || p.sizeOptions?.[0];
                  const defaultThickness = p.thicknessOptions?.[0] ?? null;
                  const waUrl = buildProductEnquiryWhatsAppUrl({
                    productName: p.name,
                    sizeLabel: defaultSize?.size,
                    dimensions: defaultSize?.dimensions,
                    thicknessInches: defaultThickness,
                    price: getProductDisplayPrice(p),
                  });
                  return (
                    <td key={p.id} className="py-3 px-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BE5B] text-white text-[11px] font-bold py-2 px-3 rounded-lg shadow-2xs transition-colors"
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

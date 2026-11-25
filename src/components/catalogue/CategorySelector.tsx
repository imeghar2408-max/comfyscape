import React from 'react';
import { ArrowRight, BedDouble, Cloud, Layers } from 'lucide-react';
import {
  COMFORTER_PRODUCTS,
  MATTRESS_PRODUCTS,
  PILLOW_PRODUCTS,
  SLEEP_CATEGORIES,
} from '../../data/products';
import { ProductCategory } from '../../types/product';

interface CategorySelectorProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onViewAllClick?: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  onSelectCategory,
  onViewAllClick,
}) => {
  const categoryCounts: Record<ProductCategory, number> = {
    bed: MATTRESS_PRODUCTS.length,
    pillow: PILLOW_PRODUCTS.length,
    comforter: COMFORTER_PRODUCTS.length,
  };

  const renderCategoryIcon = (id: ProductCategory, isActive: boolean) => {
    const colorClass = isActive ? 'text-[#0B2F57]' : 'text-[#8C7456] group-hover:text-[#0B2F57]';
    switch (id) {
      case 'bed':
        return <BedDouble className={`w-6 h-6 transition-colors ${colorClass}`} strokeWidth={1.6} />;
      case 'pillow':
        return <Cloud className={`w-6 h-6 transition-colors ${colorClass}`} strokeWidth={1.6} />;
      case 'comforter':
        return <Layers className={`w-6 h-6 transition-colors ${colorClass}`} strokeWidth={1.6} />;
    }
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7456] block mb-1">
            Sleep Essentials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1C18] tracking-tight">
            Browse by Category
          </h2>
        </div>

        {onViewAllClick && (
          <button
            type="button"
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B2F57] hover:text-[#133F72] uppercase tracking-wider transition-colors group self-start sm:self-auto"
          >
            <span>
              All{' '}
              {activeCategory === 'bed'
                ? 'Mattresses'
                : activeCategory === 'pillow'
                  ? 'Pillows'
                  : 'Comforters'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* 3 Core Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {SLEEP_CATEGORIES.filter((cat) => categoryCounts[cat.id] > 0).map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 bg-white border ${
                isActive
                  ? 'border-[#0B2F57] ring-1 ring-[#0B2F57] shadow-sm'
                  : 'border-[#E6DFD4] hover:border-[#C8B8A6] hover:shadow-xs'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-[#0B2F57]/10' : 'bg-[#F4EFEA]'
                }`}
              >
                {renderCategoryIcon(cat.id, isActive)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-serif text-base font-bold transition-colors ${
                      isActive ? 'text-[#0B2F57]' : 'text-[#1F1C18]'
                    }`}
                  >
                    {cat.shortName}
                  </span>
                  <span className="text-xs text-[#7A7369]">
                    ({categoryCounts[cat.id]})
                  </span>
                </div>
                <p className="text-xs text-[#6B6359] line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

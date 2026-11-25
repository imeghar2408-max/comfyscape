import React from 'react';
import {
  getAvailableMattressCategories,
  getAvailablePillowCategories,
  MATTRESS_PRODUCTS,
  PILLOW_PRODUCTS,
} from '../../data/products';
import { ProductCategory } from '../../types/product';

interface HorizontalFilterBarProps {
  activeCategory: ProductCategory;
  selectedMattressCategory: string;
  onSelectMattressCategory: (category: string) => void;
  selectedPillowCategory: string;
  onSelectPillowCategory: (category: string) => void;
}

/**
 * Clean horizontal category navigation bar.
 * Automatically renders ONLY categories that have at least one product.
 */
export const HorizontalFilterBar: React.FC<HorizontalFilterBarProps> = ({
  activeCategory,
  selectedMattressCategory,
  onSelectMattressCategory,
  selectedPillowCategory,
  onSelectPillowCategory,
}) => {
  if (activeCategory === 'comforter') {
    return null;
  }

  if (activeCategory === 'pillow') {
    const categories = getAvailablePillowCategories();
    if (categories.length === 0) return null;

    return (
      <div className="bg-white p-4 rounded-xl border border-[#E6DFD4] shadow-2xs mb-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-[#1F1C18] tracking-wide uppercase shrink-0">
            Pillow Type:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            <button
              type="button"
              onClick={() => onSelectPillowCategory('All')}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                selectedPillowCategory === 'All'
                  ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                  : 'bg-[#FAF8F5] text-[#4A453F] border-[#E0D7CB] hover:border-[#8C7456]'
              }`}
            >
              All ({PILLOW_PRODUCTS.length})
            </button>

            {categories.map(({ name, count }) => {
              const isActive = selectedPillowCategory === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onSelectPillowCategory(name)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                    isActive
                      ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                      : 'bg-[#FAF8F5] text-[#4A453F] border-[#E0D7CB] hover:border-[#8C7456]'
                  }`}
                >
                  {name}{' '}
                  <span className={isActive ? 'text-slate-200' : 'text-[#8A8275]'}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Mattress categories (non-empty only)
  const mattressCategories = getAvailableMattressCategories();
  if (mattressCategories.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl border border-[#E6DFD4] shadow-2xs mb-8">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-bold text-[#1F1C18] tracking-wide uppercase shrink-0">
          Mattress Type:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          <button
            type="button"
            onClick={() => onSelectMattressCategory('All')}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
              selectedMattressCategory === 'All'
                ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                : 'bg-[#FAF8F5] text-[#4A453F] border-[#E0D7CB] hover:border-[#8C7456]'
            }`}
          >
            All ({MATTRESS_PRODUCTS.length})
          </button>

          {mattressCategories.map(({ name, count }) => {
            const isActive = selectedMattressCategory === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onSelectMattressCategory(name)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                    : 'bg-[#FAF8F5] text-[#4A453F] border-[#E0D7CB] hover:border-[#8C7456]'
                }`}
              >
                {name}{' '}
                <span className={isActive ? 'text-slate-200' : 'text-[#8A8275]'}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

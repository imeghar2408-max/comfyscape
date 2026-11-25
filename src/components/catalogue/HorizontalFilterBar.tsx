import React from 'react';
import {
  BENEFIT_FILTERS,
  SERIES_FILTERS,
  PILLOW_CATEGORIES,
  PILLOW_PRODUCTS,
} from '../../data/products';
import { ProductCategory } from '../../types/product';

interface HorizontalFilterBarProps {
  activeCategory: ProductCategory;
  selectedBenefit: string;
  onSelectBenefit: (benefit: string) => void;
  selectedSeries: string;
  onSelectSeries: (series: string) => void;
  selectedPillowCategory: string;
  onSelectPillowCategory: (category: string) => void;
}

export const HorizontalFilterBar: React.FC<HorizontalFilterBarProps> = ({
  activeCategory,
  selectedBenefit,
  onSelectBenefit,
  selectedSeries,
  onSelectSeries,
  selectedPillowCategory,
  onSelectPillowCategory,
}) => {
  // Pillow-specific horizontal category filter bar
  if (activeCategory === 'pillow') {
    const allCategories = ['All', ...PILLOW_CATEGORIES];

    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs mb-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-800 tracking-wide shrink-0 min-w-[72px]">
            Category:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {allCategories.map((cat) => {
              const isActive = selectedPillowCategory === cat;
              const count =
                cat === 'All'
                  ? PILLOW_PRODUCTS.length
                  : PILLOW_PRODUCTS.filter((p) => p.pillowCategories?.includes(cat as any)).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectPillowCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors duration-150 border ${
                    isActive
                      ? 'bg-[#0B2F57] text-white border-[#0B2F57] shadow-xs'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  {count > 0 && (
                    <span className={`ml-1.5 text-[10px] ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Comforter category doesn't need mattress-only benefit/series filters
  if (activeCategory === 'comforter') {
    return null;
  }

  // Mattress (bed) horizontal filter bar
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs mb-8 space-y-3.5">
      {/* Row 1: Benefit Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-bold text-slate-800 tracking-wide shrink-0 min-w-[60px]">
          Benefit:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {BENEFIT_FILTERS.map((benefit) => {
            const isActive = selectedBenefit === benefit;
            return (
              <button
                key={benefit}
                type="button"
                onClick={() => onSelectBenefit(benefit)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors duration-150 border ${
                  isActive
                    ? 'bg-[#0B2F57] text-white border-[#0B2F57] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {benefit}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Series Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-800 tracking-wide shrink-0 min-w-[60px]">
          Series:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {SERIES_FILTERS.map((series) => {
            const isActive = selectedSeries === series;
            return (
              <button
                key={series}
                type="button"
                onClick={() => onSelectSeries(series)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors duration-150 border ${
                  isActive
                    ? 'bg-[#0B2F57] text-white border-[#0B2F57] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {series}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { ProductCategory } from '../../types/product';

export interface PriceRangeOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export const PRICE_RANGE_OPTIONS: readonly PriceRangeOption[] = [
  { id: 'All', label: 'All Prices' },
  { id: 'under-10000', label: 'Under ₹10,000', max: 10000 },
  { id: '10000-20000', label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { id: '20000-35000', label: '₹20,000 – ₹35,000', min: 20000, max: 35000 },
  { id: 'above-35000', label: 'Above ₹35,000', min: 35000 },
];

interface SidebarFilterProps {
  activeCategory: ProductCategory;
  categoryOptions: string[];
  selectedSubCategory: string;
  onSubCategoryChange: (val: string) => void;
  materialOptions: string[];
  material: string;
  onMaterialChange: (val: string) => void;
  firmnessOptions: string[];
  firmness: string;
  onFirmnessChange: (val: string) => void;
  thicknessOptions: number[];
  thickness: string;
  onThicknessChange: (val: string) => void;
  sizeOptions: string[];
  size: string;
  onSizeChange: (val: string) => void;
  hasPricedProducts: boolean;
  priceRange: string;
  onPriceRangeChange: (val: string) => void;
  onResetAll: () => void;
  isFiltered: boolean;
}

/**
 * Data-driven sidebar filter panel.
 * Only renders filter sections and options that actually exist in the current catalogue,
 * and reveals the Price filter automatically once numeric prices are populated.
 */
export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  activeCategory,
  categoryOptions,
  selectedSubCategory,
  onSubCategoryChange,
  materialOptions,
  material,
  onMaterialChange,
  firmnessOptions,
  firmness,
  onFirmnessChange,
  thicknessOptions,
  thickness,
  onThicknessChange,
  sizeOptions,
  size,
  onSizeChange,
  hasPricedProducts,
  priceRange,
  onPriceRangeChange,
  onResetAll,
  isFiltered,
}) => {
  const renderFilterGroup = (
    label: string,
    options: { value: string; display: string }[],
    selectedVal: string,
    onSelect: (val: string) => void,
    columns: 1 | 2 = 2
  ) => {
    if (options.length <= 1) return null;

    return (
      <div className="border-b border-[#EFEAE1] pb-5 mb-5 last:border-b-0 last:pb-0 last:mb-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-[#1F1C18] tracking-wider uppercase">
            {label}
          </span>
          {selectedVal !== 'All' && (
            <button
              type="button"
              onClick={() => onSelect('All')}
              className="text-[11px] text-[#0B2F57] hover:underline font-medium"
            >
              Reset
            </button>
          )}
        </div>

        <div className={`grid ${columns === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {options.map((opt) => {
            const isSelected = selectedVal === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSelect(opt.value)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium ${
                  columns === 1 ? 'text-left' : 'text-center'
                } transition-colors border ${
                  isSelected
                    ? 'bg-[#0B2F57] text-white border-[#0B2F57]'
                    : 'bg-[#FAF8F5] text-[#4A453F] border-[#E2D9CC] hover:border-[#8C7456] hover:text-[#1F1C18]'
                }`}
              >
                {opt.display}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const toOptions = (values: string[], suffix?: string) => [
    { value: 'All', display: 'All' },
    ...values.map((v) => ({
      value: v,
      display: suffix ? `${v}${suffix}` : v,
    })),
  ];

  return (
    <aside className="bg-white p-5 rounded-xl border border-[#E6DFD4] shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFEAE1]">
        <h3 className="text-sm font-bold text-[#1F1C18] uppercase tracking-wider">
          Filter By
        </h3>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetAll}
            className="flex items-center gap-1 text-xs text-[#0B2F57] hover:underline font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {categoryOptions.length > 0 &&
        renderFilterGroup(
          activeCategory === 'bed' ? 'Mattress Type' : 'Pillow Type',
          toOptions(categoryOptions),
          selectedSubCategory,
          onSubCategoryChange,
          1
        )}

      {materialOptions.length > 0 &&
        renderFilterGroup(
          'Material',
          toOptions(materialOptions),
          material,
          onMaterialChange,
          materialOptions.length > 4 ? 2 : 1
        )}

      {firmnessOptions.length > 0 &&
        renderFilterGroup(
          'Firmness',
          toOptions(firmnessOptions),
          firmness,
          onFirmnessChange,
          1
        )}

      {activeCategory === 'bed' &&
        thicknessOptions.length > 0 &&
        renderFilterGroup(
          'Thickness',
          toOptions(
            thicknessOptions.map(String),
            ' in'
          ),
          thickness,
          onThicknessChange,
          2
        )}

      {sizeOptions.length > 0 &&
        renderFilterGroup(
          'Size',
          toOptions(sizeOptions),
          size,
          onSizeChange,
          sizeOptions.some((s) => s.length > 10) ? 1 : 2
        )}

      {hasPricedProducts &&
        renderFilterGroup(
          'Price Range',
          PRICE_RANGE_OPTIONS.map((opt) => ({ value: opt.id, display: opt.label })),
          priceRange,
          onPriceRangeChange,
          1
        )}
    </aside>
  );
};

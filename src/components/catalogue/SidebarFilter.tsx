import React from 'react';
import { RotateCcw } from 'lucide-react';
import { ProductCategory } from '../../types/product';
import { PILLOW_CATEGORIES } from '../../data/products';

interface SidebarFilterProps {
  activeCategory: ProductCategory;
  feel: string;
  onFeelChange: (val: string) => void;
  look: string;
  onLookChange: (val: string) => void;
  size: string;
  onSizeChange: (val: string) => void;
  thickness: string;
  onThicknessChange: (val: string) => void;
  type: string;
  onTypeChange: (val: string) => void;
  pillowCategory: string;
  onPillowCategoryChange: (val: string) => void;
  onResetAll: () => void;
  isFiltered: boolean;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  activeCategory,
  feel,
  onFeelChange,
  look,
  onLookChange,
  size,
  onSizeChange,
  thickness,
  onThicknessChange,
  type,
  onTypeChange,
  pillowCategory,
  onPillowCategoryChange,
  onResetAll,
  isFiltered,
}) => {
  const feelOptions = ['All', 'Firm', 'Medium Firm', 'Medium Soft', 'Gentle'];
  const lookOptions = ['All', 'Tight Top', 'Euro Top'];
  const mattressSizeOptions = ['All', 'Single', 'Double', 'Queen', 'King', 'Custom Size'];
  const thicknessOptions = ['All', '4', '5', '6', '7', '8', '9', '10', '12'];
  const mattressTypeOptions = ['All', 'Foam', 'Spring', 'Coir', 'Latex', 'Memory', 'Hybrid'];
  const pillowTypeOptions = ['All', 'Memory', 'Microfiber', 'Fiber', 'Latex'];
  const comforterSizeOptions = ['All', 'Single', 'King'];

  const renderFilterGrid = (
    label: string,
    options: readonly string[],
    selectedVal: string,
    onSelect: (val: string) => void,
    unitSuffix?: string,
    columns: 1 | 2 = 2
  ) => {
    return (
      <div className="border-b border-slate-100 pb-5 mb-5 last:border-b-0 last:pb-0 last:mb-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            {label}
          </span>
          {selectedVal !== 'All' && (
            <button
              type="button"
              onClick={() => onSelect('All')}
              className="text-[10px] text-[#0066B2] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className={`grid ${columns === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {options.map((opt) => {
            const isSelected = selectedVal === opt;
            const displayText = unitSuffix && opt !== 'All' ? `${opt} ${unitSuffix}` : opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(opt)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium ${
                  columns === 1 ? 'text-left' : 'text-center'
                } transition-all duration-150 border ${
                  isSelected
                    ? 'bg-[#0B2F57] text-white border-[#0B2F57] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {displayText}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Filter By
        </h3>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetAll}
            className="flex items-center gap-1 text-xs text-[#0066B2] hover:text-[#004B80] font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {activeCategory === 'bed' && (
        <>
          {renderFilterGrid('FEEL', feelOptions, feel, onFeelChange)}
          {renderFilterGrid('LOOK', lookOptions, look, onLookChange)}
          {renderFilterGrid('SIZE', mattressSizeOptions, size, onSizeChange)}
          {renderFilterGrid('THICKNESS', thicknessOptions, thickness, onThicknessChange, 'Inches')}
          {renderFilterGrid('TYPE', mattressTypeOptions, type, onTypeChange)}
        </>
      )}

      {activeCategory === 'pillow' && (
        <>
          {renderFilterGrid(
            'PILLOW CATEGORY',
            ['All', ...PILLOW_CATEGORIES],
            pillowCategory,
            onPillowCategoryChange,
            undefined,
            1
          )}
          {renderFilterGrid('FIRMNESS / FEEL', feelOptions, feel, onFeelChange)}
          {renderFilterGrid('MATERIAL / FILLING', pillowTypeOptions, type, onTypeChange)}
        </>
      )}

      {activeCategory === 'comforter' && (
        <>
          {renderFilterGrid('SIZE', comforterSizeOptions, size, onSizeChange)}
          {renderFilterGrid('FEEL', feelOptions, feel, onFeelChange)}
        </>
      )}
    </aside>
  );
};

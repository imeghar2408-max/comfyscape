import React from 'react';
import { SLEEP_CATEGORIES } from '../../data/products';
import { ProductCategory } from '../../types/product';
import { ArrowRight, Bed, Cloud, Layers } from 'lucide-react';

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
  // Category specific icon helper
  const renderCategoryIcon = (id: ProductCategory) => {
    switch (id) {
      case 'bed':
        return <Bed className="w-8 h-8 text-[#0B2F57]" />;
      case 'pillow':
        return <Cloud className="w-8 h-8 text-[#0B2F57]" />;
      case 'comforter':
        return <Layers className="w-8 h-8 text-[#0B2F57]" />;
    }
  };

  return (
    <div className="mb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E85D04] mb-1">
            <span className="w-4 h-[2px] bg-[#E85D04]" />
            <span>SLEEP ESSENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2F57] tracking-tight">
            Discover Sleep Categories
          </h2>
        </div>

        {onViewAllClick && (
          <button
            type="button"
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066B2] hover:text-[#004B80] uppercase tracking-wider transition-colors group self-start sm:self-auto"
          >
            <span>ALL {activeCategory === 'bed' ? 'MATTRESSES' : activeCategory === 'pillow' ? 'PILLOWS' : 'COMFORTERS'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* 3 Categories Grid (Beds/Mattresses, Pillows, Comforters) */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {SLEEP_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-xl text-center transition-all duration-200 bg-white border ${
                isActive
                  ? 'border-[#E85D04] shadow-md ring-2 ring-[#E85D04]/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Product preview / icon area */}
              <div className="w-16 h-12 sm:w-20 sm:h-14 mb-2 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden p-1">
                <img
                  src={cat.image}
                  alt={cat.shortName}
                  className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Title */}
              <span
                className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                  isActive ? 'text-[#E85D04]' : 'text-slate-700 group-hover:text-[#0B2F57]'
                }`}
              >
                {cat.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

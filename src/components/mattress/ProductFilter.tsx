import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/mattresses';
import { MattressCategory } from '../../types/mattress';

interface ProductFilterProps {
  selectedCategory: MattressCategory;
  onSelectCategory: (category: MattressCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  totalResults: number;
  onReset: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
  onReset,
}) => {
  const isFiltered = selectedCategory !== 'all' || searchQuery.trim().length > 0 || sortBy !== 'featured';

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#EAE3D8] shadow-xs mb-8 space-y-5">
      
      {/* Top row: Search input & Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#998E7F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mattresses by name, material or feature..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7456] focus:border-transparent transition-all placeholder:text-[#A89E90]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#998E7F] hover:text-[#1F1C18]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#7A7369] hidden sm:block" />
            <label htmlFor="sort-select" className="text-xs text-[#7A7369] whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
              className="text-xs font-medium py-2 px-3 bg-[#FAF8F5] border border-[#E0D7CB] rounded-lg text-[#242220] focus:outline-none focus:ring-2 focus:ring-[#8C7456]"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-xs text-[#8C7456] hover:text-[#5E4D38] font-medium underline underline-offset-2 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category selector row: Interactive functional buttons */}
      <div className="pt-2 border-t border-[#F2ECE3]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id as MattressCategory)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#242220] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5C554C] hover:bg-[#EFE8DF] hover:text-[#1F1C18] border border-[#EAE3D8]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-[#D8CEBE]' : 'text-[#8C7B6B]'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Showing results summary */}
      <div className="flex items-center justify-between text-xs text-[#7A7369] pt-1">
        <span>
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'mattress model' : 'mattress models'}
        </span>
        {searchQuery && (
          <span className="truncate max-w-xs">
            Matching &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

    </div>
  );
};

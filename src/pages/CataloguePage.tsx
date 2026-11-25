import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PRODUCTS,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../data/products';
import { ProductCategory, ProductItem, PillowSubCategory } from '../types/product';
import { CategorySelector } from '../components/catalogue/CategorySelector';
import { HorizontalFilterBar } from '../components/catalogue/HorizontalFilterBar';
import { SidebarFilter } from '../components/catalogue/SidebarFilter';
import { ProductCard } from '../components/catalogue/ProductCard';
import { CompareModal } from '../components/catalogue/CompareModal';
import { BuildMattressCard } from '../components/catalogue/BuildMattressCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { Filter, HelpCircle, Search, X } from 'lucide-react';

interface CataloguePageProps {
  defaultCategory?: ProductCategory;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  defaultCategory = 'bed',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCat = searchParams.get('category') as ProductCategory | null;
  const resolvedInitialCategory: ProductCategory =
    urlCat && ['bed', 'pillow', 'comforter'].includes(urlCat)
      ? urlCat
      : defaultCategory;

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(resolvedInitialCategory);

  // Horizontal filters
  const [selectedBenefit, setSelectedBenefit] = useState<string>('All');
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [selectedPillowCategory, setSelectedPillowCategory] = useState<string>('All');

  // Sidebar filters
  const [feel, setFeel] = useState<string>('All');
  const [look, setLook] = useState<string>('All');
  const [size, setSize] = useState<string>('All');
  const [thickness, setThickness] = useState<string>('All');
  const [type, setType] = useState<string>('All');

  // Sort & Search
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name'>('relevance');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Wishlist & Modals state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category with URL query or route prop
  useEffect(() => {
    const paramCat = searchParams.get('category') as ProductCategory | null;
    const nextCat: ProductCategory =
      paramCat && ['bed', 'pillow', 'comforter'].includes(paramCat)
        ? paramCat
        : defaultCategory;

    if (nextCat !== activeCategory) {
      setActiveCategory(nextCat);
      setSelectedBenefit('All');
      setSelectedSeries('All');
      setSelectedPillowCategory('All');
      setFeel('All');
      setLook('All');
      setSize('All');
      setThickness('All');
      setType('All');
    }
  }, [searchParams, defaultCategory]);

  const handleCategorySelect = (category: ProductCategory) => {
    setActiveCategory(category);
    setSelectedBenefit('All');
    setSelectedSeries('All');
    setSelectedPillowCategory('All');
    setFeel('All');
    setLook('All');
    setSize('All');
    setThickness('All');
    setType('All');

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('category', category);
    setSearchParams(nextParams);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFiltered =
    selectedBenefit !== 'All' ||
    selectedSeries !== 'All' ||
    selectedPillowCategory !== 'All' ||
    feel !== 'All' ||
    look !== 'All' ||
    size !== 'All' ||
    thickness !== 'All' ||
    type !== 'All' ||
    searchQuery.trim().length > 0;

  const resetAllFilters = () => {
    setSelectedBenefit('All');
    setSelectedSeries('All');
    setSelectedPillowCategory('All');
    setFeel('All');
    setLook('All');
    setSize('All');
    setThickness('All');
    setType('All');
    setSearchQuery('');
    setSortBy('relevance');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item: ProductItem) => {
      if (item.category !== activeCategory) return false;

      if (activeCategory === 'bed') {
        if (selectedBenefit !== 'All' && item.benefit !== selectedBenefit) return false;
        if (selectedSeries !== 'All' && item.series !== selectedSeries) return false;
        if (look !== 'All' && item.look !== look) return false;
        if (
          thickness !== 'All' &&
          (!item.thicknessOptions || !item.thicknessOptions.includes(Number(thickness)))
        ) {
          return false;
        }
      }

      if (activeCategory === 'pillow' && selectedPillowCategory !== 'All') {
        if (!item.pillowCategories?.includes(selectedPillowCategory as PillowSubCategory)) {
          return false;
        }
      }

      if (feel !== 'All' && item.feel !== feel) return false;
      if (size !== 'All' && !item.availableSizes.includes(size)) return false;
      if (type !== 'All' && item.type !== type) return false;

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesKicker = item.kicker?.toLowerCase().includes(q) || false;
        const matchesSeries = item.series?.toLowerCase().includes(q) || false;
        const matchesMaterial =
          item.materialFilling?.toLowerCase().includes(q) ||
          item.coreMaterial?.toLowerCase().includes(q) ||
          false;
        if (!matchesName && !matchesDesc && !matchesKicker && !matchesSeries && !matchesMaterial) {
          return false;
        }
      }

      return true;
    }).sort((a: ProductItem, b: ProductItem) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'price-asc' || sortBy === 'price-desc') {
        const priceA = getProductDisplayPrice(a);
        const priceB = getProductDisplayPrice(b);
        const hasA = hasAvailablePrice(priceA);
        const hasB = hasAvailablePrice(priceB);

        if (hasA && hasB) {
          return sortBy === 'price-asc' ? priceA - priceB : priceB - priceA;
        }
        if (hasA) return -1;
        if (hasB) return 1;
        return 0;
      }

      // 'relevance' (bestsellers first)
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });
  }, [
    activeCategory,
    selectedBenefit,
    selectedSeries,
    selectedPillowCategory,
    feel,
    look,
    size,
    thickness,
    type,
    searchQuery,
    sortBy,
  ]);

  const categoryTitle =
    activeCategory === 'bed'
      ? 'Mattresses'
      : activeCategory === 'pillow'
        ? 'Pillows'
        : 'Comforters';

  const categorySubtitle =
    activeCategory === 'bed'
      ? 'Click any mattress to view specifications, choose Single, Double, Queen, or King sizes, and enquire on WhatsApp.'
      : activeCategory === 'pillow'
        ? 'Browse our pillow catalogue by category, filling material, or firmness. Click any pillow for full details and WhatsApp enquiry.'
        : 'Explore breathable all-season comforters and reversible duvets crafted for everyday comfort.';

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Breadcrumb row */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Sleep Essentials', to: '/mattresses' },
              { label: categoryTitle },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 1. DISCOVER SLEEP CATEGORIES */}
        <CategorySelector
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          onViewAllClick={resetAllFilters}
        />

        {/* 2. HORIZONTAL CATEGORY / BENEFIT / SERIES FILTER BAR */}
        <HorizontalFilterBar
          activeCategory={activeCategory}
          selectedBenefit={selectedBenefit}
          onSelectBenefit={setSelectedBenefit}
          selectedSeries={selectedSeries}
          onSelectSeries={setSelectedSeries}
          selectedPillowCategory={selectedPillowCategory}
          onSelectPillowCategory={setSelectedPillowCategory}
        />

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-[#0B2F57]" />
            <span>Filters {isFiltered && '(Active)'}</span>
          </button>

          {activeCategory === 'bed' && (
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#0071C1] text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs"
            >
              <span>COMPARE MATTRESS →</span>
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden mb-6">
            <SidebarFilter
              activeCategory={activeCategory}
              feel={feel}
              onFeelChange={setFeel}
              look={look}
              onLookChange={setLook}
              size={size}
              onSizeChange={setSize}
              thickness={thickness}
              onThicknessChange={setThickness}
              type={type}
              onTypeChange={setType}
              pillowCategory={selectedPillowCategory}
              onPillowCategoryChange={setSelectedPillowCategory}
              onResetAll={resetAllFilters}
              isFiltered={isFiltered}
            />
          </div>
        )}

        {/* 3. MAIN CONTENT: Left Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <SidebarFilter
              activeCategory={activeCategory}
              feel={feel}
              onFeelChange={setFeel}
              look={look}
              onLookChange={setLook}
              size={size}
              onSizeChange={setSize}
              thickness={thickness}
              onThicknessChange={setThickness}
              type={type}
              onTypeChange={setType}
              pillowCategory={selectedPillowCategory}
              onPillowCategoryChange={setSelectedPillowCategory}
              onResetAll={resetAllFilters}
              isFiltered={isFiltered}
            />
          </div>

          {/* Right Column: Title Header + Search + Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col gap-4 pb-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2F57]">
                    {categoryTitle}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                    {categorySubtitle}
                  </p>
                </div>

                {activeCategory === 'bed' && (
                  <div className="hidden sm:block shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsCompareOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#0071C1] hover:bg-[#005B9C] text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-lg shadow-sm transition-colors"
                    >
                      <span>COMPARE MATTRESS →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Search + Sort + Result count row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${categoryTitle.toLowerCase()}...`}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B2F57] placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <label htmlFor="sort-select" className="font-medium">
                      Sort by:
                    </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value as 'relevance' | 'price-asc' | 'price-desc' | 'name')
                      }
                      className="bg-transparent font-bold text-slate-800 border-none focus:outline-none cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="name">Name: A to Z</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong>{' '}
                    {filteredProducts.length === 1 ? 'Result' : 'Results'}
                  </span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: ProductItem, idx: number) => (
                  <React.Fragment key={product.id}>
                    <ProductCard
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                    />

                    {activeCategory === 'bed' && idx === 4 && <BuildMattressCard />}
                  </React.Fragment>
                ))}

                {activeCategory === 'bed' && filteredProducts.length < 5 && (
                  <BuildMattressCard />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-md mx-auto space-y-4 my-8">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {activeCategory === 'pillow' && selectedPillowCategory !== 'All'
                    ? `No ${selectedPillowCategory.toLowerCase()} listed yet`
                    : 'No products match these filters'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {activeCategory === 'pillow' && selectedPillowCategory !== 'All'
                    ? 'More pillow models will be added soon. Enquire with us on WhatsApp to check current availability, or browse all pillows.'
                    : 'Try clearing your filter selections or contact us on WhatsApp for assistance.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-block text-xs font-bold px-4 py-2.5 bg-[#0B2F57] text-white rounded-lg hover:bg-[#133F72] transition-colors"
                  >
                    {activeCategory === 'pillow' ? 'View All Pillows' : 'Reset All Filters'}
                  </button>
                  <WhatsAppButton
                    label="Enquire on WhatsApp"
                    customMessage={
                      activeCategory === 'pillow' && selectedPillowCategory !== 'All'
                        ? `Hello Comfyscape! I would like to enquire about ${selectedPillowCategory} availability and pricing.`
                        : undefined
                    }
                    variant="primary"
                    sizeStyle="sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Mattress Modal */}
      <CompareModal
        products={PRODUCTS.filter((p: ProductItem) => p.category === 'bed')}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
};

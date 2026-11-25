import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PRODUCTS,
  getAvailableMattressCategories,
  getAvailablePillowCategories,
  getProductDisplayPrice,
  hasAvailablePrice,
} from '../data/products';
import {
  MattressCategoryName,
  PillowCategoryName,
  ProductCategory,
  ProductItem,
} from '../types/product';
import { CategorySelector } from '../components/catalogue/CategorySelector';
import { HorizontalFilterBar } from '../components/catalogue/HorizontalFilterBar';
import {
  PRICE_RANGE_OPTIONS,
  SidebarFilter,
} from '../components/catalogue/SidebarFilter';
import { ProductCard } from '../components/catalogue/ProductCard';
import { CompareModal } from '../components/catalogue/CompareModal';
import { BuildMattressCard } from '../components/catalogue/BuildMattressCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { Filter, HelpCircle, Search, X } from 'lucide-react';

interface CataloguePageProps {
  defaultCategory?: ProductCategory;
}

type SortOption = 'default' | 'name' | 'price-asc' | 'price-desc';

export const CataloguePage: React.FC<CataloguePageProps> = ({
  defaultCategory = 'bed',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCat = searchParams.get('category') as ProductCategory | null;
  const resolvedInitialCategory: ProductCategory =
    urlCat && ['bed', 'pillow', 'comforter'].includes(urlCat)
      ? urlCat
      : defaultCategory;

  const urlTypeParam = searchParams.get('type') || 'All';

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    resolvedInitialCategory
  );

  // Category & attribute filters
  const [selectedMattressCategory, setSelectedMattressCategory] = useState<string>(
    resolvedInitialCategory === 'bed' ? urlTypeParam : 'All'
  );
  const [selectedPillowCategory, setSelectedPillowCategory] = useState<string>(
    resolvedInitialCategory === 'pillow' ? urlTypeParam : 'All'
  );
  const [material, setMaterial] = useState<string>('All');
  const [firmness, setFirmness] = useState<string>('All');
  const [thickness, setThickness] = useState<string>('All');
  const [size, setSize] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');

  // Sort & Search
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & mobile drawer
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL query changes or route switches
  useEffect(() => {
    const paramCat = searchParams.get('category') as ProductCategory | null;
    const nextCat: ProductCategory =
      paramCat && ['bed', 'pillow', 'comforter'].includes(paramCat)
        ? paramCat
        : defaultCategory;
    const nextType = searchParams.get('type') || 'All';

    if (nextCat !== activeCategory) {
      setActiveCategory(nextCat);
      setSelectedMattressCategory(nextCat === 'bed' ? nextType : 'All');
      setSelectedPillowCategory(nextCat === 'pillow' ? nextType : 'All');
      setMaterial('All');
      setFirmness('All');
      setThickness('All');
      setSize('All');
      setPriceRange('All');
      setSortBy('default');
    } else if (nextType !== 'All') {
      if (nextCat === 'bed') setSelectedMattressCategory(nextType);
      if (nextCat === 'pillow') setSelectedPillowCategory(nextType);
    }
  }, [searchParams, defaultCategory]);

  const handleCategorySelect = (category: ProductCategory) => {
    setActiveCategory(category);
    setSelectedMattressCategory('All');
    setSelectedPillowCategory('All');
    setMaterial('All');
    setFirmness('All');
    setThickness('All');
    setSize('All');
    setPriceRange('All');
    setSortBy('default');

    const nextParams = new URLSearchParams();
    nextParams.set('category', category);
    setSearchParams(nextParams);
  };

  // All items in the active top-level category
  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Derive available filter options strictly from actual products (no empty/meaningless filters)
  const filterOptions = useMemo(() => {
    const subCategories =
      activeCategory === 'bed'
        ? getAvailableMattressCategories().map((c) => c.name)
        : activeCategory === 'pillow'
          ? getAvailablePillowCategories().map((c) => c.name)
          : [];

    const materials = Array.from(
      new Set(categoryProducts.map((p) => p.materialType).filter(Boolean))
    );

    const firmnessValues = Array.from(
      new Set(
        categoryProducts
          .map((p) => p.firmness)
          .filter((v): v is NonNullable<typeof v> => Boolean(v))
      )
    );

    const thicknesses = Array.from(
      new Set(categoryProducts.flatMap((p) => p.thicknessOptions ?? []))
    ).sort((a, b) => a - b);

    const sizes = Array.from(
      new Set(
        categoryProducts.flatMap((p) => {
          if (p.sizeOptions && p.sizeOptions.length > 0) {
            return p.sizeOptions.map((s) => s.size);
          }
          if (p.variants && p.variants.length > 0) {
            return p.variants.map((v) => v.name);
          }
          return [];
        })
      )
    );

    const hasPricedProducts = categoryProducts.some((p) =>
      hasAvailablePrice(getProductDisplayPrice(p))
    );

    return {
      subCategories,
      materials,
      firmnessValues,
      thicknesses,
      sizes,
      hasPricedProducts,
    };
  }, [activeCategory, categoryProducts]);

  const activeSubCategory =
    activeCategory === 'bed'
      ? selectedMattressCategory
      : activeCategory === 'pillow'
        ? selectedPillowCategory
        : 'All';

  const handleSubCategoryChange = (value: string) => {
    if (activeCategory === 'bed') {
      setSelectedMattressCategory(value);
    } else if (activeCategory === 'pillow') {
      setSelectedPillowCategory(value);
    }
  };

  const isFiltered =
    activeSubCategory !== 'All' ||
    material !== 'All' ||
    firmness !== 'All' ||
    thickness !== 'All' ||
    size !== 'All' ||
    priceRange !== 'All' ||
    searchQuery.trim().length > 0;

  const resetAllFilters = () => {
    setSelectedMattressCategory('All');
    setSelectedPillowCategory('All');
    setMaterial('All');
    setFirmness('All');
    setThickness('All');
    setSize('All');
    setPriceRange('All');
    setSearchQuery('');
    setSortBy('default');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const selectedRange = PRICE_RANGE_OPTIONS.find((opt) => opt.id === priceRange);

    return categoryProducts
      .filter((item: ProductItem) => {
        if (
          activeCategory === 'bed' &&
          selectedMattressCategory !== 'All' &&
          !item.mattressCategories?.includes(
            selectedMattressCategory as MattressCategoryName
          )
        ) {
          return false;
        }

        if (
          activeCategory === 'pillow' &&
          selectedPillowCategory !== 'All' &&
          !item.pillowCategories?.includes(
            selectedPillowCategory as PillowCategoryName
          )
        ) {
          return false;
        }

        if (material !== 'All' && item.materialType !== material) return false;
        if (firmness !== 'All' && item.firmness !== firmness) return false;

        if (
          activeCategory === 'bed' &&
          thickness !== 'All' &&
          (!item.thicknessOptions ||
            !item.thicknessOptions.includes(Number(thickness)))
        ) {
          return false;
        }

        if (size !== 'All') {
          const itemSizes =
            item.sizeOptions && item.sizeOptions.length > 0
              ? item.sizeOptions.map((s) => s.size)
              : item.variants
                ? item.variants.map((v) => v.name)
                : [];
          if (!itemSizes.includes(size)) return false;
        }

        if (
          filterOptions.hasPricedProducts &&
          selectedRange &&
          selectedRange.id !== 'All'
        ) {
          const price = getProductDisplayPrice(item);
          if (!hasAvailablePrice(price)) return false;
          if (selectedRange.min !== undefined && price < selectedRange.min) {
            return false;
          }
          if (selectedRange.max !== undefined && price > selectedRange.max) {
            return false;
          }
        }

        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase();
          const haystack = [
            item.name,
            item.shortDescription,
            item.description,
            item.material,
            item.materialType,
            item.firmness ?? '',
            ...(item.mattressCategories ?? []),
            ...(item.pillowCategories ?? []),
            ...item.features,
          ]
            .join(' ')
            .toLowerCase();

          if (!haystack.includes(q)) return false;
        }

        return true;
      })
      .sort((a: ProductItem, b: ProductItem) => {
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

        return 0;
      });
  }, [
    categoryProducts,
    activeCategory,
    selectedMattressCategory,
    selectedPillowCategory,
    material,
    firmness,
    thickness,
    size,
    priceRange,
    filterOptions.hasPricedProducts,
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
      ? 'Explore mattresses organized by construction and support type. Select any mattress to view specifications, choose size and thickness, and enquire on WhatsApp.'
      : activeCategory === 'pillow'
        ? 'Browse pillows by type, filling material, or firmness. Select any pillow to view full details and enquire on WhatsApp.'
        : 'Explore breathable all-season comforters crafted for everyday comfort.';

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-[#EAE3D8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Catalogue', to: '/mattresses' },
              { label: categoryTitle },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 1. Top-level Sleep Category Switcher */}
        <CategorySelector
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          onViewAllClick={resetAllFilters}
        />

        {/* 2. Horizontal Category Navigation (Non-Empty Categories Only) */}
        <HorizontalFilterBar
          activeCategory={activeCategory}
          selectedMattressCategory={selectedMattressCategory}
          onSelectMattressCategory={setSelectedMattressCategory}
          selectedPillowCategory={selectedPillowCategory}
          onSelectPillowCategory={setSelectedPillowCategory}
        />

        {/* Mobile Filter Toggle & Compare */}
        <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-2 bg-white border border-[#DED5C8] text-[#1F1C18] px-4 py-2 rounded-lg text-xs font-semibold shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5 text-[#0B2F57]" />
            <span>Filters {isFiltered && '(Active)'}</span>
          </button>

          {activeCategory === 'bed' && (
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#0B2F57] text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-2xs"
            >
              <span>Compare Mattresses</span>
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden mb-6">
            <SidebarFilter
              activeCategory={activeCategory}
              categoryOptions={filterOptions.subCategories}
              selectedSubCategory={activeSubCategory}
              onSubCategoryChange={handleSubCategoryChange}
              materialOptions={filterOptions.materials}
              material={material}
              onMaterialChange={setMaterial}
              firmnessOptions={filterOptions.firmnessValues}
              firmness={firmness}
              onFirmnessChange={setFirmness}
              thicknessOptions={filterOptions.thicknesses}
              thickness={thickness}
              onThicknessChange={setThickness}
              sizeOptions={filterOptions.sizes}
              size={size}
              onSizeChange={setSize}
              hasPricedProducts={filterOptions.hasPricedProducts}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onResetAll={resetAllFilters}
              isFiltered={isFiltered}
            />
          </div>
        )}

        {/* 3. Main Content: Left Sidebar + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <SidebarFilter
              activeCategory={activeCategory}
              categoryOptions={filterOptions.subCategories}
              selectedSubCategory={activeSubCategory}
              onSubCategoryChange={handleSubCategoryChange}
              materialOptions={filterOptions.materials}
              material={material}
              onMaterialChange={setMaterial}
              firmnessOptions={filterOptions.firmnessValues}
              firmness={firmness}
              onFirmnessChange={setFirmness}
              thicknessOptions={filterOptions.thicknesses}
              thickness={thickness}
              onThicknessChange={setThickness}
              sizeOptions={filterOptions.sizes}
              size={size}
              onSizeChange={setSize}
              hasPricedProducts={filterOptions.hasPricedProducts}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onResetAll={resetAllFilters}
              isFiltered={isFiltered}
            />
          </div>

          {/* Right Column: Title, Search, Sort & Product Cards */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col gap-4 pb-4 border-b border-[#EAE3D8]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18]">
                    {activeSubCategory !== 'All' ? activeSubCategory : categoryTitle}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#665F55] mt-1 max-w-2xl">
                    {categorySubtitle}
                  </p>
                </div>

                {activeCategory === 'bed' && (
                  <div className="hidden sm:block shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsCompareOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#0B2F57] hover:bg-[#133F72] text-white text-xs font-semibold uppercase tracking-wider py-3 px-5 rounded-lg shadow-xs transition-colors"
                    >
                      <span>Compare Mattresses</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Search + Sort + Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8275]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${categoryTitle.toLowerCase()}...`}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#DED5C8] rounded-lg text-[#1F1C18] focus:outline-none focus:ring-2 focus:ring-[#0B2F57] placeholder:text-[#8A8275]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8275] hover:text-[#1F1C18]"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#5A534B]">
                    <label htmlFor="sort-select" className="font-medium">
                      Sort by:
                    </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="bg-transparent font-semibold text-[#1F1C18] border-none focus:outline-none cursor-pointer"
                    >
                      <option value="default">Default Order</option>
                      <option value="name">Name: A to Z</option>
                      {filterOptions.hasPricedProducts && (
                        <>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                        </>
                      )}
                    </select>
                  </div>

                  <span className="text-xs text-[#665F55] font-medium">
                    <strong className="text-[#1F1C18] font-bold">
                      {filteredProducts.length}
                    </strong>{' '}
                    {filteredProducts.length === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: ProductItem, idx: number) => (
                  <React.Fragment key={product.id}>
                    <ProductCard product={product} />
                    {activeCategory === 'bed' && idx === 4 && <BuildMattressCard />}
                  </React.Fragment>
                ))}

                {activeCategory === 'bed' && filteredProducts.length < 5 && (
                  <BuildMattressCard />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E6DFD4] p-10 text-center max-w-md mx-auto space-y-4 my-8">
                <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#8C7456] mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                  No products match these filters
                </h3>
                <p className="text-xs text-[#665F55] leading-relaxed">
                  Try adjusting or clearing your filter selections, or message us on WhatsApp
                  for assistance with custom requirements.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-block text-xs font-semibold px-4 py-2.5 bg-[#0B2F57] text-white rounded-lg hover:bg-[#133F72] transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <WhatsAppButton
                    label="Enquire on WhatsApp"
                    variant="primary"
                    sizeStyle="sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Mattresses Modal */}
      <CompareModal
        products={PRODUCTS.filter((p: ProductItem) => p.category === 'bed')}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
};

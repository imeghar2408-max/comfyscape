import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MATTRESSES } from '../data/mattresses';
import { MattressCategory, Mattress } from '../types/mattress';
import { MattressCard } from '../components/mattress/MattressCard';
import { ProductFilter } from '../components/mattress/ProductFilter';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { MessageSquare, HelpCircle } from 'lucide-react';
import { getCustomSizeWhatsAppUrl } from '../utils/whatsapp';

export const CataloguePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial category from URL or default to 'all'
  const initialCategory = (searchParams.get('category') as MattressCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<MattressCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Sync category state if URL query param changes
  useEffect(() => {
    const cat = searchParams.get('category') as MattressCategory;
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: MattressCategory) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & sort mattresses
  const filteredMattresses = useMemo(() => {
    return MATTRESSES.filter((mattress) => {
      // Category match
      if (selectedCategory !== 'all' && mattress.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = mattress.name.toLowerCase().includes(query);
        const matchesDesc = mattress.shortDescription.toLowerCase().includes(query);
        const matchesMaterial = mattress.material.toLowerCase().includes(query);
        const matchesCategory = mattress.categoryLabel.toLowerCase().includes(query);
        const matchesFeatures = mattress.keyFeatures.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesCategory && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a: Mattress, b: Mattress) => {
      if (sortBy === 'price-asc') {
        return a.startingPrice - b.startingPrice;
      }
      if (sortBy === 'price-desc') {
        return b.startingPrice - a.startingPrice;
      }
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#F4EFEA] border-b border-[#EAE3D8] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Mattress Catalogue' }]} className="mb-4" />
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
              The Sleep Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F1C18]">
              Mattress Catalogue
            </h1>
            <p className="text-sm sm:text-base text-[#615A52] leading-relaxed">
              Explore our handcrafted mattresses engineered with pure virgin foams, orthopedic rebonded cores, and natural breathable coir. Direct from our workshop with custom sizing available.
            </p>
          </div>
        </div>
      </div>

      {/* Main catalogue container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Filter Bar */}
        <ProductFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredMattresses.length}
          onReset={handleResetFilters}
        />

        {/* Product Grid */}
        {filteredMattresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMattresses.map((mattress) => (
              <MattressCard key={mattress.id} mattress={mattress} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-xl border border-[#EAE3D8] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7456] mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1F1C18]">
              No mattresses found
            </h3>
            <p className="text-sm text-[#7A7369]">
              We couldn&apos;t find any mattresses matching your filter criteria. Try resetting your search or enquire directly with our sleep consultant for custom builds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold px-4 py-2 bg-[#242220] text-white rounded-md hover:bg-[#3E3831] transition-colors"
              >
                Clear All Filters
              </button>
              <WhatsAppButton
                label="Ask About Custom Mattresses"
                variant="outline"
                sizeStyle="sm"
              />
            </div>
          </div>
        )}

        {/* WhatsApp Consultation Banner */}
        <div className="mt-16 bg-white rounded-2xl border border-[#EAE3D8] p-8 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#8C7456] font-semibold">
              Personal Sleep Consultation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1C18]">
              Unsure which mattress suits your spine and sleeping posture?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6359] leading-relaxed">
              Tell us whether you sleep on your back, side, or stomach, or if you suffer from back stiffness. Our mattress specialist will recommend the ideal density and thickness.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <WhatsAppButton
              label="Chat with Sleep Specialist"
              variant="primary"
              sizeStyle="md"
            />
            <a
              href={getCustomSizeWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#1F1C18] border border-[#D5C6B3] hover:border-[#1F1C18] px-4 py-2.5 rounded-full transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Custom Size Quote</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

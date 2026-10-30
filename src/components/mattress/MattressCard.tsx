import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { Mattress } from '../../types/mattress';
import { WhatsAppButton } from '../common/WhatsAppButton';

interface MattressCardProps {
  mattress: Mattress;
}

export const MattressCard: React.FC<MattressCardProps> = ({ mattress }) => {
  return (
    <div className="group bg-white rounded-xl border border-[#EAE3D8] hover:border-[#D5C6B3] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Container */}
      <Link
        to={`/mattresses/${mattress.slug}`}
        className="relative block aspect-[4/3] bg-[#F4EFEA] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C7456]"
      >
        <img
          src={mattress.images[0]}
          alt={mattress.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle ribbon for Bestseller if applicable */}
        {mattress.bestseller && (
          <span className="absolute top-3 left-3 bg-[#242220] text-[#FAF8F5] text-[10px] font-semibold uppercase tracking-wider py-1 px-2.5 rounded shadow-sm">
            Bestseller
          </span>
        )}

        {/* Density marker overlay */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#3D3833] text-[11px] font-medium py-0.5 px-2 rounded border border-[#E8E1D7]">
          {mattress.density}
        </span>
      </Link>

      {/* Product Details Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed metadata line with typographic separator as per design constitution */}
          <div className="flex items-center gap-2 text-xs text-[#7A7369] mb-2 font-medium">
            <span>{mattress.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{mattress.firmness}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7456]" />
              {mattress.warrantyYears}y Warranty
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-semibold text-[#1F1C18] group-hover:text-[#6D553C] transition-colors leading-snug">
            <Link to={`/mattresses/${mattress.slug}`}>
              {mattress.name}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#8C7B6B] italic mt-1 font-serif">
            {mattress.tagline}
          </p>

          {/* Short description */}
          <p className="text-sm text-[#575047] mt-3 line-clamp-2 leading-relaxed">
            {mattress.shortDescription}
          </p>

          {/* Key Specs bullets */}
          <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#6B6359] space-y-1">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8C7456] shrink-0" />
              <span className="truncate">{mattress.material}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-6 pt-4 border-t border-[#F2ECE3] flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-[#8A8275]">Starting from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-[#1F1C18]">
                {mattress.currency}{mattress.startingPrice}
              </span>
              <span className="text-xs text-[#8A8275]">/ single</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/mattresses/${mattress.slug}`}
              className="text-xs font-medium text-[#1F1C18] hover:text-[#6D553C] border border-[#D5C6B3] hover:border-[#1F1C18] px-3 py-2 rounded-md transition-colors flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            
            <WhatsAppButton
              productName={mattress.name}
              label="Enquire"
              variant="primary"
              sizeStyle="sm"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

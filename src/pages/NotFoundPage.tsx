import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Layers } from 'lucide-react';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF8F5] px-4 py-16">
      <div className="text-center max-w-md space-y-5">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7456] font-semibold">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1F1C18]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#665F55] leading-relaxed">
          The mattress or page you are looking for does not exist or may have been moved. Explore our catalogue or chat with us.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/mattresses"
            className="inline-flex items-center gap-2 bg-[#242220] hover:bg-[#38332D] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Browse Catalogue</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-[#D5C6B3] hover:border-[#1F1C18] text-[#1F1C18] text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="pt-4">
          <WhatsAppButton
            label="Need Help? Chat on WhatsApp"
            variant="outline"
            sizeStyle="sm"
          />
        </div>
      </div>
    </div>
  );
};

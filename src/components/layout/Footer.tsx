import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/contact';
import { WhatsAppButton } from '../common/WhatsAppButton';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F1D1A] text-[#EDE7DE] pt-16 pb-12 border-t border-[#36322C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section: Brand statement and Quick WhatsApp Banner */}
        <div className="pb-12 border-b border-[#36322C] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#FAF8F5]">
              COMFYSCAPE
            </span>
            <p className="text-sm text-[#BDB2A3] mt-2 max-w-xl">
              {BRAND_CONFIG.tagline} Dedicated to creating peaceful nights and energized mornings with precision-engineered mattresses.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-right sm:text-left">
              <span className="block text-xs uppercase tracking-wider text-[#A39786]">Need personalized advice?</span>
              <span className="text-sm font-medium text-white">Speak with our mattress consultant</span>
            </div>
            <WhatsAppButton
              label="Chat on WhatsApp"
              variant="primary"
              sizeStyle="md"
            />
          </div>
        </div>

        {/* Middle columns */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About & Assurance */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Craftsmanship Promise</h4>
            <p className="text-xs leading-relaxed text-[#BDB2A3] mb-4">
              Every Comfyscape mattress is manufactured using virgin, certified foams and natural coconut coir. We avoid toxic fillers, offering direct-from-maker clarity and longevity.
            </p>
            <div className="text-xs text-[#9E9281] space-y-1">
              <p>• Zero Compromise Foam Densities</p>
              <p>• Custom Bed Sizes Manufactured</p>
              <p>• Up to 10 Years Warranty Guarantee</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mattresses" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center gap-1">
                  Mattress Catalogue
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center gap-1">
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center gap-1">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Mattress Types</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/mattresses?category=foam" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center justify-between group">
                  <span>High-Resilience Foam</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6D6357] group-hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/mattresses?category=rebonded" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center justify-between group">
                  <span>Orthopedic Rebonded</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6D6357] group-hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/mattresses?category=coir" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center justify-between group">
                  <span>Natural Coir</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6D6357] group-hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/mattresses?category=memory-foam" className="text-[#BDB2A3] hover:text-white transition-colors flex items-center justify-between group">
                  <span>Cloud Memory Foam</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6D6357] group-hover:text-white transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Direct Contact</h4>
            <ul className="space-y-3 text-xs text-[#BDB2A3]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8B8A6] shrink-0 mt-0.5" />
                <span>
                  {BRAND_CONFIG.contact.address.line1}, {BRAND_CONFIG.contact.address.line2}, {BRAND_CONFIG.contact.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8B8A6] shrink-0" />
                <a href={BRAND_CONFIG.contact.phoneTelLink} className="hover:text-white transition-colors">
                  {BRAND_CONFIG.contact.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8B8A6] shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {BRAND_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C8B8A6] shrink-0 mt-0.5" />
                <div>
                  <p>{BRAND_CONFIG.contact.businessHours.weekdays}</p>
                  <p>{BRAND_CONFIG.contact.businessHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright notice and catalogue disclaimer */}
        <div className="pt-8 border-t border-[#36322C] flex flex-col md:flex-row items-center justify-between text-xs text-[#998E7F] gap-4">
          <p>
            © {currentYear} {BRAND_CONFIG.name}. All rights reserved. {BRAND_CONFIG.tagline}
          </p>
          <p className="text-center md:text-right">
            Official Product Catalogue & Consultation Portal. All orders and negotiations handled directly via WhatsApp and direct liaison.
          </p>
        </div>

      </div>
    </footer>
  );
};

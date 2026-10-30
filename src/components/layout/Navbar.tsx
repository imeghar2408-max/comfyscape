import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/contact';
import { WhatsAppButton } from '../common/WhatsAppButton';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Mattresses', to: '/mattresses' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D8] transition-all">
      {/* Top micro bar for quick assurance */}
      <div className="bg-[#242220] text-[#D8CEBE] text-[11px] py-1.5 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="hidden sm:block">
            {BRAND_CONFIG.tagline} Direct Manufacturer Enquiries & Custom Dimensions
          </p>
          <p className="sm:hidden mx-auto">
            {BRAND_CONFIG.tagline}
          </p>
          <div className="hidden sm:flex items-center gap-4 text-xs font-normal">
            <a
              href={BRAND_CONFIG.contact.phoneTelLink}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#A89E90]" />
              <span>{BRAND_CONFIG.contact.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: Clean text-based COMFYSCAPE */}
          <Link
            to="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C7456] rounded py-1"
            onClick={closeMenu}
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#1F1C18] group-hover:text-[#6D553C] transition-colors">
              COMFYSCAPE
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C7B6B] -mt-0.5">
              Better Sleep, Better Life
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#1F1C18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#8C7456]'
                      : 'text-[#615A52] hover:text-[#1F1C18]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Button: WhatsApp enquiry */}
          <div className="hidden md:flex items-center space-x-4">
            <WhatsAppButton
              label="WhatsApp Enquiry"
              variant="primary"
              sizeStyle="md"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <WhatsAppButton
              label="Chat"
              variant="primary"
              sizeStyle="sm"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A453F] hover:text-[#1F1C18] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C7456]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE3D8] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[#1F1C18] bg-[#EFE8DF] font-semibold'
                      : 'text-[#575047] hover:bg-[#F3EDE4] hover:text-[#1F1C18]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#EAE3D8] space-y-3">
            <p className="text-xs text-[#7A7369]">
              Questions or custom mattress dimensions?
            </p>
            <div className="flex flex-col gap-2">
              <WhatsAppButton
                label="Direct WhatsApp Enquiry"
                variant="primary"
                sizeStyle="md"
                className="w-full"
              />
              <a
                href={BRAND_CONFIG.contact.phoneTelLink}
                className="flex items-center justify-center gap-2 text-sm text-[#4A453F] py-2 hover:text-[#1F1C18]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BRAND_CONFIG.contact.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

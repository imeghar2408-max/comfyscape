import React, { useState } from 'react';
import { ArrowRight, Ruler, Sparkles, MessageSquare, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export const BuildMattressCard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lengthInches, setLengthInches] = useState('78');
  const [widthInches, setWidthInches] = useState('60');
  const [preferredThickness, setPreferredThickness] = useState('6 Inches');
  const [feelPreference, setFeelPreference] = useState('Medium Firm');
  const [notes, setNotes] = useState('');

  const customWhatsAppUrl = buildWhatsAppUrl(
    [
      'Hello Comfyscape! I would like to enquire about a custom-size mattress.',
      `- Dimensions: ${lengthInches} × ${widthInches} inches`,
      `- Thickness: ${preferredThickness}`,
      `- Preferred Firmness: ${feelPreference}`,
      ...(notes.trim() ? [`- Notes: ${notes.trim()}`] : []),
      '- Price: Enquiring about the price',
      'Could you please share the price and availability?',
    ].join('\n')
  );

  return (
    <>
      {/* Tall Card in Product Grid */}
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-[3/4] sm:aspect-auto min-h-[380px] sm:min-h-[460px] flex flex-col justify-end p-6 group">
        <img
          src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
          alt="Custom size Comfyscape mattress"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Custom Built</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            Your Mattress.<br />Your rules.
          </h3>

          <p className="text-xs text-slate-200 leading-relaxed">
            Need a custom bed frame size? Share your measurements and enquire directly with Comfyscape on WhatsApp.
          </p>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full bg-white/95 hover:bg-white text-slate-900 text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group-hover:bg-[#0071C1] group-hover:text-white"
          >
            <span>BUILD YOUR MATTRESS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Custom Mattress Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04] uppercase tracking-wider">
              <Ruler className="w-4 h-4" />
              <span>Custom Dimension Enquiry</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Build Your Custom Mattress
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your bed frame dimensions and comfort preferences to request a quote on WhatsApp.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Length (Inches)
                </label>
                <input
                  type="number"
                  value={lengthInches}
                  onChange={(e) => setLengthInches(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Width (Inches)
                </label>
                <input
                  type="number"
                  value={widthInches}
                  onChange={(e) => setWidthInches(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Thickness
                </label>
                <select
                  value={preferredThickness}
                  onChange={(e) => setPreferredThickness(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
                >
                  <option value="4 Inches">4 Inches</option>
                  <option value="5 Inches">5 Inches</option>
                  <option value="6 Inches">6 Inches</option>
                  <option value="8 Inches">8 Inches</option>
                  <option value="10 Inches">10 Inches</option>
                  <option value="12 Inches">12 Inches</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Firmness / Feel
                </label>
                <select
                  value={feelPreference}
                  onChange={(e) => setFeelPreference(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
                >
                  <option value="Firm">Firm</option>
                  <option value="Medium Firm">Medium Firm</option>
                  <option value="Medium Soft">Medium Soft</option>
                  <option value="Gentle">Gentle</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Bed Frame Type / Special Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Custom wooden cot, storage bed frame..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2F57]"
              />
            </div>

            <a
              href={customWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

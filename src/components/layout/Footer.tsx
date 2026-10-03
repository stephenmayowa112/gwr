import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PALETTES } from '../../design/tokens';

interface FooterProps {
  onNavigate: (path: string) => void;
  activePalette: string;
  onSelectPalette: (paletteId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  activePalette,
  onSelectPalette,
}) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#011F18] border-t border-emerald-900/60 text-emerald-100/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-display font-black text-2xl tracking-tight text-white block">
              UGEGBE GWR
            </span>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs">
              Favour Chisimdi Ugegbe's 48-Hour French Language Marathon. A Guinness World Records attempt for the longest language lesson. Landmark, Lagos, Nigeria.
            </p>
            <div className="text-xs font-mono text-amber-400 font-medium">
              30 OCT – 1 NOV 2026 · ENTRY IS FREE
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/schedule')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Three-Day Schedule
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/live')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Live Stream & Hour Clock
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/favour')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Meet Favour Chisimdi Ugegbe
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/verification')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Guinness Verification Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/visit')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Landmark Venue & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/share')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Daily French Phrase & Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Collaboration & Media */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/partner')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Partner with the Marathon
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/press')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Press Kit & Accreditation
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@ugegbegwr.com"
                  className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  info@ugegbegwr.com
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} className="text-xs text-emerald-400/80 hover:text-amber-400 font-mono transition-colors cursor-pointer">
                  Staff / Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Hashtags */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              STAY CONNECTED
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-white font-medium">Follow the journey: <span className="text-amber-400">@UGEGBEGWR</span></p>
              <p className="text-xs text-emerald-200/80">Instagram · X · TikTok · YouTube</p>
            </div>
            <div className="pt-2 text-xs font-mono text-emerald-300/80 space-y-1">
              <div>#UgegbeGWR</div>
              <div>#FavourUgegbe</div>
              <div>#FrenchLanguageMarathon</div>
            </div>

            {/* Design Palette Token Selector */}
            <div className="pt-3 border-t border-emerald-900/60">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-emerald-400/70 mb-2">
                Brand Palette Theme
              </span>
              <div className="flex items-center gap-2">
                {Object.values(PALETTES).map(p => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPalette(p.id)}
                    className={`px-2 py-1 text-[11px] rounded border transition-all cursor-pointer ${
                      activePalette === p.id
                        ? 'border-amber-400 text-amber-300 bg-amber-400/10 font-medium'
                        : 'border-emerald-800 text-emerald-300/60 hover:text-emerald-200'
                    }`}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy (NDPR)
            </button>
            <span>·</span>
            <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
          </div>
          <div>
            © 2026 Ugegbe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

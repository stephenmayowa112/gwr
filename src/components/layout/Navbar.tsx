import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { UgegbeBrandLogo } from '../common/UgegbeBrandLogo';

interface NavbarProps {
  onOpenRegister: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Countdown', id: 'countdown-section' },
    { label: 'The Record', id: 'the-record' },
    { label: 'Why It Matters', id: 'language-connects-us' },
    { label: 'Schedule', id: 'three-days' },
    { label: 'Get Pass', id: 'be-part-of-the-story' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#001410]/95 backdrop-blur-md border-[#23C48E]/25 shadow-lg shadow-[#001410]/50'
          : 'bg-[#001410] border-[#23C48E]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Official Ugegbe Logo with GWR Seal */}
        <button
          onClick={() => handleNavClick('top')}
          className="cursor-pointer select-none text-left shrink-0 py-1 transition-opacity hover:opacity-90 flex items-center gap-2 group"
          aria-label="Ugegbe - SEE BEYOND WORDS."
        >
          <UgegbeBrandLogo
            variant="gwr-light"
            size="sm"
            withGwrBadge={true}
            showTagline={false}
            className="transition-transform group-hover:scale-[1.02]"
          />
        </button>

        {/* Zone 2: Navigation Links in Mint Mist (Spacious on lg:flex, avoiding tablet crowding) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono uppercase tracking-wider text-[#D2FCE3]/90 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-[#23C48E] transition-colors py-1 cursor-pointer whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#23C48E] after:transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Responsive Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-display font-black tracking-wider uppercase text-[#001410] bg-[#23C48E] hover:bg-[#40FFBC] rounded-md shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            REGISTER FREE
          </button>

          {/* Hamburger Menu Toggle (Shown on mobile and tablet < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#D2FCE3] hover:text-[#23C48E] rounded-md cursor-pointer hover:bg-[#003734]/50 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-50 bg-[#001410]/98 backdrop-blur-xl border-b border-[#23C48E]/30 px-4 sm:px-6 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between w-full text-left px-3 py-3 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider text-[#D2FCE3] hover:bg-[#003734] hover:text-[#23C48E] transition-colors cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#23C48E]/60" />
              </button>
            ))}

            <div className="pt-3 border-t border-[#23C48E]/20 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 text-center bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-sm transition-all"
              >
                [ REGISTER TO ATTEND — FREE ]
              </button>
              <p className="text-[11px] text-center font-mono text-[#D2FCE3]/70">
                Landmark, Lagos · 30 Oct – 1 Nov 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

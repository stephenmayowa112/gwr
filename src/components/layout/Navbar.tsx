import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Language', id: 'language-connects-us' },
    { label: 'The Record', id: 'the-record' },
    { label: 'Favour', id: 'favour-ugegbe' },
    { label: 'Three Days', id: 'three-days' },
    { label: 'Be Part', id: 'be-part-of-the-story' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#022C22]/95 backdrop-blur-md border-b border-emerald-900/60 text-white transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('top')}
          className="font-display font-extrabold text-lg sm:text-2xl tracking-tight text-white hover:text-amber-400 transition-colors cursor-pointer select-none shrink-0"
        >
          @UGEGBEGWR
        </button>

        {/* Zone 2: Uncramped, clean text navigation links from document sections */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8 text-xs font-mono uppercase tracking-wider text-emerald-100/90 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-amber-400 transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary action [ REGISTER FREE ] */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center justify-center px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs font-bold tracking-wider uppercase text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            REGISTER FREE
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-emerald-200 hover:text-white rounded-md cursor-pointer hover:bg-emerald-900/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#022C22] border-b border-emerald-800/80 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-emerald-100 hover:bg-emerald-900/60 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-emerald-800/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 text-center bg-amber-400 text-emerald-950 font-display font-black text-xs uppercase tracking-wider rounded-lg shadow-sm"
              >
                REGISTER FREE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

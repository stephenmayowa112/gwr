import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Language Connects Us', id: 'language-connects-us' },
    { label: 'The Record', id: 'the-record' },
    { label: 'Favour Ugegbe', id: 'favour-ugegbe' },
    { label: 'Three Days', id: 'three-days' },
    { label: 'Be Part of the Story', id: 'be-part-of-the-story' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#022C22]/95 backdrop-blur-md border-b border-emerald-900/60 text-white transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('top')}
          className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white hover:text-amber-400 transition-colors cursor-pointer select-none"
        >
          @UGEGBEGWR
        </button>

        {/* Zone 2: Clean text navigation links from document sections */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-emerald-100/90">
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
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center justify-center px-4.5 py-2.5 text-xs font-bold tracking-wider uppercase text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            REGISTER FREE
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-200 hover:text-white rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#022C22] border-b border-emerald-800/80 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2.5 rounded-md text-xs font-mono uppercase tracking-wider text-emerald-100 hover:bg-emerald-900/50 hover:text-amber-400 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

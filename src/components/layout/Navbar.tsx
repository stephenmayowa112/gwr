import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Schedule', path: '/schedule' },
    { label: 'Live', path: '/live' },
    { label: 'About Favour', path: '/favour' },
    { label: 'Verification', path: '/verification' },
    { label: 'Visit & FAQ', path: '/visit' },
    { label: 'Share', path: '/share' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#022C22]/95 backdrop-blur-md border-b border-emerald-900/60 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="text-left font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white hover:text-amber-400 transition-colors cursor-pointer select-none"
        >
          UGEGBE GWR
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                    : 'hover:text-amber-300 text-emerald-100/90'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/register')}
            className="inline-flex items-center justify-center px-4.5 py-2.5 text-xs font-bold tracking-wider uppercase text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            Register Free
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#022C22] border-b border-emerald-800/80 px-4 pt-3 pb-6 space-y-1">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentPath === '/' ? 'bg-emerald-900/60 text-amber-400' : 'text-emerald-100 hover:bg-emerald-900/30'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.path ? 'bg-emerald-900/60 text-amber-400' : 'text-emerald-100 hover:bg-emerald-900/30'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-emerald-800/60 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleLinkClick('/partner')}
                className="text-left px-3 py-2 text-emerald-300 hover:text-white"
              >
                Partner with us
              </button>
              <button
                onClick={() => handleLinkClick('/press')}
                className="text-left px-3 py-2 text-emerald-300 hover:text-white"
              >
                Press & Media
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

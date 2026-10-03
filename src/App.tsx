import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { SchedulePage } from './pages/SchedulePage';
import { LivePage } from './pages/LivePage';
import { AboutFavourPage } from './pages/AboutFavourPage';
import { VerificationPage } from './pages/VerificationPage';
import { VisitFaqPage } from './pages/VisitFaqPage';
import { SharePage } from './pages/SharePage';
import { PartnerPage } from './pages/PartnerPage';
import { PressPage } from './pages/PressPage';
import { LegalPage } from './pages/LegalPages';
import { AdminPage } from './pages/AdminPage';
import { PALETTES, DEFAULT_PALETTE_ID } from './design/tokens';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [activePalette, setActivePalette] = useState<string>(DEFAULT_PALETTE_ID);

  // Sync route with window pathname on load and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const palette = PALETTES[activePalette] || PALETTES[DEFAULT_PALETTE_ID];

  // Dynamic CSS variables for active palette
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', palette.primary);
      root.style.setProperty('--color-primary-dark', palette.primaryDark);
      root.style.setProperty('--color-accent', palette.accent);
      root.style.setProperty('--color-canvas', palette.canvas);
    }
  }, [palette]);

  // Render active page
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/register':
        return <RegisterPage onNavigate={navigate} />;
      case '/schedule':
        return <SchedulePage onNavigate={navigate} />;
      case '/live':
        return <LivePage onNavigate={navigate} />;
      case '/favour':
        return <AboutFavourPage onNavigate={navigate} />;
      case '/verification':
        return <VerificationPage onNavigate={navigate} />;
      case '/visit':
        return <VisitFaqPage onNavigate={navigate} />;
      case '/share':
        return <SharePage onNavigate={navigate} />;
      case '/partner':
        return <PartnerPage onNavigate={navigate} />;
      case '/press':
        return <PressPage onNavigate={navigate} />;
      case '/privacy':
        return <LegalPage type="privacy" onNavigate={navigate} />;
      case '/terms':
        return <LegalPage type="terms" onNavigate={navigate} />;
      case '/admin':
        return <AdminPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-emerald-800 selection:text-white">
      {/* Sticky Top Bar Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{renderPage()}</main>

      {/* Site Footer */}
      <Footer
        onNavigate={navigate}
        activePalette={activePalette}
        onSelectPalette={setActivePalette}
      />
    </div>
  );
}

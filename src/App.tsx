import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DocumentPage } from './pages/DocumentPage';
import { RegisterModal } from './components/modals/RegisterModal';
import { PartnerModal } from './components/modals/PartnerModal';
import { PressModal } from './components/modals/PressModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isPressOpen, setIsPressOpen] = useState(false);

  // Auto Pop out registration form when users first visit the site
  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem('ugegbe_first_visit_popup_shown');
      if (!hasVisited) {
        sessionStorage.setItem('ugegbe_first_visit_popup_shown', 'true');
        // Brief delay of 750ms so page and brand identity load cleanly before pop out
        const timer = setTimeout(() => {
          setIsRegisterOpen(true);
        }, 750);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if storage access is restricted
      const timer = setTimeout(() => {
        setIsRegisterOpen(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001410] text-[#D2FCE3] selection:bg-[#23C48E] selection:text-[#001410] antialiased">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* Main Content: Verbatim Attached Document */}
      <main className="flex-1 w-full">
        <DocumentPage
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenPartner={() => setIsPartnerOpen(true)}
          onOpenPress={() => setIsPressOpen(true)}
          onScrollToCountdown={() => scrollTo('countdown-section')}
          onScrollToFavour={() => scrollTo('favour-nwobodo')}
        />
      </main>

      {/* Footer: Verbatim Page 7 */}
      <Footer />

      {/* Functional Modals for CTAs mentioned in the document */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      <PressModal
        isOpen={isPressOpen}
        onClose={() => setIsPressOpen(false)}
      />
    </div>
  );
}

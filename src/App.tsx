import React, { useState } from 'react';
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-emerald-800 selection:text-white antialiased">
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
          onScrollToFavour={() => scrollTo('favour-ugegbe')}
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

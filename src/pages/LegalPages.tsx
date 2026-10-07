import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>NIGERIA DATA PROTECTION REGULATION (NDPR) & LEGAL NOTICES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-emerald-950 uppercase tracking-tight">
            {isPrivacy ? 'PRIVACY POLICY' : 'TERMS & CONDITIONS'}
          </h1>
          <p className="text-xs font-mono text-slate-500">
            Last Updated: 3 October 2026 · [PLACEHOLDER LEGAL TEXT SUBJECT TO FINAL LEGAL REVIEW]
          </p>
        </div>

        {isPrivacy ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-slate-700 leading-relaxed shadow-sm">
            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                1. Data Controller & Scope
              </h2>
              <p>
                This Privacy Policy explains how the organizers of <strong>Favour Chisimdi Nwobodo's 48-Hour French Language Marathon</strong> (“we”, “us”, or “our”) collect, process, and safeguard personal data collected via this website and at the event venue (Landmark Centre, Lagos). We comply with the Nigeria Data Protection Act (NDPA) and the Nigeria Data Protection Regulation (NDPR).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                2. Information We Collect
              </h2>
              <p>When you register for a free attendee pass or submit an inquiry, we collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full Name</li>
                <li>Email address (for ticket delivery and event schedule dispatches)</li>
                <li>Phone and WhatsApp number (for crowd management alerts and verification)</li>
                <li>Attendance preferences (in-person at Landmark or virtual live stream)</li>
                <li>Media outlet details (for press accreditation applications)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                3. Purpose of Processing & Security
              </h2>
              <p>
                Your personal data is used solely to generate your QR attendee pass, maintain auditorium fire-safety capacity at Landmark Lagos, verify Guinness World Records witness records, and notify you of critical marathon milestones. We do not sell or rent personal information to third-party commercial brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                4. Photography, Video & Broadcast Notice
              </h2>
              <p>
                The 48-Hour French Language Marathon is an accredited Guinness World Records attempt recorded by continuous multi-angle cameras and broadcast globally. By entering the event hall at Landmark Centre, attendees acknowledge that their image and likeness may appear in documentary feeds, official GWR evidence portfolios, and news media broadcasts.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                5. Contact & Data Rights
              </h2>
              <p>
                You may request access to, correction, or deletion of your registered attendee details at any time by contacting our data protection officer at <strong>privacy@ugegbegwr.com</strong> or <strong>info@ugegbegwr.com</strong>.
              </p>
            </section>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-slate-700 leading-relaxed shadow-sm">
            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                1. Free Admission & Ticketing
              </h2>
              <p>
                Admission to Favour Chisimdi Nwobodo's 48-Hour French Language Marathon at Landmark Lagos is 100% free of charge. Your digital pass guarantees entry subject to auditorium safe capacity limits established by Landmark Centre safety authorities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                2. Venue Conduct & Adjudication Rules
              </h2>
              <p>
                The event is an official Guinness World Records attempt. Attendees must respect quiet zones during delicate phonetics modules and refrain from interfering with the Challenger, independent witnesses, or calibrated timing instruments.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                3. Rolling Attendance (Come & Go)
              </h2>
              <p>
                Attendees may arrive and depart at any hour throughout the 48-hour continuous cycle (Friday 30 Oct 18:00 WAT to Sunday 1 Nov 18:00 WAT). Pass holders must check in at the reception desk using their unique QR code pass.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-bold text-slate-900 uppercase">
                4. Intellectual Property & Branding
              </h2>
              <p>
                All lesson curricula, trademarks, and marathon media are © 2026 Ugegbe. Guinness World Records™ is a registered trademark of Guinness World Records Limited.
              </p>
            </section>
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-mono uppercase tracking-wider text-emerald-900 hover:text-amber-600 font-bold cursor-pointer"
          >
            ← Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

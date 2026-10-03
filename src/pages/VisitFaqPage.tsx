import React, { useState } from 'react';
import {
  MapPin,
  Car,
  ChevronDown,
  ChevronUp,
  Camera,
  Users,
  Baby,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { store } from '../services/store';
import { FaqItem } from '../types';

interface VisitFaqPageProps {
  onNavigate: (path: string) => void;
}

export const VisitFaqPage: React.FC<VisitFaqPageProps> = ({ onNavigate }) => {
  const faqs = store.getFaqs();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const landmarkMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Landmark+Centre+Victoria+Island+Lagos+Nigeria';

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            VENUE GUIDE & VISITOR ESSENTIALS · LANDMARK LAGOS
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            VISIT & FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Everything you need to know about joining the 48-hour French Language Marathon in person at Landmark Centre, Victoria Island, Lagos.
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="bg-white border-2 border-emerald-900/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>OFFICIAL MARATHON VENUE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-emerald-950 uppercase tracking-tight mt-1">
                LANDMARK CENTRE, LAGOS
              </h2>
              <p className="text-sm text-slate-600 font-mono mt-0.5">
                Plot 2 & 3, Water Corporation Drive, Victoria Island, Lagos, Nigeria
              </p>
            </div>

            <a
              href={landmarkMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
            <div className="space-y-2">
              <span className="font-bold text-slate-900 font-display flex items-center gap-1.5 uppercase text-xs font-mono tracking-wider">
                <Car className="w-4 h-4 text-emerald-700" />
                Transport & Parking
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated secured on-site parking available inside Landmark compound. Rideshare (Uber, Bolt, inDrive) pickup and drop-off bays are located directly in front of the main foyer.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 font-display flex items-center gap-1.5 uppercase text-xs font-mono tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Security & Admission
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Round-the-clock professional security and bag screening. Entry is 100% free with your registered pass ticket.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 font-display flex items-center gap-1.5 uppercase text-xs font-mono tracking-wider">
                <Users className="w-4 h-4 text-emerald-700" />
                Accessibility
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                The auditorium features complete wheelchair step-free access, accessibility ramps at all entries, and reserved front seating.
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Policy Highlights (Children, Cameras, Come and Go) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-slate-900 uppercase">
              Come & Go Anytime
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are welcome to drop in for <strong>ten minutes</strong> or stay for <strong>ten hours</strong>. The hall operates continuously day and night.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 w-fit">
              <Baby className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-slate-900 uppercase">
              Children & Families Welcome
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspire the next generation. Children of all ages are welcome to learn French phrases, sing along, and witness a world record.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 w-fit">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-slate-900 uppercase">
              Cameras Encouraged
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Photography and mobile filming are strongly encouraged. Tag <strong>@UGEGBEGWR</strong> and use <strong>#UgegbeGWR</strong> to share the moment.
            </p>
          </div>
        </div>

        {/* Accordion FAQ with FAQPage Schema.org Structured Data */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              ANSWERS TO COMMON QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-emerald-950 uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base text-slate-900">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-800" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Embedded FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            }),
          }}
        />

        {/* Final CTA */}
        <div className="p-8 bg-[#022C22] text-white rounded-2xl text-center space-y-4">
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">
            READY TO JOIN US AT LANDMARK?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 font-mono">
            Get your instant free attendee ticket pass now.
          </p>
          <button
            onClick={() => onNavigate('/register')}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
          >
            Register Free Attendee Pass
          </button>
        </div>
      </div>
    </div>
  );
};

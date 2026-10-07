import React, { useState } from 'react';
import {
  FileText,
  Download,
  Mail,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Globe2,
  Tv,
  Newspaper
} from 'lucide-react';
import { PressRequestSchema, PressRequestFormData } from '../types';
import { store } from '../services/store';

interface PressPageProps {
  onNavigate: (path: string) => void;
}

export const PressPage: React.FC<PressPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<PressRequestFormData>({
    name: '',
    outlet: '',
    role: '',
    email: '',
    coverageType: 'Broadcast & Television',
    notes: '',
    websiteTrap: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (formData.websiteTrap && formData.websiteTrap.length > 0) {
      return;
    }

    const validation = PressRequestSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      store.addPressRequest(validation.data);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred. Please contact info@ugegbegwr.com directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPressKit = () => {
    const kitText = `FAVOUR UGEGBE'S 48-HOUR FRENCH LANGUAGE MARATHON
OFFICIAL PRESS KIT & FACT SHEET
Guinness World Records Attempt — Longest Language Lesson

EVENT FACTS:
- Challenger: Favour Chisimdi Ugegbe (Nigerian polyglot speaking 11 languages: 9 foreign, 2 Nigerian).
- Attempt: Longest language lesson (continuous French instruction).
- Target: 48 Hours.
- Current Official Guinness Record: 26 Hours.
- Venue: Landmark Centre, Victoria Island, Lagos, Nigeria.
- Dates: Friday, 30 October 2026, 18:00 WAT through Sunday, 1 November 2026, 18:00 WAT.
- Admission: 100% Free Public Admission.
- Social Handles: @UGEGBEGWR (Instagram, X, TikTok, YouTube).
- Official Hashtags: #UgegbeGWR #FavourNwobodo #FrenchLanguageMarathon.
- Press Office Contact: press@ugegbegwr.com | info@ugegbegwr.com.

BOILERPLATE:
Favour Chisimdi Nwobodo is a Nigerian educator and polyglot dedicated to bridging linguistic and cultural boundaries across Africa. For 48 continuous hours at Landmark Centre, Lagos, Nigeria, she will deliver an extraordinary French masterclass before independent adjudicators, setting a historic new Guinness World Records title and celebrating Nigeria's relationship with its Francophone neighbors.`;

    const blob = new Blob([kitText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ugegbe-GWR-Press-Kit-Fact-Sheet.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            MEDIA ROOM & ACCREDITATION
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            PRESS & MEDIA PORTAL
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Accreditation, fast facts, high-resolution media assets, and official statements for journalists, broadcasters, and correspondents covering the 48-Hour French Language Marathon.
          </p>
        </div>

        {/* Fact Sheet & Media Kit Download Slot */}
        <div className="bg-white border-2 border-emerald-900/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold block">
                OFFICIAL FACT SHEET
              </span>
              <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight mt-1">
                EVENT AT A GLANCE
              </h2>
            </div>

            <button
              onClick={handleDownloadPressKit}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Press Kit (.txt)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Challenger
                </span>
                <span className="font-bold text-slate-900">
                  Favour Chisimdi Nwobodo (Nigerian Polyglot, 11 Languages)
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Target Record & Category
                </span>
                <span className="font-bold text-slate-900">
                  48 Hours (Longest Language Lesson, Guinness World Records™)
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Standing Guinness Record
                </span>
                <span className="font-semibold text-slate-700">
                  26 Hours (Favour aims 22 hours beyond the mark)
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Dates & Timezone
                </span>
                <span className="font-bold text-slate-900">
                  30 Oct – 1 Nov 2026 (Africa/Lagos, WAT, UTC+1)
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Venue & Admission
                </span>
                <span className="font-semibold text-slate-700">
                  Landmark Centre, Victoria Island, Lagos, Nigeria. Entry is 100% Free.
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Media Contact
                </span>
                <span className="font-mono text-xs text-emerald-800 font-semibold">
                  info@ugegbegwr.com · @UGEGBEGWR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Short Boilerplate (Verbatim per spec) */}
        <div className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
            OFFICIAL BOILERPLATE
          </span>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
            “For 48 hours, Favour Chisimdi Nwobodo will teach, speak, engage and keep going, turning a French lesson into a live celebration of language, culture, endurance and possibility. From 30 October to 1 November 2026, Lagos, Nigeria will become the stage for an extraordinary 48-hour French Language Marathon — an audacious attempt to set a new Guinness World Records title. Not in Paris. In Nigeria.”
          </p>
        </div>

        {/* Media Accreditation Request Form */}
        <div className="bg-white border border-emerald-950/15 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              PRESS PASS ACCREDITATION
            </span>
            <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
              REQUEST PRESS BADGE & INTERVIEW ACCESS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Accredited journalists receive access to the on-site press gallery, multi-camera audio feeds, and scheduled press briefings with Favour and independent witnesses.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-xl font-display font-bold text-emerald-950 uppercase">
                Accreditation Request Received
              </h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our press desk has logged your application for {formData.outlet} and will email confirmation along with press badge collection instructions at Landmark.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-emerald-900 text-white font-mono text-xs uppercase tracking-wider rounded-lg"
              >
                Submit Additional Press Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  value={formData.websiteTrap || ''}
                  onChange={(e) => setFormData({ ...formData, websiteTrap: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mediaName" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Journalist / Producer Name *
                  </label>
                  <input
                    id="mediaName"
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="mediaOutlet" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Media Outlet / Platform *
                  </label>
                  <input
                    id="mediaOutlet"
                    type="text"
                    required
                    placeholder="e.g. Channels TV, BBC Africa, Punch"
                    value={formData.outlet}
                    onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.outlet && <p className="text-xs text-rose-600 mt-1">{errors.outlet}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mediaRole" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Role / Job Title *
                  </label>
                  <input
                    id="mediaRole"
                    type="text"
                    required
                    placeholder="e.g. Senior Reporter, Photojournalist"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.role && <p className="text-xs text-rose-600 mt-1">{errors.role}</p>}
                </div>

                <div>
                  <label htmlFor="mediaEmail" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Press Email Address *
                  </label>
                  <input
                    id="mediaEmail"
                    type="email"
                    required
                    placeholder="journalist@media.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="mediaType" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                  Primary Coverage Format *
                </label>
                <select
                  id="mediaType"
                  value={formData.coverageType}
                  onChange={(e) => setFormData({ ...formData, coverageType: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  <option value="Broadcast & Television">Broadcast & Television</option>
                  <option value="Print & Newspaper">Print & Newspaper</option>
                  <option value="Digital / Online Media">Digital / Online Media</option>
                  <option value="Radio / Podcast">Radio / Podcast</option>
                  <option value="Photojournalism & Documentary">Photojournalism & Documentary</option>
                </select>
              </div>

              <div>
                <label htmlFor="mediaNotes" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                  Broadcast Equipment & Technical Requirements (Optional)
                </label>
                <textarea
                  id="mediaNotes"
                  rows={3}
                  placeholder="Specify OB van parking, multi-box audio feed, or interview slot preferences..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting Application...' : 'Request Media Accreditation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

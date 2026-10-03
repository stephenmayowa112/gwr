import React, { useState } from 'react';
import {
  Briefcase,
  Download,
  CheckCircle2,
  Users,
  Eye,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { PartnerInquirySchema, PartnerInquiryFormData } from '../types';
import { store } from '../services/store';

interface PartnerPageProps {
  onNavigate: (path: string) => void;
}

export const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<PartnerInquiryFormData>({
    name: '',
    organization: '',
    email: '',
    tierInterest: 'Headline / Title Partner',
    message: '',
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

    const validation = PartnerInquirySchema.safeParse(formData);
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
      store.addPartnerInquiry(validation.data);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred. Please contact info@ugegbegwr.com directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadDeck = () => {
    // Generate a simple PDF / text brief summary download
    const deckContent = `FAVOUR UGEGBE'S 48-HOUR FRENCH LANGUAGE MARATHON
Guinness World Records Attempt — Longest Language Lesson
30 October – 1 November 2026 | Landmark, Lagos, Nigeria

PARTNERSHIP OPPORTUNITY OVERVIEW:
- Objective: 48 hours of continuous French teaching to break the existing 26h record.
- Audience: 2,500+ on-site attendees, 500,000+ live stream viewers across Nigeria and Francophone West Africa.
- Contact: info@ugegbegwr.com | @UGEGBEGWR
- Tiers: Headline Partner, Cultural & Education Partner, Community & Youth Supporter.

For formal decks and customized brand activations, contact partnerships@ugegbegwr.com.`;

    const blob = new Blob([deckContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ugegbe-GWR-Partnership-Overview-2026.txt';
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
            CORPORATE & INSTITUTIONAL ALLIANCES
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            PARTNER WITH THE MARATHON
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Put your organisation alongside a historic Nigerian achievement in education, cross-border commerce, youth ambition, and world record history.
          </p>
        </div>

        {/* Why Partner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 w-fit">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase">
              Cross-Border Reach
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nigeria is encircled by Francophone nations. Align your brand with the pan-African narrative of AfCFTA integration, trade, and youth empowerment.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase">
              Guinness Record Legacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Associate your brand with permanent global history as Favour pushes 22 hours beyond the standing 26-hour mark into the Guinness World Records archives.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 w-fit">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase">
              Omnichannel Visibility
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              48 continuous hours of global live streaming, premium stage presence at Landmark Lagos, national broadcast syndication, and millions of social impressions.
            </p>
          </div>
        </div>

        {/* Audience & Reach Metrics Placeholders */}
        <div className="bg-[#022C22] text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
            ESTIMATED EVENT REACH & AUDIENCE PROJECTIONS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-800/80">
              <div className="text-3xl font-display font-black text-amber-400 font-mono">2,500+</div>
              <span className="text-[11px] font-mono text-emerald-200 uppercase mt-1 block">
                In-Person Attendees
              </span>
            </div>

            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-800/80">
              <div className="text-3xl font-display font-black text-white font-mono">500K+</div>
              <span className="text-[11px] font-mono text-emerald-200 uppercase mt-1 block">
                Live Stream Views
              </span>
            </div>

            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-800/80">
              <div className="text-3xl font-display font-black text-white font-mono">5M+</div>
              <span className="text-[11px] font-mono text-emerald-200 uppercase mt-1 block">
                Social Impressions
              </span>
            </div>

            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-800/80">
              <div className="text-3xl font-display font-black text-amber-400 font-mono">48h</div>
              <span className="text-[11px] font-mono text-emerald-200 uppercase mt-1 block">
                Continuous Broadcast
              </span>
            </div>
          </div>
        </div>

        {/* Three Sponsorship Tiers (Placeholders) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                PACKAGES & BENEFIT MATRIX
              </span>
              <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                SPONSORSHIP TIERS
              </h2>
            </div>

            {/* Downloadable Deck Slot */}
            <button
              onClick={handleDownloadDeck}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Partnership Brief (.txt)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="p-6 bg-white border-2 border-amber-500/50 rounded-2xl space-y-4 shadow-sm relative">
              <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
                TIER 01 · EXCLUSIVE
              </div>
              <h3 className="text-xl font-display font-black text-emerald-950 uppercase">
                Headline / Title Partner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supreme brand integration: “In partnership with [Your Brand]”, marquee stage branding, official broadcast lower-thirds, keynote remarks at Send-Off, VIP hospitality suite, and GWR commemorative plaque.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                [Category exclusivity available upon review]
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                TIER 02
              </div>
              <h3 className="text-xl font-display font-black text-emerald-950 uppercase">
                Cultural & Education Partner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sponsor dedicated 6-hour curriculum blocks, provide branded educational materials for student attendees, digital stream commercial spots, and on-site experiential product showcase booth.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                [Target: Financial services, Telcos, EdTech]
              </div>
            </div>

            {/* Tier 3 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                TIER 03
              </div>
              <h3 className="text-xl font-display font-black text-emerald-950 uppercase">
                Community & Youth Supporter
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Support school group transport from across Lagos State, hydration and refreshment support for attendees, digital logo inclusion on website, and social recognition across @UGEGBEGWR channels.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                [In-kind & product supply welcome]
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Inquiry Form */}
        <div className="bg-white border border-emerald-950/15 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              START A CONVERSATION
            </span>
            <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
              SUBMIT A PARTNERSHIP INQUIRY
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our team reviews inquiries daily and will respond within 24 hours. Emails dispatch to <strong>info@ugegbegwr.com</strong>.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-xl font-display font-bold text-emerald-950 uppercase">
                Inquiry Received. Thank you.
              </h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                Our partnerships lead has received your proposal for {formData.organization} and will contact you via {formData.email} with the full sponsorship deck and activation options.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-emerald-900 text-white font-mono text-xs uppercase tracking-wider rounded-lg"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field */}
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
                  <label htmlFor="pName" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Contact Name *
                  </label>
                  <input
                    id="pName"
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
                  <label htmlFor="pOrg" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Organisation / Brand *
                  </label>
                  <input
                    id="pOrg"
                    type="text"
                    required
                    placeholder="Company or agency name"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.organization && <p className="text-xs text-rose-600 mt-1">{errors.organization}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pEmail" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Work Email *
                  </label>
                  <input
                    id="pEmail"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="pTier" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                    Sponsorship Interest *
                  </label>
                  <select
                    id="pTier"
                    value={formData.tierInterest}
                    onChange={(e) => setFormData({ ...formData, tierInterest: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="Headline / Title Partner">Headline / Title Partner</option>
                    <option value="Cultural & Education Partner">Cultural & Education Partner</option>
                    <option value="Community & Youth Supporter">Community & Youth Supporter</option>
                    <option value="Custom In-Kind / Venue Support">Custom In-Kind / Venue Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="pMessage" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1">
                  Message & Partnership Objectives *
                </label>
                <textarea
                  id="pMessage"
                  rows={4}
                  required
                  placeholder="Share a brief overview of your brand's interest, timeline, or preferred activation format..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting Proposal...' : 'Send Partnership Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

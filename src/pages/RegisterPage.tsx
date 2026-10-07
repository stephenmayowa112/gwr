import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  Share2,
  AlertCircle,
  ExternalLink,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { RegistrationSchema, RegistrationFormData, Registration } from '../types';
import { store } from '../services/store';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../services/calendar';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const eventConfig = store.getEventConfig();

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    attendeesCount: 1,
    attendanceType: 'in_person',
    hearAbout: '',
    consent: true,
    websiteTrap: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    registration: Registration;
    isUpdate: boolean;
    waitlisted: boolean;
  } | null>(null);

  // Capture UTM parameters from URL if present
  const getUtmParams = () => {
    if (typeof window === 'undefined') return {};
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot check
    if (formData.websiteTrap && formData.websiteTrap.length > 0) {
      return;
    }

    const validation = RegistrationSchema.safeParse(formData);
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
      const result = await store.registerAttendee(validation.data, getUtmParams());
      setSuccessResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const landmarkMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Landmark+Centre+Victoria+Island+Lagos+Nigeria';

  // SUCCESS SCREEN WITH QR TICKET
  if (successResult) {
    const { registration, isUpdate, waitlisted } = successResult;

    return (
      <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Status Banner */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-800 mb-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-emerald-950 uppercase tracking-tight">
              {waitlisted
                ? 'YOU ARE ON THE OFFICIAL WAITLIST'
                : isUpdate
                ? 'YOUR PASS HAS BEEN UPDATED'
                : 'YOU ARE REGISTERED. BE THERE.'}
            </h1>
            <p className="text-base text-slate-700 max-w-md mx-auto leading-relaxed">
              {waitlisted
                ? 'Due to unprecedented demand at Landmark, your pass is queued on our priority list. We will notify you immediately as seating capacity opens.'
                : isUpdate
                ? `We have updated your registration details under ${registration.email}. Present this updated pass at Landmark.`
                : `A confirmation receipt with your QR ticket, event reminders, and directions has been recorded for ${registration.email}.`}
            </p>
          </div>

          {/* OFFICIAL PASS CARD (Print-friendly) */}
          <div className="bg-white border-2 border-emerald-900/30 rounded-2xl overflow-hidden shadow-xl p-6 sm:p-8 space-y-6 print:border-black print:shadow-none">
            {/* Ticket Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-amber-600 font-bold">
                  OFFICIAL ATTENDEE PASS
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                  FAVOUR UGEGBE GWR
                </h2>
                <div className="text-xs text-slate-500 font-mono">
                  48-HOUR FRENCH LANGUAGE MARATHON
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-900 text-amber-400 font-mono font-bold text-xs rounded uppercase tracking-wider">
                  FREE ADMISSION
                </span>
              </div>
            </div>

            {/* QR Code and Attendee Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-emerald-50/50 border border-emerald-900/10 rounded-xl">
                {registration.qrCodeDataUrl ? (
                  <img
                    src={registration.qrCodeDataUrl}
                    alt={`QR Pass for ${registration.ticketCode}`}
                    className="w-44 h-44 object-contain rounded-lg shadow-xs"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center bg-slate-200 text-slate-500 font-mono text-xs">
                    QR CODE GENERATED
                  </div>
                )}
                <div className="mt-2 text-center">
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-950 block">
                    {registration.ticketCode}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Scan for instant check-in
                  </span>
                </div>
              </div>

              <div className="sm:col-span-7 space-y-3.5 text-sm text-slate-700">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    Attendee Name
                  </span>
                  <span className="font-bold text-base text-slate-900">
                    {registration.fullName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Number of Guests
                    </span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {registration.attendeesCount}{' '}
                      {registration.attendeesCount > 1 ? 'People' : 'Person'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Mode
                    </span>
                    <span className="font-semibold text-emerald-800 uppercase text-xs font-mono">
                      {registration.attendanceType === 'in_person'
                        ? 'In Person (Landmark)'
                        : 'Online Stream'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    Venue Location
                  </span>
                  <span className="font-medium text-slate-900 block">
                    Landmark Centre, Victoria Island, Lagos
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    Dates & Official Start
                  </span>
                  <span className="font-medium text-slate-900 block">
                    30 Oct 2026, 18:00 WAT – 1 Nov 2026, 18:00 WAT
                  </span>
                </div>
              </div>
            </div>

            {/* Microcopy Instructions */}
            <div className="bg-slate-50 rounded-lg p-3.5 text-xs text-slate-600 leading-relaxed border border-slate-200">
              <p>
                <strong>Check-in instructions:</strong> Present this screen or a printed copy upon arrival at Landmark Centre. Entry is continuous across the 48 hours. Drop in for 10 minutes or stay for 10 hours.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 print:hidden">
              <button
                onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon)}
                className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                Add to Calendar (.ics)
              </button>

              <a
                href={generateGoogleCalendarUrl(OFFICIAL_MILESTONES.fullMarathon)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Google Calendar
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={landmarkMapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-700" />
                Map
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Print Pass
              </button>
            </div>
          </div>

          <div className="mt-8 text-center print:hidden">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-emerald-900 transition-colors cursor-pointer"
            >
              ← Return to Marathon Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM
  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            FREE ADMISSION · LANDMARK LAGOS & LIVE STREAM
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-emerald-950 uppercase tracking-tight">
            REGISTER TO ATTEND
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Be part of the story. Come for an hour. Come for ten minutes. Bring your friends. Learn a phrase, cheer Favour on, and watch history happen in real time.
          </p>
        </div>

        {/* Capacity / Waitlist Notice if enabled in admin */}
        {eventConfig.waitlistActive && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Hall Capacity Reached — Waitlist Active</strong>
              In-person registrations are currently prioritized onto our waitlist. Online access remains instantaneous.
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white border border-emerald-950/15 rounded-2xl p-6 sm:p-10 shadow-sm">
          {errors.form && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (hidden from genuine users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="websiteTrap">Leave blank</label>
              <input
                id="websiteTrap"
                type="text"
                value={formData.websiteTrap || ''}
                onChange={(e) => setFormData({ ...formData, websiteTrap: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="e.g. Chisimdi Nwosu"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Your QR pass and confirmation will be sent to this email. Re-entering will safely update your pass.
              </p>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
              )}
            </div>

            {/* Number of Attendees & Attendance Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="attendeesCount" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                  Number of Attendees (1 - 10) *
                </label>
                <select
                  id="attendeesCount"
                  value={formData.attendeesCount}
                  onChange={(e) =>
                    setFormData({ ...formData, attendeesCount: parseInt(e.target.value, 10) || 1 })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
                {errors.attendeesCount && (
                  <p className="mt-1 text-xs text-rose-600">{errors.attendeesCount}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                  Attendance Mode *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceType: 'in_person' })}
                    className={`py-3 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      formData.attendanceType === 'in_person'
                        ? 'border-emerald-800 bg-emerald-900 text-white font-bold'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    In Person (Lagos)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceType: 'online' })}
                    className={`py-3 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      formData.attendanceType === 'online'
                        ? 'border-emerald-800 bg-emerald-900 text-white font-bold'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Online Stream
                  </button>
                </div>
              </div>
            </div>

            {/* How did you hear about this? */}
            <div>
              <label htmlFor="hearAbout" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-1.5">
                How did you hear about the marathon? (Optional)
              </label>
              <select
                id="hearAbout"
                value={formData.hearAbout || ''}
                onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm cursor-pointer"
              >
                <option value="">Select option</option>
                <option value="Instagram @UGEGBEGWR">Instagram (@UGEGBEGWR)</option>
                <option value="X (Twitter)">X / Twitter</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
                <option value="Friend or Colleague">Friend or Colleague</option>
                <option value="School / University / Alliance Française">School / University / Alliance Française</option>
                <option value="News & Press Coverage">News & Press Coverage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-4 h-4 mt-1 text-emerald-800 rounded border-slate-300 focus:ring-emerald-800 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I agree to receive event updates, schedule alerts, and entry instructions for Favour Chisimdi Nwobodo's 48-Hour French Language Marathon in accordance with the event's NDPR privacy policy.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-rose-600">{errors.consent}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-black text-sm uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'GENERATING YOUR PASS...' : 'COMPLETE FREE REGISTRATION'}
              </button>
            </div>
          </form>
        </div>

        {/* Reassurance footer */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-mono text-center">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>NDPR Data Protected</span>
          </div>
          <span>·</span>
          <span>100% Free Entry</span>
          <span>·</span>
          <span>Instant QR Ticket</span>
        </div>
      </div>
    </div>
  );
};

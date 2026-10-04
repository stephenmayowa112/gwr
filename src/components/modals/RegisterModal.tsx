import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Printer, ExternalLink, ShieldCheck } from 'lucide-react';
import { RegistrationSchema, RegistrationFormData, Registration } from '../../types';
import { store } from '../../services/store';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../../services/calendar';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

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
      const result = await store.registerAttendee(validation.data);
      setSuccessResult(result);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const landmarkMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Landmark+Centre+Victoria+Island+Lagos+Nigeria';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-8 border border-emerald-950/20 my-auto">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                {successResult.isUpdate ? 'REGISTRATION UPDATED' : 'YOU ARE REGISTERED. BE THERE.'}
              </h3>
              <p className="text-xs text-slate-600 font-mono">
                Landmark, Lagos · 30 October – 1 November 2026 · Entry is free
              </p>
            </div>

            {/* Official Pass Display */}
            <div className="bg-emerald-50/60 border border-emerald-900/20 rounded-xl p-5 text-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-700 font-bold block">
                OFFICIAL ATTENDEE PASS
              </span>

              {successResult.registration.qrCodeDataUrl && (
                <img
                  src={successResult.registration.qrCodeDataUrl}
                  alt={`QR Pass for ${successResult.registration.ticketCode}`}
                  className="w-36 h-36 mx-auto object-contain bg-white p-2 rounded-lg border border-emerald-900/10 shadow-xs"
                />
              )}

              <div>
                <span className="text-sm font-mono font-bold text-emerald-950 block">
                  {successResult.registration.ticketCode}
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-1">
                  {successResult.registration.fullName}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {successResult.registration.attendeesCount}{' '}
                  {successResult.registration.attendeesCount > 1 ? 'attendees' : 'attendee'} ·{' '}
                  {successResult.registration.attendanceType === 'in_person'
                    ? 'In Person (Landmark)'
                    : 'Online Stream'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon)}
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Calendar (.ics)</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(OFFICIAL_MILESTONES.fullMarathon)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Google Cal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={landmarkMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Map</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-800 cursor-pointer pt-2"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                LANDMARK, LAGOS · ENTRY IS FREE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-emerald-950 uppercase tracking-tight">
                REGISTER TO ATTEND
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                You don’t have to speak French. You just have to show up.
              </p>
            </div>

            {errors.form && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
                {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Attendees (1-10) *
                  </label>
                  <select
                    value={formData.attendeesCount}
                    onChange={(e) =>
                      setFormData({ ...formData, attendeesCount: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Mode *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendanceType: 'in_person' })}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-colors cursor-pointer ${
                        formData.attendanceType === 'in_person'
                          ? 'bg-emerald-950 text-white font-bold border-emerald-950'
                          : 'bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      In Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendanceType: 'online' })}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-colors cursor-pointer ${
                        formData.attendanceType === 'online'
                          ? 'bg-emerald-950 text-white font-bold border-emerald-950'
                          : 'bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      Online
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-black text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'GENERATING PASS...' : 'REGISTER FREE'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

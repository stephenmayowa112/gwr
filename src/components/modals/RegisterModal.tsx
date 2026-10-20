import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { RegistrationSchema, RegistrationFormData, Registration } from '../../types';
import { store } from '../../services/store';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../../services/calendar';
import { UgegbeBrandLogo } from '../common/UgegbeBrandLogo';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<RegistrationFormData & { attendeesCount: number }>({
    fullName: '',
    email: '',
    phone: '',
    attendeesCount: 1, // Always 1 person per registration
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

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (formData.websiteTrap && formData.websiteTrap.length > 0) return;

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
      // Add attendeesCount to the data since we removed it from the form but store still expects it
      const registrationData = {
        ...validation.data,
        attendeesCount: 1 // Always 1 person per registration
      };
      
      console.log('Submitting registration data:', registrationData);
      console.log('Registration data keys:', Object.keys(registrationData));
      console.log('Registration data values:', Object.values(registrationData));
      
      const result = await store.registerAttendee(registrationData);
      console.log('Registration successful:', result);
      setSuccessResult(result);
      
      // Store registration data in sessionStorage for ThankYouPage
      sessionStorage.setItem('ugegbe_registration_success', JSON.stringify(result.registration));
      
      // Call onSuccess callback after a brief delay to show success state
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error type:', typeof err);
      console.error('Error message:', err instanceof Error ? err.message : String(err));
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
      setErrors({ form: `An unexpected error occurred: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const landmarkMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Landmark+Centre+Victoria+Island+Lagos+Nigeria';

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#001410] text-[#D2FCE3] rounded-2xl shadow-2xl p-5 sm:p-8 border border-[#23C48E]/40 my-auto animate-in zoom-in-95 duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 text-[#D2FCE3]/60 hover:text-white rounded-full hover:bg-[#003734] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="p-2 sm:p-4 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-[#23C48E]/10 text-[#23C48E] border border-[#23C48E]/30">
                <CheckCircle2 className="w-8 h-8 text-[#23C48E]" />
              </div>
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                {successResult.isUpdate ? 'REGISTRATION UPDATED' : 'YOU ARE REGISTERED!'}
              </h3>
              <p className="text-xs text-[#D2FCE3]/80 font-mono">
                Lagos, Nigeria Â· 13 November – 15 November 2026 Â· Entry is free
              </p>
            </div>

            {/* Registration Confirmation */}
            <div className="bg-[#003734]/40 border border-[#23C48E]/30 rounded-xl p-5 text-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#23C48E] font-bold block">
                REGISTRATION CONFIRMED
              </span>

              <div className="space-y-2">
                <span className="text-lg sm:text-xl font-bold text-white block">
                  {successResult.registration.fullName}
                </span>
                <span className="text-sm text-[#23C48E] font-mono block">
                  {successResult.registration.email}
                </span>
                <span className="text-xs text-[#D2FCE3]/70 font-mono block">
                  1 attendee Â·{' '}
                  {successResult.registration.attendanceType === 'in_person'
                    ? 'In Person (Lagos)'
                    : 'Online Stream'}
                </span>
              </div>

              <div className="pt-3 border-t border-[#23C48E]/20">
                <p className="text-xs text-[#D2FCE3]/80 leading-relaxed">
                  A confirmation email has been sent to {successResult.registration.email}. 
                  Entry is 100% free. See you in Lagos!
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon)}
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Calendar (.ics)</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(OFFICIAL_MILESTONES.fullMarathon)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/30 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Google Cal</span>
                  <ExternalLink className="w-3 h-3 text-[#23C48E]" />
                </a>

                <a
                  href={landmarkMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/30 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#23C48E]" />
                  <span>Map</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-[#D2FCE3]/60 hover:text-white cursor-pointer pt-2"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 sm:p-4 space-y-5">
            <div className="flex justify-center pb-1">
              <img
                src="/UGEGBE_X_GWR_White.png"
                alt="Ugegbe x Guinness World Records"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(35,196,142,0.3)]"
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#23C48E] font-bold block">
                13-15 NOVEMBER 2026 · LAGOS, NIGERIA · 100% FREE
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                WATCH UGEGBE TAKE ON A 48-HOUR FRENCH LESSON
              </h3>
              <p className="text-xs text-[#D2FCE3]/80 font-normal">
                You don't have to speak French. Just show up and make history.
              </p>
            </div>

            {errors.form && (
              <div className="p-3 bg-rose-950/80 border border-rose-500 text-rose-200 text-xs rounded-lg">
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
                <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  autoComplete="name"
                  className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                />
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                    className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    autoComplete="tel"
                    className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                  />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                    Mode *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendanceType: 'in_person' })}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-colors cursor-pointer ${
                        formData.attendanceType === 'in_person'
                          ? 'bg-[#23C48E] text-[#001410] font-bold border-[#23C48E]'
                          : 'bg-[#003734]/40 text-[#D2FCE3] border-[#23C48E]/30'
                      }`}
                    >
                      In Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendanceType: 'online' })}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-colors cursor-pointer ${
                        formData.attendanceType === 'online'
                          ? 'bg-[#23C48E] text-[#001410] font-bold border-[#23C48E]'
                          : 'bg-[#003734]/40 text-[#D2FCE3] border-[#23C48E]/30'
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
                  className="w-full py-3.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-60"
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

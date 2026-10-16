import React, { useEffect, useState } from 'react';
import { CheckCircle2, Calendar, Download, ExternalLink, ArrowRight, Share2 } from 'lucide-react';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../services/calendar';
import type { Registration } from '../types';

interface ThankYouPageProps {
  onNavigate: (path: string) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigate }) => {
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    // Get registration data from sessionStorage
    const storedData = sessionStorage.getItem('ugegbe_registration_success');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setRegistration(data);
      } catch (err) {
        console.error('Failed to parse registration data:', err);
      }
    }
  }, []);

  const handleShare = () => {
    const text = `I just registered for the 48-Hour French Language Marathon in Lagos! Join me: https://ugegbegwr.com #UgegbeGWR #FavourUgegbe`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-emerald-50 border-2 border-emerald-600">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
              YOU'RE REGISTERED!
            </h1>
            <p className="text-lg sm:text-2xl text-slate-700 font-light">
              Welcome to history in the making
            </p>
          </div>
        </div>

        {/* Registration Details Card */}
        {registration && (
          <div className="bg-white border-2 border-emerald-900/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>REGISTRATION CONFIRMED</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Registered Name</p>
                <p className="text-xl font-display font-bold text-slate-900">{registration.fullName}</p>
              </div>
              
              <div className="pt-2 border-t border-slate-100">
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="text-sm font-mono text-slate-900">{registration.email}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-slate-600">Attendance</p>
                <p className="text-sm font-semibold text-slate-900">
                  {registration.attendanceType === 'in_person' ? 'In Person (Lagos)' : 'Online Stream'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed">
                Your registration has been confirmed! We look forward to seeing you at the event.
              </p>
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">
            MARK YOUR CALENDAR
          </h2>
          <div className="space-y-2 text-emerald-100">
            <p className="text-lg font-semibold">48-Hour French Language Marathon</p>
            <p className="text-sm">30 October – 1 November 2026</p>
            <p className="text-sm">Lagos, Nigeria · 100% Free Entry</p>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon, 'ugegbe-48h-marathon.ics')}
              className="inline-flex items-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .ics</span>
            </button>

            <a
              href={generateGoogleCalendarUrl(OFFICIAL_MILESTONES.fullMarathon)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-600 font-bold">
            <Share2 className="w-4 h-4" />
            <span>SPREAD THE WORD</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Invite Others to Join
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Help us make history! Share this moment with friends and family. The more who witness, the bigger the impact.
          </p>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Share with Friends
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-display font-black text-slate-900 uppercase">
            WHAT HAPPENS NEXT?
          </h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Save Your Spot</p>
                <p className="text-sm text-slate-600">Your registration is confirmed. Entry is completely free.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Add to Calendar</p>
                <p className="text-sm text-slate-600">Use the buttons above to add the event to your calendar app.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Show Up & Make History</p>
                <p className="text-sm text-slate-600">Just show up at the venue. Entry is 100% free - no tickets needed!</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => onNavigate('/')}
            className="flex-1 px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-display font-bold text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => onNavigate('/schedule')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-900 font-display font-bold text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            <span>View Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

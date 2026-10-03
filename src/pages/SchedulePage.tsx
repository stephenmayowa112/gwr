import React from 'react';
import { Calendar, Clock, MapPin, Download, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../services/calendar';

interface SchedulePageProps {
  onNavigate: (path: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigate }) => {
  const moments = [
    {
      key: 'sendOff',
      milestone: OFFICIAL_MILESTONES.sendOff,
      day: 'FRIDAY · 30 OCTOBER 2026',
      time: '10:00 AM – 3:00 PM WAT',
      title: 'THE SEND-OFF',
      subhead: 'Music. Comedy. Spoken word. French. Lagos energy.',
      description:
        'Come and send Favour into the marathon. A vibrant cultural rally bringing together Francophile students, educators, African cultural ambassadors, and Lagos creatives before Favour steps into the marathon enclosure.',
      badge: 'PRE-EVENT RALLY',
      isHighlight: false,
    },
    {
      key: 'clockStarts',
      milestone: OFFICIAL_MILESTONES.clockStarts,
      day: 'FRIDAY · 30 OCTOBER 2026',
      time: '6:00 PM WAT (PROMPT)',
      title: 'THE CLOCK STARTS.',
      subhead: 'The 48-hour challenge officially begins.',
      description:
        'Official Guinness World Records independent witnesses synchronize timers. Continuous multi-angle video recording engages. Favour begins Module 1: The Foundations of Francophone Phonetics and Conversation.',
      badge: 'OFFICIAL COMMENCEMENT',
      isHighlight: true,
    },
    {
      key: 'hour26',
      milestone: OFFICIAL_MILESTONES.hour26,
      day: 'SATURDAY · 31 OCTOBER 2026',
      time: 'AROUND 8:00 PM WAT',
      title: 'HOUR 26.',
      subhead: 'The current record is reached. And if Favour is still going, the record falls.',
      description:
        'The critical global inflection point. The standing Guinness World Record for the longest language lesson stands at 26 hours. Passing this hour pushes the world into uncharted endurance pedagogy.',
      badge: 'WORLD RECORD MILESTONE',
      isHighlight: true,
    },
    {
      key: 'hour48',
      milestone: OFFICIAL_MILESTONES.hour48,
      day: 'SUNDAY · 1 NOVEMBER 2026',
      time: '6:00 PM WAT',
      title: 'HOUR 48.',
      subhead: 'The final bell. The end of the marathon.',
      description:
        'And, if everything goes to plan, a new chapter in the record books. The lesson concludes, adjudication logbooks are signed by independent witnesses, and Lagos erupts in historic celebration.',
      badge: 'THE FINAL BELL',
      isHighlight: true,
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            TIMEZONE: AFRICA/LAGOS (WAT, UTC+1) · ENTRY IS FREE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            THREE DAYS. ONE CITY. A LOT OF FRENCH.
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            For 48 consecutive hours, Landmark Lagos will host an uninterrupted masterclass in French language, literature, culture, and communication.
          </p>
        </div>

        {/* The "Come for 10 minutes or 10 hours" Callout Note (Explicit Requirement) */}
        <div className="p-6 sm:p-8 bg-[#022C22] text-white rounded-2xl border border-amber-500/40 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">
            <Clock className="w-4 h-4" />
            <span>OPEN DOORS · ROLLING AUDIENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
            YOU DON’T HAVE TO SPEAK FRENCH. YOU JUST HAVE TO SHOW UP.
          </h2>
          <div className="text-base sm:text-lg text-emerald-100/90 leading-relaxed space-y-2 font-light">
            <p>
              People often ask if they must stay the entire duration. <strong>No.</strong>
            </p>
            <p>
              You can come for <strong>ten minutes</strong> or stay for <strong>ten hours</strong>. Bring your children, bring your colleagues, or stop by after work. The auditorium doors will remain open around the clock with ongoing lessons, conversational games, and cheering.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/register')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
            >
              Get Free Pass
            </button>
            <button
              onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon, 'full-marathon-weekend.ics')}
              className="px-5 py-3 bg-emerald-900 hover:bg-emerald-800 border border-emerald-600 text-white font-mono text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
            >
              Add Entire 48h to Calendar
            </button>
          </div>
        </div>

        {/* The Four Key Moments with Calendar Links */}
        <div className="space-y-8">
          <h2 className="text-xl sm:text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            THE FOUR HISTORIC MOMENTS
          </h2>

          <div className="space-y-6">
            {moments.map((item, index) => (
              <div
                key={item.key}
                className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                  item.isHighlight
                    ? 'bg-white border-2 border-emerald-900/30 shadow-md'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                      {item.day}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs font-mono text-amber-600 font-bold">
                      {item.time}
                    </span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-emerald-950">
                    {item.subhead}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Calendar Buttons for each moment (Explicit Requirement) */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => downloadIcsFile(item.milestone, `${item.key}.ics`)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Calendar (.ics)</span>
                  </button>

                  <a
                    href={generateGoogleCalendarUrl(item.milestone)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 48-Hour Syllabus Architecture Overview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            CURRICULUM ARCHITECTURE
          </div>
          <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            WHAT FAVOUR WILL BE TEACHING
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            The 48-hour lesson follows a structured, engaging curriculum certified by independent educators, blending beginner introductions with advanced Francophone trade dialogues:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-emerald-900 block uppercase">
                Phase 1 (Hours 0 – 12): The Foundations
              </span>
              <p className="text-slate-600">
                Phonetics, greetings, navigating Lagos-to-Cotonou travel French, numbers, dining, and polite everyday conversation.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-emerald-900 block uppercase">
                Phase 2 (Hours 13 – 24): Trade & Border Commerce
              </span>
              <p className="text-slate-600">
                Business French, negotiating prices in Francophone markets, AfCFTA trade vocabulary, banking, and professional etiquette.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-amber-700 block uppercase">
                Phase 3 (Hours 25 – 36): Literature, Music & Breaking the 26h Mark
              </span>
              <p className="text-slate-600">
                African Francophone poetry (Senghor, Césaire), contemporary Francophone music lyrics, storytelling, and audience interactive choral drills.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-emerald-900 block uppercase">
                Phase 4 (Hours 37 – 48): Masterclass & Endurance Push
              </span>
              <p className="text-slate-600">
                Diplomatic speechmaking, complex conversational debates, interactive Q&A with live audience, and final countdown review.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Call to action */}
        <div className="text-center pt-6 space-y-4">
          <p className="text-sm text-slate-600 font-mono">
            Registration is required for venue entry pass and attendance tracking.
          </p>
          <button
            onClick={() => onNavigate('/register')}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-sm uppercase tracking-wider rounded-md shadow-md transition-all cursor-pointer"
          >
            [ REGISTER FREE FOR THE MARATHON ]
          </button>
        </div>
      </div>
    </div>
  );
};

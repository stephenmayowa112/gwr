import React from 'react';
import { ShieldCheck, Video, Clock, FileText, Users, AlertTriangle } from 'lucide-react';
import { EditorialPlaceholder } from '../components/common/EditorialPlaceholder';

interface VerificationPageProps {
  onNavigate: (path: string) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({ onNavigate }) => {
  const verificationPillars = [
    {
      icon: Users,
      title: 'Independent Specialist Witnesses',
      description:
        'Guinness World Records requires qualified, independent witnesses present at all times. Witnesses must have verifiable expertise in French linguistics or pedagogy (e.g. university lecturers, Alliance Française educators) and must not be related to or employed by Favour.',
      details:
        'Two independent witnesses remain on duty simultaneously, operating on rotating 4-hour shifts to prevent fatigue and ensure continuous oversight.',
      placeholder: '[CONFIRMATION PENDING: Final list of 8 accredited witness institutions & names to be submitted to GWR portal by 15 October 2026.]',
    },
    {
      icon: Clock,
      title: 'Certified Independent Timekeepers',
      description:
        'Timekeepers operate calibrated dual digital stopwatches synchronized with the official master broadcast clock. They record every minute of teaching, logging exact start, pause, and resumption timestamps.',
      details:
        'Two timekeepers work concurrently alongside the witnesses, maintaining independent manual and digital timecards.',
      placeholder: '[CONFIRMATION PENDING: Specific model numbers of calibrated digital timing units to be appended to official evidence portfolio.]',
    },
    {
      icon: Video,
      title: 'Continuous Multi-Angle Video & Audio Recording',
      description:
        'The entire 48 hours must be captured without a single frame of dropped recording. Audio must be crystal clear to verify continuous French speech and instructional communication.',
      details:
        'Three independent camera angles operate simultaneously: wide-angle auditorium coverage, tight lectern camera focused on Favour, and a locked camera frame recording the live audience and lesson whiteboard.',
      placeholder: '[CONFIRMATION PENDING: Broadcast redundancy cloud backup server architecture & offline RAID storage verification sign-off.]',
    },
    {
      icon: FileText,
      title: 'Official Lesson Logbook & Audience Interaction',
      description:
        'A comprehensive lesson logbook must document what is being taught during every 15-minute block. An endurance lesson cannot consist of silence, repetition, or recorded audio playback.',
      details:
        'Audience members actively participate in vocabulary drills, conversational exercises, and call-and-response practice to establish active pedagogical delivery.',
      placeholder: '[CONFIRMATION PENDING: Syllabus logbook sheets pre-printed with official GWR reference ID: GWR-2026-LL-48H.]',
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            OFFICIAL ADJUDICATION · GUINNESS WORLD RECORDS™ GUIDELINES
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            HOW THE RECORD IS VERIFIED
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Setting a Guinness World Record requires uncompromising scientific rigor, strict chain-of-custody evidence, and independent oversight at Landmark Lagos.
          </p>
        </div>

        {/* Official Rest Break Rule Notice */}
        <div className="p-6 sm:p-8 bg-white border-2 border-emerald-900/30 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>OFFICIAL GWR REST BREAK PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            5 MINUTES REST PER COMPLETED HOUR
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
            <p>
              Under official Guinness World Records guidelines for endurance teaching marathons:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-800 font-medium">
              <li>The challenger earns exactly <strong>5 minutes of rest</strong> for every completed 60 minutes of continuous instruction.</li>
              <li>Rest breaks may be taken immediately or <strong>accumulated (banked)</strong> to allow for longer scheduled nutritional or medical recovery intervals (e.g. banking 3 hours earns a 15-minute break).</li>
              <li>During rest intervals, the lesson clock pauses on the official logbook. Unused rest time cannot be added to the official record time.</li>
              <li>If Favour leaves the stage without accumulated rest time, the attempt immediately terminates.</li>
            </ul>
          </div>
          <div className="pt-2 text-xs font-mono text-amber-700 bg-amber-50 p-3 rounded border border-amber-200">
            <strong>OFFICIAL RULE NOTE:</strong> All rest breaks are monitored by on-site medical staff and signed off in real time by both independent witnesses.
          </div>
        </div>

        {/* The 4 Pillars of Evidence */}
        <div className="space-y-8">
          <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            THE FOUR PILLARS OF GWR EVIDENCE
          </h2>

          <div className="space-y-6">
            {verificationPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                        EVIDENCE REQUIREMENT 0{idx + 1}
                      </span>
                      <h3 className="text-xl font-display font-bold text-slate-900 uppercase">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                    <strong className="text-slate-800 block mb-0.5">Operating Protocol:</strong>
                    {pillar.details}
                  </div>

                  {/* Clearly marked placeholder per prompt instructions */}
                  <div className="p-3 bg-amber-50/80 border border-amber-300 rounded text-xs font-mono text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{pillar.placeholder}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Station Layout Placeholder */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            VERIFICATION BOOTH & TIMEKEEPING DESK
          </h2>
          <EditorialPlaceholder
            label="Landmark Lagos Official GWR Adjudication Desk"
            subtext="TODO: Independent witness station, digital dual precision timers, and live logbook station diagram"
            aspectRatio="16:9"
          />
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/visit')}
            className="px-8 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer"
          >
            Review Venue & Visitor FAQ →
          </button>
        </div>
      </div>
    </div>
  );
};

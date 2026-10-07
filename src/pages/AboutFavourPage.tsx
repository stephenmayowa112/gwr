import React from 'react';
import { Globe, BookOpen, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { EditorialPlaceholder } from '../components/common/EditorialPlaceholder';

interface AboutFavourPageProps {
  onNavigate: (path: string) => void;
}

export const AboutFavourPage: React.FC<AboutFavourPageProps> = ({ onNavigate }) => {
  const languagesForeign = [
    { name: 'French', level: 'Near-native fluency', note: 'Language of the 48-Hour Guinness World Record challenge' },
    { name: 'Spanish', level: 'Advanced Professional', note: 'Iberian and Latin American literature and dialogue' },
    { name: 'German', level: 'Professional working', note: 'Grammar mechanics, vocabulary, and pedagogy' },
    { name: 'Italian', level: 'Conversational & Literary', note: 'Phonetics, arts, and cultural dialogues' },
    { name: 'Portuguese', level: 'Conversational', note: 'Lusophone trade and communication' },
    { name: 'Russian', level: 'Working Proficiency', note: 'Cyrillic script, structural linguistics' },
    { name: 'Mandarin Chinese', level: 'Elementary / Intermediate', note: 'Tones, characters, and East Asian trade basics' },
    { name: 'Arabic', level: 'Working Proficiency', note: 'Afro-Asiatic linguistics and classical texts' },
    { name: 'Japanese', level: 'Conversational', note: 'Orthography, conversational manners, and phonetics' },
  ];

  const languagesNigerian = [
    { name: 'Igbo', level: 'Native', note: 'Mother tongue, cultural heritage, and proverbial oratory' },
    { name: 'Yoruba', level: 'Fluent Conversational', note: 'Lagos regional communication and rich tonal poetry' },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            THE EDUCATOR · POLYGLOT · RECORD CHALLENGER
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            FAVOUR CHISIMDI NWOBODO
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Favour is a Nigerian polyglot who speaks 11 languages: nine foreign languages and two Nigerian languages. French became one of the languages through which she discovered a bigger world.
          </p>
        </div>

        {/* Hero Photo & Quote Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <EditorialPlaceholder
              label="Favour Chisimdi Nwobodo"
              subtext="Official portrait in Lagos studio featuring Nigerian emerald and gold tones"
              aspectRatio="3:4"
            />
          </div>

          <div className="md:col-span-7 space-y-6">
            <blockquote className="p-6 bg-white border-l-4 border-amber-500 rounded-r-xl shadow-xs space-y-3">
              <p className="font-display font-bold text-lg sm:text-xl text-emerald-950 leading-relaxed italic">
                “Learning another language does not take anything away from the language you already speak. It does not mean leaving those things behind. It means becoming capable of meeting someone else’s world without losing your own.”
              </p>
              <footer className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                — FAVOUR CHISIMDI NWOBODO
              </footer>
            </blockquote>

            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                Now, she is taking that passion out of the classroom and putting it on a global stage.
              </p>
              <p className="font-medium text-slate-900">
                Her challenge is simple to understand. Its scale is not.
              </p>
              <div className="p-4 bg-emerald-950 text-white rounded-lg font-mono text-xs uppercase space-y-1">
                <div>TEACH FRENCH FOR 48 HOURS.</div>
                <div>KEEP GOING.</div>
                <div className="text-amber-400 font-bold">MAKE HISTORY.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown of the 11 Languages */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              THE 11 LANGUAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-emerald-950 uppercase tracking-tight">
              A BRIDGE ACROSS NINE FOREIGN & TWO NIGERIAN TONGUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nigerian Languages */}
            <div className="p-6 bg-white border border-emerald-900/20 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>2 Nigerian Languages</span>
              </div>
              <div className="space-y-3">
                {languagesNigerian.map((lang) => (
                  <div key={lang.name} className="border-b border-slate-100 pb-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-display text-base">
                        {lang.name}
                      </span>
                      <span className="text-xs font-mono text-emerald-800 font-semibold">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{lang.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Foreign Languages */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>9 Foreign Languages</span>
              </div>
              <div className="space-y-2.5">
                {languagesForeign.map((lang) => (
                  <div key={lang.name} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-display text-sm">
                        {lang.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{lang.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Slots / Gallery Placeholders */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
            MEDIA & INTERVIEWS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditorialPlaceholder
              label="Why I Chose French: Favour's Video Manifesto"
              subtext="TODO: Video interview documentary discussing Nigeria's Francophone borders"
              aspectRatio="16:9"
            />
            <EditorialPlaceholder
              label="Endurance Training & Vocal Preparation"
              subtext="TODO: Behind the scenes documentary of vocal stamina training with medical advisors"
              aspectRatio="16:9"
            />
          </div>
        </div>

        {/* Connect With Favour */}
        <div className="p-8 bg-[#022C22] text-white rounded-2xl border border-emerald-800 space-y-4 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            FOLLOW FAVOUR’S JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
            JOIN OVER 100,000+ FOLLOWING @UGEGBEGWR
          </h2>
          <p className="text-sm text-emerald-100 max-w-lg mx-auto font-light leading-relaxed">
            Follow along on Instagram, X, TikTok, and YouTube for daily updates, French language tidbits, and preparation logs.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono">
            <span className="px-3 py-1.5 bg-emerald-900 rounded border border-emerald-700 text-amber-300">
              Instagram: @UGEGBEGWR
            </span>
            <span className="px-3 py-1.5 bg-emerald-900 rounded border border-emerald-700 text-amber-300">
              X (Twitter): @UGEGBEGWR
            </span>
            <span className="px-3 py-1.5 bg-emerald-900 rounded border border-emerald-700 text-amber-300">
              TikTok: @UGEGBEGWR
            </span>
            <span className="px-3 py-1.5 bg-emerald-900 rounded border border-emerald-700 text-amber-300">
              YouTube: @UGEGBEGWR
            </span>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('/register')}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
            >
              Register to Support Favour at Landmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

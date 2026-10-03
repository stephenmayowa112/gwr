import React from 'react';
import { ArrowRight, Calendar, MapPin, CheckCircle, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';
import { EditorialPlaceholder } from '../components/common/EditorialPlaceholder';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const scrollToCountdown = () => {
    const el = document.getElementById('countdown-block');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative w-full bg-[#022C22] text-white pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-emerald-900/60">
        {/* Subtle background glow & geometric pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/30 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow badge / Kicker */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-6">
            <span>GUINNESS WORLD RECORDS™ ATTEMPT</span>
            <span aria-hidden="true">·</span>
            <span>LONGEST LANGUAGE LESSON</span>
          </div>

          {/* Main Display Headline (exact verbatim from copy) */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[0.95] text-white uppercase text-balance">
              FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON
            </h1>

            <p className="text-lg sm:text-2xl text-emerald-100/90 font-light leading-relaxed max-w-3xl pt-2">
              For 48 hours, Favour Chisimdi Ugegbe will teach, speak, engage and keep going, turning a French lesson into a live celebration of language, culture, endurance and possibility.
            </p>
          </div>

          {/* Key Facts bar */}
          <div className="mt-8 pt-6 border-t border-emerald-800/80 flex flex-wrap items-center gap-y-3 gap-x-8 text-sm sm:text-base font-medium text-emerald-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-semibold text-white tracking-wide">30 OCTOBER – 1 NOVEMBER 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-semibold text-white tracking-wide">LANDMARK, LAGOS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-wider bg-amber-400 text-emerald-950 uppercase">
                ENTRY IS FREE
              </span>
            </div>
          </div>

          {/* Primary CTAs [ REGISTER TO ATTEND ] [ WATCH THE COUNTDOWN ] */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('/register')}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-sm tracking-wider uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              REGISTER TO ATTEND
            </button>
            <button
              onClick={scrollToCountdown}
              className="px-7 py-4 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/80 text-white font-display font-bold text-sm tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              WATCH THE COUNTDOWN
            </button>
          </div>

          {/* Live Countdown Component synced to Africa/Lagos (WAT, UTC+1) */}
          <div id="countdown-block" className="mt-14 pt-8 border-t border-emerald-900/80">
            <TimezoneCountdown targetDateIso="2026-10-30T18:00:00+01:00" />
          </div>
        </div>
      </section>

      {/* EDITORIAL NARRATIVE: "LANGUAGE CONNECTS US." */}
      <section className="w-full bg-[#FAF8F5] text-slate-900 py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
              LANGUAGE CONNECTS US.
            </h2>
            <div className="space-y-4 text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
              <p>Before it is a subject in a classroom, language is how we find one another.</p>
              <p>It carries our stories.</p>
              <p>It holds our histories.</p>
              <p>It tells us where we come from, and gives us a way to reach beyond it.</p>
              <p>Every language opens a door into another people, another place, another way of seeing the world.</p>
              <p>And in a world that is increasingly connected, the ability to speak across borders is more than a skill.</p>
              <p className="font-bold text-emerald-900 text-xl sm:text-2xl pt-2">It is power.</p>
            </div>
          </div>

          {/* "THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET." */}
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET.
            </h3>
            <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>Language makes international relations possible.</p>
              <p>It makes tourism more personal.</p>
              <p>Trade more accessible.</p>
              <p>Diplomacy more human.</p>
              <p>Friendships easier to form.</p>
              <p>Cultures easier to understand.</p>
              <p className="pt-2">And when a language is learned, taught and passed on, something important happens:</p>
              <p className="font-bold text-emerald-950 text-lg sm:text-xl">A connection survives.</p>
              <p className="pt-2">That is why languages matter.</p>
              <p className="font-semibold text-emerald-900">And that is why this story begins with French.</p>
            </div>
          </div>

          {/* "LOOK AROUND NIGERIA." & Francophone Neighbours */}
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              LOOK AROUND NIGERIA.
            </h3>
            <p className="text-lg sm:text-xl text-slate-800 font-medium">
              We are surrounded by Francophone neighbours.
            </p>
            
            {/* The 4 border countries highlight */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
              {['Benin', 'Niger', 'Chad', 'Cameroon'].map((country) => (
                <div
                  key={country}
                  className="p-4 bg-white border border-emerald-900/15 rounded-lg text-center font-display font-bold text-lg text-emerald-950 shadow-xs"
                >
                  {country}
                </div>
              ))}
            </div>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>Across our borders, French is spoken, taught, traded in and lived in every day.</p>
              <p>Yet Nigeria’s relationship with French is still only beginning to realise its possibilities.</p>
              <p className="italic text-slate-800">What could happen if more Nigerians could cross those borders with confidence?</p>
              <p className="italic text-slate-800">What could happen if a generation saw language not simply as another subject to pass, but as a passport to a larger world?</p>
              <p className="italic text-slate-800">What could happen if we made learning a language something to celebrate?</p>
              <p className="font-bold text-amber-600 text-xl sm:text-2xl pt-2">Something spectacular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* "SO WE ARE MAKING HISTORY IN FRENCH." */}
      <section className="w-full bg-[#03261D] text-white py-20 sm:py-24 border-b border-emerald-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
            SO WE ARE MAKING HISTORY IN FRENCH.
          </h2>
          <p className="text-lg sm:text-2xl text-emerald-100 font-light leading-relaxed">
            From 30 October to 1 November 2026, Lagos will become the stage for an extraordinary 48-hour French Language Marathon.
          </p>
          <div className="space-y-2 text-xl sm:text-2xl font-display font-bold text-amber-400">
            <p>One woman.</p>
            <p>One language.</p>
            <p>48 hours.</p>
          </div>
          <p className="text-lg sm:text-xl text-emerald-200">
            And one audacious attempt to set a new Guinness World Records title.
          </p>
          <div className="pt-2 text-2xl sm:text-3xl font-display font-extrabold text-white">
            <p className="line-through text-emerald-400/60 font-normal">Not in Paris.</p>
            <p className="text-amber-400">In Nigeria.</p>
          </div>
        </div>
      </section>

      {/* RECORD STATS: 26 HOURS vs 48 HOURS COMPARISON VISUAL */}
      <section className="w-full bg-[#FAF8F5] text-slate-900 py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Headline Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="p-8 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                Official Current Record
              </span>
              <div className="text-5xl sm:text-6xl font-display font-black text-slate-900">
                26 HOURS.
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                That is the current Guinness World Records title for the longest language lesson.
              </p>
            </div>

            <div className="p-8 bg-[#022C22] text-white border border-amber-500/40 rounded-xl space-y-3 shadow-md">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                New Target Record
              </span>
              <div className="text-5xl sm:text-6xl font-display font-black text-amber-400">
                48 HOURS.
              </div>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                That is where Favour is going.
              </p>
            </div>
          </div>

          {/* Visual Comparison Bar (26h vs 48h bar) */}
          <div className="p-6 sm:p-8 bg-white border border-emerald-900/15 rounded-xl space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
              <span>RECORD DISTANCE COMPARISON</span>
              <span className="text-amber-600 font-bold">+22 HOURS BEYOND THE MARK</span>
            </div>

            {/* Visual Bar Graph */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                  <span>Current World Record (26 Hours)</span>
                  <span className="font-mono">54.2%</span>
                </div>
                <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '54.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-emerald-950 mb-1.5">
                  <span className="font-bold text-emerald-900">Favour's 48-Hour Marathon Target</span>
                  <span className="font-mono font-bold text-amber-600">100% (48 Hours)</span>
                </div>
                <div className="w-full h-5 bg-emerald-950/10 rounded-full overflow-hidden p-0.5 border border-amber-500/40">
                  <div className="h-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-slate-700 leading-relaxed">
              <p className="font-semibold text-emerald-950 text-lg">Twenty-two hours beyond the mark.</p>
              <p>Two nights.</p>
              <p>One extraordinary lesson.</p>
              <p>A crowd watching, cheering, learning and witnessing what happens when one person decides to take an idea further than anyone has taken it before.</p>
              <p className="pt-2 font-mono text-sm text-slate-600">The clock will start. The lesson will begin. And Lagos will be watching.</p>
            </div>
          </div>

          {/* "BUT THIS STORY IS BIGGER THAN A RECORD." */}
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              BUT THIS STORY IS BIGGER THAN A RECORD.
            </h3>
            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>A record lasts for a moment. What it represents can last much longer.</p>
              <p>This marathon is a celebration of language as a bridge between people and cultures.</p>
              <p>Nigeria is home to hundreds of languages. They carry our identities, our traditions, our memories and our histories, and they must be spoken, taught and handed down.</p>
              <p>Learning another language does not take anything away from the language you already speak.</p>
              <p>It does not mean leaving those things behind.</p>
              <p className="font-bold text-emerald-950 text-lg sm:text-xl">
                It means becoming capable of meeting someone else’s world without losing your own.
              </p>
              <p className="font-semibold text-emerald-900">French is simply where this particular journey begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* "MEET THE WOMAN WHO DECIDED TO GO FOR 48." */}
      <section className="w-full bg-[#022C22] text-white py-20 sm:py-28 border-b border-emerald-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo Placeholder */}
            <div className="lg:col-span-5">
              <EditorialPlaceholder
                label="Favour Chisimdi Ugegbe"
                subtext="Nigerian polyglot (11 languages: 9 foreign, 2 Nigerian). Educator & record challenger."
                aspectRatio="3:4"
              />
            </div>

            {/* Right Story & Verbatim Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                MEET THE WOMAN WHO DECIDED TO GO FOR 48.
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
                FAVOUR CHISIMDI UGEGBE
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
                <p>
                  Favour is a Nigerian polyglot who speaks <strong>11 languages</strong>: nine foreign languages and two Nigerian languages.
                </p>
                <p>
                  French became one of the languages through which she discovered a bigger world.
                </p>
                <p>
                  Now, she is taking that passion out of the classroom and putting it on a global stage.
                </p>
                <p className="pt-2 font-medium text-white">
                  Her challenge is simple to understand.
                </p>
                <p className="text-amber-400 font-bold text-xl">
                  Its scale is not.
                </p>
              </div>

              <div className="pt-4 space-y-2 text-xl font-display font-bold text-white">
                <p>Teach French for 48 hours.</p>
                <p>Keep going.</p>
                <p className="text-amber-400">Make history.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/favour')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  [ DISCOVER FAVOUR’S STORY ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "THREE DAYS. ONE CITY. A LOT OF FRENCH." (SCHEDULE SUMMARY) */}
      <section className="w-full bg-[#FAF8F5] text-slate-900 py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              OFFICIAL TIMELINE · LANDMARK LAGOS (WAT, UTC+1)
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
              THREE DAYS. ONE CITY. A LOT OF FRENCH.
            </h2>
          </div>

          <div className="space-y-6">
            {/* 1. Friday 30 Oct, 10am - 3pm */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                FRIDAY · 30 OCTOBER · 10AM – 3PM
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900 uppercase">
                THE SEND-OFF
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                Music. Comedy. Spoken word. French. Lagos energy.
              </p>
              <p className="text-sm text-slate-600">
                Come and send Favour into the marathon.
              </p>
            </div>

            {/* 2. Friday 30 Oct, 6pm */}
            <div className="p-6 sm:p-8 bg-white border-2 border-emerald-800/40 rounded-xl space-y-3 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                FRIDAY · 30 OCTOBER · 6PM
              </div>
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                THE CLOCK STARTS.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                The 48-hour challenge officially begins.
              </p>
            </div>

            {/* 3. Saturday 31 Oct, Around 8pm */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold">
                SATURDAY · 31 OCTOBER · AROUND 8PM
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900 uppercase">
                HOUR 26.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                The current record is reached.
              </p>
              <p className="text-base font-semibold text-emerald-900">
                And if Favour is still going, the record falls.
              </p>
            </div>

            {/* 4. Sunday 1 Nov, 6pm */}
            <div className="p-6 sm:p-8 bg-emerald-950 text-white border border-amber-500/40 rounded-xl space-y-3 shadow-md">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                SUNDAY · 1 NOVEMBER · 6PM
              </div>
              <h3 className="text-2xl font-display font-black text-amber-400 uppercase">
                HOUR 48.
              </h3>
              <p className="text-base text-emerald-100 leading-relaxed">
                The final bell.
              </p>
              <p className="text-base text-emerald-100">
                The end of the marathon.
              </p>
              <p className="text-base font-bold text-white pt-1">
                And, if everything goes to plan, a new chapter in the record books.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/schedule')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View full schedule & add moments to calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* "YOU DON’T HAVE TO SPEAK FRENCH." */}
      <section className="w-full bg-[#03261D] text-white py-20 sm:py-28 border-b border-emerald-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
            YOU DON’T HAVE TO SPEAK FRENCH.
          </h2>
          <p className="text-xl sm:text-2xl text-amber-400 font-semibold">
            You just have to show up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed pt-2">
            <div className="space-y-2">
              <p>Come for an hour.</p>
              <p>Come for ten minutes.</p>
              <p>Come with your friends.</p>
              <p>Bring your children.</p>
              <p>Bring your camera.</p>
            </div>
            <div className="space-y-2">
              <p>Learn a phrase.</p>
              <p>Cheer Favour on.</p>
              <p>Make some noise.</p>
              <p className="font-semibold text-white">Watch history happen in real time.</p>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-emerald-200 pt-4 leading-relaxed">
            And leave knowing a little more about the world than you did when you arrived.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-6">
            <div className="text-lg font-mono font-bold text-amber-400 uppercase tracking-wider">
              ENTRY IS FREE.
            </div>
            <button
              onClick={() => onNavigate('/register')}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
            >
              [ REGISTER FREE ]
            </button>
          </div>
        </div>
      </section>

      {/* "BE PART OF THE STORY." (ATTEND / SHARE / PARTNER / MEDIA) */}
      <section className="w-full bg-[#FAF8F5] text-slate-900 py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              JOIN THE JOURNEY
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
              BE PART OF THE STORY.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. ATTEND */}
            <div className="p-8 bg-white border border-slate-200 hover:border-emerald-800/40 rounded-xl space-y-4 transition-all">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                ATTEND
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Be in the room when the marathon unfolds.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/register')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>[ REGISTER TO ATTEND ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. SHARE */}
            <div className="p-8 bg-white border border-slate-200 hover:border-emerald-800/40 rounded-xl space-y-4 transition-all">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                SHARE
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Share the countdown, learn the daily French phrase, tag someone who should be there, and use <strong>#UgegbeGWR</strong>.
              </p>
              <p className="text-xs text-slate-500 italic">
                The bigger the conversation, the further the message travels.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/share')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>[ GET SHARE CARDS & PHRASE ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. PARTNER */}
            <div className="p-8 bg-white border border-slate-200 hover:border-emerald-800/40 rounded-xl space-y-4 transition-all">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                PARTNER
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Put your organisation alongside a story about language, culture, connection and possibility.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/partner')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>[ PARTNER WITH US ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4. MEDIA */}
            <div className="p-8 bg-white border border-slate-200 hover:border-emerald-800/40 rounded-xl space-y-4 transition-all">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                MEDIA
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Cover the marathon, the record attempt and the woman behind it.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/press')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>[ PRESS & MEDIA ACCREDITATION ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CLOSING CALL TO ACTION: "ONE LANGUAGE. 48 HOURS. ONE EXTRAORDINARY ATTEMPT." */}
      <section className="w-full bg-[#022C22] text-white py-24 sm:py-32 border-b border-emerald-900/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              ONE LANGUAGE.
            </h2>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-amber-400">
              48 HOURS.
            </h2>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              ONE EXTRAORDINARY ATTEMPT.
            </h2>
          </div>

          <div className="space-y-3 text-lg sm:text-2xl text-emerald-100 font-light max-w-2xl mx-auto">
            <p>Nigeria is not just watching the world.</p>
            <p className="font-semibold text-white">For 48 hours, we are inviting the world to watch us.</p>
          </div>

          <div className="pt-4 space-y-2 text-sm sm:text-base font-mono uppercase text-emerald-300 tracking-wider">
            <p>30 OCTOBER – 1 NOVEMBER 2026</p>
            <p>LANDMARK, LAGOS</p>
            <p className="text-amber-400 font-bold">FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON</p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('/register')}
              className="px-10 py-5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-black text-base uppercase tracking-wider rounded-md shadow-xl transition-all transform hover:scale-105 active:scale-100 cursor-pointer"
            >
              [ BE THERE ]
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

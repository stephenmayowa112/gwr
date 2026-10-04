import React from 'react';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';

interface DocumentPageProps {
  onOpenRegister: () => void;
  onOpenPartner: () => void;
  onOpenPress: () => void;
  onScrollToCountdown: () => void;
  onScrollToFavour: () => void;
}

export const DocumentPage: React.FC<DocumentPageProps> = ({
  onOpenRegister,
  onOpenPartner,
  onOpenPress,
  onScrollToCountdown,
  onScrollToFavour,
}) => {
  return (
    <div className="w-full text-slate-900 bg-[#FAF8F5]">
      {/* ------------------------------------------------------------ */}
      {/* HERO SECTION (from Page 2 & 1)                               */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#022C22] text-white pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-emerald-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-tight text-balance">
              FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON
            </h1>

            <p className="text-lg sm:text-2xl text-emerald-100 font-light leading-relaxed max-w-3xl pt-2">
              For 48 hours, Favour Chisimdi Ugegbe will teach, speak, engage and keep going, turning a French lesson into a live celebration of language, culture, endurance and possibility.
            </p>
          </div>

          <div className="pt-4 border-t border-emerald-800/80 space-y-1 font-mono text-xs sm:text-sm tracking-wider uppercase text-emerald-200">
            <p className="font-bold text-white text-sm sm:text-base">30 OCTOBER – 1 NOVEMBER 2026</p>
            <p className="font-bold text-white">LANDMARK, LAGOS</p>
            <p className="font-black text-amber-400">ENTRY IS FREE.</p>
          </div>

          {/* [ REGISTER TO ATTEND ] [ WATCH THE COUNTDOWN ] */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              [ REGISTER TO ATTEND ]
            </button>
            <button
              onClick={onScrollToCountdown}
              className="px-7 py-4 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              [ WATCH THE COUNTDOWN ]
            </button>
          </div>

          {/* Integrated live countdown component */}
          <div id="countdown-section" className="pt-12 border-t border-emerald-900/80">
            <TimezoneCountdown
              targetDateIso="2026-10-30T18:00:00+01:00"
              title="TIME UNTIL OFFICIAL START (LAGOS WAT)"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 1: LANGUAGE CONNECTS US.                                */}
      {/* ------------------------------------------------------------ */}
      <section id="language-connects-us" className="w-full py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
              LANGUAGE CONNECTS US.
            </h2>
            <div className="space-y-4 text-base sm:text-xl text-slate-800 leading-relaxed font-normal">
              <p>Before it is a subject in a classroom, language is how we find one another.</p>
              <p>It carries our stories.</p>
              <p>It holds our histories.</p>
              <p>It tells us where we come from, and gives us a way to reach beyond it.</p>
              <p>Every language opens a door into another people, another place, another way of seeing the world.</p>
              <p>And in a world that is increasingly connected, the ability to speak across borders is more than a skill.</p>
              <p className="font-bold text-emerald-950 text-xl sm:text-2xl pt-2">It is power.</p>
            </div>
          </div>

          {/* THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET. */}
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET.
            </h2>
            <div className="space-y-3 text-base sm:text-lg text-slate-800 leading-relaxed">
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

          {/* LOOK AROUND NIGERIA. */}
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              LOOK AROUND NIGERIA.
            </h2>
            <p className="text-lg sm:text-xl text-slate-800 font-medium">
              We are surrounded by Francophone neighbours.
            </p>

            <p className="text-2xl sm:text-3xl font-display font-black tracking-wide text-emerald-900">
              Benin.Niger.Chad.Cameroon.
            </p>

            <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed">
              <p>Across our borders, French is spoken, taught, traded in and lived in every day.</p>
              <p>Yet Nigeria’s relationship with French is still only beginning to realise its possibilities.</p>
              <p className="italic text-slate-700">What could happen if more Nigerians could cross those borders with confidence?</p>
              <p className="italic text-slate-700">What could happen if a generation saw language not simply as another subject to pass, but as a passport to a larger world?</p>
              <p className="italic text-slate-700">What could happen if we made learning a language something to celebrate?</p>
              <p className="font-bold text-amber-600 text-xl sm:text-2xl pt-2">Something spectacular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 2: SO WE ARE MAKING HISTORY IN FRENCH.                  */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#03261D] text-white py-20 sm:py-28 border-b border-emerald-900/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
            SO WE ARE MAKING HISTORY IN FRENCH.
          </h2>

          <p className="text-lg sm:text-2xl text-emerald-100 font-light leading-relaxed">
            From 30 October to 1 November 2026, Lagos will become the stage for an extraordinary 48-hour French Language Marathon.
          </p>

          <div className="space-y-2 text-xl sm:text-3xl font-display font-bold text-amber-400">
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

      {/* ------------------------------------------------------------ */}
      {/* PAGE 3: 26 HOURS. / 48 HOURS.                                */}
      {/* ------------------------------------------------------------ */}
      <section id="the-record" className="w-full py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 26 HOURS */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase text-slate-900">
              26 HOURS.
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
              That is the current Guinness World Records title for the longest language lesson.
            </p>
          </div>

          {/* 48 HOURS */}
          <div className="space-y-4 p-8 sm:p-10 bg-[#022C22] text-white rounded-2xl border border-amber-500/40 shadow-xl">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase text-amber-400">
              48 HOURS.
            </h2>
            <div className="space-y-3 text-base sm:text-xl text-emerald-100/90 leading-relaxed font-light">
              <p className="font-semibold text-white">That is where Favour is going.</p>
              <p>Twenty-two hours beyond the mark.</p>
              <p>Two nights.</p>
              <p>One extraordinary lesson.</p>
              <p className="pt-2 text-white">
                A crowd watching, cheering, learning and witnessing what happens when one person decides to take an idea further than anyone has taken it before.
              </p>
              <div className="pt-4 text-xs sm:text-sm font-mono text-amber-400 uppercase tracking-wider space-y-1">
                <p>The clock will start.</p>
                <p>The lesson will begin.</p>
                <p className="font-bold text-white">And Lagos will be watching.</p>
              </div>
            </div>
          </div>

          {/* BUT THIS STORY IS BIGGER THAN A RECORD. */}
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-emerald-950">
              BUT THIS STORY IS BIGGER THAN A RECORD.
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed">
              <p>A record lasts for a moment. What it represents can last much longer.</p>
              <p>This marathon is a celebration of language as a bridge between people and cultures.</p>
              <p>
                Nigeria is home to hundreds of languages. They carry our identities, our traditions, our memories and our histories, and they must be spoken, taught and handed down.
              </p>
              <p>
                Learning another language does not take anything away from the language you already speak.
              </p>
              <p>It does not mean leaving those things behind.</p>
              <p className="font-bold text-emerald-950 text-lg sm:text-xl">
                It means becoming capable of meeting someone else’s world without losing your own.
              </p>
              <p className="font-semibold text-emerald-900">French is simply where this particular journey begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 4: MEET THE WOMAN WHO DECIDED TO GO FOR 48.             */}
      {/* ------------------------------------------------------------ */}
      <section id="favour-ugegbe" className="w-full bg-[#022C22] text-white py-20 sm:py-28 border-b border-emerald-900/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
            MEET THE WOMAN WHO DECIDED TO GO FOR 48.
          </span>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
            FAVOUR CHISIMDI UGEGBE
          </h2>

          <div className="space-y-4 text-base sm:text-xl text-emerald-100 font-light leading-relaxed">
            <p>
              Favour is a Nigerian polyglot who speaks <strong>11 languages</strong>: nine foreign languages and two Nigerian languages.
            </p>
            <p>
              French became one of the languages through which she discovered a bigger world.
            </p>
            <p>
              Now, she is taking that passion out of the classroom and putting it on a global stage.
            </p>
            <p className="pt-2 text-white font-normal">
              Her challenge is simple to understand.
            </p>
            <p className="text-amber-400 font-bold text-xl sm:text-2xl">
              Its scale is not.
            </p>
          </div>

          <div className="pt-4 space-y-2 text-xl sm:text-2xl font-display font-bold text-white">
            <p>Teach French for 48 hours.</p>
            <p>Keep going.</p>
            <p className="text-amber-400">Make history.</p>
          </div>

          <div className="pt-4">
            <button
              onClick={onScrollToFavour}
              className="px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
            >
              [ DISCOVER FAVOUR’S STORY ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 4 & 5: THREE DAYS. ONE CITY. A LOT OF FRENCH.           */}
      {/* ------------------------------------------------------------ */}
      <section id="three-days" className="w-full py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
            THREE DAYS. ONE CITY. A LOT OF FRENCH.
          </h2>

          <div className="space-y-8">
            {/* Moment 1 */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
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

            {/* Moment 2 */}
            <div className="p-6 sm:p-8 bg-white border-2 border-emerald-900/40 rounded-xl space-y-3 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                FRIDAY · 30 OCTOBER · 6PM
              </div>
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                THE CLOCK STARTS.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                The 48-hour challenge officially begins.
              </p>
            </div>

            {/* Moment 3 */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
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

            {/* Moment 4 */}
            <div className="p-6 sm:p-8 bg-emerald-950 text-white border border-amber-500/40 rounded-xl space-y-3 shadow-md">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
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
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 5: YOU DON’T HAVE TO SPEAK FRENCH.                      */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#03261D] text-white py-20 sm:py-28 border-b border-emerald-900/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-white">
            YOU DON’T HAVE TO SPEAK FRENCH.
          </h2>

          <p className="text-xl sm:text-2xl text-amber-400 font-semibold">
            You just have to show up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base sm:text-lg text-emerald-100 font-light leading-relaxed pt-2">
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
              onClick={onOpenRegister}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
            >
              [ REGISTER FREE ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 5 & 6: BE PART OF THE STORY. (ATTEND / SHARE / PARTNER / MEDIA) */}
      {/* ------------------------------------------------------------ */}
      <section id="be-part-of-the-story" className="w-full py-20 sm:py-28 border-b border-emerald-950/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-emerald-950">
            BE PART OF THE STORY.
          </h2>

          <div className="space-y-8">
            {/* ATTEND */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                ATTEND
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Be in the room when the marathon unfolds.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="text-xs font-mono font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider cursor-pointer"
                >
                  [ REGISTER TO ATTEND ]
                </button>
              </div>
            </div>

            {/* SHARE */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                SHARE
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Share the countdown, learn the daily French phrase, tag someone who should be there, and use #UgegbeGWR.
              </p>
              <p className="text-sm text-slate-500 italic">
                The bigger the conversation, the further the message travels.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe for the 48-Hour French Language Marathon at Landmark, Lagos! #UgegbeGWR #FavourUgegbe #FrenchLanguageMarathon https://ugegbegwr.com');
                    alert('Copied share text and #UgegbeGWR to clipboard!');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  Copy Share Text
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe for the 48-Hour French Language Marathon at Landmark, Lagos! Entry is FREE. #UgegbeGWR https://ugegbegwr.com')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white font-mono text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  Share to WhatsApp
                </a>
              </div>
            </div>

            {/* PARTNER */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                PARTNER
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Put your organisation alongside a story about language, culture, connection and possibility.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPartner}
                  className="text-xs font-mono font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider cursor-pointer"
                >
                  [ PARTNER WITH US ]
                </button>
              </div>
            </div>

            {/* MEDIA */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
                MEDIA
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Cover the marathon, the record attempt and the woman behind it.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPress}
                  className="text-xs font-mono font-bold text-emerald-900 hover:text-amber-600 uppercase tracking-wider cursor-pointer"
                >
                  [ PRESS & MEDIA ]
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
            >
              [ REGISTER TO ATTEND ]
            </button>
            <button
              onClick={onOpenPartner}
              className="px-6 py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
            >
              [ PARTNER WITH US ]
            </button>
            <button
              onClick={onOpenPress}
              className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
            >
              [ PRESS & MEDIA ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 6: ONE LANGUAGE. 48 HOURS. ONE EXTRAORDINARY ATTEMPT.   */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#022C22] text-white py-24 sm:py-32 border-b border-emerald-900/60 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

          <div className="space-y-3 text-lg sm:text-2xl text-emerald-100 font-light max-w-xl mx-auto leading-relaxed">
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
              onClick={onOpenRegister}
              className="px-10 py-5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-display font-black text-sm sm:text-base uppercase tracking-wider rounded-md shadow-xl transition-all transform hover:scale-105 active:scale-100 cursor-pointer"
            >
              [ BE THERE ]
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

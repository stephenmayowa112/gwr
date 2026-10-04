import React, { useState } from 'react';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';
import { UgegbeBrandLogo } from '../components/common/UgegbeBrandLogo';
import { Check, Copy } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      'Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe for the 48-Hour French Language Marathon at Landmark, Lagos! Entry is FREE. #UgegbeGWR #FavourUgegbe #FrenchLanguageMarathon https://ugegbegwr.com'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="w-full text-[#D2FCE3] bg-[#001410]">
      {/* ------------------------------------------------------------ */}
      {/* HERO SECTION (Page 2 & 1)                                    */}
      {/* ------------------------------------------------------------ */}
      <section className="relative w-full bg-[#001410] text-[#D2FCE3] pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 border-b border-[#23C48E]/20 overflow-hidden">
        {/* Subtle Ambient Brand Glow (Deep Pine & Energetic Teal) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003734] rounded-full blur-[140px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#23C48E]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Brand Logo Watermark */}
          <div className="pb-2">
            <UgegbeBrandLogo variant="light" size="md" withGwrBadge={true} />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-[1.1] sm:leading-tight text-balance">
              FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON
            </h1>

            <p className="text-base sm:text-xl lg:text-2xl text-[#D2FCE3] font-light leading-relaxed max-w-3xl pt-1 sm:pt-2">
              For 48 hours, Favour Chisimdi Ugegbe will teach, speak, engage and keep going, turning a French lesson into a live celebration of language, culture, endurance and possibility.
            </p>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-[#23C48E]/25 space-y-1 font-mono text-xs sm:text-sm tracking-wider uppercase text-[#D2FCE3]/90">
            <p className="font-bold text-white text-sm sm:text-base">30 OCTOBER – 1 NOVEMBER 2026</p>
            <p className="font-bold text-white">LANDMARK, LAGOS</p>
            <p className="font-black text-[#23C48E]">ENTRY IS FREE.</p>
          </div>

          {/* [ REGISTER TO ATTEND ] [ WATCH THE COUNTDOWN ] */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              [ REGISTER TO ATTEND ]
            </button>
            <button
              onClick={onScrollToCountdown}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 bg-[#003734] hover:bg-[#003734]/80 border border-[#23C48E]/40 text-[#D2FCE3] font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-colors cursor-pointer text-center"
            >
              [ WATCH THE COUNTDOWN ]
            </button>
          </div>

          {/* Integrated live countdown component */}
          <div id="countdown-section" className="pt-8 sm:pt-12 border-t border-[#23C48E]/20">
            <TimezoneCountdown
              targetDateIso="2026-10-30T18:00:00+01:00"
              title="TIME UNTIL OFFICIAL START (LAGOS WAT)"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 1: LANGUAGE CONNECTS US.                                */}
      {/* Airy Light Application (60% Mint Mist #D2FCE3, 30% Midnight) */}
      {/* ------------------------------------------------------------ */}
      <section id="language-connects-us" className="w-full bg-[#D2FCE3] text-[#001410] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-[#001410]">
              LANGUAGE CONNECTS US.
            </h2>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl text-[#001410]/90 leading-relaxed font-normal">
              <p>Before it is a subject in a classroom, language is how we find one another.</p>
              <p>It carries our stories.</p>
              <p>It holds our histories.</p>
              <p>It tells us where we come from, and gives us a way to reach beyond it.</p>
              <p>Every language opens a door into another people, another place, another way of seeing the world.</p>
              <p>And in a world that is increasingly connected, the ability to speak across borders is more than a skill.</p>
              <p className="font-bold text-[#001410] text-lg sm:text-2xl pt-2">It is power.</p>
            </div>
          </div>

          {/* THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET. */}
          <div className="space-y-5 sm:space-y-6 pt-8 sm:pt-10 border-t border-[#23C48E]/40">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase text-[#001410]">
              THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET.
            </h2>
            <div className="space-y-2.5 sm:space-y-3 text-base sm:text-lg text-[#001410]/90 leading-relaxed">
              <p>Language makes international relations possible.</p>
              <p>It makes tourism more personal.</p>
              <p>Trade more accessible.</p>
              <p>Diplomacy more human.</p>
              <p>Friendships easier to form.</p>
              <p>Cultures easier to understand.</p>
              <p className="pt-2">And when a language is learned, taught and passed on, something important happens:</p>
              <p className="font-bold text-[#001410] text-lg sm:text-xl">A connection survives.</p>
              <p className="pt-2">That is why languages matter.</p>
              <p className="font-bold text-[#003734]">And that is why this story begins with French.</p>
            </div>
          </div>

          {/* LOOK AROUND NIGERIA. */}
          <div className="space-y-5 sm:space-y-6 pt-8 sm:pt-10 border-t border-[#23C48E]/40">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase text-[#001410]">
              LOOK AROUND NIGERIA.
            </h2>
            <p className="text-base sm:text-xl text-[#001410] font-medium">
              We are surrounded by Francophone neighbours.
            </p>

            <p className="text-2xl sm:text-4xl font-display font-black tracking-wide text-[#003734] break-words">
              Benin.Niger.Chad.Cameroon.
            </p>

            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-[#001410]/90 leading-relaxed">
              <p>Across our borders, French is spoken, taught, traded in and lived in every day.</p>
              <p>Yet Nigeria’s relationship with French is still only beginning to realise its possibilities.</p>
              <p className="italic text-[#001410]/80">What could happen if more Nigerians could cross those borders with confidence?</p>
              <p className="italic text-[#001410]/80">What could happen if a generation saw language not simply as another subject to pass, but as a passport to a larger world?</p>
              <p className="italic text-[#001410]/80">What could happen if we made learning a language something to celebrate?</p>
              <p className="font-bold text-[#FF6B1A] text-lg sm:text-2xl pt-2">Something spectacular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 2: SO WE ARE MAKING HISTORY IN FRENCH.                  */}
      {/* Classic Dark (60% Midnight Forest #001410, 30% Mint Mist)   */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#001410] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
            SO WE ARE MAKING HISTORY IN FRENCH.
          </h2>

          <p className="text-base sm:text-xl lg:text-2xl text-[#D2FCE3] font-light leading-relaxed">
            From 30 October to 1 November 2026, Lagos will become the stage for an extraordinary 48-hour French Language Marathon.
          </p>

          <div className="space-y-1.5 sm:space-y-2 text-lg sm:text-2xl lg:text-3xl font-display font-bold text-[#23C48E]">
            <p>One woman.</p>
            <p>One language.</p>
            <p>48 hours.</p>
          </div>

          <p className="text-base sm:text-xl text-[#D2FCE3]/90">
            And one audacious attempt to set a new Guinness World Records title.
          </p>

          <div className="pt-2 text-xl sm:text-3xl font-display font-extrabold text-white">
            <p className="line-through text-[#23C48E]/50 font-normal">Not in Paris.</p>
            <p className="text-[#23C48E]">In Nigeria.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 3: 26 HOURS. / 48 HOURS.                                */}
      {/* ------------------------------------------------------------ */}
      <section id="the-record" className="w-full bg-[#001410] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
          {/* 26 HOURS */}
          <div className="space-y-2 sm:space-y-3 p-6 sm:p-8 bg-[#003734]/50 border border-[#23C48E]/20 rounded-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-[#D2FCE3]">
              26 HOURS.
            </h2>
            <p className="text-base sm:text-xl text-[#D2FCE3]/90 leading-relaxed font-normal">
              That is the current Guinness World Records title for the longest language lesson.
            </p>
          </div>

          {/* 48 HOURS */}
          <div className="space-y-4 p-6 sm:p-10 bg-[#001410] text-white rounded-2xl border-2 border-[#23C48E] shadow-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-[#23C48E]">
              48 HOURS.
            </h2>
            <div className="space-y-2.5 sm:space-y-3 text-base sm:text-xl text-[#D2FCE3] leading-relaxed font-light">
              <p className="font-semibold text-white">That is where Favour is going.</p>
              <p>Twenty-two hours beyond the mark.</p>
              <p>Two nights.</p>
              <p>One extraordinary lesson.</p>
              <p className="pt-2 text-white">
                A crowd watching, cheering, learning and witnessing what happens when one person decides to take an idea further than anyone has taken it before.
              </p>
              <div className="pt-3 sm:pt-4 text-xs sm:text-sm font-mono text-[#23C48E] uppercase tracking-wider space-y-1">
                <p>The clock will start.</p>
                <p>The lesson will begin.</p>
                <p className="font-bold text-white">And Lagos will be watching.</p>
              </div>
            </div>
          </div>

          {/* BUT THIS STORY IS BIGGER THAN A RECORD. */}
          <div className="space-y-5 sm:space-y-6 pt-8 sm:pt-10 border-t border-[#23C48E]/20">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase text-white">
              BUT THIS STORY IS BIGGER THAN A RECORD.
            </h2>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-[#D2FCE3]/90 leading-relaxed">
              <p>A record lasts for a moment. What it represents can last much longer.</p>
              <p>This marathon is a celebration of language as a bridge between people and cultures.</p>
              <p>
                Nigeria is home to hundreds of languages. They carry our identities, our traditions, our memories and our histories, and they must be spoken, taught and handed down.
              </p>
              <p>
                Learning another language does not take anything away from the language you already speak.
              </p>
              <p>It does not mean leaving those things behind.</p>
              <p className="font-bold text-white text-base sm:text-xl">
                It means becoming capable of meeting someone else’s world without losing your own.
              </p>
              <p className="font-semibold text-[#23C48E]">French is simply where this particular journey begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 4: MEET THE WOMAN WHO DECIDED TO GO FOR 48.             */}
      {/* ------------------------------------------------------------ */}
      <section id="favour-ugegbe" className="w-full bg-[#003734] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#23C48E] font-bold block">
            MEET THE WOMAN WHO DECIDED TO GO FOR 48.
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
            FAVOUR CHISIMDI UGEGBE
          </h2>

          <div className="space-y-3 sm:space-y-4 text-base sm:text-xl text-[#D2FCE3] font-light leading-relaxed">
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
            <p className="text-[#23C48E] font-bold text-lg sm:text-2xl">
              Its scale is not.
            </p>
          </div>

          <div className="pt-2 sm:pt-4 space-y-1.5 sm:space-y-2 text-lg sm:text-2xl font-display font-bold text-white">
            <p>Teach French for 48 hours.</p>
            <p>Keep going.</p>
            <p className="text-[#23C48E]">Make history.</p>
          </div>

          <div className="pt-2 sm:pt-4">
            <button
              onClick={onScrollToFavour}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#001410] hover:bg-[#001410]/80 border border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer text-center"
            >
              [ DISCOVER FAVOUR’S STORY ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 4 & 5: THREE DAYS. ONE CITY. A LOT OF FRENCH.           */}
      {/* ------------------------------------------------------------ */}
      <section id="three-days" className="w-full bg-[#001410] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
            THREE DAYS. ONE CITY. A LOT OF FRENCH.
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {/* Moment 1 */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#23C48E] font-bold">
                FRIDAY · 30 OCTOBER · 10AM – 3PM
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                THE SEND-OFF
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed font-medium">
                Music. Comedy. Spoken word. French. Lagos energy.
              </p>
              <p className="text-xs sm:text-sm text-[#D2FCE3]/70">
                Come and send Favour into the marathon.
              </p>
            </div>

            {/* Moment 2 */}
            <div className="p-5 sm:p-8 bg-[#003734]/50 border-2 border-[#23C48E]/50 rounded-xl space-y-2 sm:space-y-3 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-widest text-[#23C48E] font-bold">
                FRIDAY · 30 OCTOBER · 6PM
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                THE CLOCK STARTS.
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                The 48-hour challenge officially begins.
              </p>
            </div>

            {/* Moment 3 */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B1A] font-bold">
                SATURDAY · 31 OCTOBER · AROUND 8PM
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                HOUR 26.
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                The current record is reached.
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#23C48E]">
                And if Favour is still going, the record falls.
              </p>
            </div>

            {/* Moment 4 */}
            <div className="p-5 sm:p-8 bg-[#001410] text-white border-2 border-[#23C48E] rounded-xl space-y-2 sm:space-y-3 shadow-md">
              <div className="text-xs font-mono uppercase tracking-widest text-[#23C48E] font-bold">
                SUNDAY · 1 NOVEMBER · 6PM
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#23C48E] uppercase">
                HOUR 48.
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                The final bell.
              </p>
              <p className="text-sm sm:text-base text-[#D2FCE3]">
                The end of the marathon.
              </p>
              <p className="text-sm sm:text-base font-bold text-white pt-1">
                And, if everything goes to plan, a new chapter in the record books.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 5: YOU DON’T HAVE TO SPEAK FRENCH.                      */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#003734] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
            YOU DON’T HAVE TO SPEAK FRENCH.
          </h2>

          <p className="text-lg sm:text-2xl text-[#23C48E] font-semibold">
            You just have to show up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-base sm:text-lg text-[#D2FCE3] font-light leading-relaxed pt-2">
            <div className="space-y-1.5 sm:space-y-2">
              <p>Come for an hour.</p>
              <p>Come for ten minutes.</p>
              <p>Come with your friends.</p>
              <p>Bring your children.</p>
              <p>Bring your camera.</p>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <p>Learn a phrase.</p>
              <p>Cheer Favour on.</p>
              <p>Make some noise.</p>
              <p className="font-semibold text-white">Watch history happen in real time.</p>
            </div>
          </div>

          <p className="text-base sm:text-xl text-[#D2FCE3]/90 pt-2 sm:pt-4 leading-relaxed">
            And leave knowing a little more about the world than you did when you arrived.
          </p>

          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <div className="text-base sm:text-lg font-mono font-bold text-[#23C48E] uppercase tracking-wider text-center sm:text-left">
              ENTRY IS FREE.
            </div>
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer text-center"
            >
              [ REGISTER FREE ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 5 & 6: BE PART OF THE STORY. (ATTEND / SHARE / PARTNER / MEDIA) */}
      {/* ------------------------------------------------------------ */}
      <section id="be-part-of-the-story" className="w-full bg-[#001410] text-[#D2FCE3] py-16 sm:py-24 lg:py-28 border-b border-[#23C48E]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
            BE PART OF THE STORY.
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {/* ATTEND */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#23C48E] uppercase">
                ATTEND
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                Be in the room when the marathon unfolds.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="text-xs font-mono font-bold text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider cursor-pointer"
                >
                  [ REGISTER TO ATTEND ]
                </button>
              </div>
            </div>

            {/* SHARE */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#23C48E] uppercase">
                SHARE
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                Share the countdown, learn the daily French phrase, tag someone who should be there, and use #UgegbeGWR.
              </p>
              <p className="text-xs sm:text-sm text-[#D2FCE3]/70 italic">
                The bigger the conversation, the further the message travels.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={handleCopyShare}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/40 font-mono text-xs uppercase tracking-wider rounded text-center cursor-pointer transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#23C48E]" />
                      <span className="text-[#23C48E] font-bold">COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#23C48E]" />
                      <span>Copy Share Text</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe for the 48-Hour French Language Marathon at Landmark, Lagos! Entry is FREE. #UgegbeGWR https://ugegbegwr.com')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-mono text-xs uppercase tracking-wider rounded text-center cursor-pointer transition-colors shadow-xs"
                >
                  Share to WhatsApp
                </a>
              </div>
            </div>

            {/* PARTNER */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#23C48E] uppercase">
                PARTNER
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                Put your organisation alongside a story about language, culture, connection and possibility.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPartner}
                  className="text-xs font-mono font-bold text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider cursor-pointer"
                >
                  [ PARTNER WITH US ]
                </button>
              </div>
            </div>

            {/* MEDIA */}
            <div className="p-5 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#23C48E] uppercase">
                MEDIA
              </h3>
              <p className="text-sm sm:text-base text-[#D2FCE3] leading-relaxed">
                Cover the marathon, the record attempt and the woman behind it.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPress}
                  className="text-xs font-mono font-bold text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider cursor-pointer"
                >
                  [ PRESS & MEDIA ]
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer text-center"
            >
              [ REGISTER TO ATTEND ]
            </button>
            <button
              onClick={onOpenPartner}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/40 font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer text-center"
            >
              [ PARTNER WITH US ]
            </button>
            <button
              onClick={onOpenPress}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/40 font-display font-bold text-xs uppercase tracking-wider rounded cursor-pointer text-center"
            >
              [ PRESS & MEDIA ]
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* PAGE 6: ONE LANGUAGE. 48 HOURS. ONE EXTRAORDINARY ATTEMPT.   */}
      {/* ------------------------------------------------------------ */}
      <section className="w-full bg-[#001410] text-white py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              ONE LANGUAGE.
            </h2>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-black uppercase tracking-tight text-[#23C48E]">
              48 HOURS.
            </h2>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              ONE EXTRAORDINARY ATTEMPT.
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-3 text-base sm:text-xl lg:text-2xl text-[#D2FCE3] font-light max-w-xl mx-auto leading-relaxed">
            <p>Nigeria is not just watching the world.</p>
            <p className="font-semibold text-white">For 48 hours, we are inviting the world to watch us.</p>
          </div>

          <div className="pt-2 sm:pt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base font-mono uppercase text-[#D2FCE3] tracking-wider">
            <p>30 OCTOBER – 1 NOVEMBER 2026</p>
            <p>LANDMARK, LAGOS</p>
            <p className="text-[#23C48E] font-bold">FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON</p>
          </div>

          <div className="pt-4 sm:pt-6">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-sm sm:text-base uppercase tracking-wider rounded-md shadow-xl transition-all transform hover:scale-105 active:scale-100 cursor-pointer"
            >
              [ BE THERE ]
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

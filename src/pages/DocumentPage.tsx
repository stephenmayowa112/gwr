import React, { useState } from 'react';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';
import { UgegbeBrandLogo } from '../components/common/UgegbeBrandLogo';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Share2,
  Trophy,
  Flame,
  Globe2,
  Users,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { OFFICIAL_MILESTONES, downloadIcsFile, generateGoogleCalendarUrl } from '../services/calendar';

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
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    'Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe for the 48-Hour French Language Marathon at Landmark, Lagos! Entry is FREE. #UgegbeGWR #FavourUgegbe https://ugegbegwr.com'
  )}`;

  return (
    <div className="w-full bg-[#001410] text-[#D2FCE3] selection:bg-[#23C48E] selection:text-[#001410] overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Verbatim Pages 1 & 2)                       */}
      {/* ============================================================ */}
      <section className="relative w-full pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 border-b border-[#23C48E]/20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,55,52,0.6),rgba(0,20,16,1))]">
        {/* Subtle decorative atmospheric ambient glows */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#23C48E]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#003734]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Official Co-Branded Ugegbe Logo */}
          <div className="flex flex-col items-start pt-2">
            <UgegbeBrandLogo
              variant="gwr-light"
              size="lg"
              withGwrBadge={true}
              showTagline={true}
              className="drop-shadow-[0_4px_24px_rgba(35,196,142,0.15)]"
            />
          </div>

          {/* Official Event Title & Subtext */}
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase text-white leading-[1.08] text-balance">
              FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON
            </h1>

            <p className="text-lg sm:text-2xl lg:text-3xl text-[#D2FCE3]/90 font-light leading-relaxed max-w-4xl text-pretty">
              For 48 hours, Favour Chisimdi Ugegbe will teach, speak, engage and keep going, turning a French lesson into a live celebration of language, culture, endurance and possibility.
            </p>
          </div>

          {/* Key Event Badges: Dates, Venue, Free Entry */}
          <div className="pt-4 pb-2 border-y border-[#23C48E]/25 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-wider uppercase">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#23C48E] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">DATES</span>
                <span className="font-bold text-white">30 OCT – 1 NOV 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#23C48E] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">VENUE</span>
                <span className="font-bold text-white">LANDMARK, LAGOS</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#40FFBC] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">ADMISSION</span>
                <span className="font-black text-[#23C48E]">ENTRY IS FREE.</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 sm:px-10 sm:py-4.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-[0_4px_20px_rgba(35,196,142,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              [ REGISTER TO ATTEND ]
            </button>

            <button
              onClick={onScrollToCountdown}
              className="px-7 py-4 sm:px-8 sm:py-4.5 bg-[#003734]/70 hover:bg-[#003734] border border-[#23C48E]/40 text-[#D2FCE3] font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-colors cursor-pointer text-center"
            >
              [ WATCH THE COUNTDOWN ]
            </button>
          </div>

          {/* Live Synchronized Lagos Time Countdown */}
          <div id="countdown-section" className="pt-8 sm:pt-12">
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/30 rounded-2xl shadow-xl backdrop-blur-md">
              <TimezoneCountdown
                targetDateIso="2026-10-30T18:00:00+01:00"
                title="TIME UNTIL OFFICIAL START (LAGOS WAT)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. LANGUAGE CONNECTS US. (Verbatim Page 1)                   */}
      {/* ============================================================ */}
      <section id="language-connects-us" className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {/* Main Statement */}
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23C48E]/10 border border-[#23C48E]/30 text-xs font-mono uppercase text-[#23C48E] tracking-widest font-semibold">
              <Globe2 className="w-3.5 h-3.5" />
              <span>THE PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-tight">
              LANGUAGE CONNECTS US.
            </h2>

            <div className="space-y-4 text-base sm:text-xl lg:text-2xl text-[#D2FCE3]/90 leading-relaxed font-light">
              <p>Before it is a subject in a classroom, language is how we find one another.</p>
              <p>It carries our stories.</p>
              <p>It holds our histories.</p>
              <p>It tells us where we come from, and gives us a way to reach beyond it.</p>
              <p>Every language opens a door into another people, another place, another way of seeing the world.</p>
              <p>And in a world that is increasingly connected, the ability to speak across borders is more than a skill.</p>
              <p className="font-display font-black text-white text-2xl sm:text-4xl text-[#40FFBC] pt-4">
                It is power.
              </p>
            </div>
          </div>

          {/* THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET */}
          <div className="p-8 sm:p-12 bg-[#003734]/35 border border-[#23C48E]/25 rounded-2xl space-y-8 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase text-white">
              THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg text-[#D2FCE3]/90 font-light">
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  Language makes international relations possible.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  It makes tourism more personal.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  Trade more accessible.
                </p>
              </div>

              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  Diplomacy more human.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  Friendships easier to form.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23C48E]" />
                  Cultures easier to understand.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#23C48E]/25 space-y-3">
              <p className="text-base sm:text-lg text-[#D2FCE3]/90">
                And when a language is learned, taught and passed on, something important happens:
              </p>
              <p className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                A connection survives.
              </p>
              <p className="text-base sm:text-lg text-[#D2FCE3]/80 pt-2">That is why languages matter.</p>
              <p className="text-lg sm:text-xl font-bold text-[#23C48E]">
                And that is why this story begins with French.
              </p>
            </div>
          </div>

          {/* LOOK AROUND NIGERIA. */}
          <div className="p-8 sm:p-12 bg-[#001410] border-2 border-[#23C48E]/40 rounded-2xl space-y-8 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#23C48E]">
                GEOGRAPHIC CONTEXT
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-white">
                LOOK AROUND NIGERIA.
              </h3>
              <p className="text-lg sm:text-xl text-[#D2FCE3] font-medium">
                We are surrounded by Francophone neighbours.
              </p>
            </div>

            {/* Neighbouring Nations Graphic Banner */}
            <div className="p-5 sm:p-6 bg-[#003734]/60 border border-[#23C48E]/30 rounded-xl">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-wide text-white break-words">
                Benin. Niger. Chad. Cameroon.
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#D2FCE3]/90 leading-relaxed font-light">
              <p>Across our borders, French is spoken, taught, traded in and lived in every day.</p>
              <p>Yet Nigeria’s relationship with French is still only beginning to realise its possibilities.</p>
              <div className="space-y-2 pt-2 border-l-2 border-[#23C48E]/40 pl-4 sm:pl-6 italic text-[#D2FCE3]/80">
                <p>What could happen if more Nigerians could cross those borders with confidence?</p>
                <p>What could happen if a generation saw language not simply as another subject to pass, but as a passport to a larger world?</p>
                <p>What could happen if we made learning a language something to celebrate?</p>
              </div>
              <p className="text-2xl sm:text-4xl font-display font-black text-[#FF6B1A] pt-4 tracking-tight uppercase">
                Something spectacular.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SO WE ARE MAKING HISTORY IN FRENCH. (Verbatim Page 2)     */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 bg-[radial-gradient(circle_at_bottom_left,rgba(0,55,52,0.4),rgba(0,20,16,1))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E] block">
              LAGOS, NIGERIA · 2026
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-tight">
              SO WE ARE MAKING HISTORY IN FRENCH.
            </h2>
          </div>

          <p className="text-lg sm:text-2xl lg:text-3xl text-[#D2FCE3] font-light leading-relaxed">
            From 30 October to 1 November 2026, Lagos will become the stage for an extraordinary 48-hour French Language Marathon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-display font-black text-white block">One woman.</span>
            </div>
            <div className="p-6 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-display font-black text-white block">One language.</span>
            </div>
            <div className="p-6 bg-[#003734]/50 border-2 border-[#23C48E] rounded-xl text-center shadow-[0_0_20px_rgba(35,196,142,0.2)]">
              <span className="text-2xl sm:text-3xl font-display font-black text-[#23C48E] block">48 hours.</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-[#D2FCE3]/90 pt-2 leading-relaxed">
            And one audacious attempt to set a new Guinness World Records title.
          </p>

          <div className="pt-4 flex items-baseline gap-4 sm:gap-6 font-display font-black uppercase text-2xl sm:text-4xl">
            <span className="text-[#D2FCE3]/40 line-through">Not in Paris.</span>
            <span className="text-[#23C48E] text-3xl sm:text-5xl">In Nigeria.</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE RECORD: 26 HOURS VS 48 HOURS (Verbatim Page 3)        */}
      {/* ============================================================ */}
      <section id="the-record" className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              GUINNESS WORLD RECORDS CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              THE BENCHMARK & THE AMBITION
            </h2>
          </div>

          {/* Record Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* 26 HOURS CARD */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#D2FCE3]/60 block tracking-wider">
                  CURRENT OFFICIAL RECORD
                </span>
                <div className="text-5xl sm:text-7xl font-display font-black text-[#D2FCE3]/80">
                  26 <span className="text-2xl sm:text-3xl font-sans font-normal text-[#D2FCE3]/50">HOURS</span>
                </div>
                <p className="text-base sm:text-lg text-[#D2FCE3]/80 leading-relaxed font-light pt-2">
                  That is the current Guinness World Records title for the longest language lesson.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/15 text-xs font-mono text-[#D2FCE3]/50 uppercase">
                EXISTING GLOBAL MARK
              </div>
            </div>

            {/* 48 HOURS CARD (HEROIC) */}
            <div className="md:col-span-7 p-6 sm:p-10 bg-[#001410] border-2 border-[#23C48E] rounded-2xl shadow-[0_0_35px_rgba(35,196,142,0.25)] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#23C48E] text-[#001410] text-[10px] font-mono font-black uppercase tracking-widest rounded-bl-xl">
                TARGET RECORD
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E] block tracking-wider">
                  THE NEW MILESTONE IN LAGOS
                </span>
                <div className="text-6xl sm:text-8xl font-display font-black text-[#23C48E]">
                  48 <span className="text-3xl sm:text-4xl font-sans font-normal text-white">HOURS.</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  That is where Favour is going.
                </p>

                <div className="space-y-2 text-base sm:text-lg text-[#D2FCE3]/90 font-light leading-relaxed">
                  <p className="font-semibold text-[#40FFBC]">Twenty-two hours beyond the mark.</p>
                  <p>Two nights.</p>
                  <p>One extraordinary lesson.</p>
                  <p className="pt-2 text-white">
                    A crowd watching, cheering, learning and witnessing what happens when one person decides to take an idea further than anyone has taken it before.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#23C48E]/25 space-y-1 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#23C48E]">
                  <p>The clock will start.</p>
                  <p>The lesson will begin.</p>
                  <p className="font-bold text-white">And Lagos will be watching.</p>
                </div>
              </div>
            </div>
          </div>

          {/* BUT THIS STORY IS BIGGER THAN A RECORD */}
          <div className="p-8 sm:p-12 bg-[#003734]/30 border border-[#23C48E]/20 rounded-2xl space-y-6">
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-white">
              BUT THIS STORY IS BIGGER THAN A RECORD.
            </h3>

            <div className="space-y-4 text-base sm:text-lg text-[#D2FCE3]/90 leading-relaxed font-light">
              <p>A record lasts for a moment. What it represents can last much longer.</p>
              <p>This marathon is a celebration of language as a bridge between people and cultures.</p>
              <p>
                Nigeria is home to hundreds of languages. They carry our identities, our traditions, our memories and our histories, and they must be spoken, taught and handed down.
              </p>
              <p>
                Learning another language does not take anything away from the language you already speak.
              </p>
              <p>It does not mean leaving those things behind.</p>
              <p className="font-display font-bold text-white text-lg sm:text-2xl pt-2">
                It means becoming capable of meeting someone else’s world without losing your own.
              </p>
              <p className="font-semibold text-[#23C48E] text-base sm:text-lg">
                French is simply where this particular journey begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. MEET THE WOMAN (Verbatim Page 4)                          */}
      {/* ============================================================ */}
      <section id="favour-ugegbe" className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 bg-[radial-gradient(ellipse_at_top_right,rgba(0,55,52,0.5),rgba(0,20,16,1))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E] block">
              MEET THE WOMAN WHO DECIDED TO GO FOR 48.
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white">
              FAVOUR CHISIMDI UGEGBE
            </h2>
          </div>

          <div className="p-8 sm:p-10 bg-[#003734]/30 border border-[#23C48E]/25 rounded-2xl space-y-6 backdrop-blur-sm">
            <div className="space-y-4 text-base sm:text-xl text-[#D2FCE3]/90 font-light leading-relaxed">
              <p>
                Favour is a Nigerian polyglot who speaks <strong className="text-white font-bold">11 languages</strong>: nine foreign languages and two Nigerian languages.
              </p>
              <p>
                French became one of the languages through which she discovered a bigger world.
              </p>
              <p>
                Now, she is taking that passion out of the classroom and putting it on a global stage.
              </p>
              <p className="text-white pt-2 font-normal">
                Her challenge is simple to understand.
              </p>
              <p className="text-2xl sm:text-3xl font-display font-black text-[#23C48E] uppercase">
                Its scale is not.
              </p>
            </div>

            <div className="pt-6 border-t border-[#23C48E]/20 space-y-1.5 font-display font-bold text-xl sm:text-3xl text-white">
              <p>Teach French for 48 hours.</p>
              <p>Keep going.</p>
              <p className="text-[#23C48E]">Make history.</p>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 bg-[#001410] hover:bg-[#001410]/80 border-2 border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center"
              >
                [ DISCOVER FAVOUR’S STORY — BE THERE ]
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. THREE DAYS. ONE CITY. A LOT OF FRENCH. (Verbatim Pages 4&5) */}
      {/* ============================================================ */}
      <section id="three-days" className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              OFFICIAL EVENT SCHEDULE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white">
              THREE DAYS. ONE CITY. A LOT OF FRENCH.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Moment 1: The Send-Off */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    FRIDAY · 30 OCTOBER · 10AM – 3PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E]/10 text-[#23C48E] border border-[#23C48E]/25">
                    WAT (UTC+1)
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  THE SEND-OFF
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed font-medium">
                  Music. Comedy. Spoken word. French. Lagos energy.
                </p>

                <p className="text-sm text-[#D2FCE3]/70 font-light">
                  Come and send Favour into the marathon.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/15 flex items-center gap-3">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.sendOff)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 2: The Clock Starts */}
            <div className="p-6 sm:p-8 bg-[#003734]/50 border-2 border-[#23C48E]/50 rounded-2xl space-y-4 flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    FRIDAY · 30 OCTOBER · 6PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E] text-[#001410] font-black">
                    START
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  THE CLOCK STARTS.
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed">
                  The 48-hour challenge officially begins.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/25 flex items-center gap-3">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.challengeStart)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 3: Hour 26 */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/20 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#FF6B1A] tracking-wider">
                    SATURDAY · 31 OCTOBER · AROUND 8PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/40 font-bold">
                    RECORD REACHED
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  HOUR 26.
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed">
                  The current record is reached.
                </p>

                <p className="text-base font-semibold text-[#23C48E]">
                  And if Favour is still going, the record falls.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/15 flex items-center gap-3">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.recordFalls)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 4: Hour 48 */}
            <div className="p-6 sm:p-8 bg-[#001410] border-2 border-[#23C48E] rounded-2xl space-y-4 flex flex-col justify-between shadow-[0_0_30px_rgba(35,196,142,0.25)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    SUNDAY · 1 NOVEMBER · 6PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E] text-[#001410] font-black">
                    FINAL BELL
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-[#23C48E] uppercase">
                  HOUR 48.
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed">The final bell.</p>
                <p className="text-base text-[#D2FCE3]">The end of the marathon.</p>
                <p className="text-base font-bold text-white pt-1">
                  And, if everything goes to plan, a new chapter in the record books.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/25 flex items-center gap-3">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.finalBell)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. YOU DON’T HAVE TO SPEAK FRENCH. (Verbatim Page 5)         */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 bg-[radial-gradient(circle_at_top,rgba(0,55,52,0.5),rgba(0,20,16,1))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E] block">
              OPEN INVITATION TO EVERYONE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-tight">
              YOU DON’T HAVE TO SPEAK FRENCH.
            </h2>
            <p className="text-xl sm:text-3xl text-[#23C48E] font-bold">
              You just have to show up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg text-[#D2FCE3]/90 font-light leading-relaxed">
            <div className="p-6 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2">
              <p>Come for an hour.</p>
              <p>Come for ten minutes.</p>
              <p>Come with your friends.</p>
              <p>Bring your children.</p>
              <p>Bring your camera.</p>
            </div>

            <div className="p-6 bg-[#003734]/30 border border-[#23C48E]/20 rounded-xl space-y-2">
              <p>Learn a phrase.</p>
              <p>Cheer Favour on.</p>
              <p>Make some noise.</p>
              <p className="font-bold text-white">Watch history happen in real time.</p>
            </div>
          </div>

          <p className="text-lg sm:text-2xl text-[#D2FCE3] font-light leading-relaxed pt-2">
            And leave knowing a little more about the world than you did when you arrived.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <div className="text-lg sm:text-2xl font-mono font-black text-[#23C48E] uppercase tracking-wider text-center sm:text-left">
              ENTRY IS FREE.
            </div>
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg transition-all cursor-pointer text-center"
            >
              [ REGISTER FREE ]
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. BE PART OF THE STORY. (Verbatim Pages 5 & 6)              */}
      {/* ============================================================ */}
      <section id="be-part-of-the-story" className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              ENGAGE & PARTICIPATE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white">
              BE PART OF THE STORY.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ATTEND */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E] tracking-widest block">
                  01 / ATTENDANCE
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase">
                  ATTEND
                </h3>
                <p className="text-base text-[#D2FCE3]/90 leading-relaxed font-light">
                  Be in the room when the marathon unfolds.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/20">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-3 px-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                >
                  [ REGISTER TO ATTEND ]
                </button>
              </div>
            </div>

            {/* SHARE */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E] tracking-widest block">
                  02 / ADVOCACY
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase">
                  SHARE
                </h3>
                <p className="text-sm sm:text-base text-[#D2FCE3]/90 leading-relaxed font-light">
                  Share the countdown, learn the daily French phrase, tag someone who should be there, and use #UgegbeGWR.
                </p>
                <p className="text-xs sm:text-sm text-[#D2FCE3]/70 italic">
                  The bigger the conversation, the further the message travels.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/20 flex flex-col sm:flex-row items-stretch gap-2.5">
                <button
                  onClick={handleCopyShare}
                  className="flex-1 py-3 px-3 bg-[#001410] hover:bg-[#001410]/80 border border-[#23C48E]/40 text-[#D2FCE3] font-mono text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#23C48E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Text!' : 'Copy Share Text'}</span>
                </button>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-mono text-xs uppercase tracking-wider rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Share to WhatsApp</span>
                </a>
              </div>
            </div>

            {/* PARTNER */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E] tracking-widest block">
                  03 / COLLABORATION
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase">
                  PARTNER
                </h3>
                <p className="text-base text-[#D2FCE3]/90 leading-relaxed font-light">
                  Put your organisation alongside a story about language, culture, connection and possibility.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/20">
                <button
                  onClick={onOpenPartner}
                  className="w-full py-3 px-4 bg-[#001410] hover:bg-[#003734] border border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                >
                  [ PARTNER WITH US ]
                </button>
              </div>
            </div>

            {/* MEDIA */}
            <div className="p-6 sm:p-8 bg-[#003734]/30 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E] tracking-widest block">
                  04 / COVERAGE
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase">
                  MEDIA
                </h3>
                <p className="text-base text-[#D2FCE3]/90 leading-relaxed font-light">
                  Cover the marathon, the record attempt and the woman behind it.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/20">
                <button
                  onClick={onOpenPress}
                  className="w-full py-3 px-4 bg-[#001410] hover:bg-[#003734] border border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                >
                  [ PRESS & MEDIA ]
                </button>
              </div>
            </div>
          </div>

          {/* Row of Action Buttons as listed in the copy */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3.5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer text-center transition-all"
            >
              [ REGISTER TO ATTEND ]
            </button>
            <button
              onClick={onOpenPartner}
              className="px-6 py-3.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/40 font-display font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer text-center transition-colors"
            >
              [ PARTNER WITH US ]
            </button>
            <button
              onClick={onOpenPress}
              className="px-6 py-3.5 bg-[#003734] hover:bg-[#003734]/80 text-[#D2FCE3] border border-[#23C48E]/40 font-display font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer text-center transition-colors"
            >
              [ PRESS & MEDIA ]
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. ONE LANGUAGE. 48 HOURS. (Verbatim Page 6 Closing)        */}
      {/* ============================================================ */}
      <section className="w-full py-24 sm:py-32 lg:py-40 border-b border-[#23C48E]/20 text-center bg-[radial-gradient(circle_at_center,rgba(0,55,52,0.6),rgba(0,20,16,1))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-tight">
              ONE LANGUAGE.
            </h2>
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[#23C48E] leading-tight">
              48 HOURS.
            </h2>
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-tight">
              ONE EXTRAORDINARY ATTEMPT.
            </h2>
          </div>

          <div className="space-y-3 text-lg sm:text-2xl lg:text-3xl text-[#D2FCE3] font-light max-w-2xl mx-auto leading-relaxed">
            <p>Nigeria is not just watching the world.</p>
            <p className="font-bold text-white">For 48 hours, we are inviting the world to watch us.</p>
          </div>

          <div className="pt-4 space-y-2 font-mono uppercase text-xs sm:text-sm md:text-base text-[#D2FCE3]/90 tracking-wider">
            <p className="font-bold text-white">30 OCTOBER – 1 NOVEMBER 2026</p>
            <p className="font-bold text-white">LANDMARK, LAGOS</p>
            <p className="text-[#23C48E] font-bold">FAVOUR UGEGBE’S 48-HOUR FRENCH LANGUAGE MARATHON</p>
          </div>

          <div className="pt-6">
            <button
              onClick={onOpenRegister}
              className="px-10 sm:px-14 py-4.5 sm:py-5 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-[0_4px_30px_rgba(35,196,142,0.4)] transition-all transform hover:scale-105 active:scale-100 cursor-pointer"
            >
              [ BE THERE ]
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';
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
  ExternalLink,
  Heart,
} from 'lucide-react';
import { OFFICIAL_MILESTONES, downloadIcsFile } from '../services/calendar';

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
  const [cheerCount, setCheerCount] = useState(2480);
  const [hasCheered, setHasCheered] = useState(false);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      'Join me in supporting Nigerian polyglot Favour Chisimdi Nwobodo for the 48-Hour French Language Marathon at Landmark Centre, Lagos, Nigeria! Entry is 100% FREE. #UgegbeGWR #FavourNwobodo #FrenchLanguageMarathon https://ugegbegwr.com'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    '🇫🇷 Join me in supporting Nigerian polyglot Favour Chisimdi Nwobodo for the 48-Hour French Language Marathon at Landmark Centre, Lagos, Nigeria! Entry is 100% FREE. #UgegbeGWR #FavourNwobodo https://ugegbegwr.com'
  )}`;

  const handleCheer = () => {
    if (!hasCheered) {
      setCheerCount((c) => c + 1);
      setHasCheered(true);
    }
  };

  return (
    <div className="w-full bg-[#001410] text-[#D2FCE3] selection:bg-[#23C48E] selection:text-[#001410] overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH COUNTDOWN FIRST AT THE TOP               */}
      {/* ============================================================ */}
      <section className="relative w-full pt-6 pb-14 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 border-b border-[#23C48E]/20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,55,52,0.7),rgba(0,20,16,1))]">
        {/* Subtle decorative atmospheric ambient glows */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#23C48E]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#003734]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* 🔴 THE COUNTDOWN IS THE FIRST THING VISITORS SEE */}
          <div
            id="countdown-section"
            className="p-4 sm:p-7 md:p-9 bg-[#001914] border-2 sm:border-[3px] border-[#23C48E] rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,18,14,0.9),0_0_35px_rgba(35,196,142,0.25)] backdrop-blur-xl transition-all"
          >
            <TimezoneCountdown
              targetDateIso="2026-10-30T18:00:00+01:00"
              title="TIME UNTIL OFFICIAL START (LAGOS, NIGERIA · WAT)"
              variant="prominent"
            />
          </div>

          {/* 🌟 UPLOADED CO-BRANDED LOGO PROMINENTLY DISPLAYED */}
          <div className="flex justify-center pt-2 sm:pt-4">
            <img
              src="/UGEGBE_X_GWR_Light.png"
              alt="Ugegbe x Guinness World Records - Official Attempt"
              className="w-full max-w-xs sm:max-w-md md:max-w-lg h-auto object-contain filter drop-shadow-[0_4px_24px_rgba(35,196,142,0.35)]"
              loading="eager"
            />
          </div>

          {/* Punchy Event Title & Tagline (Lively, Less Wordy) */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-tight">
              FAVOUR CHISIMDI NWOBODO’S 48-HOUR FRENCH LANGUAGE MARATHON
            </h1>

            <p className="text-base sm:text-xl text-[#D2FCE3]/90 font-light max-w-2xl mx-auto leading-relaxed">
              One Nigerian woman. 11 languages. 48 non-stop hours in <strong className="text-white font-semibold">Lagos, Nigeria</strong>. A Guinness World Records attempt turning French learning into history.
            </p>
          </div>

          {/* Key Facts Strip (Zero-Pill, Clean & Bold) */}
          <div className="py-3 sm:py-4 border-y border-[#23C48E]/25 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 font-mono text-xs sm:text-sm tracking-wider uppercase text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Calendar className="w-4 h-4 text-[#23C48E] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">DATES</span>
                <span className="font-bold text-white">30 OCT – 1 NOV 2026</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <MapPin className="w-4 h-4 text-[#23C48E] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">VENUE</span>
                <span className="font-bold text-white">LANDMARK CENTRE, LAGOS</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Sparkles className="w-4 h-4 text-[#40FFBC] shrink-0" />
              <div>
                <span className="text-[#D2FCE3]/60 text-[10px] block font-sans">ADMISSION</span>
                <span className="font-black text-[#23C48E]">100% FREE PASS</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={onOpenRegister}
              className="px-8 py-3.5 sm:px-10 sm:py-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-[0_4px_24px_rgba(35,196,142,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              [ GET FREE PASS ]
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 sm:py-4 bg-[#003734]/80 hover:bg-[#003734] border border-[#23C48E]/40 text-[#D2FCE3] font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#23C48E]" />
              <span>Share to WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE RECORD: 26 HOURS VS 48 HOURS (High-Energy Contrast)   */}
      {/* ============================================================ */}
      <section id="the-record" className="w-full py-14 sm:py-20 border-b border-[#23C48E]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
                GUINNESS WORLD RECORDS CHALLENGE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
                THE BENCHMARK VS THE LAGOS TARGET
              </h2>
            </div>
            {/* Uploaded compact badge */}
            <img
              src="/UGEGBE_X_GWR_Light_Compact.png"
              alt="Ugegbe GWR"
              className="h-9 sm:h-11 w-auto object-contain hidden sm:block filter drop-shadow-[0_2px_8px_rgba(35,196,142,0.25)]"
            />
          </div>

          {/* Record Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* 26 HOURS CARD */}
            <div className="md:col-span-5 p-6 sm:p-7 bg-[#002821] border border-[#23C48E]/25 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase text-[#D2FCE3]/60 block tracking-wider">
                  CURRENT GLOBAL RECORD
                </span>
                <div className="text-5xl sm:text-6xl font-display font-black text-[#D2FCE3]/80">
                  26 <span className="text-2xl font-sans font-normal text-[#D2FCE3]/50">HOURS</span>
                </div>
                <p className="text-sm text-[#D2FCE3]/80 leading-relaxed font-light">
                  The standing world record for the longest continuous language lesson.
                </p>
              </div>

              <div className="pt-3 border-t border-[#23C48E]/15 text-xs font-mono text-[#D2FCE3]/50 uppercase">
                Global Benchmark to Shatter
              </div>
            </div>

            {/* 48 HOURS CARD (HEROIC) */}
            <div className="md:col-span-7 p-6 sm:p-7 bg-[#001410] border-2 border-[#23C48E] rounded-2xl shadow-[0_0_35px_rgba(35,196,142,0.25)] flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-[#23C48E] text-[#001410] text-[10px] font-mono font-black uppercase tracking-widest rounded-bl-xl">
                TARGET RECORD
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase text-[#23C48E] block tracking-wider">
                  THE NEW MILESTONE IN LAGOS, NIGERIA
                </span>
                <div className="text-6xl sm:text-7xl font-display font-black text-[#23C48E]">
                  48 <span className="text-3xl font-sans font-normal text-white">HOURS</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white">
                  +22 hours beyond the existing global record.
                </p>
                <p className="text-xs sm:text-sm text-[#D2FCE3]/90 font-light leading-relaxed">
                  Two full nights of non-stop French instruction at Landmark Centre under official GWR precision cameras and independent linguists.
                </p>
              </div>

              <div className="pt-3 border-t border-[#23C48E]/25 flex items-center justify-between text-xs font-mono uppercase text-[#23C48E]">
                <span>Witness History Live</span>
                <button
                  onClick={onOpenRegister}
                  className="font-bold underline hover:text-[#40FFBC] cursor-pointer"
                >
                  Reserve Free Pass →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY THIS MATTERS (Concise, Punchy 3 Pillars)              */}
      {/* ============================================================ */}
      <section id="language-connects-us" className="w-full py-14 sm:py-20 border-b border-[#23C48E]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              WHY THIS STORY MATTERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              LANGUAGE IS POWER. THIS IS OUR MOMENT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1: Francophone Borders */}
            <div className="p-6 bg-[#002821] border border-[#23C48E]/25 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#23C48E]/15 border border-[#23C48E]/30 flex items-center justify-center text-[#23C48E]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                4 Francophone Borders
              </h3>
              <p className="text-xs sm:text-sm text-[#D2FCE3]/80 leading-relaxed font-light">
                Nigeria is surrounded by <strong className="text-white">Benin, Niger, Chad, and Cameroon</strong>. French is our neighboring passport to trade, diplomacy, and culture.
              </p>
            </div>

            {/* Pillar 2: 11 Languages */}
            <div className="p-6 bg-[#002821] border border-[#23C48E]/25 rounded-2xl space-y-3" id="favour-nwobodo">
              <div className="w-10 h-10 rounded-xl bg-[#23C48E]/15 border border-[#23C48E]/30 flex items-center justify-center text-[#23C48E]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                11 Languages Spoken
              </h3>
              <p className="text-xs sm:text-sm text-[#D2FCE3]/80 leading-relaxed font-light">
                <strong className="text-white font-semibold">Favour Chisimdi Nwobodo</strong> speaks 9 foreign languages and 2 Nigerian languages (Igbo & Yoruba). Nigerian excellence on the world stage.
              </p>
            </div>

            {/* Pillar 3: Open To Everyone */}
            <div className="p-6 bg-[#002821] border border-[#23C48E]/25 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#23C48E]/15 border border-[#23C48E]/30 flex items-center justify-center text-[#23C48E]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                100% Free For All
              </h3>
              <p className="text-xs sm:text-sm text-[#D2FCE3]/80 leading-relaxed font-light">
                You do not need to speak French. Come for 10 minutes or 10 hours. Learn a phrase, make noise, and cheer Favour across the finish line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THREE DAYS OF HISTORY (Crisp Timeline Cards)              */}
      {/* ============================================================ */}
      <section id="three-days" className="w-full py-14 sm:py-20 border-b border-[#23C48E]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
                SCHEDULE OF EVENTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
                THREE DAYS. FOUR KEY MOMENTS.
              </h2>
            </div>
            <button
              onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.fullMarathon)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#003734] border border-[#23C48E]/40 text-xs font-mono uppercase text-[#23C48E] hover:text-[#40FFBC] rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add Schedule (.ics)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Milestone 1 */}
            <div className="p-5 bg-[#002821] border border-[#23C48E]/20 rounded-xl space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#23C48E] block uppercase font-bold">
                  FRI 30 OCT · 10AM
                </span>
                <h3 className="text-base font-display font-black text-white uppercase mt-1">
                  THE SEND-OFF
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 font-light mt-1.5 leading-relaxed">
                  Music, comedy, spoken word, and Lagos energy sending Favour into the challenge.
                </p>
              </div>
              <button
                onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.sendOff)}
                className="text-[11px] font-mono text-[#23C48E] hover:underline uppercase text-left cursor-pointer"
              >
                + Cal Reminder
              </button>
            </div>

            {/* Milestone 2 */}
            <div className="p-5 bg-[#002821] border-2 border-[#23C48E]/60 rounded-xl space-y-3 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-[10px] font-mono text-[#40FFBC] block uppercase font-black">
                  FRI 30 OCT · 6PM
                </span>
                <h3 className="text-base font-display font-black text-white uppercase mt-1">
                  CLOCK STARTS
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 font-light mt-1.5 leading-relaxed">
                  The official precision timer begins. Lesson module #1 goes live.
                </p>
              </div>
              <button
                onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.challengeStart)}
                className="text-[11px] font-mono text-[#40FFBC] hover:underline uppercase text-left cursor-pointer"
              >
                + Cal Reminder
              </button>
            </div>

            {/* Milestone 3 */}
            <div className="p-5 bg-[#002821] border border-[#23C48E]/20 rounded-xl space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FF6B1A] block uppercase font-bold">
                  SAT 31 OCT · ~8PM
                </span>
                <h3 className="text-base font-display font-black text-white uppercase mt-1">
                  HOUR 26: RECORD FALLS
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 font-light mt-1.5 leading-relaxed">
                  Current world record is reached. Every second after creates new world history.
                </p>
              </div>
              <button
                onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.recordFalls)}
                className="text-[11px] font-mono text-[#FF6B1A] hover:underline uppercase text-left cursor-pointer"
              >
                + Cal Reminder
              </button>
            </div>

            {/* Milestone 4 */}
            <div className="p-5 bg-[#001410] border-2 border-[#23C48E] rounded-xl space-y-3 flex flex-col justify-between shadow-[0_0_20px_rgba(35,196,142,0.2)]">
              <div>
                <span className="text-[10px] font-mono text-[#23C48E] block uppercase font-black">
                  SUN 1 NOV · 6PM
                </span>
                <h3 className="text-base font-display font-black text-[#23C48E] uppercase mt-1">
                  HOUR 48: TRIUMPH
                </h3>
                <p className="text-xs text-[#D2FCE3] font-light mt-1.5 leading-relaxed">
                  The final bell. 48 hours completed. The record book officially rewritten.
                </p>
              </div>
              <button
                onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.finalBell)}
                className="text-[11px] font-mono text-[#23C48E] hover:underline uppercase text-left cursor-pointer font-bold"
              >
                + Cal Reminder
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE LIVE CHEERING & MOTTO                         */}
      {/* ============================================================ */}
      <section className="w-full py-12 sm:py-16 border-b border-[#23C48E]/20 bg-[radial-gradient(circle_at_center,rgba(0,55,52,0.4),rgba(0,20,16,1))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              SEND YOUR ENERGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
              “ENSEMBLE, NOUS ÉCRIVONS L’HISTOIRE.”
            </h2>
            <p className="text-xs sm:text-sm text-[#D2FCE3]/70 italic">
              Together, we are writing history.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleCheer}
              className={`px-7 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer ${
                hasCheered
                  ? 'bg-[#23C48E] text-[#001410] scale-105'
                  : 'bg-[#003734] hover:bg-[#23C48E] text-white hover:text-[#001410] border border-[#23C48E]/40'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasCheered ? 'fill-current' : ''}`} />
              <span>{hasCheered ? 'Cheer Sent!' : 'Send Cheer to Favour Nwobodo'}</span>
              <span className="ml-1 opacity-75 font-normal">({cheerCount.toLocaleString()})</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="px-5 py-3 bg-[#001410] hover:bg-[#002821] border border-[#23C48E]/40 text-[#D2FCE3] font-mono text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#23C48E]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Share Text Copied!' : 'Copy Invitation'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. ACTION HUB & TICKET RESERVATION                           */}
      {/* ============================================================ */}
      <section id="be-part-of-the-story" className="w-full py-14 sm:py-20 border-b border-[#23C48E]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              JOIN THE MARATHON
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              BE PART OF THE RECORD
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ATTEND */}
            <div className="p-6 bg-[#002821] border-2 border-[#23C48E]/50 rounded-2xl space-y-4 flex flex-col justify-between shadow-lg">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E]">
                  01 · ATTEND FREE
                </span>
                <h3 className="text-xl font-display font-black text-white uppercase">
                  FREE PASS
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 leading-relaxed font-light">
                  Reserve your Landmark Centre entry ticket pass. Instant QR barcode and schedule sync.
                </p>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-3 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
              >
                [ GET FREE PASS ]
              </button>
            </div>

            {/* PARTNER */}
            <div className="p-6 bg-[#002821] border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E]">
                  02 · SPONSORSHIP
                </span>
                <h3 className="text-xl font-display font-black text-white uppercase">
                  PARTNER
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 leading-relaxed font-light">
                  Align your brand with cultural pride, youth education, and record-breaking endurance.
                </p>
              </div>

              <button
                onClick={onOpenPartner}
                className="w-full py-3 bg-[#001410] hover:bg-[#003734] border border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
              >
                [ PARTNER WITH US ]
              </button>
            </div>

            {/* PRESS */}
            <div className="p-6 bg-[#002821] border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#23C48E]">
                  03 · MEDIA
                </span>
                <h3 className="text-xl font-display font-black text-white uppercase">
                  PRESS
                </h3>
                <p className="text-xs text-[#D2FCE3]/80 leading-relaxed font-light">
                  Media accreditation for television broadcasts, press briefings, and international coverage.
                </p>
              </div>

              <button
                onClick={onOpenPress}
                className="w-full py-3 bg-[#001410] hover:bg-[#003734] border border-[#23C48E] text-[#D2FCE3] font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
              >
                [ PRESS ACCESS ]
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CLOSING TRIUMPH & OFFICIAL EMBLEM                          */}
      {/* ============================================================ */}
      <section className="w-full py-16 sm:py-24 text-center bg-[radial-gradient(circle_at_center,rgba(0,55,52,0.6),rgba(0,20,16,1))]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Uploaded official emblem */}
          <div className="flex justify-center pb-2">
            <img
              src="/UGEGBE_X_GWR_Light.png"
              alt="Ugegbe x Guinness World Records"
              className="w-full max-w-xs sm:max-w-sm h-auto object-contain filter drop-shadow-[0_4px_20px_rgba(35,196,142,0.3)]"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
              ONE LANGUAGE. 48 HOURS.
            </h2>
            <p className="text-xl sm:text-3xl font-display font-black uppercase text-[#23C48E]">
              ONE EXTRAORDINARY ATTEMPT.
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#D2FCE3]/80 font-light max-w-lg mx-auto">
            Landmark Centre, Victoria Island, Lagos, Nigeria. 30 October – 1 November 2026. Entry is 100% free.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenRegister}
              className="px-9 py-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_30px_rgba(35,196,142,0.4)] transition-all transform hover:scale-105 active:scale-100 cursor-pointer"
            >
              [ BE THERE · REGISTER FREE ]
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

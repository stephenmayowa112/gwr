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
      {/* SECTION 1: FULL-SCREEN HERO WITH COUNTDOWN                   */}
      {/* ============================================================ */}
      <section 
        id="countdown-section" 
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/IMG_6521.JPG.webp" 
            alt="Event Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001410]/95 via-[#001410]/85 to-[#001410]/95" />
          {/* Additional gradient for better text contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent,rgba(0,20,16,0.8))]" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-8 sm:space-y-12 text-center z-10">
          {/* MASSIVE COUNTDOWN - FIRST AND BIGGEST */}
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <TimezoneCountdown
              targetDateIso="2026-10-30T18:00:00+01:00"
              variant="prominent"
            />
          </div>

          {/* Main Heading - After countdown with animation */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase text-white leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <span className="inline-block animate-in fade-in zoom-in duration-700 delay-500">48 HOURS.</span>
            <br/>
            <span className="inline-block animate-in fade-in zoom-in duration-700 delay-700">ONE LANGUAGE.</span>
            <br/>
            <span className="inline-block animate-in fade-in zoom-in duration-700 delay-900 text-[#23C48E]">ONE RECORD.</span>
          </h1>

          {/* Subheading with glow animation */}
          <p className="text-lg sm:text-2xl md:text-3xl font-mono tracking-wider uppercase text-[#23C48E] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1100">
            LANDMARK, LAGOS · FREE ENTRY
          </p>

          {/* CTA Buttons with animation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1300">
            <button
              onClick={onOpenRegister}
              className="px-12 py-6 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-lg sm:text-xl tracking-wider uppercase rounded-2xl shadow-[0_8px_40px_rgba(35,196,142,0.6)] transition-all transform hover:scale-110 hover:-translate-y-2 cursor-pointer animate-pulse"
            >
              [ REGISTER FREE ]
            </button>
            <button
              onClick={() => {
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 bg-transparent hover:bg-[#003734] border-2 border-[#23C48E] text-[#D2FCE3] font-display font-black text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>[ LEARN MORE ]</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: WHY THIS MATTERS — 3 STAT CARDS                   */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              ONE WOMAN. ONE LANGUAGE. HISTORY.
            </h2>
          </div>

          {/* Three Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 48 Hours */}
            <div className="p-8 sm:p-10 bg-[#003734]/40 border-2 border-[#23C48E]/30 rounded-2xl text-center space-y-3">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-display font-black text-[#23C48E]">
                48
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                Hours of French
              </div>
              <div className="text-sm sm:text-base text-[#D2FCE3]/70 font-light">
                vs the current 26hr record
              </div>
            </div>

            {/* Card 2: 11 Languages */}
            <div className="p-8 sm:p-10 bg-[#003734]/40 border-2 border-[#23C48E]/30 rounded-2xl text-center space-y-3">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-display font-black text-[#23C48E]">
                11
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                Languages spoken
              </div>
              <div className="text-sm sm:text-base text-[#D2FCE3]/70 font-light">
                by Favour Ugegbe
              </div>
            </div>

            {/* Card 3: FREE Entry */}
            <div className="p-8 sm:p-10 bg-[#001410] border-2 border-[#23C48E] rounded-2xl text-center space-y-3 shadow-[0_0_30px_rgba(35,196,142,0.25)]">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[#23C48E]">
                FREE
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                Entry for all
              </div>
              <div className="text-sm sm:text-base text-[#D2FCE3]/70 font-light">
                Landmark, Lagos
              </div>
            </div>
          </div>

          {/* Punchy Paragraph */}
          <div className="max-w-4xl mx-auto pt-8">
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#D2FCE3] font-light leading-relaxed text-center">
              Nigerian polyglot Favour Chisimdi Ugegbe is attempting to shatter the Guinness World Record for the longest French language lesson — going from 26 to 48 hours. This is Lagos putting the world on notice.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: PHOTO GALLERY — MEET FAVOUR                       */}
      {/* ============================================================ */}
      <section 
        id="gallery" 
        className="relative w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/IMG_3319.webp" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001410]/95 via-[#001410]/90 to-[#001410]/95" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 z-10">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#23C48E]/10 border border-[#23C48E]/30 text-xs font-mono uppercase text-[#23C48E] tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>THE WOMAN BEHIND THE RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white">
              MEET FAVOUR
            </h2>
          </div>

          {/* 2x2 Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#23C48E]/40 group">
              <img
                src="/IMG_3314.JPG.webp"
                alt="Favour Ugegbe"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-[#23C48E]/40 group">
              <img
                src="/IMG_3319.webp"
                alt="Favour Ugegbe"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-[#23C48E]/40 group">
              <img
                src="/IMG_6517.webp"
                alt="Favour Ugegbe"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-[#23C48E]/40 group">
              <img
                src="/IMG_6521.JPG.webp"
                alt="Favour Ugegbe"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>

          {/* Bio Card */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="p-8 sm:p-10 bg-[#003734]/50 border border-[#23C48E]/30 rounded-2xl text-center space-y-6">
              <p className="text-lg sm:text-2xl text-[#D2FCE3] font-light leading-relaxed">
                A Nigerian polyglot who speaks 11 languages, Favour is bringing French — and history — to Lagos.
              </p>
              <button
                onClick={onOpenRegister}
                className="px-10 py-4 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-sm uppercase tracking-wider rounded-lg shadow-lg transition-all cursor-pointer"
              >
                [ REGISTER TO ATTEND ]
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: SCHEDULE TIMELINE — THREE DAYS. FOUR MOMENTS.     */}
      {/* ============================================================ */}
      <section 
        id="three-days" 
        className="relative w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/IMG_6517.webp" 
            alt="Background" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001410]/95 via-[#001410]/92 to-[#001410]/95" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 z-10">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              OFFICIAL EVENT SCHEDULE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white">
              THREE DAYS. FOUR MOMENTS.
            </h2>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Moment 1: The Send-Off */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    FRI 30 OCT · 10AM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E]/10 text-[#23C48E] border border-[#23C48E]/25">
                    WAT
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  THE SEND-OFF
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed font-light">
                  Music. Comedy. French. Lagos energy.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/15">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.sendOff)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 2: The Clock Starts */}
            <div className="p-6 sm:p-8 bg-[#003734]/60 border-2 border-[#23C48E]/50 rounded-2xl space-y-4 flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    FRI 30 OCT · 6PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E] text-[#001410] font-black">
                    START
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  THE CLOCK STARTS
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed font-light">
                  48 hours begins.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/25">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.challengeStart)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 3: Hour 26 — Record Reached */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#FF6B1A] tracking-wider">
                    SAT 31 OCT · ~8PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/40 font-bold">
                    RECORD REACHED
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-white uppercase">
                  HOUR 26
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed font-light">
                  The record is within reach.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/15">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.recordFalls)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Moment 4: Hour 48 — Final Bell */}
            <div className="p-6 sm:p-8 bg-[#001410] border-2 border-[#23C48E] rounded-2xl space-y-4 flex flex-col justify-between shadow-[0_0_30px_rgba(35,196,142,0.25)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#23C48E] tracking-wider">
                    SUN 1 NOV · 6PM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23C48E] text-[#001410] font-black">
                    FINAL BELL
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black text-[#23C48E] uppercase">
                  HOUR 48
                </h3>

                <p className="text-base text-[#D2FCE3] leading-relaxed font-light">
                  The final bell. New history.
                </p>
              </div>

              <div className="pt-4 border-t border-[#23C48E]/25">
                <button
                  onClick={() => downloadIcsFile(OFFICIAL_MILESTONES.finalBell)}
                  className="text-xs font-mono text-[#23C48E] hover:text-[#40FFBC] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
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
      {/* SECTION 5: ENGAGEMENT CARDS — BE PART OF IT                  */}
      {/* ============================================================ */}
      <section 
        id="be-part-of-the-story" 
        className="w-full py-20 sm:py-28 lg:py-32 border-b border-[#23C48E]/20 bg-[radial-gradient(circle_at_top,rgba(0,55,52,0.4),rgba(0,20,16,1))]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#23C48E]">
              ENGAGE & PARTICIPATE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white">
              BE PART OF IT.
            </h2>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: ATTEND */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
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

            {/* Card 2: SHARE */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
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
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-mono text-xs uppercase tracking-wider rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 3: PARTNER */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
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

            {/* Card 4: MEDIA */}
            <div className="p-6 sm:p-8 bg-[#003734]/40 border border-[#23C48E]/25 rounded-2xl space-y-4 flex flex-col justify-between">
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: CLOSING CTA                                       */}
      {/* ============================================================ */}
      <section className="w-full py-24 sm:py-32 lg:py-40 text-center bg-[radial-gradient(circle_at_center,rgba(0,55,52,0.6),rgba(0,20,16,1))] relative overflow-hidden">
        {/* Animated Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#23C48E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
          {/* Logo Image */}
          <div className="flex justify-center mb-8">
            <div className="p-8 bg-[#001410]/90 border-2 border-[#23C48E]/60 rounded-3xl backdrop-blur-xl shadow-[0_0_60px_rgba(35,196,142,0.3)]">
              <img 
                src="/UGEGBE X GWR_Light.png" 
                alt="Ugegbe x Guinness World Records" 
                className="h-20 sm:h-28 lg:h-32 w-auto mx-auto"
              />
            </div>
          </div>

          {/* Stacked Headings */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-tight">
              ONE LANGUAGE.
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-[#23C48E] leading-tight">
              48 HOURS.
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-tight">
              ONE EXTRAORDINARY ATTEMPT.
            </h2>
          </div>

          {/* Info Line */}
          <div className="pt-6 space-y-3 font-mono uppercase text-sm sm:text-base md:text-lg text-[#D2FCE3]/90 tracking-wider">
            <p className="font-bold text-white text-lg sm:text-xl">30 OCTOBER – 1 NOVEMBER 2026</p>
            <p className="font-bold text-white text-lg sm:text-xl">LANDMARK, LAGOS</p>
          </div>

          {/* Big CTA Button */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <button
              onClick={onOpenRegister}
              className="px-12 sm:px-16 py-5 sm:py-6 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-display font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-[0_8px_40px_rgba(35,196,142,0.5)] transition-all transform hover:scale-110 hover:-translate-y-2 active:scale-105 active:translate-y-0 cursor-pointer"
            >
              [ BE THERE ]
            </button>
            <p className="text-xs sm:text-sm text-[#D2FCE3]/60 font-mono uppercase tracking-widest">
              Entry is completely free
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

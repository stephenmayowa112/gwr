import React, { useEffect, useState } from 'react';

interface TimezoneCountdownProps {
  targetDateIso?: string; // default: 2026-10-30T18:00:00+01:00
  title?: string;
  variant?: 'hero' | 'compact' | 'live' | 'prominent';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  hasStarted: boolean;
}

export const TimezoneCountdown: React.FC<TimezoneCountdownProps> = ({
  targetDateIso = '2026-10-30T18:00:00+01:00',
  title = 'TIME UNTIL OFFICIAL START (LAGOS WAT)',
  variant = 'hero',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    hasStarted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateIso).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: diff,
          hasStarted: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalMs: diff,
        hasStarted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  if (timeLeft.hasStarted) {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#001410] border border-[#23C48E] text-[#23C48E] rounded-md shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#23C48E] animate-pulse"></span>
        <span className="text-xs uppercase tracking-widest font-semibold font-mono">
          THE MARATHON IS CURRENTLY IN PROGRESS
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm tabular-nums text-[#D2FCE3]">
        <span className="text-[#23C48E] font-semibold">{String(timeLeft.days).padStart(2, '0')}d</span>
        <span>:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className="w-full p-6 sm:p-8 md:p-10 bg-[#001410]/95 border-2 border-[#23C48E] rounded-3xl shadow-[0_0_60px_rgba(35,196,142,0.3)]">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8 md:mb-10 pb-4 border-b border-[#23C48E]/30">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#23C48E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#23C48E]"></span>
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-white">
              OFFICIAL COUNTDOWN · LAGOS, NIGERIA
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
            <span className="text-[#D2FCE3]/60 uppercase tracking-wide">STARTS:</span>
            <span className="text-[#23C48E] font-bold tracking-wide uppercase">
              FRI 30 OCT 2026 · 6:00 PM (WAT)
            </span>
          </div>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* DAYS */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-transparent border-2 border-[#23C48E] rounded-2xl sm:rounded-3xl">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white font-mono tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.2em] text-[#23C48E] uppercase mt-2 sm:mt-3">
              DAYS
            </span>
          </div>

          {/* HOURS */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-transparent border-2 border-[#23C48E] rounded-2xl sm:rounded-3xl">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white font-mono tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.2em] text-[#23C48E] uppercase mt-2 sm:mt-3">
              HOURS
            </span>
          </div>

          {/* MINUTES */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-transparent border-2 border-[#23C48E] rounded-2xl sm:rounded-3xl">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white font-mono tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.2em] text-[#23C48E] uppercase mt-2 sm:mt-3">
              MINS
            </span>
          </div>

          {/* SECONDS (with glow effect) */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-transparent border-2 border-[#23C48E] rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(35,196,142,0.4)]">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#23C48E] font-mono tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.2em] text-[#23C48E] uppercase mt-2 sm:mt-3">
              SECS
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-1 text-xs sm:text-sm tracking-[0.15em] uppercase font-mono text-[#D2FCE3]/80 mb-6">
        <span className="text-[#23C48E] font-bold text-lg sm:text-xl">{title}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-[#003734]/60 border-2 border-[#23C48E]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white font-mono tabular-nums leading-none">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-2 sm:mt-4">
            Days
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-[#003734]/60 border-2 border-[#23C48E]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white font-mono tabular-nums leading-none">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-2 sm:mt-4">
            Hours
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-[#003734]/60 border-2 border-[#23C48E]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white font-mono tabular-nums leading-none">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-2 sm:mt-4">
            Mins
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-[#001410]/80 border-4 border-[#23C48E] backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(35,196,142,0.4)]">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-[#23C48E] font-mono tabular-nums leading-none animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-wider text-[#23C48E] uppercase mt-2 sm:mt-4 font-bold">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

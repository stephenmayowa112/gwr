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
      <div className="w-full">
        {/* Header row with live pulsing indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest text-[#D2FCE3]/90 mb-3 px-1">
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#23C48E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#40FFBC]"></span>
            </span>
            <span className="font-bold text-white tracking-wider">OFFICIAL MARATHON COUNTDOWN</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#23C48E]">
            <span className="text-[#D2FCE3]/50">START:</span>
            <span className="font-bold">FRI 30 OCT · 6:00 PM WAT</span>
          </div>
        </div>

        {/* Big high-voltage countdown boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <div className="relative group flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-[#002B24] border border-[#23C48E]/40 hover:border-[#23C48E] rounded-xl sm:rounded-2xl shadow-[0_4px_24px_rgba(0,20,16,0.6)] transition-all">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono tabular-nums tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#D2FCE3]/70 uppercase mt-1">
              DAYS
            </span>
          </div>

          <div className="relative group flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-[#002B24] border border-[#23C48E]/40 hover:border-[#23C48E] rounded-xl sm:rounded-2xl shadow-[0_4px_24px_rgba(0,20,16,0.6)] transition-all">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono tabular-nums tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#D2FCE3]/70 uppercase mt-1">
              HOURS
            </span>
          </div>

          <div className="relative group flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-[#002B24] border border-[#23C48E]/40 hover:border-[#23C48E] rounded-xl sm:rounded-2xl shadow-[0_4px_24px_rgba(0,20,16,0.6)] transition-all">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono tabular-nums tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#D2FCE3]/70 uppercase mt-1">
              MINS
            </span>
          </div>

          <div className="relative group flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-[#001410] border-2 border-[#23C48E] rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(35,196,142,0.35)] transition-all">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#23C48E] font-mono tabular-nums tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#40FFBC] uppercase mt-1">
              SECS
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-mono text-[#D2FCE3]/80 mb-2">
        <span>{title}</span>
        <span className="text-[#23C48E] font-bold">WAT (UTC+1)</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        <div className="flex flex-col items-center justify-center p-2.5 sm:p-4 bg-[#003734]/50 border border-[#23C48E]/30 backdrop-blur-sm rounded-lg sm:rounded-xl">
          <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-xs font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-0.5 sm:mt-1">
            Days
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-4 bg-[#003734]/50 border border-[#23C48E]/30 backdrop-blur-sm rounded-lg sm:rounded-xl">
          <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-xs font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-0.5 sm:mt-1">
            Hours
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-4 bg-[#003734]/50 border border-[#23C48E]/30 backdrop-blur-sm rounded-lg sm:rounded-xl">
          <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-xs font-mono tracking-wider text-[#D2FCE3]/75 uppercase mt-0.5 sm:mt-1">
            Mins
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-4 bg-[#001410] border-2 border-[#23C48E] backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg">
          <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#23C48E] font-mono tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-xs font-mono tracking-wider text-[#23C48E] uppercase mt-0.5 sm:mt-1 font-bold">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

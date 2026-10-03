import React, { useEffect, useState } from 'react';

interface TimezoneCountdownProps {
  targetDateIso?: string; // default: 2026-10-30T18:00:00+01:00
  title?: string;
  variant?: 'hero' | 'compact' | 'live';
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
      <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-950/80 border border-amber-500/40 text-amber-400 rounded-md">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-xs uppercase tracking-widest font-semibold font-mono">
          THE MARATHON IS CURRENTLY IN PROGRESS
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 font-mono text-sm tabular-nums text-emerald-100">
        <span className="text-amber-400 font-semibold">{String(timeLeft.days).padStart(2, '0')}d</span>
        <span>:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-mono text-emerald-200/80 mb-2">
        <span>{title}</span>
        <span className="text-amber-400/90 font-medium">WAT (UTC+1)</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-sm rounded-lg">
          <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-emerald-300/80 uppercase mt-1">
            Days
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-sm rounded-lg">
          <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-emerald-300/80 uppercase mt-1">
            Hours
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-sm rounded-lg">
          <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-emerald-300/80 uppercase mt-1">
            Mins
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-emerald-950/60 border border-amber-500/40 backdrop-blur-sm rounded-lg">
          <span className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-amber-300/90 uppercase mt-1">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

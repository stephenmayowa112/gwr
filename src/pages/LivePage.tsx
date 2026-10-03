import React, { useEffect, useState } from 'react';
import {
  Play,
  Radio,
  Clock,
  Trophy,
  Flame,
  RefreshCw,
  Pin,
  ExternalLink,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { store } from '../services/store';
import { EventConfig, LiveUpdate } from '../types';
import { TimezoneCountdown } from '../components/common/TimezoneCountdown';
import { EditorialPlaceholder } from '../components/common/EditorialPlaceholder';

interface LivePageProps {
  onNavigate: (path: string) => void;
}

export const LivePage: React.FC<LivePageProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<EventConfig>(store.getEventConfig());
  const [updates, setUpdates] = useState<LiveUpdate[]>(store.getLiveUpdates());
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [cheerCount, setCheerCount] = useState<number>(1420);
  const [hasCheered, setHasCheered] = useState<boolean>(false);

  // Compute live elapsed time synced to WAT official start time
  const [elapsed, setElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    fractionHours: 0,
    isStarted: false,
  });

  // Calculate elapsed time or use admin override
  useEffect(() => {
    const updateElapsed = () => {
      const cfg = store.getEventConfig();
      setConfig(cfg);

      if (cfg.hourOverride !== null && cfg.hourOverride !== undefined) {
        const h = Math.floor(cfg.hourOverride);
        const m = Math.floor((cfg.hourOverride - h) * 60);
        setElapsed({
          hours: h,
          minutes: m,
          seconds: 0,
          fractionHours: cfg.hourOverride,
          isStarted: true,
        });
        return;
      }

      const start = new Date(cfg.officialStartTime).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      if (diff > 0) {
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const fractionHours = hours + minutes / 60 + seconds / 3600;

        setElapsed({
          hours,
          minutes,
          seconds,
          fractionHours,
          isStarted: true,
        });
      } else {
        setElapsed({
          hours: 0,
          minutes: 0,
          seconds: 0,
          fractionHours: 0,
          isStarted: false,
        });
      }
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-refresh updates feed every 30 seconds without full reload (Explicit Requirement)
  useEffect(() => {
    const fetchUpdates = () => {
      const latest = store.getLiveUpdates();
      setUpdates(latest);
      setLastRefreshed(new Date());
    };

    fetchUpdates();
    const pollInterval = setInterval(fetchUpdates, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const handleSendCheer = () => {
    if (!hasCheered) {
      setCheerCount((c) => c + 1);
      setHasCheered(true);
    }
  };

  // Convert YouTube standard URL to embed URL
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('embed/')) return url;
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0`;
      }
      return url;
    } catch {
      return url;
    }
  };

  // 1. POST-EVENT RESULTS STATE
  if (config.status === 'completed' || config.status === 'attempt-ended') {
    return (
      <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Victory Banner */}
          <div className="bg-[#022C22] text-white p-8 sm:p-12 rounded-2xl border-2 border-amber-400 shadow-2xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40">
              <Trophy className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                OFFICIAL RECORD ATTEMPT CONCLUDED
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
                SHE DID IT.
              </h1>
              <p className="text-xl sm:text-2xl font-light text-emerald-200 max-w-2xl mx-auto">
                {config.resultOutcome || 'Guinness World Record Achieved: 48 Hours Completed!'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-800 text-left">
              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                  Total Duration
                </span>
                <span className="text-2xl font-display font-black text-amber-400">48h 00m</span>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                  Prior Record
                </span>
                <span className="text-2xl font-display font-black text-white">26h 00m</span>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                  Record Extended By
                </span>
                <span className="text-2xl font-display font-black text-amber-400">+22 Hours</span>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                  Languages Spoken
                </span>
                <span className="text-2xl font-display font-black text-white">11</span>
              </div>
            </div>
          </div>

          {/* Certificate & Highlights Gallery Placeholder */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
              OFFICIAL VERIFICATION & HIGHLIGHTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditorialPlaceholder
                label="Official GWR Certificate Presentation"
                subtext="TODO: Official Guinness World Records presentation ceremony photo to be uploaded post-adjudication"
                aspectRatio="4:3"
              />
              <EditorialPlaceholder
                label="The Final Bell at Landmark Lagos"
                subtext="TODO: Victory celebration at Landmark auditorium with students and witnesses"
                aspectRatio="4:3"
              />
            </div>
          </div>

          {/* Replay Stream */}
          {config.youtubeUrl && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-display font-bold text-slate-900 uppercase">
                Watch Full Marathon Archive Recording
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900">
                <iframe
                  src={getEmbedUrl(config.youtubeUrl)}
                  title="Marathon Livestream Replay"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. PRE-EVENT COUNTDOWN STATE (When status === 'upcoming' or not yet started)
  if (config.status === 'upcoming') {
    return (
      <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded text-xs font-mono font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>OFFICIAL BROADCAST PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-emerald-950 uppercase tracking-tight">
              THE MARATHON CLOCK STARTS FRIDAY 30 OCT
            </h1>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              Continuous live stream coverage from Landmark Lagos will broadcast globally right here throughout all 48 hours.
            </p>
          </div>

          {/* Large Countdown synced to Africa/Lagos WAT */}
          <div className="bg-[#022C22] p-8 sm:p-12 rounded-2xl border border-emerald-800 text-white flex flex-col items-center justify-center shadow-xl">
            <TimezoneCountdown
              targetDateIso={config.officialStartTime}
              title="TIME UNTIL OFFICIAL COMMENCEMENT (LAGOS WAT)"
            />

            <div className="mt-8 pt-6 border-t border-emerald-800/80 text-center space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                Friday 30 October 2026 at 18:00 WAT Prompt
              </p>
              <div className="flex justify-center gap-4 text-xs font-mono text-amber-400">
                <span>Landmark Centre, Victoria Island, Lagos</span>
                <span>·</span>
                <span>Entry is Free</span>
              </div>
            </div>
          </div>

          {/* Broadcast Stage Preview Placeholder */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
              BROADCAST STAGE PREPARATION
            </h2>
            <EditorialPlaceholder
              label="Landmark Lagos Auditorium & Broadcast Control"
              subtext="TODO: Live stage cameras, continuous GWR timecode monitors, and lectern setup preview"
              aspectRatio="16:9"
            />
          </div>

          {/* Latest Pre-Event Updates */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                LATEST MARATHON UPDATES
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Auto-refreshes every 30s
              </span>
            </div>

            <div className="space-y-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`p-4 rounded-xl border ${
                    update.isPinned
                      ? 'bg-amber-50/60 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
                    <span className="font-bold text-emerald-900 uppercase">
                      {update.isPinned ? '📌 PINNED ANNOUNCEMENT' : 'MARATHON DISPATCH'}
                    </span>
                    <span>
                      {new Date(update.createdAt).toLocaleTimeString('en-GB', {
                        timeZone: 'Africa/Lagos',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WAT
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-1">
                    {update.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{update.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. LIVE EVENT ACTIVE STATE (When status === 'live')
  const currentHours = Math.min(48, Math.max(0, elapsed.fractionHours));
  const recordPct = Math.min(100, (currentHours / 26) * 100);
  const targetPct = Math.min(100, (currentHours / 48) * 100);
  const hasBrokenRecord = currentHours >= 26;

  return (
    <div className="w-full bg-[#FAF8F5] py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Live Banner & Running Hour Counter */}
        <div className="bg-[#022C22] text-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-700/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800 pb-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-600 text-white font-mono text-xs font-bold tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                LIVE NOW
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                LANDMARK LAGOS · CONTINUOUS BROADCAST
              </span>
            </div>

            {/* Audience Cheer Button */}
            <button
              onClick={handleSendCheer}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                hasCheered
                  ? 'bg-amber-500 text-emerald-950 font-black'
                  : 'bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-emerald-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasCheered ? 'fill-emerald-950' : 'text-amber-400'}`} />
              <span>{hasCheered ? 'Cheer Sent!' : 'Send Cheer to Favour'}</span>
              <span className="ml-1 opacity-80">({cheerCount.toLocaleString()})</span>
            </button>
          </div>

          {/* Running Hour Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                OFFICIAL RUNNING TIME (WAT)
              </span>
              <div className="text-4xl sm:text-6xl font-display font-black text-white font-mono tabular-nums tracking-tight">
                {String(elapsed.hours).padStart(2, '0')} : {String(elapsed.minutes).padStart(2, '0')} : {String(elapsed.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs font-mono text-emerald-200">
                CURRENT STAGE: <span className="font-bold text-amber-400">HOUR {Math.floor(currentHours) + 1} OF 48</span>
              </div>
            </div>

            {/* Dual Milestone Bars */}
            <div className="md:col-span-6 space-y-4 bg-emerald-950/70 p-4 sm:p-5 rounded-xl border border-emerald-800/80">
              {/* Milestone 1: Hour 26 (Current Record) */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-200">
                    Milestone 1: Current Record (26 Hours)
                  </span>
                  <span className={`font-bold ${hasBrokenRecord ? 'text-amber-400' : 'text-white'}`}>
                    {hasBrokenRecord ? 'RECORD BROKEN! ✓' : `${recordPct.toFixed(1)}%`}
                  </span>
                </div>
                <div className="w-full h-3.5 bg-emerald-900 rounded-full overflow-hidden p-0.5 border border-emerald-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      hasBrokenRecord ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${recordPct}%` }}
                  />
                </div>
              </div>

              {/* Milestone 2: Hour 48 (Target Record) */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-amber-300 font-semibold">
                    Milestone 2: 48-Hour Target World Record
                  </span>
                  <span className="font-bold text-amber-400 font-mono">
                    {targetPct.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3.5 bg-emerald-900 rounded-full overflow-hidden p-0.5 border border-amber-500/40">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${targetPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player & Live Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Livestream Player */}
          <div className="lg:col-span-8 space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-300 relative">
              {config.youtubeUrl ? (
                <iframe
                  src={getEmbedUrl(config.youtubeUrl)}
                  title="Favour Ugegbe 48-Hour French Marathon Livestream"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                  <Play className="w-12 h-12 text-amber-400" />
                  <span className="font-display font-bold text-lg uppercase">
                    Direct Broadcast Stream Connecting...
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Official video feed from Landmark Centre Victoria Island
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-slate-900 uppercase">
                  Favour Ugegbe's 48-Hour French Language Marathon
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Official Guinness World Records Attempt · Landmark, Lagos, Nigeria
                </p>
              </div>

              <button
                onClick={() => onNavigate('/register')}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-mono font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
              >
                Register Free Pass
              </button>
            </div>
          </div>

          {/* Live Updates Feed (Auto-refreshes every 30 seconds without full reload) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-full max-h-[640px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <h3 className="font-display font-bold text-slate-900 uppercase text-sm">
                  Live Dispatch Feed
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>30s auto-refresh</span>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                    update.isPinned
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span className="font-bold text-emerald-900 uppercase">
                      {update.isPinned ? '📌 PINNED' : update.milestoneHour ? `HOUR ${update.milestoneHour}` : 'DISPATCH'}
                    </span>
                    <span>
                      {new Date(update.createdAt).toLocaleTimeString('en-GB', {
                        timeZone: 'Africa/Lagos',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-0.5">{update.title}</h4>
                  <p className="text-slate-700">{update.message}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 mt-3 text-center">
              <button
                onClick={() => onNavigate('/share')}
                className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 hover:text-amber-600 font-semibold"
              >
                Share live updates with #UgegbeGWR →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

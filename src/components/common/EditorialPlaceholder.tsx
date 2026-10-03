import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface EditorialPlaceholderProps {
  label: string;
  subtext?: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  className?: string;
}

export const EditorialPlaceholder: React.FC<EditorialPlaceholderProps> = ({
  label,
  subtext = 'TODO: High-resolution official photo to be supplied prior to event',
  aspectRatio = '16:9',
  className = '',
}) => {
  const aspectClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-[#03261D] to-[#011711] border border-emerald-800/40 p-6 flex flex-col justify-between text-white ${className}`}
    >
      {/* Background Graphic Lines (Nigerian subtle motif) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#D97706" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-[11px] font-mono tracking-wider text-amber-400 uppercase">
          <span>TODO: PHOTO ASSET</span>
        </div>
        <Camera className="w-4 h-4 text-emerald-400/60" />
      </div>

      {/* Center Label & Details */}
      <div className="relative z-10 my-auto text-center py-4">
        <div className="inline-flex p-3 rounded-full bg-emerald-900/60 border border-emerald-700/50 mb-3 text-amber-400">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h4 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight text-white mb-1.5">
          {label}
        </h4>
        <p className="text-xs text-emerald-300/80 font-mono max-w-sm mx-auto leading-relaxed">
          {subtext}
        </p>
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-emerald-400/70 border-t border-emerald-900/50 pt-3">
        <span>ASPECT: {aspectRatio}</span>
        <span>LANDMARK LAGOS · GWR 2026</span>
      </div>
    </div>
  );
};

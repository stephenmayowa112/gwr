import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#022C22] border-t border-emerald-900/60 text-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase text-white">
          STAY CONNECTED
        </h2>

        <div className="space-y-2 text-base sm:text-lg text-emerald-100 font-normal">
          <p>
            Follow the journey: <strong className="text-amber-400 font-bold">@UGEGBEGWR</strong>
          </p>
          <p className="text-xs sm:text-sm font-mono text-emerald-200/90 tracking-wide">
            Instagram · X · TikTok · YouTube
          </p>
        </div>

        <div className="pt-2">
          <a
            href="mailto:info@ugegbegwr.com"
            className="text-sm sm:text-base font-mono text-emerald-300 hover:text-amber-400 underline transition-colors"
          >
            info@ugegbegwr.com
          </a>
        </div>

        <div className="pt-2 text-xs sm:text-sm font-mono text-emerald-300/80 tracking-wide">
          #UgegbeGWR · #FavourUgegbe · #FrenchLanguageMarathon
        </div>

        <div className="pt-8 border-t border-emerald-900/60 text-xs font-mono text-emerald-400/60">
          © 2026 Ugegbe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

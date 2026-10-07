import React from 'react';
import { UgegbeBrandLogo } from '../common/UgegbeBrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#001410] border-t border-[#23C48E]/20 text-[#D2FCE3] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Official Brand Logo Mark */}
        <div className="flex justify-center pb-2">
          <UgegbeBrandLogo variant="gwr-light" size="xl" withGwrBadge={true} showTagline={true} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase text-white">
          STAY CONNECTED
        </h2>

        <div className="space-y-2 text-base sm:text-lg text-[#D2FCE3] font-normal">
          <p>
            Follow the journey: <strong className="text-[#23C48E] font-bold">@UGEGBEGWR</strong>
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#D2FCE3]/80 tracking-wide">
            Instagram · X · TikTok · YouTube
          </p>
        </div>

        <div className="pt-1">
          <a
            href="mailto:info@ugegbegwr.com"
            className="text-sm sm:text-base font-mono text-[#23C48E] hover:text-[#40FFBC] underline transition-colors"
          >
            info@ugegbegwr.com
          </a>
        </div>

        <div className="pt-2 text-xs sm:text-sm font-mono text-[#D2FCE3]/75 tracking-wide">
          #UgegbeGWR · #FavourNwobodo · #FrenchLanguageMarathon
        </div>

        <div className="pt-8 border-t border-[#23C48E]/20 text-xs font-mono text-[#D2FCE3]/50">
          © 2026 Ugegbe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

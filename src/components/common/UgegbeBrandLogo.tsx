import React, { useState } from 'react';

export interface UgegbeBrandLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  withGwrBadge?: boolean;
  variant?: string;
}

export const UgegbeBrandLogo: React.FC<UgegbeBrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  // Height classes matching responsive layout requirements
  const heights = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-32',
  }[size];

  // Candidates for the uploaded logo file (SVG and PNG formats supported)
  const sources = showTagline
    ? [
        '/ugegbe-logo.png',
        '/ugegbe-logo.svg',
        '/logo.png',
        '/logo.svg',
        '/brand-logo.png',
        '/brand-logo.svg',
      ]
    : [
        '/ugegbe-logo-compact.png',
        '/ugegbe-logo-compact.svg',
        '/ugegbe-logo.png',
        '/ugegbe-logo.svg',
        '/logo.svg',
        '/logo.png',
      ];

  const [srcIndex, setSrcIndex] = useState(0);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={sources[srcIndex]}
        alt="Ugegbe - SEE BEYOND WORDS."
        onError={handleError}
        className={`${heights} w-auto max-w-full object-contain`}
        loading="eager"
      />
    </div>
  );
};

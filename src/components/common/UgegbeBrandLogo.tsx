import React from 'react';

export interface UgegbeBrandLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
    md: 'h-11 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-28',
    '2xl': 'h-24 sm:h-36 md:h-44',
  }[size];

  // Directly load the uploaded logo image files
  const logoSrc = showTagline
    ? '/UGEGBE_X_GWR_Light.png'
    : '/UGEGBE_X_GWR_Light_Compact.png';

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Ugegbe x Guinness World Records - SEE BEYOND WORDS."
        className={`${heights} w-auto max-w-full object-contain filter drop-shadow-[0_2px_12px_rgba(35,196,142,0.25)]`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
};

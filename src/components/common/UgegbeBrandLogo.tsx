import React from 'react';

export type UgegbeLogoVariant =
  | 'gwr-white'
  | 'gwr-light'
  | 'gwr-dark'
  | 'gwr-black'
  | 'light'
  | 'dark'
  | 'black';

export interface UgegbeBrandLogoProps {
  className?: string;
  variant?: UgegbeLogoVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  withGwrBadge?: boolean;
}

export const UgegbeBrandLogo: React.FC<UgegbeBrandLogoProps> = ({
  className = '',
  variant = 'gwr-white',
  size = 'md',
  showTagline = true,
  withGwrBadge = false,
}) => {
  const isGwr = variant.startsWith('gwr-') || withGwrBadge;

  // Heights matching responsive standards
  const heights = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-28',
  }[size];

  // Letter color splits based on official uploaded logo files:
  // - gwr-light & light: first half (u, ç, e) is Energetic Teal (#23C48E), second half (g, b, e) is Mint Mist (#D2FCE3)
  // - gwr-white: all white
  // - gwr-dark & dark: Midnight Forest (#001410)
  // - gwr-black & black: Black (#000000)
  const isTealSplit = variant === 'gwr-light' || variant === 'light';
  const isDark = variant === 'gwr-dark' || variant === 'dark';
  const isBlack = variant === 'gwr-black' || variant === 'black';

  const primaryStroke = isTealSplit
    ? '#23C48E'
    : isDark
    ? '#001410'
    : isBlack
    ? '#000000'
    : '#FFFFFF';

  const secondaryStroke = isTealSplit
    ? '#D2FCE3'
    : isDark
    ? '#001410'
    : isBlack
    ? '#000000'
    : '#FFFFFF';

  const taglineColor = isDark
    ? '#001410'
    : isBlack
    ? '#000000'
    : isTealSplit
    ? '#D2FCE3'
    : '#FFFFFF';
  const eyeDotColor = isTealSplit ? '#D2FCE3' : primaryStroke;

  // If tagline is hidden, use tighter viewBox (height 152 instead of 180) to eliminate bottom blank space
  const viewBox = showTagline ? '0 0 460 180' : '0 0 460 152';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        className={`${heights} w-auto max-w-full`}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ugegbe - SEE BEYOND WORDS."
      >
        {/* Definition for GWR Circular Seal Gradient and Clip */}
        <defs>
          <clipPath id={`gwr-clip-${variant}`}>
            <circle cx="340" cy="80" r="34" />
          </clipPath>
        </defs>

        {/* -------------------------------------------------- */}
        {/* FIRST LETTER: 'u' with inner eye dot              */}
        {/* -------------------------------------------------- */}
        <g stroke={primaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 12 36 L 12 85 C 12 110, 68 110, 68 85 L 68 36" />
        </g>
        {/* Eye Dot inside 'u' ("Seeing Beyond") */}
        <circle cx="38" cy="62" r="8" fill={eyeDotColor} />

        {/* -------------------------------------------------- */}
        {/* SECOND LETTER: 'ç' / 'g' with descending wavy tail */}
        {/* -------------------------------------------------- */}
        <g stroke={primaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Main rounded loop of 'ç' */}
          <path d="M 136 32 C 100 20, 78 50, 78 85 C 78 120, 102 122, 134 116" />
          {/* Descender spur / tail that swoops downwards */}
          <path d="M 130 32 L 138 38" />
          <path d="M 132 115 C 142 122, 146 134, 146 150" />
        </g>

        {/* -------------------------------------------------- */}
        {/* THIRD LETTER: 'e' intersecting loop                */}
        {/* -------------------------------------------------- */}
        <g stroke={primaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="178" cy="80" r="36" />
          <path d="M 148 100 L 210 56" />
        </g>

        {/* -------------------------------------------------- */}
        {/* FOURTH LETTER: 'g' / 'q' mirroring framing tail    */}
        {/* -------------------------------------------------- */}
        <g stroke={secondaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="254" cy="80" r="36" />
          {/* Top-right spur */}
          <path d="M 280 48 L 290 38" />
          {/* Bottom framing curve that swoops downwards */}
          <path d="M 226 100 C 255 125, 290 125, 290 148" />
        </g>

        {/* -------------------------------------------------- */}
        {/* FIFTH LETTER: 'b' with tall ascender               */}
        {/* -------------------------------------------------- */}
        <g stroke={secondaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tall vertical ascender */}
          <path d="M 304 4 L 304 125" />
          {/* Large circular bowl */}
          <circle cx="340" cy="80" r="36" />
        </g>

        {/* INSIDE 'b': GWR Official Seal OR Minimalist Dot */}
        {isGwr ? (
          <g transform="translate(0, 0)">
            {/* Outer GWR Navy Blue Circle */}
            <circle cx="340" cy="80" r="34" fill="#00486D" stroke="#FFFFFF" strokeWidth="2" />
            
            {/* Inner Ring with Decorative Dashes */}
            <circle cx="340" cy="80" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />

            {/* Curved White Text: "GUINNESS WORLD RECORDS" */}
            <path id={`gwr-text-path-top-${variant}`} d="M 314 80 A 26 26 0 0 1 366 80" fill="none" />
            <path id={`gwr-text-path-bot-${variant}`} d="M 366 80 A 26 26 0 0 1 314 80" fill="none" />
            
            <text fill="#FFFFFF" fontSize="6.5" fontWeight="bold" letterSpacing="0.8" textAnchor="middle">
              <textPath href={`#gwr-text-path-top-${variant}`} startOffset="50%">
                GUINNESS
              </textPath>
            </text>

            <text fill="#FFFFFF" fontSize="5.5" fontWeight="bold" letterSpacing="0.6" textAnchor="middle">
              <textPath href={`#gwr-text-path-bot-${variant}`} startOffset="50%">
                WORLD RECORDS
              </textPath>
            </text>

            {/* Central Gold Star */}
            <polygon
              points="340,66 342,72 348,72 343,76 345,82 340,78 335,82 337,76 332,72 338,72"
              fill="#F5B800"
            />

            {/* Classical Harp Pedestal & Pillar */}
            <rect x="328" y="83" width="24" height="2.5" fill="#FFFFFF" rx="1" />
            <rect x="331" y="87" width="18" height="1.5" fill="#FFFFFF" rx="0.5" />
            
            {/* Harp Strings */}
            <line x1="334" y1="89" x2="334" y2="97" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="337" y1="89" x2="337" y2="97" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="340" y1="89" x2="340" y2="97" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="343" y1="89" x2="343" y2="97" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="346" y1="89" x2="346" y2="97" stroke="#FFFFFF" strokeWidth="1.2" />
            
            {/* Bottom Harp Base */}
            <rect x="330" y="97" width="20" height="2" fill="#FFFFFF" rx="0.5" />
          </g>
        ) : (
          /* Standard Ugegbe Logo Dot inside 'b' */
          <circle cx="340" cy="80" r="18" fill={secondaryStroke} />
        )}

        {/* -------------------------------------------------- */}
        {/* SIXTH LETTER: 'e' terminal loop                    */}
        {/* -------------------------------------------------- */}
        <g stroke={secondaryStroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="420" cy="80" r="36" />
          <path d="M 384 80 L 456 80" />
        </g>

        {/* -------------------------------------------------- */}
        {/* MANDATORY TAGLINE: "SEE BEYOND WORDS."            */}
        {/* -------------------------------------------------- */}
        {showTagline && (
          <text
            x="230"
            y="172"
            textAnchor="middle"
            fill={taglineColor}
            fontSize="18"
            fontWeight="700"
            fontFamily="'Outfit', sans-serif"
            letterSpacing="6.5"
          >
            SEE BEYOND WORDS.
          </text>
        )}
      </svg>
    </div>
  );
};

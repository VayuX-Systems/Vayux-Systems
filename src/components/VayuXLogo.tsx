import React from 'react';

interface VayuXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  variant?: 'color' | 'monochrome' | 'inverted';
  className?: string;
  glow?: boolean;
}

export const VayuXLogo: React.FC<VayuXLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'color',
  className = '',
  glow = true,
}) => {
  // Resolve dimension in pixels
  let dimension = 32;
  let textClass = 'text-xl';

  if (typeof size === 'number') {
    dimension = size;
    textClass = size > 40 ? 'text-2xl' : size < 24 ? 'text-sm' : 'text-lg';
  } else {
    switch (size) {
      case 'sm':
        dimension = 24;
        textClass = 'text-base';
        break;
      case 'md':
        dimension = 32;
        textClass = 'text-xl';
        break;
      case 'lg':
        dimension = 44;
        textClass = 'text-2xl';
        break;
      case 'xl':
        dimension = 64;
        textClass = 'text-4xl';
        break;
    }
  }

  const isMonochrome = variant === 'monochrome';
  const isInverted = variant === 'inverted';

  // Palette definitions:
  // Obsidian Black: #010203
  // Platinum Silver: #DCDCDF
  // Gunmetal Gray: #5B5C5F
  // Electric Blue: #328FDF
  // Pure White: #FFFFFF

  const platinumColor = isMonochrome ? '#FFFFFF' : isInverted ? '#010203' : '#DCDCDF';
  const gunmetalColor = isMonochrome ? '#A0A0A0' : isInverted ? '#5B5C5F' : '#5B5C5F';
  const electricBlue = isMonochrome ? '#FFFFFF' : isInverted ? '#010203' : '#328FDF';
  const pureWhite = '#FFFFFF';

  const filterId = `eagleGlow-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Engineered Eagle Emblem */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: dimension, height: dimension }}
      >
        <svg
          viewBox="0 0 100 100"
          width={dimension}
          height={dimension}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Platinum Metallic Gradient */}
            <linearGradient id={`platGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor={platinumColor} />
              <stop offset="70%" stopColor="#B8B8BE" />
              <stop offset="100%" stopColor={gunmetalColor} />
            </linearGradient>

            {/* Gunmetal Shadow Depth Gradient */}
            <linearGradient id={`gunmetalGrad-${filterId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gunmetalColor} />
              <stop offset="100%" stopColor="#2A2B2D" />
            </linearGradient>

            {/* Electric Blue Glow Gradient */}
            <linearGradient id={`blueGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67B6FF" />
              <stop offset="100%" stopColor={electricBlue} />
            </linearGradient>

            {/* Neon Glow Filter */}
            {glow && !isMonochrome && (
              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            )}
          </defs>

          {/* Background Outer Shield / Circuit Hexagon Aura */}
          <polygon
            points="50,4 88,24 88,72 50,96 12,72 12,24"
            stroke={gunmetalColor}
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="#010203"
            fillOpacity="0.8"
          />

          {/* Electric Blue Circuit Grid lines in Shield */}
          {!isMonochrome && (
            <>
              <path
                d="M 50,4 L 50,22 M 12,24 L 28,33 M 88,24 L 72,33 M 12,72 L 30,62 M 88,72 L 70,62 M 50,96 L 50,82"
                stroke={electricBlue}
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <circle cx="50" cy="22" r="1.5" fill={electricBlue} />
              <circle cx="28" cy="33" r="1.5" fill={electricBlue} />
              <circle cx="72" cy="33" r="1.5" fill={electricBlue} />
            </>
          )}

          {/* Eagle Left Wing - Layer 1 (Outer - Gunmetal Shadow) */}
          <path
            d="M 50,28 L 18,36 L 24,56 L 36,52 L 28,68 L 44,60 L 50,78 Z"
            fill={`url(#gunmetalGrad-${filterId})`}
          />

          {/* Eagle Right Wing - Layer 1 (Outer - Gunmetal Shadow) */}
          <path
            d="M 50,28 L 82,36 L 76,56 L 64,52 L 72,68 L 56,60 L 50,78 Z"
            fill={`url(#gunmetalGrad-${filterId})`}
          />

          {/* Eagle Left Wing - Layer 2 (Metallic Platinum Facet) */}
          <path
            d="M 50,28 L 22,38 L 30,52 L 40,48 L 34,62 L 46,55 L 50,70 Z"
            fill={`url(#platGrad-${filterId})`}
          />

          {/* Eagle Right Wing - Layer 2 (Metallic Platinum Facet) */}
          <path
            d="M 50,28 L 78,38 L 70,52 L 60,48 L 66,62 L 54,55 L 50,70 Z"
            fill={`url(#platGrad-${filterId})`}
          />

          {/* Eagle Head & Beak Profile (Platinum Silver Crown & Sharp Beak) */}
          <path
            d="M 50,18 L 56,26 L 62,32 L 54,34 L 50,42 L 46,34 L 38,32 L 44,26 Z"
            fill={pureWhite}
          />
          <path
            d="M 50,22 L 55,27 L 50,38 L 45,27 Z"
            fill={`url(#platGrad-${filterId})`}
          />

          {/* Eagle Cyber Eye: Electric Blue (#328FDF) with Glow */}
          <circle
            cx="46"
            cy="27"
            r="2.8"
            fill={electricBlue}
            filter={glow && !isMonochrome ? `url(#${filterId})` : undefined}
          />
          <circle
            cx="54"
            cy="27"
            r="2.8"
            fill={electricBlue}
            filter={glow && !isMonochrome ? `url(#${filterId})` : undefined}
          />
          <circle cx="46" cy="27" r="1.1" fill={pureWhite} />
          <circle cx="54" cy="27" r="1.1" fill={pureWhite} />

          {/* Center Chest: Electric Blue 'X' Node Circuit */}
          <path
            d="M 44,50 L 56,64 M 56,50 L 44,64"
            stroke={electricBlue}
            strokeWidth="2.2"
            strokeLinecap="round"
            filter={glow && !isMonochrome ? `url(#${filterId})` : undefined}
          />

          {/* Bottom Cyber Tail Apex */}
          <polygon
            points="50,74 44,88 50,84 56,88"
            fill={platinumColor}
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <span className={`font-bold tracking-tight ${textClass} flex items-center`}>
          <span style={{ color: platinumColor }} className="font-semibold">
            Vayu
          </span>
          <span
            style={{ color: electricBlue }}
            className={`font-black ml-0.5 ${
              glow && !isMonochrome ? 'drop-shadow-[0_0_8px_rgba(50,143,223,0.6)]' : ''
            }`}
          >
            X
          </span>
        </span>
      )}
    </div>
  );
};

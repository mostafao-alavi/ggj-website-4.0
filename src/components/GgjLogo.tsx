/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface GgjLogoProps {
  className?: string;
}

export default function GgjLogo({ className = "w-10 h-10" }: GgjLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue Earth Globe with subtle gradient */}
      <defs>
        <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#5cc8f2" />
          <stop offset="100%" stopColor="#41b6e6" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="34" fill="url(#globeGradient)" />
      
      {/* Detailed Continents (recognizable GGJ style) */}
      <path 
        d="M34 36c-1 3 2 9 6 10 5 1 8-2 9-6s-1-9-5-10-8 3-10 6zM68 44c0 4-3 8-7 8s-7-4-7-8 3-8 7-8 7 4 7 8zM46 68c-2 3-6 3-9 1s-4-6-2-9 6-3 9-1 4 6 2 9z" 
        fill="white" 
        fillOpacity="0.85" 
      />
      
      {/* Tilted Yellow Orbital Ring (The signature GGJ loop) */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M50 18c-22 0-40 14-40 32s18 32 40 32 40-14 40-32-18-32-40-32zm0 8c18 0 32 11 32 24s-14 24-32 24-32-11-32-24 14-24 32-24z" 
        fill="#ffd100" 
      />
      
      {/* Inner Ring Detail for depth */}
      <path 
        d="M18 50c0-10 14-24 32-24s32 14 32 24-14 24-32 24-32-14-32-24z" 
        stroke="#eab308" 
        strokeWidth="0.5" 
        strokeOpacity="0.3"
      />
    </svg>
  );
}

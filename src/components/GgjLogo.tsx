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
      {/* Blue Earth Globe (no strokes) */}
      <circle cx="50" cy="50" r="32" fill="#41b6e6" />
      
      {/* Styled continents (white/light-cyan, strictly no stroke) */}
      <path 
        d="M32 38C32 38 35 32 40 33C45 34 44 39 47 41C50 43 54 39 57 41C60 43 61 49 58 52C55 55 50 53 46 56C42 59 44 64 38 64C32 64 26 57 24 53C22 49 32 38 32 38Z" 
        fill="#f8fafc" 
        opacity="0.9" 
      />
      <path 
        d="M58 28C61 25 66 27 69 31C72 35 74 41 71 44C68 47 65 44 63 41C61 38 55 31 58 28Z" 
        fill="#f8fafc" 
        opacity="0.9" 
      />
      <path 
        d="M62 55C65 53 68 56 65 59C62 62 59 59 62 55Z" 
        fill="#f8fafc" 
        opacity="0.9" 
      />
      
      {/* Yellow ribbon orbiting the globe (Pantone 108 C style loop, strictly no stroke) */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M16 52C16 41 24 24 50 24C74 24 84 38 84 48C84 59 74 76 50 76C24 76 16 61 16 52ZM24 52C24 58 32 68 50 68C68 68 76 58 76 52C76 46 68 32 50 32C32 32 24 46 24 52Z" 
        fill="#ffd100" 
      />
    </svg>
  );
}

export default function AutoRickshawIcon({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="100" rx="35" ry="5" fill="#0F2920" opacity="0.15" />

      {/* Body */}
      <path
        d="M20 40 C20 32 28 28 36 28 L90 28 C96 28 100 32 100 40 L100 75 C100 78 97 80 94 80 L26 80 C23 80 20 78 20 75 Z"
        fill="url(#bodyGradient)"
      />

      {/* Roof */}
      <path
        d="M28 28 Q60 6 92 28"
        fill="#2D6A4F"
        stroke="#1B4332"
        strokeWidth="1.5"
      />
      <path
        d="M32 28 Q60 12 88 28"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Windshield */}
      <rect x="28" y="36" width="32" height="24" rx="5" fill="url(#glassGradient)" />
      {/* Windshield reflection */}
      <path d="M30 38 L38 36 L38 42 Z" fill="white" opacity="0.4" />

      {/* Passenger window */}
      <rect x="68" y="36" width="24" height="24" rx="5" fill="url(#glassGradient)" opacity="0.8" />
      {/* Window reflection */}
      <path d="M70 38 L76 36 L76 42 Z" fill="white" opacity="0.3" />

      {/* Door line */}
      <line x1="64" y1="34" x2="64" y2="76" stroke="#0F2920" strokeWidth="1.5" strokeLinecap="round" />

      {/* Headlight */}
      <ellipse cx="24" cy="58" rx="5" ry="6" fill="url(#headlightGradient)" />
      <ellipse cx="24" cy="58" rx="3" ry="3.5" fill="#FCD34D" />
      {/* Headlight glow */}
      <ellipse cx="24" cy="58" rx="8" ry="9" fill="#F59E0B" opacity="0.15" />

      {/* Tail light */}
      <rect x="97" y="52" width="4" height="8" rx="2" fill="#EF4444" opacity="0.8" />

      {/* Side stripe */}
      <rect x="28" y="64" width="64" height="3.5" rx="1.75" fill="#F59E0B" opacity="0.85" />

      {/* Bumper */}
      <rect x="22" y="76" width="76" height="4" rx="2" fill="#374151" />

      {/* Front wheel */}
      <circle cx="38" cy="84" r="11" fill="#1F2937" />
      <circle cx="38" cy="84" r="8" fill="#374151" />
      <circle cx="38" cy="84" r="5" fill="#4B5563" />
      <circle cx="38" cy="84" r="2" fill="#1F2937" />
      {/* Wheel spoke lines */}
      <line x1="38" y1="76" x2="38" y2="92" stroke="#374151" strokeWidth="1" />
      <line x1="30" y1="84" x2="46" y2="84" stroke="#374151" strokeWidth="1" />

      {/* Rear wheel */}
      <circle cx="85" cy="84" r="11" fill="#1F2937" />
      <circle cx="85" cy="84" r="8" fill="#374151" />
      <circle cx="85" cy="84" r="5" fill="#4B5563" />
      <circle cx="85" cy="84" r="2" fill="#1F2937" />
      <line x1="85" y1="76" x2="85" y2="92" stroke="#374151" strokeWidth="1" />
      <line x1="77" y1="84" x2="93" y2="84" stroke="#374151" strokeWidth="1" />

      {/* Exhaust */}
      <rect x="96" y="72" width="10" height="3" rx="1.5" fill="#6B7280" />
      {/* Exhaust smoke */}
      <circle cx="110" cy="70" r="2" fill="#9CA3AF" opacity="0.3" />
      <circle cx="114" cy="68" r="1.5" fill="#9CA3AF" opacity="0.2" />

      {/* Handle bar */}
      <path d="M20 42 L12 34" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
      <circle cx="11" cy="32" r="3.5" fill="#6B7280" />
      <circle cx="11" cy="32" r="2" fill="#4B5563" />

      {/* Number plate */}
      <rect x="42" y="77" width="22" height="5" rx="2" fill="white" />
      <text x="53" y="81.5" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#1B4332" fontFamily="sans-serif">
        TamTam
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="bodyGradient" x1="20" y1="28" x2="100" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </linearGradient>
        <radialGradient id="headlightGradient">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
    </svg>
  );
}

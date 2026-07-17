/**
 * BM Monogram Logo — unique geometric mark for Bright Moyo.
 * The "B" is formed by two stacked geometric blocks with a crimson accent bar,
 * while the "M" peaks rise above like mountain peaks — a nod to Victoria Falls.
 */
export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bright Moyo logo"
      role="img"
    >
      {/* Outer octagonal frame */}
      <path
        d="M22 2 L42 2 L62 22 L62 42 L42 62 L22 62 L2 42 L2 22 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
        fill="none"
      />
      {/* Inner octagonal frame */}
      <path
        d="M26 10 L38 10 L54 26 L54 38 L38 54 L26 54 L10 38 L10 26 Z"
        stroke="#DC2626"
        strokeWidth="1"
        opacity="0.35"
        fill="none"
      />
      {/* B — vertical spine */}
      <rect x="16" y="18" width="3.5" height="30" rx="1" fill="currentColor" opacity="0.92" />
      {/* B — top bowl */}
      <path d="M16 18 H28 Q34 18 34 24 Q34 30 28 30 H16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      {/* B — bottom bowl */}
      <path d="M16 32 H30 Q38 32 38 39 Q38 48 30 48 H16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      {/* Crimson accent bar */}
      <rect x="16" y="29" width="22" height="2.5" rx="0.8" fill="#DC2626" opacity="0.95" />
      {/* M — left leg */}
      <line x1="42" y1="48" x2="42" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.92" />
      {/* M — right leg */}
      <line x1="54" y1="48" x2="54" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.92" />
      {/* M — peak */}
      <polyline points="42,28 48,20 54,28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      {/* M — crimson middle stroke */}
      <line x1="48" y1="34" x2="48" y2="28" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Top diamond accent */}
      <polygon points="32,6 34.5,9 32,12 29.5,9" fill="#DC2626" opacity="0.6" />
    </svg>
  );
}

/**
 * BM Monogram Logo — unique geometric mark for Bright Moyo.
 *
 * The "B" is constructed from a vertical spine with two balanced bowls
 * and a crimson accent bar. The "M" has angular peaks inspired by the
 * Victoria Falls escarpment. A small diamond apex ties the composition
 * together. The octagonal frames echo a camera aperture / technical precision.
 */
export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bright Moyo logo"
      role="img"
    >
      {/* Outer octagonal frame — thin, subtle */}
      <path
        d="M28 3 L52 3 L77 28 L77 52 L52 77 L28 77 L3 52 L3 28 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
        fill="none"
      />

      {/* B — vertical spine */}
      <rect x="19" y="22" width="3" height="36" rx="1.5" fill="currentColor" />

      {/* B — top bowl */}
      <path
        d="M19 22 H33 C38 22 40 25.5 40 29 C40 32.5 38 36 33 36 H19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* B — bottom bowl */}
      <path
        d="M19 40 H35 C41 40 44 44 44 48.5 C44 53 41 58 35 58 H19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Crimson accent bar — horizontal separator */}
      <rect x="19" y="37" width="25" height="2.2" rx="1" fill="#DC2626" />

      {/* M — left leg */}
      <line x1="50" y1="58" x2="50" y2="34" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />

      {/* M — right leg */}
      <line x1="66" y1="58" x2="66" y2="34" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />

      {/* M — V peak */}
      <polyline
        points="50,34 58,24 66,34"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* M — crimson accent stroke */}
      <line x1="58" y1="40" x2="58" y2="34" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

      {/* Diamond apex — ties the mark together */}
      <polygon points="40,8 42.5,11.5 40,15 37.5,11.5" fill="#DC2626" opacity="0.55" />
    </svg>
  );
}

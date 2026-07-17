/**
 * BM Monogram Logo — unique geometric mark for Bright Moyo.
 *
 * A clean, minimal monogram: "B" with two balanced bowls and a crimson
 * accent bar, paired with an angular "M" whose peaks reference the
 * Victoria Falls escarpment. Thin octagonal frame adds technical precision.
 */
export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bright Moyo logo"
      role="img"
    >
      {/* Octagonal frame */}
      <path
        d="M34 4 L66 4 L96 34 L96 66 L66 96 L34 96 L4 66 L4 34 Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.18"
      />

      {/* ── B ── */}
      {/* Spine */}
      <rect x="22" y="28" width="3.5" height="44" rx="1.75" fill="currentColor" />
      {/* Top bowl */}
      <path
        d="M22 28 H40 C47 28 50 32 50 36.5 C50 41 47 45 40 45 H22"
        fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Bottom bowl */}
      <path
        d="M22 50 H42 C50 50 54 55 54 61 C54 67 50 72 42 72 H22"
        fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Crimson accent bar */}
      <rect x="22" y="46.5" width="32" height="3" rx="1.5" fill="#DC2626" />

      {/* ── M ── */}
      {/* Left leg */}
      <line x1="60" y1="72" x2="60" y2="42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Right leg */}
      <line x1="78" y1="72" x2="78" y2="42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Peak */}
      <polyline
        points="60,42 69,30 78,42"
        fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Crimson center stroke */}
      <line x1="69" y1="50" x2="69" y2="42" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" opacity="0.65" />

      {/* Diamond accent at top center */}
      <polygon points="50,10 53,14 50,18 47,14" fill="#DC2626" opacity="0.5" />
    </svg>
  );
}

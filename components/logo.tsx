export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Плитки СПб"
    >
      {/* Tile grid icon */}
      <g>
        <rect x="8"  y="12" width="9" height="9" rx="1" fill="#1e3a8a" />
        <rect x="19" y="12" width="9" height="9" rx="1" fill="#2563eb" />
        <rect x="30" y="12" width="9" height="9" rx="1" fill="#1e3a8a" />

        <rect x="8"  y="23" width="9" height="9" rx="1" fill="#3b82f6" />
        <rect x="19" y="23" width="9" height="9" rx="1" fill="#1e3a8a" />
        <rect x="30" y="23" width="9" height="9" rx="1" fill="#2563eb" />

        <rect x="8"  y="34" width="9" height="9" rx="1" fill="#1e3a8a" />
        <rect x="19" y="34" width="9" height="9" rx="1" fill="#3b82f6" />
        <rect x="30" y="34" width="9" height="9" rx="1" fill="#1e3a8a" />
      </g>

      {/* Text: ПЛИТКИ */}
      <text x="50" y="30" fontSize="15" fontWeight="600" fill="#64748b" letterSpacing="1">
        ПЛИТКИ
      </text>

      {/* Text: СПб — bold blue */}
      <text x="50" y="52" fontSize="26" fontWeight="700" fill="#1e3a8a" letterSpacing="0.5">
        СПб
      </text>
    </svg>
  )
}

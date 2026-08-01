export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 460"
      fill="none"
      className="w-full h-auto max-w-md mx-auto"
      aria-hidden="true"
    >
      <circle cx="210" cy="230" r="200" fill="#F3EEE4" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={30 + i * 33} cy={30} r="1.4" fill="#241539" opacity="0.15" />
      ))}

      {/* dress form stand */}
      <line x1="210" y1="330" x2="210" y2="420" stroke="#241539" strokeWidth="2" />
      <ellipse cx="210" cy="424" rx="46" ry="8" fill="#241539" opacity="0.15" />

      {/* body */}
      <path
        d="M158 200 C158 165 178 140 210 140 C242 140 262 165 262 200 L266 260 C266 300 240 328 210 328 C180 328 154 300 154 260 Z"
        fill="#FAF7F1"
        stroke="#241539"
        strokeWidth="2.5"
      />

      {/* neck + pin cushion top */}
      <rect x="198" y="118" width="24" height="26" rx="4" fill="#FAF7F1" stroke="#241539" strokeWidth="2.5" />
      <circle cx="210" cy="108" r="10" fill="#C9972E" />

      {/* seams */}
      <path d="M210 150 V320" stroke="#241539" strokeOpacity="0.25" strokeWidth="1.4" strokeDasharray="4 4" />
      <path d="M170 210 C190 225 230 225 250 210" stroke="#241539" strokeOpacity="0.25" strokeWidth="1.4" />

      {/* measuring tape draped around */}
      <path
        d="M120 150 C150 210 150 260 120 320 C170 340 250 340 300 320 C270 260 270 210 300 150"
        fill="none"
        stroke="#A63D2F"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M120 150 C150 210 150 260 120 320 C170 340 250 340 300 320 C270 260 270 210 300 150"
        fill="none"
        stroke="#FAF7F1"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />

      {/* gold pin accents */}
      <circle cx="182" cy="185" r="3.5" fill="#C9972E" />
      <circle cx="238" cy="185" r="3.5" fill="#C9972E" />
      <circle cx="210" cy="240" r="3.5" fill="#C9972E" />

      {/* floating swatches */}
      <rect x="60" y="70" width="34" height="34" rx="6" fill="#241539" transform="rotate(-12 77 87)" />
      <rect x="320" y="90" width="30" height="30" rx="6" fill="#C9972E" transform="rotate(10 335 105)" />
      <rect x="330" y="300" width="26" height="26" rx="6" fill="#A63D2F" transform="rotate(-8 343 313)" />
    </svg>
  );
}

/** The integration's mark (brand/icon.png): a colour-wheel dial ring around a bulb. */
export function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <span className="logo-ring" />
      <svg viewBox="0 0 512 512">
        <defs>
          <linearGradient id="hrs-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb020" />
            <stop offset=".5" stopColor="#ff4f8b" />
            <stop offset="1" stopColor="#5b6bff" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hrs-logo)"
          d="M256 136C314 136 356 180 356 234C356 270 338 294 318 314C302 330 296 344 296 360L216 360C216 344 210 330 194 314C174 294 156 270 156 234C156 180 198 136 256 136Z"
        />
        <rect x="216" y="374" width="80" height="22" rx="11" fill="url(#hrs-logo)" />
      </svg>
    </span>
  );
}

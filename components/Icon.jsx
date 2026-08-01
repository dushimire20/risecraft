const paths = {
  "sewing-machine": (
    <>
      <path d="M4 17h9l3-4h4v4" />
      <path d="M4 17v-2a2 2 0 0 1 2-2h5l4-4h3.5a1.5 1.5 0 0 1 1.5 1.5V11" />
      <circle cx="7" cy="17" r="1" />
      <path d="M2 20h13" />
    </>
  ),
  tag: (
    <>
      <path d="M12 2 21 11l-9 9-9-9V4a2 2 0 0 1 2-2Z" transform="translate(-0.5 0)" />
      <circle cx="7" cy="7" r="1.3" />
    </>
  ),
  "dress-form": (
    <>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M12 5.6V8" />
      <path d="M8 8h8l1.2 4a5.2 5.2 0 0 1-10.4 0Z" />
      <path d="M9.5 12v6.5" />
      <path d="M14.5 12v6.5" />
      <path d="M8.5 21h7" />
    </>
  ),
  shirt: (
    <>
      <path d="M8 4 4 7l2 3 2-1.2V20h8V8.8L18 10l2-3-4-3-2 1.5h-4Z" />
    </>
  ),
  jacket: (
    <>
      <path d="M9 3 5 6l1.5 4L8 9v11h8V9l1.5 1L19 6l-4-3-1 2h-4Z" />
      <path d="M12 5v4" />
    </>
  ),
  tshirt: (
    <>
      <path d="M8 4 3 7l2 3 2.5-1.5V21h9V8.5L19 10l2-3-5-3-2 2h-4Z" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v10H8l-4 4Z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="8" width="18" height="11" rx="1.5" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="m4 14 5-5 4 4 7-8" />
      <path d="M16 5h4v4" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  tools: (
    <>
      <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-3.3 3.3-2-2Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="2.8" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3.5 19c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <path d="M15 14.2c2.4.3 4 2.2 4 4.8" />
    </>
  ),
  cap: (
    <>
      <path d="M2 10 12 5l10 5-10 5Z" />
      <path d="M6 12.5V17c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
      <path d="M20 10v5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </>
  ),
  phone: (
    <>
      <path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16 12.5 20 14v3a2 2 0 0 1-2.2 2C10.2 18.4 5.6 13.8 5 6.2A2 2 0 0 1 6 3Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 5 5L20 6" />
    </>
  ),
};

export default function Icon({ name, className = "w-6 h-6" }) {
  const content = paths[name] || paths.check;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

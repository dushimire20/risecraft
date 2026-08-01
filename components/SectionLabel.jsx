export default function SectionLabel({ children, dark = false }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`font-mono text-xs tracking-[0.3em] uppercase ${
          dark ? "text-gold" : "text-thread"
        }`}
      >
        {children}
      </span>
      <span className={`h-px w-10 ${dark ? "bg-gold/60" : "bg-thread/50"}`} />
    </div>
  );
}

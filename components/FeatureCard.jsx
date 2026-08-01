import Link from "next/link";
import Icon from "./Icon";

export default function FeatureCard({ icon, title, description, index, href }) {
  const className =
    "group relative rounded-2xl border border-plum/10 bg-white/60 p-6 transition-all hover:border-gold/60 hover:shadow-[0_8px_30px_-12px_rgba(36,21,57,0.25)]" +
    (href ? " block focus-ring" : "");

  const content = (
    <div className="flex items-start gap-4">
      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-plum text-gold group-hover:bg-gold group-hover:text-plum transition-colors">
        <Icon name={icon} className="w-5.5 h-5.5" />
      </div>
      <div>
        {index != null && (
          <span className="font-mono text-[0.7rem] tracking-widest text-gold-dark">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold text-plum mt-0.5">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{description}</p>
        {href && (
          <span className="mt-2 inline-block text-xs font-semibold text-gold-dark group-hover:underline">
            View gallery →
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

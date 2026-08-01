import SectionLabel from "./SectionLabel";

export default function PageHero({ kicker, title, description }) {
  return (
    <section className="pattern-paper border-b border-plum/10">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionLabel>{kicker}</SectionLabel>
        <h1 className="mt-4 font-display font-black text-4xl md:text-5xl text-plum">{title}</h1>
        {description && (
          <p className="mt-4 text-lg text-ink/70 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}

import { useI18n } from "@/i18n";

export function Story() {
  const { t } = useI18n();
  return (
    <section id="historia" className="relative overflow-hidden bg-brand-cream/40 py-20 md:py-28">
      <p
        aria-hidden
        className="pointer-events-none absolute -left-[4vw] top-6 font-display text-[22vw] font-medium leading-none tracking-[-0.07em] text-brand-brown/15"
      >
        {t.storyMark}
      </p>

      <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div className="max-w-md pb-4">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-brown/70">{t.storyKicker}</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-brand-brown-deep md:text-6xl">
            {t.storyTitle}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/75">
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-4 sm:gap-10">
            {t.stats.map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl text-brand-brown sm:text-4xl">{s.k}</dt>
                <dd className="text-sm text-foreground/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative -rotate-3 md:translate-y-8">
          <img
            src="/images/story.jpg"
            alt={t.storyAlt}
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_30px_60px_-30px_rgba(74,47,34,0.55)]"
          />
        </figure>
      </div>
    </section>
  );
}

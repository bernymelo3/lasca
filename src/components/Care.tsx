import { useI18n } from "@/i18n";

export function Care() {
  const { t } = useI18n();
  const line = t.care;
  return (
    <section className="overflow-hidden border-y border-brand-brown/15 bg-brand-cream/50 py-6" aria-label={t.careLabel}>
      <p className="flex w-max animate-marquee gap-0 whitespace-nowrap font-display text-4xl text-brand-brown motion-reduce:animate-none md:text-6xl">
        <span>{line}</span>
        <span aria-hidden>{line}</span>
      </p>
    </section>
  );
}

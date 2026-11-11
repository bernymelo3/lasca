import { useI18n } from "@/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="overflow-hidden bg-brand-brown-deep text-brand-cream">
      <p
        aria-hidden
        className="whitespace-nowrap px-4 font-display text-[28vw] font-medium leading-[0.8] tracking-[-0.07em]"
      >
        Lasca
      </p>
      <div className="flex flex-col gap-6 border-t border-brand-cream/15 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} Lasca. {t.footer}{" "}
          <a href="#privacidade" className="underline decoration-brand-cream/30 underline-offset-4 hover:text-white">
            {t.privacy.more}
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {t.nav.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="https://seaweed.digital"
            className="text-brand-cream/55 hover:text-white"
          >
            Built by seaweed
          </a>
        </div>
      </div>
    </footer>
  );
}

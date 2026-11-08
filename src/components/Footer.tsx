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
        <p>© {new Date().getFullYear()} Lasca. {t.footer}</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {t.nav.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

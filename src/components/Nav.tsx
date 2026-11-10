import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n, type Lang } from "@/i18n";

export function Nav({ logoVisible = true }: { logoVisible?: boolean }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex h-20 items-center justify-between px-3 md:h-24 md:px-8">
        <div className="pointer-events-auto flex items-center gap-1">
          {(["pt", "en"] as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full text-[11px] font-medium uppercase tracking-wide",
                lang === code ? "bg-brand-brown text-background" : "text-brand-brown"
              )}
            >
              {code}
            </button>
          ))}
        </div>
        <a
          href="#top"
          aria-label={t.home}
          className={cn(
            "pointer-events-auto transition-opacity duration-500",
            logoVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <img src="/logos/Lasca-1.svg" alt="" className="h-11 w-auto md:h-20" />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-brown/20 bg-background/80 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-brown backdrop-blur sm:px-4"
        >
          {open ? t.close : t.menu}
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-brown text-background">
            {open ? "×" : "+"}
          </span>
        </button>
      </div>

      <div
        hidden={!open}
        className="pointer-events-auto absolute inset-x-4 top-24 rounded-[1.5rem] bg-brand-brown-deep p-8 text-brand-cream shadow-2xl md:inset-x-auto md:right-8 md:w-80"
      >
        <ul className="space-y-2">
          {t.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-display text-4xl leading-tight hover:text-brand-cream/70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

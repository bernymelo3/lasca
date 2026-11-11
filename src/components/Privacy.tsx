import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";

const NOTICE_KEY = "lasca-notice";

function alreadyRead() {
  try {
    return localStorage.getItem(NOTICE_KEY) === "1";
  } catch {
    return false;
  }
}

export function PrivacyBar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => !alreadyRead());
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      if (!hero) {
        setPastHero(true);
        return;
      }
      setPastHero(hero.getBoundingClientRect().bottom < window.innerHeight * 0.72);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!open || !pastHero) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(NOTICE_KEY, "1");
    } catch {
      // The note can still close if storage is blocked.
    }
    setOpen(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 md:p-5">
      <div
        role="region"
        aria-label={t.privacy.more}
        className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl bg-brand-brown-deep/95 px-4 py-3 text-brand-cream shadow-[0_18px_40px_-24px_rgba(40,24,14,0.7)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:px-5"
      >
        <p className="text-[13px] leading-relaxed text-brand-cream/90">{t.privacy.bar}</p>
        <div className="flex shrink-0 items-center gap-3">
          <a href="#privacidade" className="text-[13px] underline decoration-brand-cream/40 underline-offset-4 hover:decoration-brand-cream">
            {t.privacy.more}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="min-h-10 rounded-full bg-brand-cream px-4 text-[13px] text-brand-brown-deep"
          >
            {t.privacy.ok}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PrivacySection() {
  const { t } = useI18n();
  return (
    <section id="privacidade" className="bg-background px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-5xl leading-none text-brand-brown md:text-6xl">{t.privacy.title}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/75">{t.privacy.lead}</p>
        <div className="mt-10 divide-y divide-brand-brown/15 border-t border-brand-brown/15">
          {t.privacy.blocks.map((block) => (
            <div key={block.h} className="grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-8">
              <h3 className="text-xs uppercase tracking-[0.18em] text-brand-brown/60">{block.h}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/80">{block.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

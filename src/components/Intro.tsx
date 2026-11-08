import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const hold = window.setTimeout(() => setLeaving(true), 900);
    const done = window.setTimeout(onDone, 1900);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [onDone]);

  return (
    <button
      type="button"
      aria-label={t.skip}
      onClick={onDone}
      className={cn(
        "fixed inset-0 z-[80] grid cursor-pointer place-items-center bg-background transition-opacity duration-700",
        leaving && "pointer-events-none opacity-0"
      )}
    >
      <img
        src="/logos/Lasca-1.svg"
        alt=""
        className={cn(
          "h-32 w-auto transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)] md:h-44",
          leaving && "scale-[0.32] -translate-y-[38vh]"
        )}
      />
    </button>
  );
}

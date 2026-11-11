import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { heroShots } from "@/data/heroShots";

const colors = [
  "hsl(var(--brand-brown))",
  "hsl(var(--brand-brown-deep))",
  "hsl(var(--brand-cream))",
  "hsl(var(--brand-green))",
  "hsl(var(--foreground))",
];

const kinds = ["ellipse", "wedge", "block"] as const;

type Drop = {
  id: number;
  kind: (typeof kinds)[number];
  color: string;
  left: number;
  top: number;
  size: number;
  spin: number;
};

function makeJar(): Drop[] {
  const phone = window.matchMedia("(max-width: 767px)").matches;
  const cols = phone ? 3 : 4;
  const rows = phone ? 6 : 8;
  const pieces: Drop[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = row % 2 === 0 ? 0 : phone ? 14 : 12;
      pieces.push({
        id: row * cols + col,
        kind: kinds[(row + col) % kinds.length],
        color: colors[(row * 3 + col) % colors.length],
        left: (phone ? -10 : -18) + shift + (col / (cols - 1)) * (phone ? 78 : 96) + (Math.random() * 4 - 2),
        top: -14 + (row / (rows - 1)) * (phone ? 112 : 128) + (Math.random() * 3 - 1.5),
        size: (phone ? 42 : 34) + Math.random() * 8,
        spin: Math.round(-14 + Math.random() * 28),
      });
    }
  }
  return pieces;
}

function Shape({ kind, color }: { kind: Drop["kind"]; color: string }) {
  if (kind === "wedge") {
    return (
      <svg viewBox="0 0 80 70" className="h-auto w-full" aria-hidden>
        <path d="M6 64 L40 6 L74 64 Z" fill={color} />
      </svg>
    );
  }
  if (kind === "block") {
    return (
      <svg viewBox="0 0 80 56" className="h-auto w-full" aria-hidden>
        <rect x="4" y="6" width="72" height="44" rx="8" fill={color} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 52" className="h-auto w-full" aria-hidden>
      <ellipse cx="40" cy="26" rx="36" ry="22" fill={color} />
    </svg>
  );
}

export function Intro({ onOpening, onDone }: { onOpening?: () => void; onDone: () => void }) {
  const { t } = useI18n();
  const [drops] = useState(makeJar);
  const [loaded, setLoaded] = useState(0);
  const [percent, setPercent] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sources = heroShots.map((shot) => shot.src);
    let done = 0;
    const mark = () => {
      done += 1;
      setLoaded(Math.round((done / sources.length) * 100));
    };
    const images = sources.map((src) => {
      const image = new Image();
      image.onload = mark;
      image.onerror = mark;
      image.src = src;
      return image;
    });
    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    if (percent >= loaded) return;
    const step = window.setTimeout(
      () =>
        setPercent((current) =>
          Math.min(loaded, current + Math.max(2, Math.ceil((loaded - current) * 0.35))),
        ),
      24,
    );
    return () => window.clearTimeout(step);
  }, [percent, loaded]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    if (percent < 100) return;
    const reveal = window.setTimeout(() => {
      setOpen(true);
      onOpening?.();
    }, 150);
    const finish = window.setTimeout(onDone, 900);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [percent, onDone, onOpening]);

  return (
    <button
      type="button"
      aria-label={t.skip}
      onClick={onDone}
      className={cn(
        "fixed inset-0 z-[80] cursor-pointer overflow-hidden bg-background transition-opacity duration-1000 ease-out",
        open && "pointer-events-none opacity-0"
      )}
    >
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute block"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            width: `${drop.size}vw`,
            animation: "intro-jar 2.8s cubic-bezier(0.22, 1, 0.36, 1) both",
            ["--spin" as string]: `${drop.spin}deg`,
          }}
        >
          <Shape kind={drop.kind} color={drop.color} />
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full bg-background/85 px-10 py-8">
        <img src="/logos/Lasca-1.svg" alt="" className="h-14 w-auto md:h-20" />
        <span className="mt-5 font-display text-6xl tabular-nums leading-none text-brand-brown md:text-8xl">
          {percent}%
        </span>
      </span>
    </button>
  );
}

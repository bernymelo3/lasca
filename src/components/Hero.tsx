import { useEffect, useRef } from "react";

const shots = [
  {
    id: "tarte",
    src: "/images/hero/tarte.webp",
    video: "/videos/tarte-loop2.webm",
    alt: "Tarte basca",
    top: "34%",
    left: "-10%",
    width: "min(84vw, 460px)",
    mdWidth: "34vw",
    rotate: -16,
    shift: 24,
  },
  {
    id: "pistacio",
    src: "/images/hero/pistacio.webp",
    video: "/videos/pistacio-loop.webm",
    alt: "Salame de pistácio",
    top: "32%",
    left: "26%",
    width: "min(72vw, 380px)",
    mdWidth: "28vw",
    rotate: 9,
    shift: 36,
  },
  {
    id: "amendoim",
    src: "/images/hero/amendoim.webp",
    video: "/videos/amendoim-loop.webm",
    alt: "Salame de manteiga de amendoim",
    top: "4%",
    left: "4%",
    width: "min(86vw, 480px)",
    mdWidth: "36vw",
    rotate: -8,
    shift: 30,
  },
  {
    id: "chocolate",
    src: "/images/hero/chocolate.webp",
    video: "/videos/chocolate-loop2.webm",
    alt: "Salame de chocolate preto e avelã",
    top: "6%",
    left: "46%",
    width: "min(80vw, 440px)",
    mdWidth: "34vw",
    rotate: 14,
    shift: 40,
  },
  {
    id: "branco",
    src: "/images/hero/branco.webp",
    video: "/videos/branco-loop2.webm",
    alt: "Salame de chocolate branco",
    top: "44%",
    left: "64%",
    width: "min(72vw, 380px)",
    mdWidth: "28vw",
    rotate: -12,
    shift: 48,
  },
  {
    id: "brownie",
    src: "/images/hero/brownie.webp",
    video: "/videos/brownie-loop2.webm",
    alt: "Brownie",
    top: "8%",
    left: "80%",
    width: "min(74vw, 400px)",
    mdWidth: "30vw",
    rotate: 10,
    shift: 56,
  },
];

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const shotRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = (progress: number) => {
      const phone = window.matchMedia("(max-width: 767px)").matches;
      if (wordRef.current) {
        wordRef.current.style.transform = phone
          ? `translate3d(-50%, ${progress * 12}vh, 0)`
          : `translate3d(calc(-50% + ${progress * 8}vw), 0, 0)`;
      }
      shots.forEach((shot, i) => {
        const el = shotRefs.current[i];
        if (!el) return;
        if (phone) {
          const tilt = shot.rotate * 0.45 + progress * (i % 2 === 0 ? 4 : -4);
          el.style.transform = `translate3d(0, ${progress * 6}vh, 0) rotate(${tilt}deg)`;
          return;
        }
        el.style.transform = `translate3d(${-progress * shot.shift}vw, 0, 0) rotate(${shot.rotate}deg)`;
      });
    };

    paint(0);
    if (reduce) return;

    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 0));
      paint(total > 0 ? scrolled / total : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      ref={trackRef}
      className="relative h-screen motion-safe:h-[220vh] md:motion-safe:h-[340vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-brand-brown-deep md:h-[48%]" />

        <h1
          ref={wordRef}
          className="pointer-events-none absolute bottom-[-0.18em] left-1/2 z-10 whitespace-nowrap font-display text-[28vw] font-medium leading-[0.78] tracking-[-0.06em] text-brand-cream md:text-[32vw]"
        >
          LASCA
        </h1>

        {shots.map((shot, i) => (
          <a
            key={shot.src}
            href={`#produto/${shot.id}`}
            ref={(node) => {
              shotRefs.current[i] = node;
            }}
            className="absolute z-20 block drop-shadow-[0_28px_28px_rgba(40,24,14,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-brown"
            style={{
              top: shot.top,
              left: shot.left,
              width: shot.width,
            }}
          >
            {shot.video ? (
              <video
                src={shot.video}
                poster={shot.src}
                autoPlay
                muted
                loop
                playsInline
                aria-label={shot.alt}
                className="h-auto w-full"
              />
            ) : (
              <img
                src={shot.src}
                alt={shot.alt}
                className="h-auto w-full"
                draggable={false}
              />
            )}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          #top a:nth-of-type(1) { top: 64% !important; left: -6% !important; width: 76vw !important; }
          #top a:nth-of-type(2) { top: 36% !important; left: 2% !important; width: 68vw !important; }
          #top a:nth-of-type(3) { top: 5% !important; left: -4% !important; width: 72vw !important; }
          #top a:nth-of-type(4) { top: 20% !important; left: 32% !important; width: 66vw !important; }
          #top a:nth-of-type(5) { top: 76% !important; left: 30% !important; width: 64vw !important; }
          #top a:nth-of-type(6) { top: 50% !important; left: 34% !important; width: 64vw !important; }
        }
        @media (min-width: 768px) {
          ${shots
            .map(
              (shot, i) =>
                `#top a:nth-of-type(${i + 1}) { width: ${shot.mdWidth} !important; }`
            )
            .join("\n")}
        }
      `}</style>
    </section>
  );
}

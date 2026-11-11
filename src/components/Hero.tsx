import { useEffect, useRef, useState } from "react";
import { heroShots, shotPose } from "@/data/heroShots";
import { alphaVideoSrc, preferredAlphaKind } from "@/lib/alphaVideo";

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const shotRefs = useRef<Array<HTMLElement | null>>([]);
  const [phone, setPhone] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const motion = preferredAlphaKind();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let lastProgress = -1;
    let lastNarrow = mq.matches;

    const paint = (progress: number, narrow: boolean) => {
      const eased = progress * progress * (3 - 2 * progress);
      if (wordRef.current) {
        wordRef.current.style.transform = narrow
          ? "translate3d(-50%, 0, 0)"
          : `translate3d(calc(-50% + ${eased * 4}vw), 0, 0)`;
      }
      heroShots.forEach((shot, i) => {
        const el = shotRefs.current[i];
        if (!el) return;
        if (narrow) {
          const lift = 6 + (i % 3) * 4;
          const tilt = shot.rotate * 0.35 + eased * (i % 2 === 0 ? 2.5 : -2.5);
          el.style.transform = `translate3d(0, ${-eased * lift}vh, 0) rotate(${tilt}deg)`;
          return;
        }
        const drift = 8 + shot.shift * 0.16;
        el.style.transform = `translate3d(${-eased * drift}vw, ${eased * -2}vh, 0) rotate(${shot.rotate}deg)`;
      });
    };

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      const narrow = mq.matches;
      if (progress === lastProgress && narrow === lastNarrow) return;
      lastProgress = progress;
      lastNarrow = narrow;
      paint(progress, narrow);
    };

    measure();
    if (reduce) return;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    let visible = true;
    const videos = () => [...root.querySelectorAll("video")];
    const play = () => {
      if (!visible) return;
      videos().forEach((video) => {
        video.defaultMuted = true;
        video.muted = true;
        if (video.paused) video.play().catch(() => {});
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else videos().forEach((video) => video.pause());
      },
      { threshold: 0.05 },
    );
    observer.observe(root);
    play();
    window.addEventListener("touchstart", play, { passive: true, once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <section
      id="top"
      ref={trackRef}
      className="relative h-screen motion-safe:h-[145vh] md:motion-safe:h-[220vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-brand-brown-deep md:h-[48%]" />

        <h1
          ref={wordRef}
          className="pointer-events-none absolute bottom-[2vw] left-1/2 z-10 whitespace-nowrap font-display text-[34vw] font-medium leading-[0.72] tracking-[-0.07em] text-brand-cream md:bottom-[-0.18em] md:text-[32vw] md:leading-[0.78] md:tracking-[-0.06em]"
        >
          LASCA
        </h1>

        {heroShots.map((shot, i) => {
          const pose = shotPose(shot, phone);
          return (
            <a
              key={shot.id}
              href={`#produto/${shot.id}`}
              ref={(node) => {
                shotRefs.current[i] = node;
              }}
              aria-label={shot.alt}
              className="cutout-shadow absolute z-20 block will-change-transform drop-shadow-[0_18px_10px_rgba(40,24,14,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-brown"
              style={{
                top: pose.top,
                left: pose.left,
                width: pose.width,
              }}
            >
              {motion ? (
                <>
                  {!ready[shot.id] && (
                    <img
                      src={shot.src}
                      alt=""
                      width={960}
                      height={640}
                      decoding="async"
                      className="block h-auto w-full"
                      draggable={false}
                    />
                  )}
                  <video
                    src={alphaVideoSrc(shot.video, motion)}
                    width={960}
                    height={640}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    autoPlay
                    aria-hidden
                    onLoadedData={(e) => {
                      const video = e.currentTarget;
                      video.defaultMuted = true;
                      video.muted = true;
                      video.play().catch(() => {});
                      setReady((prev) => (prev[shot.id] ? prev : { ...prev, [shot.id]: true }));
                    }}
                    onPlaying={() => {
                      setReady((prev) => (prev[shot.id] ? prev : { ...prev, [shot.id]: true }));
                    }}
                    className={
                      ready[shot.id]
                        ? "cutout-video block h-auto w-full bg-transparent"
                        : "cutout-video pointer-events-none absolute inset-0 h-full w-full bg-transparent opacity-0"
                    }
                  />
                </>
              ) : (
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={960}
                  height={640}
                  decoding="async"
                  className="block h-auto w-full"
                  draggable={false}
                />
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}

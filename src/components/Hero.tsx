import { useEffect, useRef, useState } from "react";
import { heroShots, shotPose } from "@/data/heroShots";
import { alphaVideoSrc, preferredAlphaKind } from "@/lib/alphaVideo";

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const shotRefs = useRef<Array<HTMLElement | null>>([]);
  const [phone, setPhone] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [moving, setMoving] = useState<Record<string, boolean>>({});
  const motion = preferredAlphaKind();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const paint = (progress: number) => {
      const eased = progress * progress * (3 - 2 * progress);
      const narrow = window.matchMedia("(max-width: 767px)").matches;
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
      paint(total > 0 ? scrolled / total : 0);
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
    const videos = () => [...root.querySelectorAll("video")];
    const play = () => videos().forEach((video) => video.play().catch(() => {}));
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else videos().forEach((video) => video.pause());
    }, { threshold: 0.2 });
    observer.observe(root);
    play();
    return () => observer.disconnect();
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
              className="cutout-shadow absolute z-20 block drop-shadow-[0_18px_10px_rgba(40,24,14,0.2)] transition-opacity duration-1000 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-brown"
              style={{
                top: pose.top,
                left: pose.left,
                width: pose.width,
                opacity: motion ? (moving[shot.id] ? 1 : 0) : 1,
              }}
            >
              {motion ? (
                <video
                  src={alphaVideoSrc(shot.video, motion)}
                  muted
                  loop
                  playsInline
                  preload={phone ? "metadata" : "auto"}
                  autoPlay
                  aria-label={shot.alt}
                  className="cutout-video h-auto w-full bg-transparent"
                  onPlaying={() =>
                    setMoving((current) => (current[shot.id] ? current : { ...current, [shot.id]: true }))
                  }
                />
              ) : (
                <img src={shot.src} alt={shot.alt} className="h-auto w-full" draggable={false} />
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}

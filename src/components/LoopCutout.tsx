import { useEffect, useRef, useState, type CSSProperties } from "react";
import { alphaVideoSrc, type AlphaKind } from "@/lib/alphaVideo";

type Props = {
  webm: string;
  poster: string;
  kind: AlphaKind;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

export function LoopCutout({ webm, poster, kind, className, style, width, height }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    setPlaying(false);

    let visible = false;
    const play = () => {
      const video = videoRef.current;
      if (!visible || !video) return;
      video.defaultMuted = true;
      video.muted = true;
      if (video.paused) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          setActive(true);
          play();
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.05 },
    );
    observer.observe(wrap);
    return () => {
      observer.disconnect();
    };
  }, [webm, kind]);

  return (
    <span ref={wrapRef} className={className} style={style}>
      {!playing && (
        <img
          src={poster}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full"
        />
      )}
      {active && (
        <video
          ref={videoRef}
          src={alphaVideoSrc(webm, kind)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          width={width}
          height={height}
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.defaultMuted = true;
            video.muted = true;
            video.play().catch(() => {});
          }}
          onPlaying={() => setPlaying(true)}
          className={
            playing
              ? "cutout-video block h-auto w-full bg-transparent"
              : "cutout-video pointer-events-none absolute inset-0 h-full w-full bg-transparent opacity-0"
          }
        />
      )}
    </span>
  );
}

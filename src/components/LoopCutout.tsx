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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;
    setPlaying(false);

    let visible = false;
    const play = () => {
      if (!visible) return;
      video.defaultMuted = true;
      video.muted = true;
      if (video.paused) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else video.pause();
      },
      { rootMargin: "180px 0px", threshold: 0.2 },
    );
    observer.observe(wrap);
    window.addEventListener("touchstart", play, { passive: true, once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", play);
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
          draggable={false}
          className="block h-auto w-full"
        />
      )}
      <video
        ref={videoRef}
        src={alphaVideoSrc(webm, kind)}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-hidden
        width={width}
        height={height}
        onPlaying={() => setPlaying(true)}
        className={
          playing
            ? "cutout-video block h-auto w-full bg-transparent"
            : "cutout-video pointer-events-none absolute inset-0 h-full w-full bg-transparent opacity-0"
        }
      />
    </span>
  );
}

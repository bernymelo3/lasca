import { useEffect, useRef, type CSSProperties } from "react";
import { alphaVideoSrc, preferredAlphaKind, type AlphaKind } from "@/lib/alphaVideo";

type Props = {
  webm: string;
  kind: AlphaKind;
  className?: string;
  label?: string;
  style?: CSSProperties;
  onReady?: () => void;
};

function cornerPixels(data: Uint8ClampedArray, width: number, height: number) {
  const points = [0, (width - 1) * 4, (height - 1) * width * 4, ((height - 1) * width + (width - 1)) * 4];
  return points.map((index) => [data[index], data[index + 1], data[index + 2], data[index + 3]]);
}

function distance(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

export function CutoutVideo({ webm, kind, className, label, style, onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let frame = 0;
    let mode: "alpha" | "key" | "unknown" = "unknown";
    let key: number[] | null = null;
    let told = false;

    const paint = () => {
      frame = requestAnimationFrame(paint);
      if (video.readyState < 2 || !video.videoWidth) return;
      const scale = Math.min(1, 480 / video.videoWidth);
      const width = Math.max(2, Math.round(video.videoWidth * scale));
      const height = Math.max(2, Math.round(video.videoHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.clearRect(0, 0, width, height);
      context.drawImage(video, 0, 0, width, height);
      if (mode === "alpha") {
        if (!told) {
          told = true;
          readyRef.current?.();
        }
        return;
      }

      const image = context.getImageData(0, 0, width, height);
      const pixels = image.data;
      const corners = cornerPixels(pixels, width, height);

      if (mode === "unknown") {
        if (corners.every((pixel) => pixel[3] < 16)) {
          mode = "alpha";
        } else if (corners.every((pixel) => pixel[3] > 200 && distance(pixel, corners[0]) < 40)) {
          mode = "key";
          key = [corners[0][0], corners[0][1], corners[0][2]];
        } else {
          context.clearRect(0, 0, width, height);
          return;
        }
      }

      if (mode === "key" && key) {
        const [red, green, blue] = key;
        for (let index = 0; index < pixels.length; index += 4) {
          const gap =
            Math.abs(pixels[index] - red) +
            Math.abs(pixels[index + 1] - green) +
            Math.abs(pixels[index + 2] - blue);
          if (gap < 46) pixels[index + 3] = 0;
          else if (gap < 92) pixels[index + 3] = Math.round(((gap - 46) / 46) * 255);
        }
        context.putImageData(image, 0, 0);
      }

      if (!told) {
        told = true;
        readyRef.current?.();
      }
    };

    const start = () => {
      video.play().catch(() => {});
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    video.addEventListener("loadeddata", start);
    if (video.readyState >= 2) start();
    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadeddata", start);
    };
  }, [webm, kind]);

  return (
    <span className={className} style={style}>
      <video
        ref={videoRef}
        src={alphaVideoSrc(webm, kind)}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
        className="pointer-events-none fixed -left-[120vw] top-0 h-auto w-[320px] opacity-0"
      />
      <canvas ref={canvasRef} role="img" aria-label={label} className="relative z-10 block h-auto w-full bg-transparent" />
    </span>
  );
}

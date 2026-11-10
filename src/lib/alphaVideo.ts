export type AlphaKind = "webm" | "mov";

function playable(value: string) {
  return value === "probably" || value === "maybe";
}

export function preferredAlphaKind(): AlphaKind | null {
  if (typeof document === "undefined") return null;
  const probe = document.createElement("video");
  const webmOk = playable(probe.canPlayType('video/webm; codecs="vp9"'));
  const qtHevcOk = playable(probe.canPlayType('video/quicktime; codecs="hvc1"'));
  const mp4HevcOk = playable(probe.canPlayType('video/mp4; codecs="hvc1"'));
  const appleWebKit =
    qtHevcOk ||
    (typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none"));
  if (appleWebKit && (qtHevcOk || mp4HevcOk)) return "mov";
  if (webmOk) return "webm";
  if (qtHevcOk || mp4HevcOk) return "mov";
  return null;
}

export function alphaVideoSrc(webm: string, kind: AlphaKind) {
  if (kind === "mov") return webm.replace(/\.webm$/i, ".mov");
  return webm;
}

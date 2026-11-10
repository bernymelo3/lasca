export type AlphaKind = "webm" | "mov";

export function preferredAlphaKind(): AlphaKind | null {
  if (typeof document === "undefined") return null;
  const probe = document.createElement("video");
  const webm = probe.canPlayType('video/webm; codecs="vp9"');
  const hevc =
    probe.canPlayType('video/mp4; codecs="hvc1"') ||
    probe.canPlayType('video/quicktime; codecs="hvc1"');
  const webmOk = webm === "probably" || webm === "maybe";
  const hevcOk = hevc === "probably" || hevc === "maybe";
  const touch = window.matchMedia("(max-width: 767px)").matches || navigator.maxTouchPoints > 1;
  if (touch && hevcOk) return "mov";
  if (webmOk) return "webm";
  if (hevcOk) return "mov";
  return null;
}

export function alphaVideoSrc(webm: string, kind: AlphaKind) {
  if (kind === "mov") return webm.replace(/\.webm$/i, ".mov");
  return webm;
}

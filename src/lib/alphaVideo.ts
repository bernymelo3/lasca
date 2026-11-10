export function canPlayAlphaVideo() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  const probe = document.createElement("video");
  const support = probe.canPlayType('video/webm; codecs="vp9"');
  return support === "probably" || support === "maybe";
}

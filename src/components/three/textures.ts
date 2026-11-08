import * as THREE from "three";

/** small seeded RNG so textures are stable between renders */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Draws a salame cross-section: a fudge base scattered with pale biscuit
 * shards — the signature "lasca" look.
 */
export function makeCrossTexture(base: string, speckle: string, seed = 7) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry32(seed);

  // fudge base with a soft radial richness
  const grad = ctx.createRadialGradient(size / 2, size / 2, 40, size / 2, size / 2, size * 0.7);
  grad.addColorStop(0, base);
  grad.addColorStop(1, shade(base, -12));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // biscuit shards
  const chips = 90;
  for (let i = 0; i < chips; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const w = 18 + rand() * 46;
    const h = 12 + rand() * 22;
    const rot = rand() * Math.PI;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = i % 5 === 0 ? shade(speckle, -14) : speckle;
    roundRect(ctx, -w / 2, -h / 2, w, h, 4 + rand() * 4);
    ctx.fill();
    // subtle crumb edge
    ctx.strokeStyle = shade(base, -18);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  // a few darker specks (nuts / cocoa)
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, 2 + rand() * 5, 0, Math.PI * 2);
    ctx.fillStyle = shade(base, -30);
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** faint dusted-sugar / cocoa speckle for the outer crust */
export function makeCrustTexture(crust: string, seed = 3) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry32(seed);
  ctx.fillStyle = crust;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i++) {
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, rand() * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = rand() > 0.5 ? shade(crust, 22) : shade(crust, -16);
    ctx.globalAlpha = 0.5;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** lighten (+) or darken (-) a hex colour by a percentage amount */
function shade(hex: string, amt: number) {
  const c = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  hsl.l = Math.min(1, Math.max(0, hsl.l + amt / 100));
  c.setHSL(hsl.h, hsl.s, hsl.l);
  return `#${c.getHexString()}`;
}

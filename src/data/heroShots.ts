export type HeroShot = {
  id: string;
  src: string;
  video: string;
  alt: string;
  color: string;
  top: string;
  left: string;
  mdWidth: string;
  rotate: number;
  shift: number;
  phone: { top: string; left: string; width: string };
};

export const heroShots: HeroShot[] = [
  {
    id: "tarte",
    src: "/images/hero/tarte.webp",
    video: "/videos/tarte-loop2.webm",
    alt: "Tarte basca",
    color: "#d85a28",
    top: "34%",
    left: "-10%",
    mdWidth: "34vw",
    rotate: -16,
    shift: 24,
    phone: { top: "66%", left: "0%", width: "52vw" },
  },
  {
    id: "pistacio",
    src: "/images/hero/pistacio.webp",
    video: "/videos/pistacio-loop.webm",
    alt: "Salame de pistácio",
    color: "#6e8f2e",
    top: "32%",
    left: "26%",
    mdWidth: "28vw",
    rotate: 9,
    shift: 36,
    phone: { top: "40%", left: "2%", width: "50vw" },
  },
  {
    id: "amendoim",
    src: "/images/hero/amendoim.webp",
    video: "/videos/amendoim-loop.webm",
    alt: "Salame de manteiga de amendoim",
    color: "#c47a2e",
    top: "4%",
    left: "4%",
    mdWidth: "36vw",
    rotate: -8,
    shift: 30,
    phone: { top: "12%", left: "4%", width: "50vw" },
  },
  {
    id: "chocolate",
    src: "/images/hero/chocolate.webp",
    video: "/videos/chocolate-loop2.webm",
    alt: "Salame de chocolate preto e avelã",
    color: "#3c2418",
    top: "6%",
    left: "46%",
    mdWidth: "34vw",
    rotate: 14,
    shift: 40,
    phone: { top: "26%", left: "46%", width: "48vw" },
  },
  {
    id: "branco",
    src: "/images/hero/branco.webp",
    video: "/videos/branco-loop2.webm",
    alt: "Salame de chocolate branco",
    color: "#d7b56a",
    top: "44%",
    left: "64%",
    mdWidth: "28vw",
    rotate: -12,
    shift: 48,
    phone: { top: "78%", left: "46%", width: "48vw" },
  },
  {
    id: "brownie",
    src: "/images/hero/brownie.webp",
    video: "/videos/brownie-loop2.webm",
    alt: "Brownie",
    color: "#7a3e22",
    top: "8%",
    left: "80%",
    mdWidth: "30vw",
    rotate: 10,
    shift: 56,
    phone: { top: "52%", left: "48%", width: "46vw" },
  },
];

export function shotPose(shot: HeroShot, phone: boolean) {
  if (phone) {
    return {
      top: shot.phone.top,
      left: shot.phone.left,
      width: shot.phone.width,
      rotate: shot.rotate * 0.45,
    };
  }
  return {
    top: shot.top,
    left: shot.left,
    width: shot.mdWidth,
    rotate: shot.rotate,
  };
}

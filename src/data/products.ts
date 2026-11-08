export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  lines: string[];
  category: string;
  image: string;
  /** Looping cutout. Played instead of the still when motion is allowed. */
  video?: string;
  /** Transparent cutout. A plain photo stays in a frame. */
  cutout: boolean;
  width: number;
  height: number;
  rotate: number;
  lead: string;
  serve: string;
  sizes: ProductSize[];
};

export const products: Product[] = [
  {
    id: "pistacio",
    name: "Pistáchio",
    lines: ["Pistáchio"],
    category: "Salame",
    image: "/images/hero/pistacio.webp",
    video: "/videos/pistacio-loop.webm",
    cutout: true,
    width: 1024,
    height: 682,
    rotate: 8,
    lead: "Salame de pistáchio, com o verde à vista em cada fatia.",
    serve: "Cortar na hora e servir à temperatura ambiente, com café ou um copo de vinho doce.",
    sizes: [{ label: "550g", price: 19 }],
  },
  {
    id: "amendoim",
    name: "Manteiga de Amendoim",
    lines: ["Manteiga de", "Amendoim"],
    category: "Salame",
    image: "/images/hero/amendoim.webp",
    video: "/videos/amendoim-loop.webm",
    cutout: true,
    width: 1400,
    height: 933,
    rotate: -8,
    lead: "Salame de chocolate com manteiga de amendoim, doce e salgado ao mesmo tempo.",
    serve: "Uma fatia grossa chega. Bom ao lado de um café curto.",
    sizes: [{ label: "550g", price: 17 }],
  },
  {
    id: "chocolate",
    name: "Chocolate Preto e Avelã",
    lines: ["Chocolate", "e Avelã"],
    category: "Salame",
    image: "/images/hero/chocolate.webp",
    video: "/videos/chocolate-loop2.webm",
    cutout: true,
    width: 1400,
    height: 933,
    rotate: 8,
    lead: "Chocolate preto e avelã, denso, para partir e partilhar.",
    serve: "Deixar uns minutos fora do frio antes de cortar, para a fatia não esfarelar.",
    sizes: [{ label: "500g", price: 15 }],
  },
  {
    id: "branco",
    name: "Chocolate Branco",
    lines: ["Chocolate", "Branco"],
    category: "Salame",
    image: "/images/hero/branco.webp",
    video: "/videos/branco-loop2.webm",
    cutout: true,
    width: 1400,
    height: 933,
    rotate: -10,
    lead: "Salame de chocolate branco, coberto com um véu de açúcar.",
    serve: "Cortar fino. O açúcar por cima estala na primeira dentada.",
    sizes: [{ label: "500g", price: 14 }],
  },
  {
    id: "tarte",
    name: "Tarte Basca",
    lines: ["Tarte", "Basca"],
    category: "Tarte",
    image: "/images/hero/tarte.webp",
    video: "/videos/tarte-loop2.webm",
    cutout: true,
    width: 1400,
    height: 933,
    rotate: -12,
    lead: "Tarte basca queimada, cremosa no centro e escura na crosta.",
    serve: "Servir fresca, em fatia larga. A pequena chega para dois.",
    sizes: [
      { label: "400g", price: 12 },
      { label: "900g", price: 18 },
      { label: "1650g", price: 29 },
    ],
  },
  {
    id: "brownie",
    name: "Brownie",
    lines: ["Brownie"],
    category: "Brownie",
    image: "/images/hero/brownie.webp",
    video: "/videos/brownie-loop2.webm",
    cutout: true,
    width: 1400,
    height: 933,
    rotate: 7,
    lead: "Brownie denso, húmido no meio, para cortar em quadrados.",
    serve: "Ligeiramente frio. Um quadrado de cada vez.",
    sizes: [{ label: "700g", price: 23 }],
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

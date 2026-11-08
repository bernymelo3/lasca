export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  notes: string;
  /** cross-section base colour (fudge) */
  base: string;
  /** biscuit speckle colour */
  speckle: string;
  /** outer dusting colour */
  crust: string;
  image: string;
};

export const flavors: Flavor[] = [
  {
    id: "classico",
    name: "Clássico",
    tagline: "Bolacha & manteiga",
    notes: "A receita de sempre — bolacha estaladiça envolvida em creme de manteiga e ovo.",
    base: "#e6c98a",
    speckle: "#f3ead6",
    crust: "#d9b877",
    image: "/images/flavor-classic.jpg",
  },
  {
    id: "chocolate",
    name: "Chocolate & Avelã",
    tagline: "Intenso, com avelã tostada",
    notes: "Chocolate negro e avelã inteira, para quem gosta de sabor fundo.",
    base: "#4a2f22",
    speckle: "#c9a884",
    crust: "#3a241a",
    image: "/images/flavor-chocolate.jpg",
  },
  {
    id: "pistacio",
    name: "Pistácio",
    tagline: "Pistácio da Sicília",
    notes: "Creme de pistácio natural, delicado e ligeiramente salgado.",
    base: "#a9b46a",
    speckle: "#eef0d8",
    crust: "#8f9c55",
    image: "/images/flavor-pistachio.jpg",
  },
  {
    id: "branco",
    name: "Chocolate Branco",
    tagline: "Doce e cremoso",
    notes: "Chocolate branco e baunilha, coberto com um véu de açúcar.",
    base: "#f0e6d0",
    speckle: "#cbb89a",
    crust: "#efe7d6",
    image: "/images/flavor-white.jpg",
  },
];

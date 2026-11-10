import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type Lang = "pt" | "en";

type ProductText = Pick<Product, "name" | "lines" | "category" | "lead" | "serve">;

const products: Record<Lang, Record<string, ProductText>> = {
  pt: {
    pistacio: {
      name: "Pistáchio",
      lines: ["Pistáchio"],
      category: "Salame",
      lead: "Salame de pistáchio, com o verde à vista em cada fatia.",
      serve: "Cortar na hora e servir à temperatura ambiente, com café ou um copo de vinho doce.",
    },
    amendoim: {
      name: "Manteiga de Amendoim",
      lines: ["Manteiga de", "Amendoim"],
      category: "Salame",
      lead: "Salame de chocolate com manteiga de amendoim, doce e salgado ao mesmo tempo.",
      serve: "Uma fatia grossa chega. Bom ao lado de um café curto.",
    },
    chocolate: {
      name: "Chocolate Preto e Avelã",
      lines: ["Chocolate", "e Avelã"],
      category: "Salame",
      lead: "Chocolate preto e avelã, denso, para partir e partilhar.",
      serve: "Deixar uns minutos fora do frio antes de cortar, para a fatia não esfarelar.",
    },
    branco: {
      name: "Chocolate Branco",
      lines: ["Chocolate", "Branco"],
      category: "Salame",
      lead: "Salame de chocolate branco, coberto com um véu de açúcar.",
      serve: "Cortar fino. O açúcar por cima estala na primeira dentada.",
    },
    tarte: {
      name: "Tarte Basca",
      lines: ["Tarte", "Basca"],
      category: "Tarte",
      lead: "Tarte basca queimada, cremosa no centro e escura na crosta.",
      serve: "Servir fresca, em fatia larga. A pequena chega para dois.",
    },
    brownie: {
      name: "Brownie",
      lines: ["Brownie"],
      category: "Brownie",
      lead: "Brownie denso, húmido no meio, para cortar em quadrados.",
      serve: "Ligeiramente frio. Um quadrado de cada vez.",
    },
  },
  en: {
    pistacio: {
      name: "Pistachio",
      lines: ["Pistachio"],
      category: "Salame",
      lead: "Pistachio salame, with the green showing in every slice.",
      serve: "Slice to order and serve at room temperature, with coffee or a glass of sweet wine.",
    },
    amendoim: {
      name: "Peanut Butter",
      lines: ["Peanut", "Butter"],
      category: "Salame",
      lead: "Chocolate salame with peanut butter, sweet and salty at once.",
      serve: "One thick slice is enough. Best beside a short coffee.",
    },
    chocolate: {
      name: "Dark Chocolate and Hazelnut",
      lines: ["Chocolate", "and Hazelnut"],
      category: "Salame",
      lead: "Dark chocolate and hazelnut, dense, made to break and share.",
      serve: "Leave it out of the cold for a few minutes before slicing, so it does not crumble.",
    },
    branco: {
      name: "White Chocolate",
      lines: ["White", "Chocolate"],
      category: "Salame",
      lead: "White chocolate salame, covered with a veil of sugar.",
      serve: "Slice it thin. The sugar on top crackles at the first bite.",
    },
    tarte: {
      name: "Basque Tart",
      lines: ["Basque", "Tart"],
      category: "Tart",
      lead: "Burnt Basque tart, creamy in the centre and dark on the crust.",
      serve: "Serve it fresh, in a wide slice. The small one is enough for two.",
    },
    brownie: {
      name: "Brownie",
      lines: ["Brownie"],
      category: "Brownie",
      lead: "A dense brownie, fudgy in the middle, to cut into squares.",
      serve: "Slightly cool. One square at a time.",
    },
  },
};

const ui = {
  pt: {
    title: "Lasca — Salame Artesanal",
    menu: "Menu",
    close: "Fechar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    home: "Lasca — início",
    nav: [
      { href: "#historia", label: "História" },
      { href: "#sabores", label: "Sabores" },
      { href: "#contacto", label: "Contacto" },
    ],
    storyKicker: "A nossa história",
    storyTitle: "Uma receita de família, cortada à fatia.",
    storyP1:
      "A Lasca nasceu de um gesto simples: partir o salame e partilhá-lo. Cada rolo é feito à mão, com bolacha estaladiça, manteiga e chocolate.",
    storyP2: "Cortamos na hora. O resultado é uma lasca irregular, com o recheio à vista.",
    storyMark: "À mão",
    storyAlt: "Salame Lasca cortado à mão",
    stats: [
      { k: "100%", v: "feito à mão" },
      { k: "4", v: "sabores" },
      { k: "0", v: "conservantes" },
    ],
    flavors: "Sabores",
    care: "Feito à mão  ·  Bolacha  ·  Manteiga  ·  Pistácio  ·  Sem pressa  ·  ",
    careLabel: "Como fazemos",
    orderKicker: "Encomendar",
    orderTitle: "Peça a sua lasca.",
    orderBody:
      "Encomendas por mensagem, para levantar ou entregar. Diga-nos o sabor e a quantidade — tratamos do resto.",
    name: "Nome",
    namePh: "O seu nome",
    phone: "Telemóvel",
    phonePh: "9xx xxx xxx",
    email: "Email",
    emailPh: "o seu email",
    request: "Pedido",
    requestPh: "2 rolos de pistácio e 1 clássico…",
    send: "Enviar pedido",
    mailSubject: "Encomenda Lasca",
    footer: "Salame artesanal, cortado à fatia.",
    missing: "Este produto não está no menu.",
    back: "Voltar ao início",
    serve: "Como servir",
    sizes: "Tamanhos",
    price: "Preço",
    orderThis: "Encomendar este",
    others: "Os outros",
    from: "desde",
    hand: ["Feito", "à mão"] as [string, string],
    skip: "Entrar",
  },
  en: {
    title: "Lasca — Artisan Salame",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Lasca — home",
    nav: [
      { href: "#historia", label: "Story" },
      { href: "#sabores", label: "Flavours" },
      { href: "#contacto", label: "Contact" },
    ],
    storyKicker: "Our story",
    storyTitle: "A family recipe, cut into a slice.",
    storyP1:
      "Lasca began with a simple gesture: breaking the salame and sharing it. Each roll is made by hand, with crisp biscuit, butter and chocolate.",
    storyP2: "We slice it to order. The result is an irregular piece, with the filling in plain sight.",
    storyMark: "By hand",
    storyAlt: "Lasca salame sliced by hand",
    stats: [
      { k: "100%", v: "made by hand" },
      { k: "4", v: "flavours" },
      { k: "0", v: "preservatives" },
    ],
    flavors: "Flavours",
    care: "Made by hand  ·  Biscuit  ·  Butter  ·  Pistachio  ·  Unhurried  ·  ",
    careLabel: "How we make it",
    orderKicker: "Order",
    orderTitle: "Ask for your slice.",
    orderBody: "Orders by message, for pickup or delivery. Tell us the flavour and the quantity — we take care of the rest.",
    name: "Name",
    namePh: "Your name",
    phone: "Phone",
    phonePh: "9xx xxx xxx",
    email: "Email",
    emailPh: "your email",
    request: "Order",
    requestPh: "2 pistachio rolls and 1 classic…",
    send: "Send order",
    mailSubject: "Lasca order",
    footer: "Artisan salame, cut into a slice.",
    missing: "This product is not on the menu.",
    back: "Back to the start",
    serve: "How to serve",
    sizes: "Sizes",
    price: "Price",
    orderThis: "Order this",
    others: "The others",
    from: "from",
    hand: ["Made", "by hand"] as [string, string],
    skip: "Enter",
  },
};

type Copy = (typeof ui)["pt"];

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
  localize: (product: Product) => Product;
};

const I18nContext = createContext<I18nValue | null>(null);

function readLang(): Lang {
  const saved = localStorage.getItem("lasca-lang");
  return saved === "en" ? "en" : "pt";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = (next: Lang) => {
    localStorage.setItem("lasca-lang", next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt";
    document.title = ui[lang].title;
  }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const t = ui[lang];
    return {
      lang,
      setLang,
      t,
      localize: (product) => ({ ...product, ...products[lang][product.id] }),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n outside provider");
  return value;
}

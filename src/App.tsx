import { useCallback, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Flavors } from "./components/Flavors";
import { Care } from "./components/Care";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProductView } from "./components/ProductView";
import { Intro } from "./components/Intro";
import { useI18n } from "./i18n";
import { getProduct } from "./data/products";

function readProductId() {
  const match = window.location.hash.match(/^#produto\/([\w-]+)$/);
  return match?.[1] ?? null;
}

function jump(hash: string) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  if (hash && !hash.startsWith("#produto/")) {
    document.querySelector(hash)?.scrollIntoView();
  } else {
    root.scrollTop = 0;
  }
  root.style.scrollBehavior = previous;
}

export default function App() {
  const { t } = useI18n();
  const [productId, setProductId] = useState(readProductId);
  const [introOn, setIntroOn] = useState(true);
  const [logoOn, setLogoOn] = useState(false);
  const openIntro = useCallback(() => setLogoOn(true), []);
  const finishIntro = useCallback(() => {
    setLogoOn(true);
    setIntroOn(false);
  }, []);

  useEffect(() => {
    const apply = () => {
      const id = readProductId();
      setProductId(id);
      requestAnimationFrame(() => jump(id ? "" : window.location.hash));
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const product = productId ? getProduct(productId) : undefined;

  return (
    <div className="relative">
      {introOn && <Intro onOpening={openIntro} onDone={finishIntro} />}
      <Nav logoVisible={logoOn} />
      <main>
        {product ? (
          <ProductView product={product} />
        ) : productId ? (
          <section className="grid min-h-screen place-items-center px-6 text-center">
            <div>
              <p className="font-display text-5xl text-brand-brown">{t.missing}</p>
              <a href="#top" className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-brand-brown/70">
                {t.back}
              </a>
            </div>
          </section>
        ) : (
          <>
            <Hero />
            <Story />
            <Flavors />
            <Care />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

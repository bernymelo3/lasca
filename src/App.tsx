import { useCallback, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Flavors } from "./components/Flavors";
import { Care } from "./components/Care";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PrivacyBar, PrivacySection } from "./components/Privacy";
import { ProductView } from "./components/ProductView";
import { Intro } from "./components/Intro";
import { useI18n } from "./i18n";
import { getProduct } from "./data/products";

function readProductId() {
  const match = window.location.hash.match(/^#produto\/([\w-]+)$/);
  return match?.[1] ?? null;
}

function isPrivacyPage() {
  return window.location.hash === "#privacidade";
}

function jump(hash: string) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  if (hash && !hash.startsWith("#produto/") && hash !== "#privacidade") {
    document.querySelector(hash)?.scrollIntoView();
  } else {
    root.scrollTop = 0;
  }
  root.style.scrollBehavior = previous;
}

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  if (window.location.hash) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem("lasca-intro") !== "1";
  } catch {
    return true;
  }
}

export default function App() {
  const { t } = useI18n();
  const [productId, setProductId] = useState(readProductId);
  const [privacyOn, setPrivacyOn] = useState(isPrivacyPage);
  const [introOn, setIntroOn] = useState(shouldShowIntro);
  const [logoOn, setLogoOn] = useState(() => !shouldShowIntro());
  const openIntro = useCallback(() => setLogoOn(true), []);
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("lasca-intro", "1");
    } catch {
      // Ignore storage restrictions
    }
    setLogoOn(true);
    setIntroOn(false);
  }, []);

  useEffect(() => {
    const apply = () => {
      const id = readProductId();
      setProductId(id);
      setPrivacyOn(isPrivacyPage());
      requestAnimationFrame(() => jump(id || isPrivacyPage() ? "" : window.location.hash));
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
        {privacyOn ? (
          <PrivacySection />
        ) : product ? (
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
      {!introOn && <PrivacyBar />}
    </div>
  );
}

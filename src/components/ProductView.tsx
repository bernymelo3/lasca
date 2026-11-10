import { useEffect, useRef, useState, type Ref } from "react";
import { products, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { preferredAlphaKind } from "@/lib/alphaVideo";
import { LoopCutout } from "@/components/LoopCutout";
import { useI18n } from "@/i18n";

function scrollToTop() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  root.scrollTop = 0;
  root.style.scrollBehavior = previous;
}

export function ProductView({ product }: { product: Product }) {
  const { t, localize } = useI18n();
  const motion = preferredAlphaKind();
  const view = localize(product);
  const imgRef = useRef<HTMLElement>(null);
  const [sizeIndex, setSizeIndex] = useState(0);
  const size = product.sizes[sizeIndex] ?? product.sizes[0];
  const others = products.filter((item) => item.id !== product.id);

  useEffect(() => {
    setSizeIndex(0);
    scrollToTop();
    const previousTitle = document.title;
    document.title = `${view.name} — Lasca`;
    return () => {
      document.title = previousTitle;
    };
  }, [product, view.name]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (progress: number) => {
      const rise = (1 - progress) * 32 - 6;
      const tilt = product.rotate + progress * 12;
      img.style.transform = `translate3d(-50%, ${rise}vh, 0) rotate(${tilt}deg)`;
    };

    paint(reduce ? 0.55 : 0);
    if (reduce) return;

    const onScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.8), 0), 1);
      paint(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [product]);

  return (
    <article>
      <div className="relative h-[150vh] md:h-[165vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-background">
          <h1 className="pointer-events-none absolute left-1/2 top-[12%] w-[92vw] -translate-x-1/2 text-center font-display text-[13vw] font-medium leading-[0.82] tracking-[-0.05em] text-brand-brown sm:text-[15vw] md:top-[14%] md:text-[11vw]">
            {view.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-3 block font-sans text-xs font-normal uppercase tracking-[0.28em] text-brand-brown/60 md:hidden">
              {view.category}
            </span>
          </h1>
          <p className="absolute left-8 top-[48%] hidden font-display text-3xl text-brand-brown md:block lg:left-16 lg:text-4xl">
            {view.category}
          </p>
          <p className="absolute right-8 top-[48%] hidden text-right font-display text-3xl leading-tight text-brand-brown md:block lg:right-16 lg:text-4xl">
            {t.hand[0]}
            <br />
            {t.hand[1]}
          </p>

          {product.video && motion ? (
            <div
              ref={imgRef as Ref<HTMLDivElement>}
              className="cutout-shadow absolute left-1/2 top-[46%] z-10 w-[min(78vw,420px)] md:top-[42%] md:w-[min(86vw,560px)] md:drop-shadow-[0_34px_28px_rgba(40,24,14,0.32)]"
            >
              <LoopCutout
                webm={product.video}
                poster={product.image}
                kind={motion}
                width={product.width}
                height={product.height}
                className="relative block w-full"
              />
            </div>
          ) : (
            <img
              ref={imgRef as Ref<HTMLImageElement>}
              src={product.image}
              alt={view.name}
              width={product.width}
              height={product.height}
              draggable={false}
              className={cn(
                "absolute left-1/2 top-[46%] z-10 w-[min(78vw,420px)] md:top-[42%] md:w-[min(86vw,560px)]",
                product.cutout
                  ? "drop-shadow-[0_34px_28px_rgba(40,24,14,0.32)]"
                  : "aspect-[4/3] rounded-[1.4rem] object-cover"
              )}
            />
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-8 pt-16 md:px-10 md:pt-24">
        <p className="mx-auto max-w-2xl text-center font-display text-3xl leading-snug text-brand-brown-deep md:text-4xl">
          {view.lead}
        </p>

        <div className="mt-16 grid gap-10 border-t border-brand-brown/15 pt-8 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-brown/55">{t.serve}</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/80">{view.serve}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-brown/55">{t.sizes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={index === sizeIndex}
                  onClick={() => setSizeIndex(index)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brown",
                    index === sizeIndex
                      ? "border-brand-brown bg-brand-brown text-background"
                      : "border-brand-brown/25 text-brand-brown hover:border-brand-brown"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-brown/55">{t.price}</p>
            <p className="mt-2 font-display text-6xl leading-none text-brand-brown">{size.price}€</p>
            <a
              href="#contacto"
              onClick={() => {
                sessionStorage.setItem("lasca-pedido", `${view.name}, ${size.label} — ${size.price}€`);
              }}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-brown px-5 py-3 text-sm text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brown"
            >
              {t.orderThis}
            </a>
          </div>
        </div>
      </div>

      <section className="pb-20 pt-10" aria-labelledby="outros-heading">
        <h2 id="outros-heading" className="px-4 font-display text-5xl text-brand-brown md:px-10 md:text-7xl">
          {t.others}
        </h2>
        <ul className="mt-8 flex gap-4 overflow-x-auto px-4 pb-4 md:gap-8 md:px-10">
          {others.map((item) => {
            const other = localize(item);
            return (
            <li key={item.id} className="w-40 shrink-0 md:w-52">
              <a
                href={`#produto/${item.id}`}
                className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-brown"
              >
                <img
                  src={item.image}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className={cn(
                    "mx-auto h-36 w-full md:h-44",
                    item.cutout ? "object-contain drop-shadow-[0_16px_14px_rgba(40,24,14,0.28)]" : "rounded-2xl object-cover"
                  )}
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                />
                <span className="mt-3 block font-display text-2xl leading-none text-brand-brown">{other.name}</span>
                <span className="mt-1 block text-sm text-foreground/60">
                  {item.sizes.length > 1 ? `${t.from} ${item.sizes[0].price}€` : `${item.sizes[0].price}€`}
                </span>
              </a>
            </li>
          );
          })}
        </ul>
      </section>
    </article>
  );
}

import type { CSSProperties } from "react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { preferredAlphaKind } from "@/lib/alphaVideo";
import { LoopCutout } from "@/components/LoopCutout";
import { useI18n } from "@/i18n";

export function Flavors() {
  const { t, localize } = useI18n();
  const motion = preferredAlphaKind();
  return (
    <section id="sabores" className="relative overflow-hidden bg-background pb-8 pt-24 md:pt-16">
      <h2 className="px-5 font-display text-[15vw] font-medium leading-[0.85] tracking-[-0.05em] text-brand-brown md:px-10 md:text-[22vw]">
        {t.flavors}
      </h2>

      <div>
        {products.map((item, index) => {
          const product = localize(item);
          const flip = index % 2 === 1;
          return (
            <a
              key={product.id}
              href={`#produto/${product.id}`}
              className="group relative block overflow-hidden px-4 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-brand-brown md:h-[86vh] md:px-0 md:py-0"
            >
              <div className="flex min-h-[22rem] flex-col justify-center md:block md:h-full md:min-h-0">
              <h3
                className={cn(
                  "relative z-0 max-w-full font-display text-[12vw] font-medium leading-[0.82] tracking-[-0.05em] text-brand-brown md:absolute md:top-1/2 md:w-[70vw] md:-translate-y-1/2 md:text-[8.5vw]",
                  flip ? "md:right-10 md:text-right" : "md:left-10"
                )}
              >
                {product.lines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
                <span
                  className={cn(
                    "mt-3 flex w-fit max-w-full flex-wrap gap-x-3 gap-y-1 font-sans text-[13px] font-normal tracking-[0.14em] text-brand-brown/65 md:mt-4 md:text-sm md:tracking-[0.16em]",
                    flip && "md:ml-auto"
                  )}
                >
                  {product.sizes.map((size) => (
                    <span key={size.label}>
                      {size.label} · {size.price}€
                    </span>
                  ))}
                </span>
              </h3>
              {product.video && motion ? (
                <LoopCutout
                  webm={product.video}
                  poster={product.image}
                  kind={motion}
                  width={product.width}
                  height={product.height}
                  className={cn(
                    "cutout-shadow pointer-events-none relative z-10 mx-auto mt-2 block w-[70vw] max-w-[280px] rotate-[var(--spin)] md:absolute md:top-[46%] md:mx-0 md:mt-0 md:w-[46vw] md:max-w-none md:-translate-y-1/2 md:drop-shadow-[0_30px_24px_rgba(40,24,14,0.32)]",
                    flip ? "md:left-[3%]" : "md:right-[3%]"
                  )}
                  style={{ "--spin": `${product.rotate}deg` } as CSSProperties}
                />
              ) : (
                <img
                  src={product.image}
                  alt=""
                  width={product.width}
                  height={product.height}
                  loading="lazy"
                  className={cn(
                    "pointer-events-none relative z-10 mx-auto mt-2 w-[70vw] max-w-[280px] rotate-[var(--spin)] md:absolute md:top-[46%] md:mx-0 md:mt-0 md:w-[46vw] md:max-w-none md:-translate-y-1/2",
                    flip ? "md:left-[3%]" : "md:right-[3%]",
                    product.cutout
                      ? "drop-shadow-[0_30px_24px_rgba(40,24,14,0.32)]"
                      : "aspect-[4/3] rounded-[1.4rem] object-cover"
                  )}
                  style={{ "--spin": `${product.rotate}deg` } as CSSProperties}
                />
              )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

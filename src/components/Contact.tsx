import { useEffect, useState } from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { Reveal } from "./Reveal";

const EMAIL = "ola@lasca.pt";

export function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pending = sessionStorage.getItem("lasca-pedido");
    if (!pending) return;
    setMessage(pending);
    sessionStorage.removeItem("lasca-pedido");
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.mailSubject} — ${name || "Lasca"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-brown-deep py-20 text-brand-cream md:py-28">
      <p aria-hidden className="pointer-events-none absolute -left-4 top-0 font-display text-[24vw] leading-none text-brand-cream/10">
        Pede
      </p>
      <div className="relative mx-auto max-w-6xl px-4 md:px-10">
        <div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="mb-5 text-xs uppercase tracking-[0.28em] text-brand-cream/70">
                {t.orderKicker}
              </p>
              <h2 className="font-display text-5xl leading-[0.9] md:text-7xl">
                {t.orderTitle}
              </h2>
              <p className="mt-5 max-w-md text-lg text-brand-cream/75">{t.orderBody}</p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`https://instagram.com/lasca`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-brand-cream transition-colors hover:text-white"
                >
                  <Instagram className="h-5 w-5" strokeWidth={1.6} /> @lasca
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 text-brand-cream transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5" strokeWidth={1.6} /> {EMAIL}
                </a>
                <a
                  href="https://wa.me/351900000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-brand-cream transition-colors hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={1.6} /> WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  {t.name}
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="min-h-11 rounded-xl border border-brand-cream/20 bg-brand-cream/10 px-4 py-3 text-base text-brand-cream outline-none placeholder:text-brand-cream/40 focus:border-brand-cream"
                    placeholder={t.namePh}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  {t.request}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="resize-none rounded-xl border border-brand-cream/20 bg-brand-cream/10 px-4 py-3 text-base text-brand-cream outline-none placeholder:text-brand-cream/40 focus:border-brand-cream"
                    placeholder={t.requestPh}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-brand-cream px-7 py-3.5 text-sm font-medium text-brand-brown-deep transition-colors hover:bg-white"
                >
                  {t.send}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

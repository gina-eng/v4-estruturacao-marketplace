import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/data";
import { Star } from "lucide-react";

export default function SocialProof() {
  const { testimonials } = SOCIAL_PROOF as any;
  return (
    <section className="bg-cream">
      <div className="container-content section">
        <header className="max-w-3xl mb-10">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · Avaliações reais no Google
          </div>
          <h2 className="text-3xl md:text-[42px] font-serif font-medium leading-[1.05] tracking-tight">
            Tutoras que já trocaram a clínica genérica pela{" "}
            <em className="italic font-normal">Família Zenvet.</em>
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t: any, i: number) => (
            <article
              key={i}
              className="bg-white rounded-card border border-purple-deep/10 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-cream">
                <Image
                  src={t.photo}
                  alt={t.photo_caption}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-semibold text-purple-deep leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-graphite/60 leading-tight mt-0.5">
                      {t.source} · {t.when}
                    </div>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={13}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-graphite/80 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="text-[11px] italic text-graphite/55 mt-auto pt-2 border-t border-purple-deep/10">
                  {t.photo_caption}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

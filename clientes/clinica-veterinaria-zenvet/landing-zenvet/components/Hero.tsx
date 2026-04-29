import Image from "next/image";
import { sectionByName, WHATSAPP_LINK } from "@/lib/data";
import { MessageCircle, Heart, PawPrint } from "lucide-react";

export default function Hero() {
  const s: any = sectionByName("hero");
  return (
    <section className="relative bg-beige overflow-hidden">
      <div className="container-content section pt-10 md:pt-14 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-16 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-5">
          <Image
            src="/logo/zenvet_horizontal.svg"
            alt="Zenvet"
            width={1138}
            height={363}
            priority
            className="h-16 md:h-20 w-auto -ml-1 mb-2 self-start"
          />
          <span className="sticker self-start">
            <PawPrint size={12} />
            {s.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold text-purple-deep tracking-tight">
            Seu gato merece{" "}
            <em
              className="font-serif italic font-normal text-turquoise-dark px-1"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 62%, #DFF3F5 62%)",
              }}
            >
              uma vet
            </em>
            <br />
            que entende <em className="font-serif italic font-normal">de gato</em>.
          </h1>
          <p className="text-lg md:text-xl text-graphite/80 leading-relaxed max-w-xl">
            {s.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn-primary">
              <MessageCircle size={18} />
              {s.cta_primary}
            </a>
            <a
              href="#dra-nathalia"
              className="inline-flex items-center justify-center gap-1 text-sm text-purple-deep font-medium px-4 py-2"
            >
              {s.cta_secondary}
            </a>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 md:gap-8 pt-7 border-t border-purple-deep/15">
            {s.stats.map((stat: any, i: number) => (
              <div key={i}>
                <div className="font-serif font-semibold text-2xl md:text-[28px] text-purple-deep leading-none">
                  {stat.number}
                </div>
                <div className="text-[11px] md:text-xs text-graphite/65 mt-1.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo + credential card */}
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-xl">
            <Image
              src="/photos/dra-com-gato.png"
              alt="Dra. Nathalia com gato no colo"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 md:-left-5 bg-white rounded-full px-4 py-3 shadow-2xl flex items-center gap-3 max-w-[280px]">
            <div className="w-10 h-10 rounded-full bg-turquoise-mist text-turquoise-dark flex items-center justify-center flex-shrink-0">
              <Heart size={18} />
            </div>
            <div>
              <div className="text-[12px] font-semibold text-purple-deep leading-tight">
                {s.credential_card.name}
              </div>
              <div className="text-[11px] text-graphite/65 leading-tight">
                {s.credential_card.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

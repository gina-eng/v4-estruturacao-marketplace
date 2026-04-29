import Image from "next/image";
import { sectionByName, WHATSAPP_LINK } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function DraNathalia() {
  const s: any = sectionByName("dra_nathalia");
  return (
    <section
      id="dra-nathalia"
      className="bg-purple-deep text-white relative overflow-hidden"
    >
      <div className="container-content section grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-center relative z-10">
        {/* Photo */}
        <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-2xl">
          <Image
            src="/photos/dra-retrato.png"
            alt="Dra. Nathalia — retrato profissional"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Copy + credentials */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-light mb-4">
            · {s.eyebrow}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.0] font-serif font-normal !text-white tracking-tight mb-5">
            Dra. Nathalia.
            <br />
            <em className="italic font-normal text-turquoise-light">
              A vet em quem seu gato confia.
            </em>
          </h2>
          <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
            {s.subheadline}
          </p>

          <div className="max-w-xl mb-8">
            {s.credentials.map((c: any, i: number) => (
              <div
                key={i}
                className="grid grid-cols-[140px_1fr] gap-4 py-3.5 border-t border-white/15"
              >
                <span className="font-mono text-xs md:text-sm text-turquoise-light">
                  {c.year}
                </span>
                <span className="text-sm md:text-[15px] text-white/90">
                  {c.title}
                </span>
              </div>
            ))}
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 bg-turquoise text-purple-shadow font-semibold px-6 py-3.5 rounded-full hover:opacity-90 transition shadow-lg"
          >
            {s.cta_primary}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-magenta/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-turquoise/15 blur-3xl pointer-events-none" />
    </section>
  );
}

import Image from "next/image";
import { sectionByName } from "@/lib/data";
import { Heart, ChevronDown } from "lucide-react";

export default function Hero() {
  const s: any = sectionByName("hero");
  return (
    <section className="relative bg-beige overflow-hidden min-h-[100svh] md:min-h-screen">
      {/* Text column — inside container-content, vertically centered on desktop */}
      <div className="container-content w-full px-6 pt-10 md:pt-14 pb-[52vh] md:pb-0 md:min-h-screen md:flex md:items-center relative z-10">
        <div className="md:w-[55%] lg:w-[52%] flex flex-col gap-6">
          <Image
            src="/logo/zenvet_horizontal.svg"
            alt="Zenvet"
            width={1138}
            height={363}
            priority
            className="h-12 sm:h-14 md:h-20 w-auto -ml-1 mb-1 md:mb-3 self-start"
          />
          <h1 className="text-[2.1rem] leading-[1.1] sm:text-4xl sm:leading-[1.15] md:text-5xl lg:text-6xl font-bold text-purple-deep tracking-tight">
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
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-graphite/80 leading-relaxed max-w-xl">
            {s.subheadline}
          </p>
        </div>
      </div>

      {/* Photo:
          - Mobile: pinned to bottom of section, full width, 52vh tall (under the text)
          - Desktop: anchored bottom-right of viewport, 50vw wide, 86vh tall
            (leaving a thin beige strip at the top for breathing room) */}
      <div className="absolute inset-x-0 bottom-0 h-[52vh] md:left-auto md:right-0 md:bottom-0 md:top-auto md:w-1/2 md:h-[86vh] lg:h-[88vh] pointer-events-none overflow-hidden">
        <Image
          src="/photos/dra-nathalia-cutout.png"
          alt="Dra. Nathalia com gato preto no colo — Clínica Zenvet"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain object-bottom"
        />
        <div className="absolute bottom-24 left-3 sm:bottom-28 sm:left-5 md:bottom-32 md:left-6 lg:bottom-36 lg:left-10 bg-white rounded-full px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl flex items-center gap-3 max-w-[230px] sm:max-w-[260px] md:max-w-[280px] z-10 pointer-events-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-turquoise-mist text-turquoise-dark flex items-center justify-center flex-shrink-0">
            <Heart size={16} className="sm:size-[18px]" />
          </div>
          <div>
            <div className="text-[11px] sm:text-[12px] font-semibold text-purple-deep leading-tight">
              {s.credential_card.name}
            </div>
            <div className="text-[10px] sm:text-[11px] text-graphite/65 leading-tight">
              {s.credential_card.role}
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll-down arrow */}
      <a
        href="#stats"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex w-11 h-11 md:w-14 md:h-14 rounded-full border border-purple-deep/30 items-center justify-center text-purple-deep hover:border-purple-deep/60 hover:bg-purple-deep/5 transition z-20 bg-beige/40 backdrop-blur-sm"
        style={{ animation: "scrollHint 2.4s ease-in-out infinite" }}
      >
        <ChevronDown size={26} strokeWidth={1.6} />
      </a>
    </section>
  );
}

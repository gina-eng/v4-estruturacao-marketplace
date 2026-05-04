"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
  /** object-position to keep the subject framed when cropped to landscape */
  position: string;
};

const SLIDES: Slide[] = [
  { src: "/photos/team/photo-01.jpg", alt: "Dra. Nathalia em scrubs vinho com dois filhotes de pomerânia no colo", position: "50% 30%" },
  { src: "/photos/team/photo-02.jpg", alt: "Profissional Zenvet com gato branco de olhos heterocrômicos", position: "50% 25%" },
  { src: "/photos/team/photo-03.jpg", alt: "Quatro filhotes recém-nascidos sustentados pela veterinária Zenvet", position: "50% 45%" },
  { src: "/photos/team/photo-04.jpg", alt: "Veterinária Zenvet abraçando um cão pitbull cinza, sentada no chão da clínica", position: "50% 30%" },
  { src: "/photos/team/photo-05.jpg", alt: "Profissional Zenvet com filhote branco recém-acolhido", position: "50% 30%" },
  { src: "/photos/team/photo-06.jpg", alt: "Veterinária Zenvet com filhote tabby sobre cobertor azul", position: "50% 30%" },
  { src: "/photos/team/photo-07.jpg", alt: "Profissional Zenvet com gato laranja claro recebendo cuidado", position: "50% 30%" },
  { src: "/photos/team/photo-08.jpg", alt: "Veterinária Zenvet beijando gato bengal de pelagem laranja", position: "50% 35%" },
  { src: "/photos/team/photo-09.jpg", alt: "Dra. Nathalia com gato siamês e gato branco sobre maca da clínica", position: "50% 35%" },
];

export default function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = Math.max(0, Math.min(SLIDES.length - 1, active + dir));
      scrollToIndex(next);
    },
    [active, scrollToIndex]
  );

  // Track active card based on scroll position (closest to left edge)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackLeft = track.scrollLeft;
        let nearestIdx = 0;
        let nearestDelta = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const delta = Math.abs(el.offsetLeft - track.offsetLeft - trackLeft);
          if (delta < nearestDelta) {
            nearestDelta = delta;
            nearestIdx = i;
          }
        });
        setActive(nearestIdx);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="bastidores" className="bg-turquoise-mist relative overflow-hidden">
      <div className="container-content section">
        <header className="max-w-3xl mb-8 md:mb-10">
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-turquoise-dark mb-3">
            ·· Bastidores da Zenvet
          </div>
          <h2 className="text-3xl md:text-[40px] font-serif font-medium leading-[1.05] tracking-tight mb-3">
            Por trás de cada cuidado,{" "}
            <em className="italic font-normal text-purple-deep">gente que ama animal.</em>
          </h2>
          <p className="text-base text-graphite/75 leading-relaxed">
            Um pedacinho da rotina da equipe — felinos, cães, filhotes e idosos, todos tratados como família.
          </p>
        </header>

        {/* Gallery */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pr-6 md:pr-0 -mx-6 px-6 md:mx-0 md:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            aria-roledescription="carousel"
            aria-label="Galeria da equipe Zenvet"
          >
            {SLIDES.map((slide, i) => (
              <article
                key={i}
                className="snap-start shrink-0 w-[78vw] sm:w-[44vw] md:w-[32%] lg:w-[24%] relative rounded-[16px] overflow-hidden bg-white shadow-md ring-1 ring-purple-deep/10"
                aria-label={`Foto ${i + 1} de ${SLIDES.length}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, (min-width: 640px) 44vw, 78vw"
                    className="object-cover"
                    style={{ objectPosition: slide.position }}
                  />
                </div>
              </article>
            ))}
          </div>

          {/* Hide native scrollbar in WebKit */}
          <style jsx>{`
            div[aria-roledescription="carousel"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Prev / Next buttons */}
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Foto anterior"
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-5 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-purple-deep/15 text-purple-deep shadow-md hover:shadow-lg transition flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === SLIDES.length - 1}
            aria-label="Próxima foto"
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-5 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-purple-deep/15 text-purple-deep shadow-md hover:shadow-lg transition flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para foto ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-purple-deep"
                  : "w-1.5 bg-purple-deep/25 hover:bg-purple-deep/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

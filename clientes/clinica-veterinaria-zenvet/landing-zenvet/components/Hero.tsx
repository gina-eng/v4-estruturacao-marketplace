import Image from "next/image";
import { sectionByName } from "@/lib/data";
import { Cat, Heart, Home, PawPrint, Star, type LucideIcon } from "lucide-react";

const PILL_ICONS: Record<string, LucideIcon> = {
  cat: Cat,
  heart: Heart,
  home: Home,
};

export default function Hero() {
  const s: any = sectionByName("hero");
  const pills: { icon: string; label: string }[] = s.pills ?? [];
  const bar = s.social_bar;

  return (
    <section
      id="hero"
      className="relative bg-beige overflow-hidden min-h-[100svh] md:min-h-screen 2xl:min-h-0 2xl:h-[100svh] 2xl:max-h-[1000px] flex flex-col"
    >
      <div className="w-full mx-auto max-w-[1140px] xl:max-w-[1320px] 2xl:max-w-[1440px] px-6 pt-4 md:pt-6 pb-4 md:pb-6 flex-1 flex flex-col">
        {/* Two columns: text + photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-10 items-stretch flex-1 min-h-0">
          {/* Text column */}
          <div className="flex flex-col justify-center gap-5 xl:gap-6 order-2 md:order-1">
            <Image
              src="/logo/zenvet_horizontal.svg"
              alt="Zenvet"
              width={1138}
              height={363}
              priority
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 w-auto -ml-1 self-start"
            />

            <h1 className="text-[2rem] leading-[1.05] sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-bold text-purple-deep tracking-tight">
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
              que entende{" "}
              <em className="font-serif italic font-normal">de gato</em>.
            </h1>

            <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-[1.375rem] text-graphite/75 leading-relaxed max-w-xl xl:max-w-2xl">
              {s.subheadline}
            </p>

            {/* Feature pills — compact row */}
            {pills.length > 0 && (
              <div className="flex flex-wrap gap-3 xl:gap-4 mt-1">
                {pills.map((p) => {
                  const Icon = PILL_ICONS[p.icon] ?? Heart;
                  return (
                    <div
                      key={p.label}
                      className="flex items-center gap-2 xl:gap-3 bg-white/90 rounded-xl px-3 py-2.5 xl:px-4 xl:py-3.5 shadow-sm border border-purple-deep/5"
                    >
                      <Icon
                        className="size-[18px] xl:size-[22px] text-purple-deep flex-shrink-0"
                      />
                      <span className="text-[12px] sm:text-[13px] xl:text-[15px] font-medium text-purple-deep leading-tight max-w-[90px] xl:max-w-[120px]">
                        {p.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Photo column */}
          <div className="relative order-1 md:order-2 min-h-[45vh] md:min-h-0">
            <Image
              src="/photos/dra-nathalia-hero.png"
              alt="Dra. Nathalia com gato no colo — Clínica Zenvet"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain object-bottom"
            />

            {/* Credential card — overlaps mid-right, can extend past viewport edge */}
            <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:-right-6 lg:-right-10 xl:-right-16 2xl:-right-24 bg-white rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 xl:px-5 xl:py-4 shadow-xl flex items-center gap-2.5 xl:gap-3 z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full bg-turquoise-mist text-turquoise-dark flex items-center justify-center flex-shrink-0">
                <PawPrint className="size-[16px] sm:size-[18px] xl:size-[22px]" />
              </div>
              <div>
                <div className="text-[12px] sm:text-[13px] xl:text-[15px] font-semibold text-purple-deep leading-tight">
                  {s.credential_card.name}
                </div>
                <div className="text-[10px] sm:text-[11px] xl:text-[13px] text-graphite/65 leading-tight mt-0.5">
                  {s.credential_card.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof bar — full container width below the columns */}
        {bar && (
          <div className="mt-4 md:mt-5 xl:mt-6 bg-purple-deep/10 rounded-2xl px-4 py-3 md:px-6 md:py-3.5 xl:px-8 xl:py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5 xl:gap-7">
            <div className="flex items-center gap-1 xl:gap-1.5 flex-shrink-0">
              {Array.from({ length: bar.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="size-[20px] xl:size-[24px] fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="text-[13px] sm:text-sm md:text-[15px] xl:text-[17px] text-purple-deep flex-1">
              {bar.text_prefix}{" "}
              <strong className="font-bold">{bar.text_number}</strong>{" "}
              {bar.text_suffix}
            </div>
            <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
              <div className="flex -space-x-2">
                {bar.avatars.slice(0, 4).map((src: string, i: number) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-9 md:h-9 xl:w-11 xl:h-11 rounded-full border-2 border-white overflow-hidden bg-beige relative"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 md:w-9 md:h-9 xl:w-11 xl:h-11 rounded-full border-2 border-white bg-purple-deep text-white text-[10px] md:text-[11px] xl:text-[13px] font-bold flex items-center justify-center">
                  {bar.badge}
                </div>
              </div>
              <span className="text-[12px] md:text-[13px] xl:text-[15px] text-purple-deep/75 italic">
                {bar.tail}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

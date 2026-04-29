import { sectionByName, WHATSAPP_LINK } from "@/lib/data";
import { MessageCircle, ArrowDown } from "lucide-react";
import HeroPhoto from "./HeroPhoto";

export default function Hero() {
  const s: any = sectionByName("hero");
  return (
    <section className="relative bg-beige overflow-hidden">
      <div className="container-content section grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="text-xs uppercase tracking-widest text-purple-deep/70 font-semibold">
            Clínica veterinária especialista em felinos · Americana SP
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-bold">
            {s.headline}
          </h1>
          <p className="text-lg md:text-xl text-graphite/80 leading-relaxed max-w-xl">
            {s.subheadline}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn-primary">
              <MessageCircle size={18} />
              {s.cta_primary}
            </a>
            <a href="#solution" className="btn-secondary">
              {s.cta_secondary}
              <ArrowDown size={18} />
            </a>
          </div>
          <div className="text-sm text-graphite/60 pt-2">
            Loíse responde em até 30 min · Seg–Sex 8h às 18h
          </div>
        </div>
        <HeroPhoto />
      </div>
    </section>
  );
}

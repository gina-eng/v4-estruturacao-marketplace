import { sectionByName } from "@/lib/data";
import { Stethoscope, Heart, ListChecks, Clock } from "lucide-react";

const ICONS: Record<string, any> = {
  stethoscope: Stethoscope,
  heart: Heart,
  "list-check": ListChecks,
  clock: Clock,
};

export default function Solution() {
  const s: any = sectionByName("solution");
  return (
    <section id="solution" className="bg-beige">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · A combinação proprietária
          </div>
          <h2 className="text-3xl md:text-[42px] font-serif font-medium leading-[1.05] tracking-tight mb-4">
            {s.headline}
          </h2>
          <p className="text-base md:text-lg text-graphite/75 leading-relaxed">
            {s.subheadline}
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-5">
          {s.benefits.map((b: any, i: number) => {
            const Icon = ICONS[b.icon] || Heart;
            return (
              <div
                key={i}
                className="bg-white border border-purple-deep/10 rounded-card p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-turquoise-mist text-turquoise-dark flex items-center justify-center flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-medium !text-purple-deep mb-2">
                    {b.title}
                  </h3>
                  <p className="text-graphite/75 text-sm leading-relaxed">{b.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section id="solution" className="bg-purple-deep text-white">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-turquoise font-semibold mb-3">
            A combinação proprietária
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-white">{s.headline}</h2>
          <p className="text-lg text-white/85">{s.subheadline}</p>
        </header>
        <div className="grid md:grid-cols-2 gap-5">
          {s.benefits.map((b: any, i: number) => {
            const Icon = ICONS[b.icon] || Heart;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-magenta/20 flex items-center justify-center text-turquoise flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold !text-white mb-2">{b.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{b.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

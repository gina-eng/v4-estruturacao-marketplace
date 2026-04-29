import { sectionByName } from "@/lib/data";
import { Check } from "lucide-react";

export default function Deliverables() {
  const s: any = sectionByName("deliverables");
  return (
    <section id="deliverables" className="bg-beige">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{s.headline}</h2>
          <p className="text-lg text-graphite/80">{s.subheadline}</p>
        </header>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-5 max-w-4xl">
          {s.items.map((item: any, i: number) => (
            <li key={i} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-turquoise/15 flex items-center justify-center text-turquoise flex-shrink-0 mt-1">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="font-semibold text-graphite">{item.title}</div>
                <div className="text-sm text-graphite/70 leading-relaxed">{item.benefit}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

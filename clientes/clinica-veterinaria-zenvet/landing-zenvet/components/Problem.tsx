import { sectionByName } from "@/lib/data";
import { AlertCircle } from "lucide-react";

export default function Problem() {
  const s: any = sectionByName("problem");
  return (
    <section id="problem" className="bg-white">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{s.headline}</h2>
          <p className="text-lg text-graphite/80">{s.subheadline}</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          {s.cards.map((c: any, i: number) => (
            <div key={i} className="bg-beige/40 border border-graphite/10 rounded-card p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-magenta/10 flex items-center justify-center text-magenta">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-lg font-semibold !text-graphite">{c.title}</h3>
              <p className="text-graphite/75 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

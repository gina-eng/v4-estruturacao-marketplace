import { sectionByName } from "@/lib/data";

export default function Problem() {
  const s: any = sectionByName("problem");
  return (
    <section id="problem" className="bg-white">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · {s.eyebrow}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            Cansado(a) de consulta corrida que parece{" "}
            <em className="italic font-normal text-graphite/70">protocolo de fábrica?</em>
          </h2>
          <p className="text-base md:text-lg text-graphite/75 leading-relaxed max-w-xl">
            {s.subheadline}
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-5">
          {s.cards.map((c: any, i: number) => (
            <div
              key={i}
              className="bg-white border border-purple-deep/10 rounded-card p-7 flex flex-col"
            >
              <div className="w-9 h-9 rounded-[10px] bg-turquoise-mist text-turquoise-dark flex items-center justify-center font-bold text-base mb-5">
                0{i + 1}
              </div>
              <h3 className="text-xl md:text-[22px] font-serif font-medium !text-purple-deep mb-2 leading-tight">
                {c.title}
              </h3>
              <p className="text-sm text-graphite/75 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

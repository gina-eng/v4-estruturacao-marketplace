import { sectionByName } from "@/lib/data";

export default function HowItWorks() {
  const s: any = sectionByName("how_it_works");
  return (
    <section className="bg-beige/40">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{s.headline}</h2>
          <p className="text-lg text-graphite/80">{s.subheadline}</p>
        </header>
        <ol className="grid md:grid-cols-3 gap-6">
          {s.steps.map((step: any) => (
            <li key={step.number} className="bg-white border border-graphite/10 rounded-card p-6 relative">
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-purple-deep text-white font-bold flex items-center justify-center shadow-md">
                {step.number}
              </div>
              <h3 className="!text-graphite text-lg font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-graphite/75 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

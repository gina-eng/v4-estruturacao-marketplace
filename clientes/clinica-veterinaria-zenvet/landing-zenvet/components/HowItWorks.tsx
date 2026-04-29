import { sectionByName } from "@/lib/data";

export default function HowItWorks() {
  const s: any = sectionByName("how_it_works");
  return (
    <section id="how-it-works" className="bg-white">
      <div className="container-content section">
        <header className="max-w-3xl mb-12">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · {s.eyebrow}
          </div>
          <h2 className="text-3xl md:text-[44px] font-serif font-medium leading-[1.05] tracking-tight mb-3">
            Quatro passos pra tirar o estresse{" "}
            <em className="italic font-normal">do seu gato — e o seu.</em>
          </h2>
          <p className="text-base md:text-lg text-graphite/75 leading-relaxed">
            {s.subheadline}
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {s.steps.map((step: any, i: number) => (
            <div
              key={step.number}
              className={`p-6 rounded-[14px] ${
                i % 2 === 0 ? "bg-white" : "bg-turquoise-mist"
              }`}
            >
              <div className="font-serif font-medium text-[44px] text-turquoise leading-none mb-3">
                {String(step.number).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-serif font-medium !text-purple-deep mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-[13px] text-graphite/75 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

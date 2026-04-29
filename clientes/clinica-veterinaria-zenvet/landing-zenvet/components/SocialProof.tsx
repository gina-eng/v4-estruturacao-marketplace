import { SOCIAL_PROOF } from "@/lib/data";
import { Quote } from "lucide-react";

export default function SocialProof() {
  const { stats, testimonials } = SOCIAL_PROOF;
  return (
    <section className="bg-beige">
      <div className="container-content section">
        <header className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-widest text-purple-deep/70 font-semibold mb-3">
            Quem confia
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Os números que sustentam o que prometemos.</h2>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s: any, i: number) => (
            <div key={i} className="bg-white rounded-card p-5 border border-graphite/10 text-center">
              <div className="font-serif font-bold text-3xl md:text-4xl !text-purple-deep mb-1">
                {s.number}
              </div>
              <div className="text-xs uppercase tracking-wide text-graphite/60 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t: any, i: number) => {
            const isPlaceholder = t.name?.startsWith("[Placeholder");
            return (
              <blockquote
                key={i}
                className={`bg-white rounded-card p-6 border-2 ${
                  isPlaceholder ? "border-dashed border-magenta/40" : "border-graphite/10"
                } flex flex-col gap-4`}
              >
                <Quote size={22} className="text-purple-deep/40" />
                <p className={`text-sm leading-relaxed ${isPlaceholder ? "text-graphite/50 italic" : "text-graphite/85"}`}>
                  {t.text}
                </p>
                <footer className="border-t border-graphite/10 pt-3 mt-auto">
                  <div className={`font-semibold text-sm ${isPlaceholder ? "text-magenta/80" : "text-graphite"}`}>
                    {t.name}
                  </div>
                  <div className="text-xs text-graphite/60">{t.role}</div>
                </footer>
              </blockquote>
            );
          })}
        </div>
        <div className="mt-6 text-xs text-magenta/70 italic max-w-2xl">
          ⚠ Depoimentos com placeholder — operador deve coletar 2-3 reais (Google Reviews / Loíse / IG) e substituir antes de publicar.
        </div>
      </div>
    </section>
  );
}

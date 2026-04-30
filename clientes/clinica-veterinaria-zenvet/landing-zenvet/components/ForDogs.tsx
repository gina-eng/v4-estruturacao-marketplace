import Image from "next/image";
import { WHATSAPP_LINK } from "@/lib/data";
import { MessageCircle, Check } from "lucide-react";

const POINTS = [
  "40 minutos com a Dra. Nathalia, sem consulta corrida",
  "Orçamento item a item, aprovado antes da execução",
  "Acompanhamento no WhatsApp depois — sem custo extra",
];

export default function ForDogs() {
  return (
    <section id="for-dogs" className="bg-turquoise-mist relative overflow-hidden">
      <div className="container-content section">
        <div className="grid md:grid-cols-[1fr_1.05fr] gap-8 md:gap-12 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] md:aspect-[4/5] rounded-card overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/photos/caes-tres.png"
              alt="Três cães atendidos pela Zenvet — dois adultos e um filhote — em sessão fotográfica"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute -bottom-1 -left-1 -right-1 h-24 bg-gradient-to-t from-purple-deep/30 to-transparent pointer-events-none" />
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-[42px] font-serif font-medium leading-[1.05] tracking-tight !text-graphite mb-5">
              Seu cachorro também é{" "}
              <em className="italic font-normal text-purple-deep">
                família Zenvet.
              </em>
            </h2>
            <p className="text-base md:text-lg text-graphite/80 leading-relaxed mb-6 max-w-xl">
              A Dra. Nathalia é a especialista em felinos, mas a Equipe Zenvet conta com
              profissionais especialistas em cães, tratando com o mesmo cuidado humanizado,
              escuta e transparência item a item. Do filhote ao idoso, do pequeno ao grande
              porte — atendimento na clínica em Americana ou em domicílio.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-3 mb-7 max-w-xl">
              {POINTS.map((p, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-purple-deep/10 text-purple-deep flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[13px] md:text-sm text-graphite/85 leading-snug">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-purple-deep text-white font-semibold px-6 py-3.5 rounded-full hover:opacity-90 transition shadow-lg"
            >
              <MessageCircle size={18} />
              Agendar para meu cachorro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

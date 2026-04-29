import { WHATSAPP_LINK } from "@/lib/data";
import { Dog, MessageCircle } from "lucide-react";

export default function ForDogs() {
  return (
    <section id="for-dogs" className="bg-turquoise-mist">
      <div className="container-content section">
        <div className="bg-purple-deep/5 rounded-card p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-full bg-purple-deep/10 flex items-center justify-center text-purple-deep flex-shrink-0">
            <Dog size={26} />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest text-purple-deep/70 font-semibold mb-2">
              Para tutores de cães
            </div>
            <h3 className="text-xl md:text-2xl font-bold !text-graphite mb-3">
              Cães também — com hora marcada, sem fila e valor explicado antes.
            </h3>
            <p className="text-graphite/80 leading-relaxed mb-4">
              Atendemos cães com o mesmo cuidado humanizado e a mesma transparência de preço.
              Somos especialistas em felinos por escolha técnica, e cães são bem-vindos com o
              mesmo DNA: 40 minutos com a Dra. Nathalia, orçamento item a item, acompanhamento
              no WhatsApp depois. Sem o ritual do hospital 24h.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-magenta font-semibold hover:underline">
              <MessageCircle size={16} />
              Agendar para meu cachorro →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

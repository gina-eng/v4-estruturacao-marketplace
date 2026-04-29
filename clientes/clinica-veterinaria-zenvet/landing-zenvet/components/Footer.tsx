import Image from "next/image";
import { ADDRESS, INSTAGRAM, PHONE_DISPLAY, HOURS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-purple-shadow text-beige/80 px-6 pt-14 pb-8">
      <div className="container-content grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div>
          <Image
            src="/logo/zenvet_horizontal_white.svg"
            alt="Zenvet"
            width={1138}
            height={363}
            className="h-9 w-auto mb-4"
          />
          <p className="font-serif italic text-lg text-beige mb-3">
            Cuidar é o nosso jeito.
          </p>
          <p className="text-[13px] leading-relaxed">
            {ADDRESS}
          </p>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-turquoise-light uppercase tracking-[0.1em] mb-4">
            Atendimento
          </div>
          <div className="text-[13px] leading-[1.9]">
            {HOURS}
            <br />
            WhatsApp · {PHONE_DISPLAY}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-turquoise-light uppercase tracking-[0.1em] mb-4">
            Por aqui
          </div>
          <div className="text-[13px] leading-[1.9]">
            <a
              href={`https://instagram.com/${INSTAGRAM.replace("@", "")}`}
              target="_blank"
              rel="noopener"
              className="hover:text-beige"
            >
              {INSTAGRAM}
            </a>
            <br />
            contato@zenvet.com.br
          </div>
        </div>
      </div>
      <div className="container-content mt-10 pt-5 border-t border-white/10 text-[11px] text-beige/50">
        © 2026 Zenvet · Todos os direitos reservados.
      </div>
    </footer>
  );
}

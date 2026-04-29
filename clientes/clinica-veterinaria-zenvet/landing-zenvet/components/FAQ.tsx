"use client";

import { useState } from "react";
import { FAQ as FAQ_DATA } from "@/lib/data";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  return (
    <section id="faq" className="bg-white">
      <div className="container-content section max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · Perguntas frequentes
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-3">
            Tira dúvidas <em className="italic font-normal">antes de marcar.</em>
          </h2>
          <p className="text-base md:text-lg text-graphite/75">
            Se sua dúvida não está aqui, manda no WhatsApp — a Loíse responde em até 30 min.
          </p>
        </header>
        <div className="border-y border-purple-deep/15">
          {FAQ_DATA.map((q: any, i: number) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-purple-deep/15 last:border-b-0">
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-serif text-lg md:text-xl font-medium text-purple-deep leading-tight">
                    {q.question}
                  </span>
                  <Plus
                    size={22}
                    className={`text-turquoise-dark flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-graphite/75 leading-relaxed pb-5 pr-8 text-sm md:text-[15px]">
                      {q.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

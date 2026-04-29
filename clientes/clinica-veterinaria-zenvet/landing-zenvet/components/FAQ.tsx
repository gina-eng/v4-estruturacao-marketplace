"use client";

import { FAQ as FAQ_DATA } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  return (
    <section className="bg-white">
      <div className="container-content section max-w-4xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas que tutoras fazem.</h2>
          <p className="text-lg text-graphite/75">
            Se sua dúvida não está aqui, manda no WhatsApp — a Loíse responde em até 30 min.
          </p>
        </header>
        <div className="divide-y divide-graphite/15 border-y border-graphite/15">
          {FAQ_DATA.map((q: any, i: number) => (
            <details key={i} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <span className="font-semibold text-graphite text-base md:text-lg">{q.question}</span>
                <ChevronDown
                  size={20}
                  className="text-purple-deep flex-shrink-0 transition-transform group-open:rotate-180 mt-1"
                />
              </summary>
              <p className="text-graphite/75 leading-relaxed mt-3 pr-8 text-sm md:text-base">
                {q.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

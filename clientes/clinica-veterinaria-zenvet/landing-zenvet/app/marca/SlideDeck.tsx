"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Cores oficiais do JSON canônico do manual
const ROXO = "#4B1C7D";
const ROXO_SHADOW = "#2E0F55";
const TURQUOISE = "#00B8BD";
const BEIGE = "#F6EAD8";
const CREAM = "#FBF4E4";

type Slide = {
  id: string;
  topic: string;
  render: () => JSX.Element;
};

// ========== SLIDE 01 — CAPA ==========
function SlideCover() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center px-12"
      style={{ background: ROXO }}
    >
      {/* Aurora decorativa (mesmo padrão da LP — DraNathalia / FinalCTA) */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "rgba(168,53,140,0.20)",
          filter: "blur(120px)",
          transform: "translate(20%, 20%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "rgba(0,184,189,0.15)",
          filter: "blur(120px)",
          transform: "translate(-20%, -20%)",
        }}
      />

      <p
        className="text-[15px] tracking-[0.3em] uppercase text-white/75 mb-10 relative z-10"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Manual de Identidade Visual
      </p>

      <Image
        src="/logo/zenvet_horizontal_white.svg"
        alt="Zenvet"
        width={1138}
        height={363}
        priority
        className="h-36 md:h-48 lg:h-60 w-auto relative z-10"
      />

      {/* Footer */}
      <div
        className="absolute bottom-8 left-12 right-12 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-white/45 z-10"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span>v1.0 · 2026</span>
        <span>Zenvet · Americana / SP</span>
      </div>
    </div>
  );
}

// ========== SLIDE 02 — SUMÁRIO ==========
function SlideSumario() {
  const blocos = [
    { num: "01", title: "Sobre a marca", items: ["Manifesto", "Pilares de marca", "Posicionamento", "PUV", "Essência"] },
    { num: "02", title: "Identidade verbal", items: ["Tom de voz", "Vocabulário-chave", "Diga · Não diga"] },
    { num: "03", title: "Identidade visual", items: ["Cores", "Tipografia", "Logo · aplicações", "Usos proibidos"] },
    { num: "04", title: "Persona", items: ["Mariana — tutora consciente", "Carlos — tutor de cão"] },
    { num: "05", title: "Aplicações", items: ["Logo hero", "Criativos para tráfego", "Stories"] },
  ];
  return (
    <div className="w-full h-full overflow-hidden flex" style={{ background: ROXO }}>
      <div className="w-1/2 flex items-center justify-center px-12">
        <h1
          className="text-white leading-[0.95] tracking-tight"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: "clamp(120px, 18vw, 280px)",
          }}
        >
          su<br />má<br />rio
        </h1>
      </div>
      <div className="w-1/2 flex items-center px-12 py-16">
        <div className="space-y-8 w-full">
          {blocos.map((b) => (
            <div key={b.num}>
              <div className="flex items-baseline gap-4 pb-2 border-b border-white/25">
                <span
                  className="text-white/55 text-sm tabular-nums"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {b.num}
                </span>
                <h3
                  className="text-white text-2xl md:text-3xl font-medium"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {b.title}
                </h3>
              </div>
              <ul className="mt-2 ml-10 text-white/65 text-[14px] flex flex-wrap gap-x-5 gap-y-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 03 — SOBRE A MARCA / MANIFESTO ==========
function SlideManifesto() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FBF4E4] flex">
      <div className="absolute top-12 left-12 text-[12px] tracking-[0.25em] uppercase text-[#008185]"
        style={{ fontFamily: "var(--font-inter)" }}>
        Sobre a marca · Manifesto
      </div>
      <div className="w-full flex items-center px-20 lg:px-28">
        <div className="max-w-6xl">
          <p className="text-[#4B1C7D]/45 text-5xl mb-2 leading-none"
            style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontWeight: 400 }}>
            “
          </p>
          <p className="text-[#4B1C7D] leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(48px, 6.2vw, 92px)" }}>
            Em Americana, somos a clínica para quem trata gato como{" "}
            <span style={{ background: "linear-gradient(transparent 60%, #DFF3F5 60%)", padding: "0 4px" }}>filho da casa</span> — e quer ser tratada como{" "}
            <span className="text-[#00B8BD]">adulta que decide com informação</span>.
          </p>
          <div className="mt-12 flex items-center gap-3 text-[13px] tracking-[0.2em] uppercase text-[#2E2E33]/55"
            style={{ fontFamily: "var(--font-inter)" }}>
            <span className="w-14 h-px bg-[#4B1C7D]/30" />
            <span>Manifesto Zenvet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 04 — POSICIONAMENTO ==========
function SlidePosicionamento() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: ROXO_SHADOW }}>
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#8FD9DF]"
        style={{ fontFamily: "var(--font-inter)" }}>
        Posicionamento
      </div>
      <div className="w-1/2 flex items-center px-16 pt-16">
        <div>
          <h2 className="text-white leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(48px, 6vw, 88px)" }}>
            Cuidado<br/>de gato,<br/>
            <span className="text-[#8FD9DF]">atenção<br/>de tutor.</span>
          </h2>
        </div>
      </div>
      <div className="w-1/2 flex items-center px-16 pt-16">
        <div>
          <p className="text-white/90 text-[20px] leading-[1.6] mb-10 max-w-lg"
            style={{ fontFamily: "var(--font-inter)" }}>
            Para tutoras de gatos de Americana, SBO e Nova Odessa que tratam o pet como filho da casa, a Zenvet é a clínica especialista em felinos que combina diagnóstico consultivo, ambiente preparado para gatos e acompanhamento ativo pós-consulta.
          </p>
          <div className="space-y-4 text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
            <div className="flex gap-5 items-baseline">
              <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[11px] w-28 shrink-0">Território</span>
              <span className="text-white/90">Felino · Humano · Transparente</span>
            </div>
            <div className="flex gap-5 items-baseline">
              <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[11px] w-28 shrink-0">Arquétipos</span>
              <span className="text-white/90">Cuidador (dominante) + Sábio (secundário)</span>
            </div>
            <div className="flex gap-5 items-baseline">
              <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[11px] w-28 shrink-0">Big Idea</span>
              <span className="text-white/90 italic text-[17px]" style={{ fontFamily: "var(--font-fraunces)" }}>Medicina felina é diferente. A gente sabe disso desde antes de você precisar ouvir.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 05 — PILARES DE MARCA ==========
function SlidePilares() {
  const pilares = [
    { n: "01", t: "Especialização Felina Declarada", d: "Dra. Nathalia é pós-graduanda em medicina felina com ênfase em clínica e cirurgia. 70% da base é gato — toda decisão clínica considera o comportamento da espécie." },
    { n: "02", t: "Medicina Humanizada", d: "Paciente tem nome, histórico e a mesma veterinária do começo ao fim. Acompanhamento ativo pós-consulta no WhatsApp da própria Nathalia." },
    { n: "03", t: "Transparência Item a Item", d: "Orçamento aprovado pelo tutor antes da execução. Cada exame justificado em linguagem clara. Nunca há conta surpresa." },
    { n: "04", t: "Tempo de Consulta Real", d: "40 minutos com a Nathalia — tempo o suficiente para examinar, conversar, explicar e construir plano de tratamento que cabe na rotina." },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F6EAD8] flex flex-col px-20 py-16">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        Pilares de marca
      </div>
      <h2 className="text-[#4B1C7D] text-5xl lg:text-6xl mb-12 max-w-2xl leading-[1.05]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Quatro pilares que sustentam a <em className="font-normal italic">combinação proprietária.</em>
      </h2>
      <div className="grid grid-cols-2 gap-5 flex-1">
        {pilares.map((p) => (
          <div key={p.n} className="bg-white rounded-2xl p-7 flex flex-col">
            <span className="text-[#00B8BD] text-3xl mb-4"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontStyle: "italic" }}>
              {p.n}
            </span>
            <h3 className="text-[#4B1C7D] text-xl mb-2 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
              {p.t}
            </h3>
            <p className="text-[#2E2E33]/75 text-[13px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              {p.d}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 06 — PUV ==========
function SlidePUV() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-white flex">
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#008185] z-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        Proposta Única de Valor
      </div>
      <div className="w-1/2 flex items-center justify-center" style={{ background: ROXO }}>
        <div className="px-12">
          <span className="text-[#8FD9DF] block leading-none"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 700, letterSpacing: "-0.04em", fontSize: "clamp(120px, 14vw, 220px)" }}>
            P.U.V
          </span>
          <p className="text-white/75 text-sm mt-4 tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}>
            Proposta<br/>Única de Valor
          </p>
        </div>
      </div>
      <div className="w-1/2 flex items-center px-16">
        <div className="max-w-lg">
          <p className="text-[#4B1C7D] text-[18px] leading-[1.55] mb-8"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
            A <span className="italic">Zenvet</span> combina <strong>formação felina declarada</strong> da Dra. Nathalia (pós-graduanda em clínica e cirurgia com ênfase em medicina felina) com <strong>acompanhamento ativo pós-consulta no WhatsApp</strong> e <strong>orçamento aprovado item a item</strong> para resolver a ansiedade da tutora de gato em decidir bem com o pet que ela trata como <span className="italic">filho da casa</span> — eliminando a conta surpresa do hospital 24h e o atendimento genérico que não diferencia gato de cachorro.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#4B1C7D]/15">
            <div>
              <div className="text-[#4B1C7D] text-2xl"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>40min</div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-[#2E2E33]/60 mt-1"
                style={{ fontFamily: "var(--font-inter)" }}>Consulta consultiva</div>
            </div>
            <div>
              <div className="text-[#4B1C7D] text-2xl"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Item a item</div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-[#2E2E33]/60 mt-1"
                style={{ fontFamily: "var(--font-inter)" }}>Orçamento aprovado</div>
            </div>
            <div>
              <div className="text-[#4B1C7D] text-2xl"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>D+1</div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-[#2E2E33]/60 mt-1"
                style={{ fontFamily: "var(--font-inter)" }}>Acompanhamento WhatsApp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 07 — ESSÊNCIA ==========
function SlideEssencia() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: ROXO_SHADOW }}>
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#8FD9DF]"
        style={{ fontFamily: "var(--font-inter)" }}>
        Essência da marca
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <Image
          src="/logo/zenvet_icone_white.svg"
          alt=""
          width={322}
          height={363}
          className="w-[60%] h-auto opacity-40"
        />
      </div>
      <div className="w-1/2 flex items-center px-16">
        <div className="space-y-8 max-w-md">
          <div>
            <div className="text-[#8FD9DF] text-[11px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)" }}>Propósito</div>
            <p className="text-white text-[15px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              Existimos para que tutoras de gato em Americana parem de aceitar atendimento veterinário genérico — porque cada gato esconde dor por instinto.
            </p>
          </div>
          <div>
            <div className="text-[#8FD9DF] text-[11px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)" }}>Visão</div>
            <p className="text-white text-[15px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              Ser a referência de medicina felina premium-humanizada da microrregião de Americana, SBO e Nova Odessa em até 18 meses.
            </p>
          </div>
          <div>
            <div className="text-[#8FD9DF] text-[11px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)" }}>Missão</div>
            <p className="text-white text-[15px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              Atender cada paciente felino com 40 minutos de consulta consultiva, orçamento item a item e acompanhamento no WhatsApp — todas as vezes.
            </p>
          </div>
          <div>
            <div className="text-[#8FD9DF] text-[11px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)" }}>Valores</div>
            <p className="text-white text-[15px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              Especialização real · Cuidado humano · Transparência radical · Decisão informada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 08 — TOM DE VOZ ==========
function SlideTomDeVoz() {
  const tom = [
    { name: "Especialista", neg: "não arrogante", desc: "Explica conceitos sem jargão e sem condescendência. Em vez de 'hiporexia', diz 'ele está comendo menos'. A autoridade vem da clareza." },
    { name: "Humano", neg: "não infantilizado", desc: "Chama o gato pelo nome real (Simba, não 'peludinho'). Trata o tutor como adulto que decide. Sem diminutivos." },
    { name: "Transparente", neg: "não burocrático", desc: "Mostra o valor antes da execução, item a item. Nunca 'sujeito a verificação no momento do atendimento'." },
    { name: "Próximo", neg: "não invasivo", desc: "WhatsApp é canal de cuidado da Nathalia — D+1 com pergunta aberta. Não é canal de promoção. Frequência baixa, intencionalidade alta." },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FBF4E4] px-20 py-16 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-8"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade verbal · Tom de voz
      </div>
      <h2 className="text-[#4B1C7D] text-5xl lg:text-6xl mb-12 max-w-3xl leading-[1.05]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Quatro pilares que <em className="italic font-normal">soam Zenvet</em> em qualquer canal.
      </h2>
      <div className="grid grid-cols-4 gap-5 flex-1">
        {tom.map((p, i) => (
          <div key={p.name} className={`p-8 rounded-2xl flex flex-col ${i % 2 === 0 ? 'bg-[#4B1C7D] text-white' : 'bg-white'}`}>
            <span className={`text-4xl mb-2 ${i % 2 === 0 ? 'text-[#8FD9DF]' : 'text-[#00B8BD]'}`}
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              0{i+1}
            </span>
            <h3 className={`text-2xl ${i % 2 === 0 ? 'text-white' : 'text-[#4B1C7D]'} mb-1.5`}
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
              {p.name}
            </h3>
            <span className={`text-[13px] italic mb-5 ${i % 2 === 0 ? 'text-white/65' : 'text-[#2E2E33]/60'}`}
              style={{ fontFamily: "var(--font-inter)" }}>{p.neg}</span>
            <p className={`text-[14.5px] leading-[1.6] ${i % 2 === 0 ? 'text-white/85' : 'text-[#2E2E33]/80'}`}
              style={{ fontFamily: "var(--font-inter)" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 09 — VOCABULÁRIO ==========
function SlideVocabulario() {
  const cols = [
    { title: "Essência", desc: "Transmitem quem somos", words: ["Felino", "Especialista", "Humano", "Transparente", "Acompanhamento", "Consultiva", "Decisão informada"] },
    { title: "Valorizadas", desc: "Memória de marca", words: ["Especialista em felinos", "Dra. Nathalia", "40 minutos", "Sem conta surpresa", "Acompanhamento no WhatsApp", "Aprovação item a item", "Esconde dor por instinto"] },
    { title: "Conexão público", desc: "Linguagem do cliente", words: ["Seu gato", "Filho da casa", "Tutora", "Paciente", "Sua tutora", "Quando ele", "Como ele está"] },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-16 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-8"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade verbal · Vocabulário-chave
      </div>
      <h2 className="text-[#4B1C7D] text-5xl mb-12 max-w-2xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Palavras que constroem <em className="italic font-normal">o jeito Zenvet de falar.</em>
      </h2>
      <div className="grid grid-cols-3 gap-12 flex-1">
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-[#4B1C7D] text-3xl mb-2"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              {c.title}
            </h3>
            <p className="text-[#2E2E33]/60 text-[14px] mb-8"
              style={{ fontFamily: "var(--font-inter)" }}>
              {c.desc}
            </p>
            <ul className="space-y-4"
              style={{ fontFamily: "var(--font-inter)" }}>
              {c.words.map((w) => (
                <li key={w} className="text-[#2E2E33] text-[18px]">
                  <span className="text-[#00B8BD] mr-2">·</span>{w}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-7 border-t border-[#4B1C7D]/15 flex gap-6 text-[14px] text-[#2E2E33]/65"
        style={{ fontFamily: "var(--font-inter)" }}>
        <span className="font-semibold text-[#DC2626]">Evite:</span>
        <span>peludo · peludinho · dono · bichinho · consulta básica · promoção · preço fechado · follow-up · cliente</span>
      </div>
    </div>
  );
}

// ========== SLIDE 10 — DIGA / NÃO DIGA ==========
function SlideDigaNaoDiga() {
  const items = [
    { sit: "Apresentação da clínica", say: "Clínica veterinária especialista em felinos de Americana — atendemos gatos e cães com hora marcada, transparência de preço e acompanhamento pós-consulta.", dont: "Clínica veterinária para qualquer pet com excelência!" },
    { sit: "Resposta a 'quanto custa?'", say: "A consulta especialista é R$ 220, dura 40 min com a Dra. Nathalia e inclui acompanhamento pelo WhatsApp depois.", dont: "O valor da consulta é a partir de R$ 220, sujeito a verificação no momento do atendimento." },
    { sit: "Headline de anúncio Meta", say: "Seu gato merece uma veterinária que entende de felinos — não de bicho em geral.", dont: "A melhor clínica veterinária da região!" },
    { sit: "Comunicação sobre preço premium", say: "A consulta é R$ 220 — inclui 40 min com a Dra. Nathalia, exame completo, plano de tratamento e acompanhamento no WhatsApp.", dont: "Consulta a R$ 220 — barato!" },
    { sit: "Acompanhamento D+1 no WhatsApp", say: "Como o Simba está hoje? Conseguiu comer alguma coisa?", dont: "Olá! Tudo bem? Aproveite 10% off na próxima consulta!" },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F6EAD8] px-20 py-12 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-6"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade verbal · Diga · Não diga
      </div>
      <h2 className="text-[#4B1C7D] text-4xl mb-8 leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        O que dizer (e <em className="italic font-normal">o que nunca dizer</em>) na voz da Zenvet.
      </h2>
      <div className="space-y-3 flex-1">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[220px_1fr_1fr] gap-5 py-4 border-b border-[#4B1C7D]/12">
            <div className="text-[#2E2E33] text-[13px] uppercase tracking-[0.1em] font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}>
              {it.sit}
            </div>
            <div className="bg-[#10B981]/10 border-l-2 border-[#10B981] px-4 py-3 rounded-r">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#10B981] font-bold mb-1.5 block"
                style={{ fontFamily: "var(--font-inter)" }}>✓ Diga</span>
              <p className="text-[#2E2E33] text-[14px] leading-[1.55]"
                style={{ fontFamily: "var(--font-inter)" }}>{it.say}</p>
            </div>
            <div className="bg-[#DC2626]/10 border-l-2 border-[#DC2626] px-4 py-3 rounded-r">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#DC2626] font-bold mb-1.5 block"
                style={{ fontFamily: "var(--font-inter)" }}>✗ Não diga</span>
              <p className="text-[#2E2E33]/70 text-[14px] leading-[1.55] line-through decoration-[#DC2626]/40"
                style={{ fontFamily: "var(--font-inter)" }}>{it.dont}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 11 — CORES ==========
function SlideCores() {
  return (
    <div className="relative w-full h-full overflow-hidden grid grid-cols-2 grid-rows-2">
      <div className="absolute top-8 left-8 text-[11px] tracking-[0.25em] uppercase text-white/85 z-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Cores
      </div>
      <div className="flex items-end p-10" style={{ background: ROXO }}>
        <div>
          <div className="text-[#8FD9DF] text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "var(--font-inter)" }}>Primary</div>
          <div className="text-white text-3xl mb-2"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Roxo Profundo</div>
          <div className="text-white/80 text-[13px]"
            style={{ fontFamily: "var(--font-inter)" }}>
            #4B1C7D · RGB 75 28 125<br/>CMYK 85 95 0 25
          </div>
        </div>
      </div>
      <div className="flex items-end p-10" style={{ background: TURQUOISE }}>
        <div>
          <div className="text-white/85 text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "var(--font-inter)" }}>Secondary</div>
          <div className="text-white text-3xl mb-2"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Turquesa Cuidado</div>
          <div className="text-white/85 text-[13px]"
            style={{ fontFamily: "var(--font-inter)" }}>
            #00B8BD · RGB 0 184 189<br/>CMYK 100 3 0 26
          </div>
        </div>
      </div>
      <div className="flex items-end p-10" style={{ background: BEIGE }}>
        <div>
          <div className="text-[#008185] text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "var(--font-inter)" }}>Background</div>
          <div className="text-[#4B1C7D] text-3xl mb-2"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Bege Acolhedor</div>
          <div className="text-[#2E2E33]/75 text-[13px]"
            style={{ fontFamily: "var(--font-inter)" }}>
            #F6EAD8 · RGB 246 234 216<br/>CMYK 0 5 12 4
          </div>
        </div>
      </div>
      <div className="flex items-end p-10" style={{ background: "#A8358C" }}>
        <div>
          <div className="text-white/85 text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "var(--font-inter)" }}>Accent</div>
          <div className="text-white text-3xl mb-2"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Magenta Ação</div>
          <div className="text-white/85 text-[13px]"
            style={{ fontFamily: "var(--font-inter)" }}>
            #A8358C · RGB 168 53 140<br/>CMYK 0 68 17 34
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 12 — TIPOGRAFIA ==========
function SlideTipografia() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: ROXO_SHADOW }}>
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#8FD9DF]"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Tipografia
      </div>
      <div className="w-1/2 flex items-center px-16 pt-12">
        <div>
          <p className="text-white/55 text-sm mb-2 tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}>Fonte principal · títulos</p>
          <div className="text-white leading-[0.9]"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(140px, 18vw, 260px)" }}>
            Aa
          </div>
          <p className="text-white text-3xl mt-4"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>Fraunces</p>
          <p className="text-white/65 text-[13px] mt-2"
            style={{ fontFamily: "var(--font-inter)" }}>
            Google Fonts · 400 · 500 · 600 · 700 com itálico<br/>
            Serif contemporâneo com calor humano e autoridade editorial.
          </p>
        </div>
      </div>
      <div className="w-px bg-white/15 my-16" />
      <div className="w-1/2 flex items-center px-16 pt-12">
        <div>
          <p className="text-white/55 text-sm mb-2 tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}>Fonte secundária · texto</p>
          <div className="text-white leading-[0.9]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "clamp(140px, 18vw, 260px)" }}>
            Aa
          </div>
          <p className="text-white text-3xl mt-4"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}>Inter</p>
          <p className="text-white/65 text-[13px] mt-2"
            style={{ fontFamily: "var(--font-inter)" }}>
            Google Fonts · 400 · 500 · 600 · 700<br/>
            Sans-serif neutro otimizado para tela e microcopy.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 13 — LOGO APLICAÇÕES ==========
function SlideLogoAplicacoes() {
  return (
    <div className="relative w-full h-full overflow-hidden grid grid-cols-2 grid-rows-2 bg-white">
      <div className="absolute top-8 left-8 text-[11px] tracking-[0.25em] uppercase text-[#008185] z-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Logo · Aplicações
      </div>
      <div className="flex items-center justify-center bg-white border-r border-b border-[#4B1C7D]/10">
        <Image src="/logo/zenvet_horizontal.svg" alt="" width={1138} height={363} className="h-24 w-auto" />
      </div>
      <div className="flex items-center justify-center" style={{ background: ROXO }}>
        <Image src="/logo/zenvet_horizontal_white.svg" alt="" width={1138} height={363} className="h-24 w-auto" />
      </div>
      <div className="flex items-center justify-center" style={{ background: BEIGE }}>
        <Image src="/logo/zenvet_horizontal.svg" alt="" width={1138} height={363} className="h-24 w-auto" />
      </div>
      <div className="flex items-center justify-center" style={{ background: TURQUOISE }}>
        <Image src="/logo/zenvet_horizontal_white.svg" alt="" width={1138} height={363} className="h-24 w-auto" />
      </div>
    </div>
  );
}

// ========== SLIDE — APLICAÇÕES REAIS DO LOGO (jaleco / caneca / cartão) ==========
function SlideAplicacoesReais() {
  const apps = [
    { src: "/photos/aplicacoes/jaleco.png", label: "Jaleco bordado", desc: "Logo bordado em fio roxo + turquesa no peito direito do jaleco — profissional e técnico." },
    { src: "/photos/aplicacoes/caneca.png", label: "Caneca corporativa", desc: "Caneca cerâmica roxo Zenvet com logo branco — brinde de boas-vindas e papelaria interna." },
    { src: "/photos/aplicacoes/cartao.png", label: "Cartão de visita", desc: "Frente branca com lockup colorido + verso roxo com tagline e contatos — papelaria oficial da Dra. Nathalia." },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-16 py-12 flex flex-col">
      <div className="text-[12px] tracking-[0.25em] uppercase text-[#008185] mb-4"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Logo · Aplicações reais
      </div>
      <h2 className="text-[#4B1C7D] text-4xl lg:text-5xl mb-2 max-w-3xl leading-[1.08]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        A marca <em className="italic font-normal">no mundo real.</em>
      </h2>
      <p className="text-[#2E2E33]/65 text-[15px] mb-8 max-w-2xl"
        style={{ fontFamily: "var(--font-inter)" }}>
        Como o logo se manifesta nos pontos de contato físicos com o tutor — papelaria, vestuário e brindes.
      </p>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {apps.map((a) => (
          <div key={a.label} className="flex flex-col">
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#F6EAD8] mb-4 shadow-lg">
              <Image src={a.src} alt={a.label} fill sizes="33vw" quality={92} className="object-cover" />
            </div>
            <h3 className="text-[#4B1C7D] text-xl mb-1.5"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              {a.label}
            </h3>
            <p className="text-[#2E2E33]/75 text-[13px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 14 — USOS PROIBIDOS ==========
function SlideUsosProibidos() {
  const errados = [
    { label: "Não recolorir fora da paleta", style: { background: "#22c55e" } },
    { label: "Não rotacionar / inclinar", transform: "rotate(-12deg)" },
    { label: "Não esticar ou achatar", transform: "scaleY(0.55)" },
    { label: "Não aplicar sombra ou efeitos", filter: "drop-shadow(8px 8px 0 rgba(0,0,0,0.3))" },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-16 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#DC2626] mb-8"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Usos proibidos
      </div>
      <h2 className="text-[#4B1C7D] text-5xl mb-12 max-w-2xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        O que <em className="italic font-normal text-[#DC2626]">nunca fazer</em> com a marca.
      </h2>
      <div className="grid grid-cols-4 gap-6 flex-1">
        {errados.map((e, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center">
            <div className="flex-1 flex items-center justify-center w-full mb-4 relative" style={{ minHeight: 120 }}>
              <div style={{ background: e.style?.background, padding: e.style?.background ? 12 : 0, borderRadius: 8 }}>
                <Image
                  src="/logo/zenvet_horizontal.svg"
                  alt=""
                  width={1138}
                  height={363}
                  className="h-12 w-auto"
                  style={{ transform: e.transform, filter: e.filter as string | undefined, ...(e.style?.background ? { filter: "brightness(0) invert(1)" } : {}) }}
                />
              </div>
              <div className="absolute inset-0 border-2 border-[#DC2626] rounded-lg pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-lg font-bold">
                ✗
              </div>
            </div>
            <p className="text-[#2E2E33] text-[13px] leading-tight"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}>
              {e.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 15 — PERSONA MARIANA ==========
function SlidePersonaMariana() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: ROXO_SHADOW }}>
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#8FD9DF] z-20"
        style={{ fontFamily: "var(--font-inter)" }}>
        Persona principal
      </div>
      {/* Esquerda — sombra roxa com texto */}
      <div className="w-3/5 flex flex-col justify-center px-16 pt-12 relative z-10"
        style={{ background: `linear-gradient(120deg, ${ROXO_SHADOW} 0%, ${ROXO} 100%)` }}>
        <h2 className="text-white leading-[0.95] mb-8"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "clamp(80px, 11vw, 160px)" }}>
          Mariana
        </h2>
        <div className="space-y-3 mb-6 text-[13px] max-w-md" style={{ fontFamily: "var(--font-inter)" }}>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Idade</span>
            <span className="text-white/95">36 anos</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Renda</span>
            <span className="text-white/95">R$ 5.000–12.000 / mês</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Ocupação</span>
            <span className="text-white/95">Professora ensino fundamental · Americana</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#8FD9DF]/80 tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Pet</span>
            <span className="text-white/95">Simba · gato SRD laranja, 4 anos</span>
          </div>
        </div>
        <div className="bg-[#A8358C] inline-block px-3 py-1 mb-2 rounded self-start">
          <span className="text-white text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-inter)" }}>Principal dor</span>
        </div>
        <p className="text-white/90 text-[13px] leading-[1.6] mb-5 max-w-md"
          style={{ fontFamily: "var(--font-inter)" }}>
          Tem medo de levar o Simba num lugar que não entende de gato. Já foi explorada em hospital 24h (R$70 na consulta, R$800 ao sair). Pesquisa horas no Instagram antes de confiar.
        </p>
        <p className="text-[#8FD9DF] italic text-[15px] leading-[1.45] max-w-md border-l-2 border-[#8FD9DF]/60 pl-4"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
          "Eu não levo o Simba em qualquer lugar não. Gato não é cachorro, e tem muito veterinário que não entende isso."
        </p>
      </div>
      {/* Direita — foto */}
      <div className="w-2/5 relative">
        <Image
          src="/photos/personas/mariana-simba.png"
          alt="Mariana com Simba"
          fill
          sizes="(min-width: 1920px) 768px, 40vw"
          quality={95}
          priority
          className="object-cover object-center"
        />
        {/* Gradient sutil pra mesclar com a sombra esquerda */}
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${ROXO}80 0%, transparent 100%)` }} />
      </div>
    </div>
  );
}

// ========== SLIDE 16 — PERSONA CARLOS ==========
function SlidePersonaCarlos() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: BEIGE }}>
      <div className="absolute top-12 left-12 text-[11px] tracking-[0.25em] uppercase text-[#008185] z-20"
        style={{ fontFamily: "var(--font-inter)" }}>
        Persona secundária
      </div>
      {/* Esquerda — sombra bege com texto */}
      <div className="w-3/5 flex flex-col justify-center px-16 pt-12 relative z-10"
        style={{ background: `linear-gradient(120deg, ${BEIGE} 0%, #ead7b8 100%)` }}>
        <h2 className="text-[#4B1C7D] leading-[0.95] mb-8"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "clamp(80px, 11vw, 160px)" }}>
          Carlos
        </h2>
        <div className="space-y-3 mb-6 text-[13px] max-w-md" style={{ fontFamily: "var(--font-inter)" }}>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#008185] tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Idade</span>
            <span className="text-[#2E2E33]">43 anos</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#008185] tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Renda</span>
            <span className="text-[#2E2E33]">R$ 4.000–10.000 / mês</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#008185] tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Ocupação</span>
            <span className="text-[#2E2E33]">Gerente comercial · indústria local · SBO</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-[#008185] tracking-[0.15em] uppercase text-[10px] w-24 shrink-0">Pet</span>
            <span className="text-[#2E2E33]">Thor · cachorro</span>
          </div>
        </div>
        <div className="bg-[#A8358C] inline-block px-3 py-1 mb-2 rounded self-start">
          <span className="text-white text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-inter)" }}>Principal dor</span>
        </div>
        <p className="text-[#2E2E33]/85 text-[13px] leading-[1.6] mb-5 max-w-md"
          style={{ fontFamily: "var(--font-inter)" }}>
          Os hospitais 24h da avenida usam consulta isca de R$ 70 e depois enchem de exames — a conta explode sem avisar. Fila de espera de 3 horas com o cachorro no colo.
        </p>
        <p className="text-[#4B1C7D] italic text-[15px] leading-[1.45] max-w-md border-l-2 border-[#00B8BD] pl-4"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
          "Veterinário bom é aquele que me diz o que o Thor tem, quanto vai custar e me manda embora rápido. Sem enrolação."
        </p>
      </div>
      {/* Direita — foto */}
      <div className="w-2/5 relative">
        <Image
          src="/photos/personas/carlos-thor.png"
          alt="Carlos com Thor"
          fill
          sizes="(min-width: 1920px) 768px, 40vw"
          quality={95}
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{ background: `linear-gradient(90deg, #ead7b8aa 0%, transparent 100%)` }} />
      </div>
    </div>
  );
}

// ========== SLIDE — ESCALAS DE PERSONALIDADE ==========
function SlideEscalas() {
  // valor de 0 (esquerda) a 100 (direita)
  const escalas = [
    { left: "Formal", right: "Casual", v: 60 },
    { left: "Sério", right: "Bem-humorado", v: 50 },
    { left: "Técnico", right: "Coloquial", v: 50 },
    { left: "Reservado", right: "Caloroso", v: 70 },
    { left: "Tradicional", right: "Contemporâneo", v: 65 },
    { left: "Neutro", right: "Opinativo", v: 60 },
    { left: "Discreto", right: "Expressivo", v: 50 },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-16 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-8"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade verbal · Escalas de personalidade
      </div>
      <h2 className="text-[#4B1C7D] text-5xl mb-3 max-w-3xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Onde a Zenvet se posiciona <em className="italic font-normal">em cada eixo de tom.</em>
      </h2>
      <p className="text-[#2E2E33]/65 text-[14px] mb-10 max-w-2xl"
        style={{ fontFamily: "var(--font-inter)" }}>
        Sete eixos de personalidade que orientam toda decisão verbal — de copy de anúncio a resposta no WhatsApp.
      </p>
      <div className="bg-[#FBF4E4] rounded-2xl p-10 flex-1 flex flex-col justify-center">
        <div className="space-y-5">
          {escalas.map((e) => (
            <div key={e.left} className="grid grid-cols-[160px_1fr_160px] items-center gap-6"
              style={{ fontFamily: "var(--font-inter)" }}>
              <span className="text-[#2E2E33] text-[15px] text-right">{e.left}</span>
              <div className="relative h-2 rounded-full"
                style={{ background: "rgba(75,28,125,0.18)" }}>
                {/* Trilha mais clara mas dentro da paleta — roxo a 18% sobre cream */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                  style={{
                    left: `calc(${e.v}% - 10px)`,
                    background: ROXO,
                    boxShadow: "0 2px 8px rgba(75,28,125,0.35), 0 0 0 4px rgba(75,28,125,0.10)",
                  }}
                />
              </div>
              <span className="text-[#2E2E33]/65 text-[15px]">{e.right}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE — PALETA COMPLETA ==========
function SlidePaletaCompleta() {
  const cores = [
    { tier: "PRIMARY", name: "Roxo Profundo", hex: "#4B1C7D", rgb: "75 28 125", cmyk: "85 95 0 25", textLight: true },
    { tier: "SECONDARY", name: "Roxo Sombra", hex: "#2E0F55", rgb: "46 15 85", cmyk: "94 100 0 50", textLight: true },
    { tier: "SECONDARY", name: "Turquesa Cuidado", hex: "#00B8BD", rgb: "0 184 189", cmyk: "100 3 0 26", textLight: true },
    { tier: "BACKGROUND", name: "Bege Acolhedor", hex: "#F6EAD8", rgb: "246 234 216", cmyk: "0 5 12 4", textLight: false },
    { tier: "NEUTRAL", name: "Grafite Texto", hex: "#2E2E33", rgb: "46 46 51", cmyk: "10 10 0 80", textLight: true },
    { tier: "BACKGROUND", name: "Branco Puro", hex: "#FFFFFF", rgb: "255 255 255", cmyk: "0 0 0 0", textLight: false, border: true },
    { tier: "ACCENT", name: "Magenta Ação", hex: "#A8358C", rgb: "168 53 140", cmyk: "0 68 17 34", textLight: true },
    { tier: "ACCENT", name: "Verde Sucesso", hex: "#10B981", rgb: "16 185 129", cmyk: "91 0 30 27", textLight: true },
    { tier: "ACCENT", name: "Vermelho Erro", hex: "#DC2626", rgb: "220 38 38", cmyk: "0 83 83 14", textLight: true },
    { tier: "ACCENT", name: "Amarelo Atenção", hex: "#F59E0B", rgb: "245 158 11", cmyk: "0 36 96 4", textLight: true },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-12 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-4"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Sistema cromático completo
      </div>
      <h2 className="text-[#4B1C7D] text-4xl mb-8 max-w-3xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Paleta completa — <em className="italic font-normal">primárias, neutras e funcionais.</em>
      </h2>
      <div className="grid grid-cols-5 gap-3 flex-1">
        {cores.map((c) => (
          <div key={c.hex} className="rounded-xl p-5 flex flex-col justify-between"
            style={{
              background: c.hex,
              border: c.border ? "1px solid rgba(75,28,125,0.15)" : "none",
              color: c.textLight ? "#FFFFFF" : "#2E2E33",
            }}
          >
            <div className="text-[10px] tracking-[0.2em] uppercase opacity-75"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}>
              {c.tier}
            </div>
            <div>
              <div className="text-xl mb-1 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
                {c.name}
              </div>
              <div className="text-[11px] opacity-80"
                style={{ fontFamily: "var(--font-inter)" }}>
                {c.hex}<br/>
                RGB {c.rgb}<br/>
                CMYK {c.cmyk}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE — HIERARQUIA TIPOGRÁFICA ==========
function SlideHierarquia() {
  const niveis = [
    { tag: "H1 (DISPLAY)", sample: "Seu gato merece", font: "Fraunces Bold 700", size: "56px / lh 1.1", use: "Headline principal de LP, capa de deck, banner.", style: { fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: 56, lineHeight: 1.1 } },
    { tag: "H2", sample: "Seu gato merece", font: "Fraunces Bold 700", size: "36px / lh 1.2", use: "Títulos de seção em LP e papelaria.", style: { fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: 36, lineHeight: 1.2 } },
    { tag: "H3", sample: "Seu gato merece", font: "Fraunces SemiBold 600", size: "24px / lh 1.3", use: "Subtítulos de bloco e cards.", style: { fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: 24, lineHeight: 1.3 } },
    { tag: "BODY", sample: "Seu gato merece", font: "Inter Regular 400", size: "17px / lh 1.6", use: "Corpo de texto em LP e e-mail.", style: { fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 17, lineHeight: 1.6 } },
    { tag: "CAPTION", sample: "Seu gato merece", font: "Inter Medium 500", size: "13px / lh 1.4", use: "Legendas, microcopy, footnotes.", style: { fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 13, lineHeight: 1.4 } },
    { tag: "CTA", sample: "Seu gato merece", font: "Inter SemiBold 600", size: "16px / lh 1.0", use: "Texto de botões e links principais.", style: { fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 16, lineHeight: 1.0 } },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-12 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-4"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Hierarquia tipográfica
      </div>
      <h2 className="text-[#4B1C7D] text-4xl mb-8 max-w-3xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Escala real <em className="italic font-normal">— do display ao microcopy.</em>
      </h2>
      <div className="bg-[#FBF4E4] rounded-2xl px-8 py-6 flex-1">
        {niveis.map((n, i) => (
          <div key={n.tag}
            className={`grid grid-cols-[110px_1fr_220px] items-center gap-6 py-4 ${i < niveis.length - 1 ? 'border-b border-[#4B1C7D]/10' : ''}`}>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#2E2E33]/55"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}>
              {n.tag}
            </span>
            <span className="text-[#4B1C7D]" style={n.style}>
              {n.sample}
            </span>
            <div className="text-right text-[12px] text-[#2E2E33]/65"
              style={{ fontFamily: "var(--font-inter)" }}>
              <div className="font-semibold text-[#2E2E33]">{n.font}</div>
              <div>{n.size}</div>
              <div className="italic mt-0.5 text-[#2E2E33]/55">{n.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE — LOGO CONCEITO E CONSTRUÇÃO ==========
function SlideLogoConceito() {
  const cards1 = [
    { t: "Símbolo", d: "Marca gráfica felina estilizada — gato em traço único. Pode ser usado isolado em contextos restritos (favicon, sticker, app icon)." },
    { t: "Wordmark", d: "'Zenvet' em tipografia serif contemporânea (família Fraunces ou similar) com peso Bold/SemiBold. Pode ser usado em contextos longos (papelaria, rodapé de e-mail)." },
    { t: "Lockup", d: "Símbolo + wordmark em assinatura horizontal. Versão padrão para a maioria dos usos. Versão vertical disponível para layouts quadrados (avatar IG, GMB)." },
  ];
  const cards2 = [
    { t: "Área de proteção", d: "Área mínima ao redor do logo = altura da letra 'Z' do wordmark, em todas as direções. Nada deve invadir essa área." },
    { t: "Mínimo digital", d: "120px de largura para o lockup horizontal. 32px para o símbolo isolado (favicon). Abaixo desses valores, perde legibilidade." },
    { t: "Mínimo impresso", d: "25mm de largura para o lockup horizontal. 8mm para o símbolo isolado." },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-20 py-10 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-3"
        style={{ fontFamily: "var(--font-inter)" }}>
        Identidade visual · Logotipo · conceito e construção
      </div>
      <h2 className="text-[#4B1C7D] text-3xl lg:text-4xl mb-3 max-w-4xl leading-[1.15]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        O logo expressa visualmente a combinação proprietária <em className="italic font-normal">Felino · Humano · Transparente.</em>
      </h2>
      <p className="text-[#2E2E33]/70 text-[13px] mb-5 max-w-3xl"
        style={{ fontFamily: "var(--font-inter)" }}>
        Tipografia serif contemporânea (autoridade técnica + calor humano), cor de assinatura roxa (sofisticação felina + premium) e geometria balanceada entre forma e contra-forma.
      </p>

      <div className="bg-[#4B1C7D]/5 border-l-4 border-[#4B1C7D] rounded-r-lg p-5 mb-5">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#4B1C7D] font-bold mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}>
          Descrição do estilo
        </div>
        <p className="text-[#2E2E33]/85 text-[12px] leading-[1.55]"
          style={{ fontFamily: "var(--font-inter)" }}>
          O logo segue a linguagem 'serif contemporâneo + traço minimalista' — combina autoridade tipográfica (peso editorial das serifas humanistas) com a delicadeza de um símbolo felino em traço único. É uma marca tipográfica com elemento gráfico discreto, que funciona em escala de favicon (16px) até banner de fachada (1m+) sem perder personalidade. Construção flat (zero gradientes, zero sombras, zero efeitos), com hierarquia clara entre símbolo e wordmark.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {cards1.map((c) => (
          <div key={c.t} className="bg-white border border-[#4B1C7D]/12 rounded-xl p-5">
            <h3 className="text-[#4B1C7D] text-xl mb-2"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              {c.t}
            </h3>
            <p className="text-[#2E2E33]/80 text-[13px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              {c.d}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cards2.map((c) => (
          <div key={c.t} className="bg-[#F6EAD8] rounded-xl p-5">
            <h3 className="text-[#4B1C7D] text-xl mb-2"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              {c.t}
            </h3>
            <p className="text-[#2E2E33]/80 text-[13px] leading-[1.55]"
              style={{ fontFamily: "var(--font-inter)" }}>
              {c.d}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SLIDE 18 — CRIATIVOS DE ANÚNCIO (Feed Instagram) ==========
function SlideCriativos() {
  const captions = [
    "Atendimento especializado pra quem trata gato como filho da casa. 🐾",
    "A Dra. Nathalia une técnica e acolhimento — sua referência em medicina felina.",
    "Histórias reais de quem confia. Obrigada Amanda + Zane! 💜",
    "Cuidado que gera confiança. ★★★★★ no Google.",
    "Gato esconde dor por instinto. Quando ele demonstra, é tarde.",
  ];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FBF4E4] px-12 py-10 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-3"
        style={{ fontFamily: "var(--font-inter)" }}>
        Aplicações · Criativos para tráfego pago · Feed Instagram
      </div>
      <h2 className="text-[#4B1C7D] text-3xl mb-6 max-w-2xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Posts de feed <em className="italic font-normal">@clinicazenvet</em>
      </h2>
      <div className="grid grid-cols-5 gap-3 items-start flex-1 content-center">
        {[1, 2, 3, 4, 5].map((n, i) => (
          <InstagramFeedFrame key={n} src={`/photos/criativos/feed-0${n}.png`} caption={captions[i]} />
        ))}
      </div>
    </div>
  );
}

function InstagramFeedFrame({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-[#4B1C7D]/8 flex flex-col text-[#2E2E33]">
      {/* Header */}
      <div className="flex items-center gap-2 p-2 border-b border-[#2E2E33]/8">
        <div className="w-7 h-7 rounded-full overflow-hidden p-[1.5px]"
          style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image src="/logo/zenvet_icone.svg" alt="" width={28} height={28} className="w-full h-full object-cover scale-110" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
            clinicazenvet
          </div>
          <div className="text-[8px] text-[#2E2E33]/55 leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
            Americana, SP
          </div>
        </div>
        <span className="text-[#2E2E33]/55 text-base leading-none mr-1" style={{ letterSpacing: "1px" }}>···</span>
      </div>

      {/* Imagem */}
      <div className="relative aspect-[4/5] bg-[#FBF4E4]">
        <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
      </div>

      {/* Action bar (like, comment, share, save) */}
      <div className="flex items-center gap-2.5 px-2.5 py-2">
        {/* heart */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E2E33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        {/* comment */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E2E33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        {/* share */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E2E33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        <span className="flex-1" />
        {/* bookmark */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E2E33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </div>

      {/* Caption — 2 linhas fixas pra altura consistente */}
      <div className="px-2.5 pb-2.5 -mt-0.5">
        <p className="text-[9px] leading-snug overflow-hidden"
          style={{
            fontFamily: "var(--font-inter)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2.4em",
          }}>
          <span className="font-semibold mr-1">clinicazenvet</span>
          <span className="text-[#2E2E33]/85">{caption}</span>
        </p>
      </div>
    </div>
  );
}

// ========== SLIDE 19 — STORIES ==========
function SlideStories() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-white px-12 py-10 flex flex-col">
      <div className="text-[11px] tracking-[0.25em] uppercase text-[#008185] mb-3"
        style={{ fontFamily: "var(--font-inter)" }}>
        Aplicações · Stories Instagram
      </div>
      <h2 className="text-[#4B1C7D] text-3xl mb-6 max-w-2xl leading-[1.1]"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
        Stories vertical · <em className="italic font-normal">@clinicazenvet</em>
      </h2>
      <div className="flex justify-center gap-10 flex-1 items-center pb-4">
        {[1, 2, 3].map((n) => (
          <InstagramStoryFrame key={n} src={`/photos/criativos/story-0${n}.png`} />
        ))}
      </div>
    </div>
  );
}

function InstagramStoryFrame({ src }: { src: string }) {
  // Frame em 9:16 (formato real do Story) — sem corte da imagem
  return (
    <div className="relative" style={{ height: "90%", aspectRatio: "9/16" }}>
      <div className="absolute inset-0 rounded-[28px] bg-[#1a1a1a] shadow-2xl p-[6px]">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
          {/* Story image — preserva o conteúdo todo */}
          <Image src={src} alt="" fill sizes="22vw" className="object-cover" priority quality={92} />

          {/* Top progress bars */}
          <div className="absolute top-2 left-2 right-2 flex gap-[3px] z-10">
            {[100, 0, 0].map((w, i) => (
              <div key={i} className="flex-1 h-[2px] bg-white/35 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>

          {/* Top header */}
          <div className="absolute top-5 left-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/80 bg-white">
              <Image src="/logo/zenvet_icone.svg" alt="" width={24} height={24} className="w-full h-full object-cover scale-110" />
            </div>
            <span className="text-white text-[10px] font-semibold drop-shadow-md" style={{ fontFamily: "var(--font-inter)" }}>
              clinicazenvet
            </span>
            <span className="text-white/75 text-[10px] drop-shadow-md" style={{ fontFamily: "var(--font-inter)" }}>
              · 2h
            </span>
            <span className="flex-1" />
            <span className="text-white/95 text-base leading-none drop-shadow-md">···</span>
            <span className="text-white text-base leading-none drop-shadow-md">×</span>
          </div>

          {/* Bottom reply input */}
          <div className="absolute bottom-3 left-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <div className="flex-1 rounded-full border border-white/55 px-3 py-2 text-white/85 text-[10px]"
              style={{ fontFamily: "var(--font-inter)" }}>
              Responder…
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== SLIDE 20 — ENCERRAMENTO ==========
function SlideEncerramento() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center px-12"
      style={{ background: ROXO }}>
      {/* Aurora decorativa — mesmo padrão da capa e da LP */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "rgba(168,53,140,0.20)",
          filter: "blur(120px)",
          transform: "translate(20%, 20%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "rgba(0,184,189,0.15)",
          filter: "blur(120px)",
          transform: "translate(-20%, -20%)",
        }}
      />

      <Image
        src="/logo/zenvet_horizontal_white.svg"
        alt="Zenvet"
        width={1138}
        height={363}
        className="h-32 md:h-40 w-auto mb-12 relative z-10"
      />
      <p className="text-white text-3xl md:text-5xl text-center max-w-2xl leading-[1.15] relative z-10"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontStyle: "italic" }}>
        Seu gato merece uma veterinária que entende de felinos.
      </p>
      <p className="text-[#8FD9DF] text-[12px] tracking-[0.3em] uppercase mt-12 relative z-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        Obrigado.
      </p>
      <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-white/45 z-10"
        style={{ fontFamily: "var(--font-inter)" }}>
        <span>Manual de Identidade Visual · v1.0 · 2026</span>
        <span>Zenvet · Av. Pascoal Ardito, 792 · Americana / SP</span>
      </div>
    </div>
  );
}

// ========== DECK ==========
const SLIDES: Slide[] = [
  { id: "cover", topic: "Capa", render: () => <SlideCover /> },
  { id: "sumario", topic: "Sumário", render: () => <SlideSumario /> },
  { id: "manifesto", topic: "Manifesto", render: () => <SlideManifesto /> },
  { id: "posicionamento", topic: "Posicionamento", render: () => <SlidePosicionamento /> },
  { id: "pilares", topic: "Pilares de marca", render: () => <SlidePilares /> },
  { id: "puv", topic: "Proposta Única de Valor", render: () => <SlidePUV /> },
  { id: "essencia", topic: "Essência", render: () => <SlideEssencia /> },
  { id: "tom-de-voz", topic: "Tom de voz", render: () => <SlideTomDeVoz /> },
  { id: "escalas", topic: "Escalas de personalidade", render: () => <SlideEscalas /> },
  { id: "vocabulario", topic: "Vocabulário", render: () => <SlideVocabulario /> },
  { id: "diga-nao-diga", topic: "Diga · Não diga", render: () => <SlideDigaNaoDiga /> },
  { id: "logo-conceito", topic: "Logo · conceito", render: () => <SlideLogoConceito /> },
  { id: "logo-aplicacoes", topic: "Logo · Aplicações", render: () => <SlideLogoAplicacoes /> },
  { id: "logo-aplicacoes-reais", topic: "Logo · No mundo real", render: () => <SlideAplicacoesReais /> },
  { id: "usos-proibidos", topic: "Usos proibidos", render: () => <SlideUsosProibidos /> },
  { id: "cores", topic: "Cores principais", render: () => <SlideCores /> },
  { id: "paleta-completa", topic: "Paleta completa", render: () => <SlidePaletaCompleta /> },
  { id: "tipografia", topic: "Tipografia", render: () => <SlideTipografia /> },
  { id: "hierarquia", topic: "Hierarquia tipográfica", render: () => <SlideHierarquia /> },
  { id: "persona-mariana", topic: "Persona Mariana", render: () => <SlidePersonaMariana /> },
  { id: "persona-carlos", topic: "Persona Carlos", render: () => <SlidePersonaCarlos /> },
  { id: "criativos", topic: "Criativos de anúncio", render: () => <SlideCriativos /> },
  { id: "stories", topic: "Stories", render: () => <SlideStories /> },
  { id: "encerramento", topic: "Encerramento", render: () => <SlideEncerramento /> },
];

export default function SlideDeck() {
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIdx((cur) => Math.max(0, Math.min(total - 1, cur + dir)));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = SLIDES[idx];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Slide */}
      <div className="absolute inset-0">
        <div key={slide.id} className="w-full h-full animate-[fadeIn_280ms_ease-out]">
          {slide.render()}
        </div>
      </div>

      {/* Top progress */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-black/15">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((idx + 1) / total) * 100}%`,
            background: TURQUOISE,
          }}
        />
      </div>

      {/* Nav controls */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-2">
        <span
          className="text-white/85 text-xs tracking-[0.2em] uppercase mr-3 px-3 py-2 rounded-full backdrop-blur-md bg-black/30"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {slide.topic}
        </span>
        <button
          onClick={() => go(-1)}
          disabled={idx === 0}
          aria-label="Slide anterior"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          disabled={idx === total - 1}
          aria-label="Próximo slide"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        body { overflow: hidden; }
      `}</style>
    </div>
  );
}

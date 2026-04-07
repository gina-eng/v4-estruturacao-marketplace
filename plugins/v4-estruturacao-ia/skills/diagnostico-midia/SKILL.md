---
name: diagnostico-midia
description: "Diagnostico de midia paga: metricas atuais vs benchmarks, top 3 problemas e plano de acao 30 dias. Puxa dados reais do V4MOS (MediaInvestment). Use quando o operador disser /diagnostico-midia ou 'analisar midia paga' ou 'diagnostico de ads' ou 'como esta a conta de anuncios'."
dependencies:
  - persona-icp
tools: []
week: 2
estimated_time: "3h"
output_file: "diagnostico-midia.json"
v4mos_data: true
---

# Diagnostico de Midia Paga

Voce e um especialista em midia paga com foco em performance para PMEs brasileiras. Vai analisar a conta de midia do cliente, comparar com benchmarks do setor, e gerar um plano de acao prioritizado.

**DIFERENCIAL V4MOS:** Se o cliente tem workspace ativo no V4MOS, voce puxa dados REAIS de MediaInvestment via API. Isso e ouro — a maioria das ferramentas so trabalha com dados que o operador exporta manualmente.

## Setup

1. Leia `briefing.json` — extraia: NOME_CLIENTE, SEGMENTO, BUDGET_MENSAL, OBJETIVO_MIDIA
2. Leia `persona-icp.json` — extraia: RESUMO_ICP, canais preferenciais do ICP
3. Verifique `v4mos-cache.json`:
   - Se existe: extraia dados de MediaInvestment, integracoes ativas (Meta Ads, Google Ads)
   - Se nao existe: rode `bash scripts/v4mos_fetch.sh clientes/{cliente}/` para buscar
   - Se nao ha workspace V4MOS: peca dados ao operador (exportacao manual dos ultimos 90 dias)

### Se o cliente NAO investe em midia

Se nao ha dados de midia paga (nem no V4MOS, nem exportacao):

> Este cliente ainda nao investe em midia paga. Em vez de diagnostico, vou gerar um **plano de lancamento** de midia alinhado ao ICP e posicionamento. Posso seguir?

Se sim, adapte os checkpoints para gerar plano de lancamento (estrutura de campanhas, budget recomendado, publicos iniciais, criativos prioritarios).

---

## Checkpoint 1 — Dados de midia e status de integracao

Apresente ao operador os dados disponiveis:

```
DADOS DE MIDIA PAGA — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fonte dos dados: {V4MOS API / Exportacao manual / Operador informou}
Periodo: {periodo_dos_dados}
Budget mensal declarado: R$ {BUDGET_MENSAL}

INTEGRACOES V4MOS:
  Meta Ads: {conectado/desconectado/nao_configurado}
  Google Ads: {conectado/desconectado/nao_configurado}
  Google Analytics: {conectado/desconectado/nao_configurado}

DADOS DISPONÍVEIS:
  Investimento total periodo: R$ {total}
  Plataformas ativas: {lista}
  Numero de campanhas: {numero}
  Objetivo das campanhas: {lead_generation / traffic / conversions / awareness}

METRICAS ATUAIS (ultimos 90 dias):
  CPL (Custo por Lead): R$ {valor}
  CTR (Taxa de Clique): {valor}%
  Taxa de conversao LP: {valor}%
  ROAS (se e-commerce): {valor}x
  CPC medio: R$ {valor}

DADOS FALTANDO:
  {lista_do_que_nao_foi_possivel_extrair}
```

Se algum dado critico estiver faltando, pergunte ao operador:

> Preciso de {dado_faltando} para o diagnostico ficar completo. Voce tem acesso ou consigo estimar com base no que temos?

**So avance apos operador validar que os dados estao corretos.**

---

## Checkpoint 2 — Metricas vs benchmarks por segmento

Consulte `references/benchmarks-por-setor.md` para os benchmarks do segmento do cliente.

Apresente a comparacao:

```
METRICAS vs BENCHMARKS — {NOME_CLIENTE} ({SEGMENTO})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Metrica | Atual | Benchmark setor | Status | Gap |
|---------|-------|-----------------|--------|-----|
| CPL | R$ {atual} | R$ {bench} | {acima/abaixo/ok} | {%} |
| CTR | {atual}% | {bench}% | {acima/abaixo/ok} | {%} |
| Conv. LP | {atual}% | {bench}% | {acima/abaixo/ok} | {%} |
| ROAS | {atual}x | {bench}x | {acima/abaixo/ok} | {%} |
| CPC | R$ {atual} | R$ {bench} | {acima/abaixo/ok} | {%} |

Legenda: 🔴 Critico (>50% abaixo) | 🟡 Atencao (20-50% abaixo) | 🟢 Saudavel

DIAGNOSTICO POR DIMENSAO:
━━━━━━━━━━━━━━━━━━━━━━━━━

ESTRUTURA DE CONTA:
  Organizacao: {adequada / fragmentada / inexistente}
  Segmentacao: {atinge_ICP / ampla_demais / errada}
  Budget allocation: {bem_distribuido / concentrado / disperso}
  Observacao: {detalhe_especifico}

CRIATIVOS:
  Criativos ativos: {numero}
  Melhor performance: {qual_e_metricas}
  Pior performance: {qual_e_metricas}
  Teste A/B: {ativo / inativo}
  Frequencia media: {valor} ({normal / fadiga})

PAGINAS DE DESTINO:
  LPs usadas: {numero}
  Coerencia com anuncios: {alta / media / baixa}
  Taxa de rejeicao estimada: {valor}%

PUBLICOS:
  Tipos usados: {broad / interest / lookalike / retargeting / custom}
  Sobreposicao: {sim / nao / nao_verificavel}
  Retargeting ativo: {sim / nao}
```

Pergunte ao operador:

> Os benchmarks fazem sentido para a realidade deste cliente especifico? Algum contexto que mude a leitura? (ex: "eles mudaram de agencia mes passado", "o produto e novo")

**So avance apos validacao do operador.**

---

## Checkpoint 3 — Top 3 problemas + plano de acao + meta realista

Com base na analise dos checkpoints anteriores, gere o diagnostico final.

```
TOP 3 PROBLEMAS CRITICOS — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEMA 1: {titulo}
  Evidencia nos dados: {metrica_ou_observacao_concreta}
  Impacto estimado: {quanto_esta_custando_ou_perdendo}
  Dimensao: {estrutura / criativos / landing_page / publicos}

PROBLEMA 2: {titulo}
  Evidencia nos dados: {metrica_ou_observacao_concreta}
  Impacto estimado: {quanto_esta_custando_ou_perdendo}
  Dimensao: {estrutura / criativos / landing_page / publicos}

PROBLEMA 3: {titulo}
  Evidencia nos dados: {metrica_ou_observacao_concreta}
  Impacto estimado: {quanto_esta_custando_ou_perdendo}
  Dimensao: {estrutura / criativos / landing_page / publicos}


PLANO DE ACAO — 30 DIAS
━━━━━━━━━━━━━━━━━━━━━━━━

| # | Acao | Prioridade | Impacto esperado | Responsavel | Prazo |
|---|------|-----------|------------------|-------------|-------|
| 1 | {acao_1} | Alta | {impacto} | {quem} | Semana 1 |
| 2 | {acao_2} | Alta | {impacto} | {quem} | Semana 1 |
| 3 | {acao_3} | Media | {impacto} | {quem} | Semana 2 |
| 4 | {acao_4} | Media | {impacto} | {quem} | Semana 2 |
| 5 | {acao_5} | Normal | {impacto} | {quem} | Semana 3-4 |


META REALISTA — 90 DIAS
━━━━━━━━━━━━━━━━━━━━━━━━

Com as acoes implementadas:
  CPL alvo: R$ {valor} (reducao de {%}% vs atual)
  ROAS alvo: {valor}x (aumento de {%}% vs atual)

Justificativa:
  {calculo_baseado_nos_dados_e_benchmarks}

Premissas:
  - {premissa_1}
  - {premissa_2}
  - {premissa_3}

ALERTA: {se_a_meta_depende_de_fatores_fora_do_controle_da_midia, avise}
```

Pergunte ao operador:

> O plano de acao e executavel na realidade deste cliente? Alguma acao que depende de algo que nao temos? A meta de 90 dias parece realista?

**So avance apos aprovacao do operador.**

---

## Finalizacao

Apos todos os checkpoints aprovados:

1. **Salve o JSON estruturado** em `clientes/{cliente}/diagnostico-midia.json` seguindo o schema
2. **Atualize state.json** — marque `diagnostico-midia` como `completed`
3. **Appende em decisions.jsonl** as decisoes tomadas
4. **Apresente o resumo final:**

```
DIAGNOSTICO DE MIDIA CONCLUIDO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CPL atual: R$ {atual} → Meta 90d: R$ {meta}
ROAS atual: {atual}x → Meta 90d: {meta}x
Problemas criticos: {numero}
Acoes no plano: {numero}
Fonte de dados: {V4MOS API / manual}

Este diagnostico alimenta:
  - /forecast-midia → Modelagem de investimento para 3 meses
  - /copy-anuncios → Direcao de mensagem nos anuncios
  - /criativos-anuncios → Briefing criativo baseado no que funciona

Proximo passo recomendado: /diagnostico-criativos
(Complementa este diagnostico com analise visual dos criativos)
```

Pergunte: "Quer seguir para diagnostico de criativos ou outra skill?"

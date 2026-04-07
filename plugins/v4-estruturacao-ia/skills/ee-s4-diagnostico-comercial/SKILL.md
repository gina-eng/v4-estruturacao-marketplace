---
name: ee-s4-diagnostico-comercial
description: "Diagnostico completo do funil de vendas: taxas vs benchmarks, mapa de objecoes, criterios de qualificacao 1-5 estrelas e SLA por score. Use quando o operador disser 'diagnostico comercial', 'funil de vendas', 'analise comercial', 'gargalo de vendas', ou ao iniciar a semana 4."
dependencies:
  - ee-s1-persona-icp
outputs: ["ee-s4-diagnostico-comercial.json"]
week: 4
estimated_time: "2h"
---

# Diagnostico Comercial

Voce e um consultor especializado em processos comerciais e funis de vendas para PMEs brasileiras. Vai conduzir, junto com o operador, um diagnostico completo do funil de vendas do cliente para identificar gargalos, mapear objecoes e definir os criterios de qualificacao que vao calibrar o SDR IA.

> **IMPORTANCIA:** Este diagnostico e a fundacao de todo o modulo de vendas. Os criterios de qualificacao definidos aqui serao usados diretamente nos scripts do SDR IA e na configuracao do Patagon. Se os criterios estiverem errados, o SDR vai qualificar errado e o vendedor vai receber leads ruins.

## Setup

1. Leia `briefing.json` do cliente — extraia: NOME_CLIENTE, PRODUTO_SERVICO, TICKET_MEDIO
2. Leia `ee-s1-persona-icp.json` — extraia: RESUMO_ICP, dores principais, comportamento de compra, objecoes
3. Se houver `v4mos-cache.json`, verifique se ha dados de CRM ou funil ja coletados

Antes de iniciar, pergunte ao operador os dados do funil atual:

> Preciso dos dados do funil de vendas atual de {NOME_CLIENTE}. Me passe:
> - Quantos leads/mes entram?
> - Taxa de contato (lead para primeira conversa): X%
> - Taxa de qualificacao (conversa para proposta): X%
> - Taxa de fechamento (proposta para venda): X%
> - Ticket medio real (valor medio das vendas recentes): R$
> - Ciclo medio de venda (em dias): X
> - Quantos vendedores o cliente tem e como e o perfil de cada um?
> - Quais sao as 5 objecoes mais comuns que ouvem?
> - Tem algum script ou roteiro de vendas hoje? (pode ser informal)
>
> Se o cliente nao tem dados exatos, estimativas servem — mas sinalize que sao estimativas.

Se o operador nao tiver algum dado, registre como "[estimativa]" ou "[nao disponivel]" e prossiga com o que houver. NAO invente numeros.

---

## CHECKPOINT 1: Diagnostico do Funil com Taxas vs Benchmarks

**Objetivo:** Analisar cada etapa do funil comparando com benchmarks do setor para identificar onde esta o maior gargalo.

Consulte `references/framework-ee-s4-diagnostico-comercial.md` para os benchmarks de conversao por segmento.

Para cada etapa do funil, analise e apresente:

```
DIAGNOSTICO DO FUNIL — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Volume: {LEADS_MES} leads/mes
Ticket medio: R${TICKET_MEDIO_REAL}
Ciclo de venda: {CICLO_VENDA} dias

ETAPA 1: Lead → Primeiro Contato
  Taxa atual: {TAXA_CONTATO}%
  Benchmark setor ({SEGMENTO}): {BENCHMARK}%
  Gap: {DIFERENCA} pontos percentuais
  Status: [ACIMA DO BENCHMARK / NO BENCHMARK / ABAIXO DO BENCHMARK / CRITICO]
  Gargalo: {descricao_especifica}
  Causa raiz: {causa_raiz_mais_provavel}
  Impacto financeiro estimado: R${valor_perdido}/mes

ETAPA 2: Primeiro Contato → Qualificacao
  Taxa atual: {TAXA_QUALIFICACAO}%
  Benchmark setor ({SEGMENTO}): {BENCHMARK}%
  Gap: {DIFERENCA} pontos percentuais
  Status: [ACIMA / NO / ABAIXO / CRITICO]
  Gargalo: {descricao_especifica}
  Causa raiz: {causa_raiz_mais_provavel}
  Impacto financeiro estimado: R${valor_perdido}/mes

ETAPA 3: Qualificacao → Proposta
  Taxa atual: {TAXA_PROPOSTA}%
  Benchmark setor ({SEGMENTO}): {BENCHMARK}%
  Gap: {DIFERENCA} pontos percentuais
  Status: [ACIMA / NO / ABAIXO / CRITICO]
  Gargalo: {descricao_especifica}
  Causa raiz: {causa_raiz_mais_provavel}
  Impacto financeiro estimado: R${valor_perdido}/mes

ETAPA 4: Proposta → Fechamento
  Taxa atual: {TAXA_FECHAMENTO}%
  Benchmark setor ({SEGMENTO}): {BENCHMARK}%
  Gap: {DIFERENCA} pontos percentuais
  Status: [ACIMA / NO / ABAIXO / CRITICO]
  Gargalo: {descricao_especifica}
  Causa raiz: {causa_raiz_mais_provavel}
  Impacto financeiro estimado: R${valor_perdido}/mes

GARGALO PRINCIPAL: Etapa {N} — {descricao}
Motivo: {causa_raiz_principal}
Se corrigido, impacto estimado: +{X}% na conversao geral = +R${valor}/mes

NOTA: Benchmarks marcados com [E] sao estimativas do setor. Demais tem fonte referenciada.
```

Para calcular o impacto financeiro, use: (leads perdidos na etapa) x (taxa de conversao restante) x (ticket medio).

Pergunte ao operador:

> O diagnostico faz sentido com o que voce observa no dia a dia do cliente?
> O gargalo principal identificado confere com a percepcao do time de vendas?
> Alguma etapa que voce sabe que o dado esta impreciso?

**Criterio de aprovacao:** Operador valida que o diagnostico reflete a realidade e o gargalo principal faz sentido.

---

## CHECKPOINT 2: Mapa de Objecoes

**Objetivo:** Mapear cada objecao com tipo, momento no funil, resposta recomendada e como o SDR IA deve tratar preventivamente.

Com base nas objecoes listadas pelo operador e nas objecoes do ICP (ee-s1-persona-icp.json), gere:

```
MAPA DE OBJECOES — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OBJECAO 1: "{objecao_exata}"
  Tipo: [PRECO / URGENCIA / AUTORIDADE / CONFIANCA / NECESSIDADE / CONCORRENTE]
  Momento no funil: [PRIMEIRO CONTATO / QUALIFICACAO / PROPOSTA / NEGOCIACAO]
  Frequencia estimada: [ALTA / MEDIA / BAIXA]
  Resposta recomendada (vendedor humano):
    "{script_curto_2_3_frases}"
  Prevencao pelo SDR IA:
    "{como_o_sdr_deve_abordar_antes_da_objecao_surgir}"
  Exemplo de conversa:
    Lead: "{frase_tipica_do_lead}"
    SDR: "{resposta_do_sdr}"

OBJECAO 2: "{objecao_exata}"
  Tipo: [...]
  [...]

[repetir para cada objecao]

PADRAO IDENTIFICADO:
  Tipo mais frequente: {tipo}
  Momento mais critico: {etapa_do_funil}
  Objecao que mais mata vendas: {objecao}
  Recomendacao principal: {acao_para_reduzir_objecoes}
```

Pergunte ao operador:

> As respostas para as objecoes fazem sentido para o tom e realidade do cliente?
> Tem alguma objecao que eu nao listei mas que aparece frequentemente?
> O vendedor atual conseguiria usar essas respostas naturalmente?

**Criterio de aprovacao:** Operador valida que as objecoes estao completas e as respostas sao realistas para o contexto do cliente.

---

## CHECKPOINT 3: Criterios de Qualificacao 1-5 Estrelas

**Objetivo:** Definir criterios claros e mensuraveis para classificar leads, que serao usados diretamente pelo SDR IA.

Com base no ICP, ticket medio, ciclo de venda e objecoes, defina:

```
CRITERIOS DE QUALIFICACAO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

★★★★★ (5 estrelas) — LEAD QUENTE / PRONTO PARA COMPRAR
  Perfil: {descricao_especifica — ex: "decisor direto, orcamento aprovado, prazo definido"}
  Sinais obrigatorios (TODOS devem estar presentes):
    - {sinal_1 — ex: "e o decisor final ou tem autonomia de compra"}
    - {sinal_2 — ex: "tem orcamento compativel com o ticket medio"}
    - {sinal_3 — ex: "tem urgencia definida (prazo ou evento)"}
    - {sinal_4 — ex: "ja pesquisou alternativas (esta comparando)"}
  Acao: encaminhar IMEDIATAMENTE para vendedor
  Exemplo de lead 5★: "{descricao_de_um_lead_real_tipico}"

★★★★☆ (4 estrelas) — LEAD QUALIFICADO / ALTO POTENCIAL
  Perfil: {descricao — ex: "tem necessidade clara, orcamento provavel, mas nao definiu prazo"}
  Sinais (pelo menos 3 de 4):
    - {sinal_1}
    - {sinal_2}
    - {sinal_3}
    - {sinal_4}
  Acao: encaminhar para vendedor em ate {X} horas
  Exemplo de lead 4★: "{descricao}"

★★★☆☆ (3 estrelas) — LEAD MORNO / POTENCIAL FUTURO
  Perfil: {descricao — ex: "tem interesse mas nao tem urgencia ou orcamento definido"}
  Sinais (pelo menos 2 de 4):
    - {sinal_1}
    - {sinal_2}
    - {sinal_3}
    - {sinal_4}
  Acao: entrar em regua de nutricao automatica
  Exemplo de lead 3★: "{descricao}"

★★☆☆☆ / ★☆☆☆☆ (1-2 estrelas) — LEAD FRIO / NAO QUALIFICADO
  Perfil: {descricao — ex: "curioso, sem orcamento, nao e decisor, segmento errado"}
  Sinais de desqualificacao (qualquer um):
    - {sinal_1 — ex: "orcamento muito abaixo do ticket minimo"}
    - {sinal_2 — ex: "nao e o perfil do ICP (segmento/porte/regiao)"}
    - {sinal_3 — ex: "so quer cotacao para comparar, sem intencao real"}
    - {sinal_4 — ex: "nao tem autoridade e nao consegue envolver o decisor"}
  Acao: nutricao de longo prazo (email/conteudo) ou descarte gentil
  Exemplo de lead 1-2★: "{descricao}"

REGRA DE OURO:
  Na ee-s0-duvida entre 3★ e 4★, classifique como {3★ ou 4★ — justifique a escolha}.
  Na ee-s0-duvida entre 2★ e 3★, classifique como {2★ ou 3★ — justifique}.
```

Pergunte ao operador:

> Esses criterios refletem o que diferencia um lead bom de um lead ruim para {NOME_CLIENTE}?
> O vendedor concordaria com essa classificacao?
> Tem algum sinal que eu nao incluiu mas que e importante para este negocio? (ex: localizacao, tipo de empresa, sazonalidade)

**Criterio de aprovacao:** Operador valida que os criterios sao especificos, mensuraveis, e o time de vendas concordaria com a classificacao.

---

## CHECKPOINT 4: SLA de Atendimento por Score + Plano de Acao

**Objetivo:** Definir o tempo maximo de resposta por score e gerar um plano de acao comercial priorizado.

### SLA de Atendimento

```
SLA DE ATENDIMENTO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lead 5★: responder em ate {X} MINUTOS
  Responsavel: vendedor senior
  Canal: WhatsApp direto
  Meta: contato em ate {X} minutos apos alerta

Lead 4★: responder em ate {X} HORAS
  Responsavel: vendedor designado
  Canal: WhatsApp direto
  Meta: contato no mesmo turno (manha/tarde)

Lead 3★: entrar em regua automatica em ate {X} HORAS
  Responsavel: SDR IA (automatico)
  Canal: WhatsApp automatico + email
  Meta: primeiro conteudo de nutricao em ate {X} horas

Lead 1-2★: descarte gentil ou nutricao passiva
  Responsavel: SDR IA (automatico)
  Canal: email
  Meta: mensagem de despedida + inscricao em newsletter (se houver)

ALERTA CRITICO:
  Se um lead 5★ nao for contatado em {X} minutos, escalar para {RESPONSAVEL}.
  Se um lead 4★ nao for contatado em {X} horas, escalar para {RESPONSAVEL}.
```

### Plano de Acao Comercial

Com base em todo o diagnostico, gere 5 acoes priorizadas por impacto:

```
PLANO DE ACAO COMERCIAL — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIORIDADE 1 (maior impacto):
  Acao: {acao_especifica}
  Responsavel: {vendedor / SDR IA / gestor / consultor}
  Prazo: {prazo_realista}
  Como medir: {metrica_de_sucesso}
  Impacto esperado: {estimativa_quantitativa}

PRIORIDADE 2:
  Acao: {acao_especifica}
  Responsavel: {quem}
  Prazo: {quando}
  Como medir: {metrica}
  Impacto esperado: {estimativa}

PRIORIDADE 3:
  [...]

PRIORIDADE 4:
  [...]

PRIORIDADE 5:
  [...]

PROXIMOS PASSOS IMEDIATOS:
  1. {acao_para_esta_semana}
  2. {acao_para_proxima_semana}
  3. {acao_para_o_mes}
```

Pergunte ao operador:

> O SLA e realista para a capacidade do time de vendas do cliente?
> O cliente consegue realmente responder em {X} minutos para leads 5★?
> As acoes do plano sao factives com os recursos atuais?
> Quer ajustar alguma prioridade ou prazo?

**Criterio de aprovacao:** Operador valida o SLA e o plano de acao como realistas e executaveis.

---

## Finalizacao

Apos os 4 checkpoints aprovados:

1. **Salve o JSON estruturado** em `clientes/{slug}/semana-4/ee-s4-diagnostico-comercial.json` seguindo o schema.json da skill
2. **Registre a decisao** — appende em `decisions.jsonl`:
   ```json
   {"ts":"[ISO]","skill":"ee-s4-diagnostico-comercial","checkpoint":4,"decision":"Diagnostico aprovado. Gargalo principal: [etapa]. Criterios 5★: [resumo]. SLA 5★: [X] min."}
   ```
3. **Atualize state.json** — marque `ee-s4-diagnostico-comercial` como `completed`
4. **Informe proximos passos:**
   - "Diagnostico comercial salvo. Este output sera usado por: ee-s4-cliente-oculto (simulacao de compra), ee-s5-scripts-sdr (scripts do agente IA), ee-s5-sdr-ia-config (configuracao do Patagon)."
   - Sugira a proxima skill: `/ee-s4-cliente-oculto` (para testar o processo atual antes de automatizar)

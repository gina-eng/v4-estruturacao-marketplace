---
name: diagnostico-maturidade
description: "Analisa a maturidade digital do cliente com base em dados V4MOS ou briefing. Gera score por pilar, resumo executivo e prioridades. Use quando o operador disser 'maturidade', 'diagnóstico digital', 'score', ou ao iniciar semana 1."
dependencies: []
outputs: ["diagnostico-maturidade.json"]
week: 1
estimated_time: "30-45 min"
v4mos_integration: primary
---

# Diagnóstico de Maturidade Digital

Você é um estrategista sênior de marketing digital. Vai analisar a maturidade digital do cliente e produzir um diagnóstico que direciona toda a priorização estratégica.

> **INTEGRAÇÃO V4MOS:** Esta skill usa dados da plataforma V4 Marketing como fonte primária. Se não houver dados V4MOS, faz diagnóstico baseado no briefing e informações coletadas com o operador.

## Dados necessários

### Fonte primária: V4MOS
Leia `clientes/{slug}/v4mos-cache.json`. Se o arquivo existir, extraia:
- `diagnoses` → scores automáticos por pilar (mídia paga, criativos, CRO, CRM, SEO)
- `integrations` → status das integrações (Meta, Google Ads, Analytics, Kommo)
- `workspace` → dados do workspace (nome, site, segmento)

Se o arquivo não existir ou estiver desatualizado (mais de 7 dias), tente rodar:
```bash
scripts/v4mos_fetch.sh clientes/{slug}/
```

### Fonte secundária: Briefing
Leia `clientes/{slug}/briefing.json`. Extraia:
- `identification.segment` → segmento para benchmark
- `digital_situation` → situação digital declarada pelo cliente
- `accesses` → quais acessos o operador já tem

---

## CHECKPOINT 1: Verificação de Dados V4MOS

**Objetivo:** Confirmar quais dados temos e de onde vieram.

### Cenário A: V4MOS tem dados de diagnóstico
Mostre ao operador:
```
DADOS V4MOS ENCONTRADOS PARA [NOME_CLIENTE]:
- Data da coleta: [fetched_at]
- Integrações ativas: [lista]
- Diagnóstico disponível: [sim/não por pilar]

SCORES AUTOMÁTICOS:
- Mídia Paga: [score]/100
- Criativos: [score]/100
- CRO: [score]/100
- CRM: [score]/100
- SEO: [score]/100
- Score Geral: [média ponderada]/100
```

Pergunte ao operador:
- "Esses dados parecem condizentes com o que você sabe do cliente?"
- "O cliente fez mudanças recentes que esses dados podem não capturar?"
- "Quer adicionar alguma observação qualitativa sobre algum pilar?"

### Cenário B: V4MOS sem dados (ou sem V4MOS)
Informe o operador:
```
V4MOS: dados de diagnóstico não disponíveis.
Motivo: [não tem workspace / integrações não conectadas / diagnóstico não rodou]
```

Neste caso, faça o diagnóstico baseado em:
1. Dados do briefing (`digital_situation`)
2. Perguntas diretas ao operador sobre cada pilar

Para cada pilar, pergunte ao operador:

**Mídia Paga:**
- "O cliente roda mídia paga? Em quais plataformas?"
- "Investimento mensal aproximado?"
- "Tem pixel/tag configurado corretamente?"
- "Qual o ROAS ou CPA atual (se souber)?"

**Criativos:**
- "Tem criativos ativos rodando? Quantos?"
- "Quem produz os criativos (interno, agência, freelancer)?"
- "Os criativos são atualizados com que frequência?"

**CRO (Conversão):**
- "Tem site/LP? Qual a URL?"
- "Sabe a taxa de conversão atual?"
- "Tem formulário, WhatsApp, ou outro ponto de conversão?"

**CRM:**
- "Usa algum CRM? Qual?"
- "Leads são registrados em algum sistema?"
- "Tem automação de follow-up?"

**SEO:**
- "Aparece no Google para termos relevantes?"
- "Tem blog ou conteúdo indexado?"
- "Google Meu Negócio configurado?"

**Critério de aprovação:** Operador confirma que os dados estão corretos ou complementa com informações adicionais.

---

## CHECKPOINT 2: Análise Contextualizada

**Objetivo:** Transformar scores/dados brutos em análise estratégica acionável.

Consulte `references/scoring-framework.md` para calibrar a análise.

Com base nos dados (V4MOS ou coletados), gere:

### Resumo Executivo (máx. 3 parágrafos)

Escreva em tom direto, sem eufemismo. Se o score é ruim, diga que é ruim e por quê.

Parágrafo 1: Score geral e o que significa na prática para o negócio. Não diga só o número — traduza em impacto: "Você está deixando X na mesa" ou "Seus concorrentes no setor Y estão [comparação]."

Parágrafo 2: Os 2 maiores gaps que estão custando resultado AGORA. Seja específico: não "melhorar mídia paga" mas "seus anúncios no Meta estão rodando sem público lookalike e o CPA está 3x acima da média do setor."

Parágrafo 3: Os 2 pontos fortes que precisam ser aproveitados/acelerados.

### Score por Pilar (tabela)

| Pilar | Score | Classificação | Destaque |
|-------|-------|---------------|----------|
| Mídia Paga | X/100 | [Crítico/Baixo/Médio/Bom/Excelente] | [1 frase] |
| Criativos | X/100 | ... | ... |
| CRO | X/100 | ... | ... |
| CRM | X/100 | ... | ... |
| SEO | X/100 | ... | ... |
| **GERAL** | **X/100** | ... | ... |

Se não houver dados V4MOS, atribua scores estimados com base na conversa com o operador, marcando como "(estimado)" na tabela.

### Prioridades de Ação (5 ações, ranqueadas)

Para cada ação:
1. **O que fazer** (específico e acionável)
2. **Por que é prioridade** (impacto esperado)
3. **Esforço** (baixo/médio/alto)
4. **Dependências** (o que precisa estar pronto antes)

### Benchmark do Setor

Compare o score do cliente com a média do setor (use `references/scoring-framework.md`).
- Quais pilares estão acima da média?
- Quais estão abaixo?
- Qual o gap mais crítico vs. o setor?

Apresente toda a análise ao operador.

**Pergunte ao operador:**
- "A análise condiz com o que você vê no dia a dia do cliente?"
- "As prioridades fazem sentido na ordem apresentada?"
- "Tem algum contexto que muda a priorização? (ex: cliente já fechou contrato de mídia, CRM já está em implementação)"

**Critério de aprovação:** Operador valida a análise e prioridades, com ajustes se necessário.

---

## CHECKPOINT 3: Aprovação Final

**Objetivo:** Consolidar o diagnóstico com todos os ajustes e obter aprovação para salvar.

Apresente a versão final do diagnóstico incorporando todos os ajustes do operador.

Mostre:
1. Score final por pilar (tabela)
2. Resumo executivo (versão final)
3. Top 5 prioridades (versão final)
4. Benchmark do setor

**Pergunte ao operador:**
- "Este diagnóstico está pronto para ser salvo? Será usado pela skill SWOT e pelas skills de diagnóstico detalhado (mídia, criativos, CRO)."
- "Algum último ajuste?"

**Critério de aprovação:** Operador dá OK final para salvar.

---

## Finalização

Após os 3 checkpoints aprovados:

1. **Salve o output estruturado** em `clientes/{slug}/semana-1/diagnostico-maturidade.json` seguindo o schema.json da skill
2. **Registre a decisão** — appende em `decisions.jsonl`:
   ```json
   {"ts":"[ISO]","skill":"diagnostico-maturidade","checkpoint":3,"decision":"Diagnóstico aprovado. Score geral: [X]/100. Prioridade #1: [ação]"}
   ```
3. **Atualize state.json** — marque `diagnostico-maturidade` como `completed`
4. **Informe próximos passos:**
   - "Diagnóstico salvo. Este output será usado pela skill SWOT para gerar a análise estratégica."
   - Se dados V4MOS estavam disponíveis, sugira as skills de diagnóstico detalhado (diagnostico-midia, diagnostico-criativos, diagnostico-cro) para semana 2
   - Sugira a próxima skill da semana 1

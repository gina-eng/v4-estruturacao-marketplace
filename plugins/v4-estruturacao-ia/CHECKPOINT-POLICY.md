# Política de Checkpoints — Aplica a TODAS as skills

Este arquivo SOBRESCREVE o comportamento de checkpoints definido nos SKILL.md individuais. Se um SKILL.md tem "CHECKPOINT 1, 2, 3, 4, 5", IGNORE essa estrutura numérica e siga esta política.

## Fluxo de execução de qualquer skill

### 1. Geração completa

Gere o output INTEIRO da skill de uma vez. Use todas as instruções do SKILL.md (frameworks, schemas, dados do client.json, references) para produzir o resultado completo. Não pare no meio.

Se o SKILL.md lista "CHECKPOINT 1: gerar ICP, CHECKPOINT 2: gerar persona, CHECKPOINT 3: gerar mensagem" → gere ICP + persona + mensagem TUDO de uma vez.

### 2. Auto-validação (silenciosa)

Antes de mostrar ao operador, valide:

- [ ] Output menciona o cliente pelo nome (não é genérico)?
- [ ] Dados usados batem com client.json.briefing?
- [ ] Todos os campos do schema.json estão preenchidos?
- [ ] Nenhum item é genérico demais (ex: "quer crescer", "qualidade e compromisso", "líder de mercado")?
- [ ] Se usa concorrentes, são os mesmos do briefing?
- [ ] Se usa ICP/persona, é consistente com output de ee-s1-persona-icp?
- [ ] Tamanho adequado (nem telegráfico nem verborrágico)?

Se QUALQUER check falhar → regenere a parte específica silenciosamente. Não diga ao operador "regenerei porque estava genérico" — só apresente a versão boa.

### 3. Apresentação com decisões e opinião

Apresente o output completo ao operador. Marque CLARAMENTE os pontos de decisão:

```
OUTPUT COMPLETO — {nome da skill}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[output formatado]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DECISÕES PARA VOCÊ:

DECISÃO 1: {o que precisa ser escolhido}
  Opção A: {descrição}
  Opção B: {descrição}
  Opção C: {descrição}
  
  MINHA RECOMENDAÇÃO: {opção} 
  RAZÃO: {justificativa baseada em dados do cliente, não opinião genérica}
  PROVOCAÇÃO: {pergunta contrária que força o operador a pensar}

DECISÃO 2: {se houver outra escolha}
  ...

AJUSTES: Algo que quer mudar no output acima?
```

### Regras de opinião e recomendação

Em TODA decisão, o Claude DEVE:

1. **Recomendar UMA opção** — nunca apresentar 3 opções iguais sem preferência
2. **Justificar com dados** — "Recomendo A porque o concorrente X já usa B, e o ICP valoriza Z"
3. **Provocar** — "Essa escolha implica Y. O cliente tá pronto pra isso?"
4. **Ser honesto** — "Nenhuma opção é ótima aqui. A é a menos ruim porque..."

### Pontos de decisão comuns por tipo de skill

**Skills de diagnóstico** (maturidade, SWOT, mídia, criativos, CRO, comercial):
- Geralmente 0 decisões do operador. Output é analítico. Operador revisa e ajusta dados.
- "Esse diagnóstico faz sentido com o que você vê do cliente? Algo que eu errei?"

**Skills de estratégia** (persona-icp, posicionamento, pesquisa-mercado):
- 1-2 decisões: direção do ICP, PUV, território de marca
- Sempre 3 opções com recomendação forte

**Skills de produção** (brandbook, copy, criativos, landing page, forecast):
- 0-1 decisões: tom de voz, hook principal
- Maioria é "aqui está, ajuste o que quiser"

**Skills semi-manuais** (identidade visual, criativos, CRM, SDR config):
- O output inclui instruções para ação manual do operador
- Decisão: "Como quer proceder com a parte manual?"

### 4. Finalização

Após aprovação do operador:

1. Salve output em `clientes/{slug}/outputs/{skill-name}.json`
   - Inclua campo `summary` no topo (1-2 linhas)
   - Inclua campo `version` (incrementa a cada re-geração)
2. Atualize `client.json`:
   - `progress.skills.{skill}` → status: "completed", version++, completed_at
   - Append em `history[]`: {"ts", "skill", "action": "completed", "note": "resumo da decisão"}
3. Informe próximo passo baseado no dependency_graph

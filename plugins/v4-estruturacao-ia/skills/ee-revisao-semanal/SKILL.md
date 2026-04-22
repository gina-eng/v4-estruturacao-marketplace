---
name: ee-revisao-semanal
description: "Executa pente-fino de fim de semana no consolidado + outputs. Detecta divergências factuais entre entregas, gaps narrativos, redundâncias, e propõe atualizações pontuais nos outputs que alimentam o portal. Após aprovação, regenera portal + consolidated automaticamente. Use quando o operador disser 'revisar semana', 'fechar ciclo', 'revisão semanal', ou ao final de qualquer semana com todas as skills completas."
dependencies: []
outputs: ["ee-revisao-semanal.json"]
week: "multi"
estimated_time: "20-40 min"
arguments:
  - name: cliente
    required: true
    description: "Slug do cliente em clientes/"
  - name: semana
    required: false
    description: "Número da semana a revisar (1, 2, 3, ...). Se omitido, detecta automaticamente a última semana com todas as skills completas."
---

# Revisão Semanal — Pente-Fino Consolidado

Você é um editor-revisor sênior. Ao final de uma semana de entregas, a sua missão é garantir que TODO o material produzido (outputs + portal + consolidated) conte uma história coerente, sem divergências factuais e sem lacunas narrativas. Você NÃO refaz as skills — você ajusta pontualmente os outputs e deixa o portal/consolidado limpos.

> **REGRA DE OURO:** A consolidação precisa ficar SEMPRE atualizada após as revisões. Se você aplica um ajuste em qualquer output, é obrigatório re-rodar `render_portal.sh` no final. O portal e o consolidado são artefatos derivados — a verdade está nos outputs JSON.

## Dados necessários

1. `client.json` do cliente (seções `meta`, `briefing`, `progress`, `history`)
2. `outputs/*.json` — todos os outputs das skills da semana alvo e das semanas anteriores
3. `consolidated.md` — narrativa consolidada atual (fonte para detectar gaps e redundâncias)
4. `consolidated.html` — visualização consolidada atual (para checar se o portal vai renderizar corretamente após as mudanças)

### Detecção de semana (se argumento `semana` omitido)

Leia `client.json.progress.skills`. Agrupe as skills por prefixo `ee-sN-*`. A semana alvo é a MAIOR semana onde TODAS as skills da semana (conforme `dependency_graph.json`) estão com `status: completed`. Se nenhuma semana está 100% completa, avise o operador e pare.

### Semanas e skills cobertas (referência)

- **Semana 1:** ee-s1-persona-icp, ee-s1-diagnostico-maturidade, ee-s1-swot, ee-s1-auditoria-comunicacao
- **Semana 2:** ee-s2-pesquisa-mercado, ee-s2-posicionamento, ee-s2-diagnostico-midia, ee-s2-diagnostico-criativos, ee-s2-diagnostico-organico-ig, ee-s2-diagnostico-cro
- **Semana 3+:** derivar de `dependency_graph.json` (prefixo `ee-sN-`)

## Geração — 2 passes obrigatórios

### PASSE 1 — Sincronização Factual (cross-output)

Varra TODOS os outputs carregados (semana atual + anteriores) caçando divergências. Para cada achado, registre em `divergencias_factuais[]`.

Categorias a checar:

1. **Nomes e grafias** — nome do cliente, marcas, concorrentes, pessoas, bairros, regiões. Ex: "Zenvet" vs "ZenVet" vs "Clínica Zenvet".
2. **Números-chave** — ticket médio, faturamento, nº de clientes, scores, CACs, CPAs, TAM/SAM/SOM, datas. Se `ee-s1-diagnostico-maturidade` diz "score 4.2" e o resumo em `ee-s1-swot` diz "score 4,5", registre.
3. **Taxonomias** — nome de produtos/serviços, estágios de funil, personas, canais. Se `ee-s1-persona-icp` usa "Persona Ana 35-50" e `ee-s2-posicionamento` fala de "tutores 30-55", registre.
4. **Referências cruzadas** — uma skill cita um item que existe noutra, mas com rótulo diferente (ex: priority_action P1 vira "ação crítica #2" noutro lugar).
5. **Contradições lógicas** — um output afirma "não tem diferencial real" e outro lista 3 diferenciais como vantagem competitiva sólida.

Para cada divergência, preencha:
- `campo`: onde está o dado (ex: `ee-s1-swot.json > strengths[2].title`)
- `valor_atual`: o valor que está lá hoje
- `valor_recomendado`: o valor correto (escolha a fonte mais autoritativa — geralmente o briefing ou o output mais recente/específico)
- `fonte_de_verdade`: qual output/seção tem a versão correta e por quê
- `arquivos_afetados`: lista dos outputs que precisam ser atualizados
- `severidade`: `critica` (muda decisão) | `media` (confunde leitor) | `baixa` (cosmética)

### PASSE 2 — Qualidade Narrativa (leitura do consolidated)

Releia `consolidated.md` de ponta a ponta, simulando ser o stakeholder do cliente. Capture em `gaps_narrativos[]`.

Categorias:

1. **Redundâncias** — a mesma informação repetida em 2+ lugares sem agregar contexto. Proponha corte ou consolidação.
2. **Lacunas** — algo prometido em uma skill que nunca é respondido pelas outras (ex: `ee-s1-swot` diz "janela de 12 meses" mas `ee-s2-pesquisa-mercado` não quantifica).
3. **Tom inconsistente** — uma skill fala do cliente em 3ª pessoa e outra em 2ª, ou mistura formal e informal sem razão.
4. **Transições abruptas** — pulos lógicos entre seções. Sugira frase-ponte a adicionar em `summary_headline` ou `key_insight`.
5. **Honestidade** — algo foi vendido como "vantagem" em uma skill mas outro output revela que é fraqueza. Reforce ou adicione `honesty_alert`.

Para cada gap:
- `tipo`: `redundancia` | `lacuna` | `tom` | `transicao` | `honestidade`
- `localizacao`: skill + seção
- `descricao`: o que está faltando/sobrando
- `ajuste_proposto`: texto exato do campo a adicionar/editar/remover
- `arquivo_afetado`: output a ser atualizado

### Síntese — `atualizacoes_propostas[]`

Consolide os achados dos dois passes em uma LISTA DE EDIÇÕES CONCRETAS. Cada atualização deve ser autoexecutável:

```json
{
  "id": "U1",
  "arquivo": "outputs/ee-s1-swot.json",
  "caminho_json": "strengths[2].description",
  "acao": "substituir",  // ou "adicionar" | "remover"
  "valor_antigo": "...",
  "valor_novo": "...",
  "motivo": "Divergência factual F1 — ticket médio está R$ 180 no briefing e R$ 220 aqui",
  "severidade": "critica"
}
```

Agrupe por severidade: críticas primeiro. Se uma mesma correção afeta múltiplos arquivos, liste cada arquivo como entrada separada com mesmo `motivo`.

## Auto-validação

Antes de mostrar ao operador, verifique:

- [ ] Mencionou o cliente pelo nome e a semana específica revisada?
- [ ] Varreu TODOS os outputs (não só os da semana alvo)?
- [ ] Cada divergência cita arquivo + caminho JSON + valor atual vs recomendado?
- [ ] Cada gap narrativo tem ajuste proposto EXECUTÁVEL (não apenas "melhorar redação")?
- [ ] `atualizacoes_propostas[]` está ordenada por severidade (críticas primeiro)?
- [ ] Cada atualização tem `valor_antigo` e `valor_novo` (ou `null` se adição/remoção)?
- [ ] Nenhum item genérico do tipo "revisar tom" — tudo é diff concreto?
- [ ] Schema validou?

Se falhou → regenere silenciosamente.

## Apresentação e decisões

Apresente ao operador em formato de RELATÓRIO com 3 seções:

1. **Divergências factuais** — tabela: `#`, `campo`, `atual → proposto`, `severidade`
2. **Gaps narrativos** — lista numerada com `tipo` + `localização` + `ajuste`
3. **Atualizações propostas** — tabela de diffs `#`, `arquivo`, `caminho`, `antigo → novo`, `motivo`

Para cada atualização (U1, U2, ...) peça decisão explícita ao operador:

> Para cada item abaixo, diga: **ACEITAR**, **REJEITAR** ou **AJUSTAR: <nova versão>**. Você pode responder em bloco (ex: "U1 aceitar, U2 rejeitar, U3 ajustar: ...").

Aguarde a decisão. Não aplique nada antes.

## Finalização

Após o operador decidir item a item:

1. **Salve a revisão**: grave `clientes/{slug}/outputs/ee-revisao-semanal.json` (com campo `summary` no topo resumindo: N divergências, N gaps, N atualizações aceitas, N rejeitadas, N ajustadas). Se já existir (revisão anterior), versione adicionando a data ao summary e preserve o `_refinement_history[]` acumulado.

2. **Aplique as atualizações aceitas nos outputs alvo**. Para cada arquivo editado:
   - Leia o JSON, navegue pelo `caminho_json`, aplique a ação (`substituir` | `adicionar` | `remover`).
   - Adicione no topo do objeto do output editado (nível raiz):
     ```json
     "refined_in": "ee-revisao-semanal",
     "_refinement_history": [
       {
         "ts": "2026-04-21T10:30:00Z",
         "review": "ee-revisao-semanal",
         "semana": 2,
         "updates": ["U1", "U3", "U5"],
         "note": "Ticket médio alinhado com briefing; gap de janela temporal adicionado ao key_insight."
       }
     ]
     ```
   - Se `_refinement_history` já existe, **acrescente** o novo registro ao array (não substitua).
   - Incremente `version` do output se o schema tiver esse campo.

3. **Atualize `client.json`**:
   - `progress.skills["ee-revisao-semanal"]` → `{status: "completed", version: version+1, completed_at: now}`
   - Append em `history[]`:
     ```json
     {
       "ts": "2026-04-21T10:30:00Z",
       "skill": "ee-revisao-semanal",
       "action": "completed",
       "note": "Revisão semana 2: 3 divergências corrigidas, 2 gaps fechados. Outputs ajustados: ee-s1-swot, ee-s2-posicionamento, ee-s2-pesquisa-mercado."
     }
     ```

4. **OBRIGATÓRIO — regenere portal + consolidated**:
   ```bash
   plugins/v4-estruturacao-ia/scripts/render_portal.sh clientes/{slug}
   ```
   Este passo garante que o consolidated fica atualizado após cada revisão. NÃO PULE.

5. Reporte ao operador:
   - "Revisão da semana {N} concluída. Aplicadas {X} de {Y} atualizações propostas. Portal + consolidated regenerados."
   - Link da Vercel (se `vercel-project.json` existir).
   - Sugira próximo passo:
     - Se ainda há semanas pendentes: "Próxima semana começa com /ee-s{N+1}-..."
     - Se esta foi a última semana do ciclo: "Todas as semanas revisadas. Ciclo de estruturação fechado."

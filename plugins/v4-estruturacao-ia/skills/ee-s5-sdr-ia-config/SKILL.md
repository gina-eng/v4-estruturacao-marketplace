---
name: ee-s5-sdr-ia-config
description: "Configuracao do SDR IA no Patagon + integracao Kommo: setup do agente, field mapping, alertas para vendedor e teste com 5 leads simulados. Use quando o operador disser 'configurar patagon', 'setup sdr', 'integrar kommo', 'colocar o agente no ar', ou apos ee-s5-scripts-sdr."
dependencies:
  - ee-s5-scripts-sdr
  - ee-s3-crm-setup
outputs: ["ee-s5-sdr-ia-config.json"]
week: 5
estimated_time: "4h"
semi_manual: true
---

# Configuracao do SDR IA (Patagon + Kommo)

Voce e um guia tecnico para configuracao do agente SDR IA no Patagon com integracao Kommo CRM. Esta skill e SEMI-MANUAL: voce gera as instrucoes passo a passo e o operador executa no Patagon e Kommo. Apos cada etapa, o operador confirma que executou.

> **IMPORTANCIA:** Esta e a skill que coloca o SDR IA no ar. Tudo que foi definido nas semanas anteriores (ICP, diagnostico, scripts) converge aqui. Um erro na configuracao significa leads mal qualificados ou alertas que nao chegam.

> **PRE-REQUISITOS:**
> - WhatsApp Business do cliente conectado ao Patagon
> - Kommo CRM configurado com pipeline (skill ee-s3-crm-setup)
> - Scripts SDR aprovados pelo cliente (skill ee-s5-scripts-sdr)
> - Brandbook com tom de voz aprovado

## Setup

1. Leia `briefing.json` do cliente — extraia: NOME_CLIENTE, PRODUTO_SERVICO
2. Leia `ee-s5-scripts-sdr.json` — extraia: TODOS os scripts, perguntas, fluxos, objecoes
3. Leia `ee-s4-diagnostico-comercial.json` — extraia: criterios de qualificacao 1-5 estrelas, SLA
4. Leia `ee-s3-brandbook.json` — extraia: TOM_DE_VOZ, nome do agente
5. Verifique se `ee-s3-crm-setup.json` existe e esta completo (pipeline configurado no Kommo)

Se alguma dependencia nao estiver completa, avise:

> BLOQUEIO: A skill {NOME_SKILL} precisa estar completa antes de configurar o SDR IA.
> Status atual: {status}
> Acao: execute `/ee-s5-scripts-sdr` (ou `/ee-s3-crm-setup`) antes de ee-s0-continuar.

Confirme com o operador:

> Vamos configurar o SDR IA de {NOME_CLIENTE} no Patagon e integrar com Kommo.
>
> Confirme:
> - WhatsApp Business do cliente esta conectado ao Patagon? [sim/nao]
> - Kommo CRM esta configurado com pipeline? [sim/nao]
> - Scripts foram aprovados pelo cliente? [sim/nao]
> - Quem e o vendedor que vai receber os alertas de leads quentes? Nome e WhatsApp?
>
> Se algum item for "nao", precisamos resolver antes de ee-s0-continuar.

---

## CHECKPOINT 1: Configuracao do Agente no Patagon

**Objetivo:** Guiar o operador passo a passo na criacao e configuracao do agente no Patagon.

Consulte `references/guia-patagon-kommo.md` para detalhes tecnicos da configuracao.

Gere as instrucoes personalizadas para este cliente:

```
CONFIGURACAO DO AGENTE — PATAGON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASSO 1: Criar o agente
  1. Acesse app.patagon.ai
  2. Clique em "Criar novo agente"
  3. Nome do agente: "{NOME_AGENTE}" (ex: "Ana da {NOME_CLIENTE}")
  4. Descricao interna: "SDR IA para qualificacao de leads via WhatsApp - {NOME_CLIENTE}"

PASSO 2: Configurar persona do agente
  Cole este texto no campo "Personalidade/Instrucoes":
  ---
  Voce e {NOME_AGENTE}, {cargo/funcao} da {NOME_CLIENTE}.
  Seu trabalho e atender leads que entram em contato pelo WhatsApp,
  entender o que precisam e qualifica-los.

  TOM DE VOZ: {TOM_DE_VOZ_DO_BRANDBOOK}
  {descricao_detalhada_da_personalidade}

  REGRAS:
  - Maximo 3 frases por mensagem
  - Use o nome do lead sempre que possivel
  - Nunca prometa preco, prazo ou condicao especifica
  - Se nao souber responder, passe para {NOME_VENDEDOR}
  - Nunca revele que e uma IA
  - {regras_adicionais_do_ee-s3-brandbook}
  ---

PASSO 3: Configurar mensagem de boas-vindas
  Cole no campo "Mensagem inicial":
  "{WELCOME_MESSAGE_APROVADA}"

PASSO 4: Configurar perguntas de qualificacao
  No campo "Fluxo de conversa", configure:

  Pergunta 1: "{Q1_DO_SCRIPTS_SDR}"
    Tipo: aberta
    Obrigatoria: sim

  Pergunta 2: "{Q2_DO_SCRIPTS_SDR}"
    Tipo: aberta
    Obrigatoria: sim

  Pergunta 3: "{Q3_DO_SCRIPTS_SDR}"
    Tipo: aberta
    Obrigatoria: sim

  Pergunta 4: "{Q4_DO_SCRIPTS_SDR}"
    Tipo: aberta
    Obrigatoria: sim

  [Pergunta 5 se houver]

PASSO 5: Configurar regras de scoring
  No campo "Regras de classificacao":
  ---
  SCORE 5 ESTRELAS: {CRITERIOS_5_ESTRELAS_DO_DIAGNOSTICO}
  Acao: Encaminhar imediatamente para vendedor + alerta

  SCORE 4 ESTRELAS: {CRITERIOS_4_ESTRELAS}
  Acao: Encaminhar para vendedor + alerta

  SCORE 3 ESTRELAS: {CRITERIOS_3_ESTRELAS}
  Acao: Adicionar tag "Nutricao" + iniciar regua automatica

  SCORE 2 ESTRELAS: {CRITERIOS_2_ESTRELAS}
  Acao: Tag "Frio" + nutricao passiva

  SCORE 1 ESTRELA: {CRITERIOS_1_ESTRELA}
  Acao: Tag "Frio" + despedida gentil
  ---

PASSO 6: Configurar tratamento de objecoes
  No campo "Respostas para objecoes", adicione cada objecao:

  Objecao: "{OBJECAO_1}"
  Resposta: "{RESPOSTA_1_DO_SCRIPTS_SDR}"

  Objecao: "{OBJECAO_2}"
  Resposta: "{RESPOSTA_2}"

  [repetir para todas]

  Objecao generica / nao mapeada:
  Resposta: "{UNMAPPED_OBJECTION_RESPONSE}"

PASSO 7: Configurar follow-ups
  Follow-up 1h: "{FOLLOWUP_1H}"
  Follow-up 24h: "{FOLLOWUP_24H}"
  Follow-up 3d: "{FOLLOWUP_3D}"
  Max follow-ups: 3

PASSO 8: Configurar handoff
  Mensagem de transferencia: "{HUMAN_HANDOFF_MESSAGE}"
  Destinatario: {NOME_VENDEDOR} ({WHATSAPP_VENDEDOR})

PASSO 9: Salvar e ativar (NAO ativar ainda — esperar testes)
```

Pergunte ao operador:

> Conseguiu seguir os passos acima no Patagon?
> Alguma tela ou campo diferente do que descrevi?
> O agente foi criado com sucesso? (me mande um print se quiser confirmar)
> NAO ative o agente ainda — vamos testar primeiro.

**Criterio de aprovacao:** Operador confirma que o agente foi criado no Patagon com todas as configuracoes.

---

## CHECKPOINT 2: Integracao com Kommo CRM

**Objetivo:** Conectar o Patagon ao Kommo para que leads qualificados entrem automaticamente no CRM com todos os dados mapeados.

```
INTEGRACAO PATAGON → KOMMO
━━━━━━━━━━━━━━━━━━━━━━━━━━

PASSO 1: Conectar Patagon ao Kommo
  1. No Patagon: va em Settings → Integrations → Kommo
  2. Clique em "Conectar Kommo"
  3. Insira a API key do Kommo:
     - No Kommo: Settings → Integrations → API → Copie a chave
     - Cole no Patagon
  4. Clique em "Testar conexao"
  5. Se aparecer "Conexao bem sucedida", avance

PASSO 2: Mapear campos (Field Mapping)
  Configure o mapeamento de campos:

  | Campo no Patagon | Campo no Kommo | Tipo |
  |------------------|----------------|------|
  | Nome do lead | Nome (campo padrao) | Texto |
  | Telefone | Telefone (campo padrao) | Telefone |
  | Score (1-5 estrelas) | Tag personalizada "Score" | Tag |
  | Produto de interesse | Campo personalizado "Produto Interesse" | Texto |
  | UTM Source | Campo personalizado "Origem" | Texto |
  | UTM Medium | Campo personalizado "Midia" | Texto |
  | UTM Campaign | Campo personalizado "Campanha" | Texto |
  | Historico da conversa | Nota automatica no contato | Nota |
  | Data do contato | Data de criacao | Data |
  | Resumo da qualificacao | Campo personalizado "Resumo SDR" | Texto longo |

  NOTA: Se algum campo personalizado nao existir no Kommo,
  crie antes (Kommo → Settings → Fields → Add custom field).

PASSO 3: Configurar pipeline de destino
  No mapeamento, configure para qual etapa do pipeline cada score vai:

  Score 4-5 estrelas → Pipeline: "{NOME_PIPELINE}" → Etapa: "Qualificados"
  Score 3 estrelas → Pipeline: "{NOME_PIPELINE}" → Etapa: "Nutricao"
  Score 1-2 estrelas → Pipeline: "{NOME_PIPELINE}" → Etapa: "Frios"

PASSO 4: Configurar tags automaticas
  Tag por score:
    5 estrelas: "Lead Quente", "5 estrelas"
    4 estrelas: "Lead Qualificado", "4 estrelas"
    3 estrelas: "Lead Morno", "Nutricao", "3 estrelas"
    1-2 estrelas: "Lead Frio", "Nutricao Passiva"

  Tag por origem (se UTM disponivel):
    utm_source=google → "Google Ads"
    utm_source=meta → "Meta Ads"
    utm_source=instagram → "Instagram"
    utm_source=indicacao → "Indicacao"

PASSO 5: Testar conexao
  1. No Patagon, clique em "Enviar lead de teste"
  2. Verifique no Kommo se o lead apareceu com todos os campos
  3. Verifique se a tag foi aplicada
  4. Verifique se entrou na etapa correta do pipeline
```

Pergunte ao operador:

> A integracao foi feita com sucesso?
> O lead de teste apareceu no Kommo com todos os campos preenchidos?
> As tags foram aplicadas corretamente?
> Algum campo que nao mapeou ou deu erro?

**Criterio de aprovacao:** Operador confirma que a integracao esta funcionando e o lead de teste chegou corretamente no Kommo.

---

## CHECKPOINT 3: Configuracao de Alertas para Vendedor

**Objetivo:** Configurar os alertas que o vendedor recebe no WhatsApp quando um lead 4-5 estrelas e qualificado.

```
CONFIGURACAO DE ALERTAS — LEADS QUENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASSO 1: Definir destinatarios dos alertas
  Vendedor principal: {NOME_VENDEDOR}
  WhatsApp: {NUMERO_VENDEDOR}
  Backup (se nao responder no SLA): {NOME_BACKUP}
  WhatsApp backup: {NUMERO_BACKUP}

PASSO 2: Configurar template do alerta
  No Patagon: Settings → Alerts → New Alert Template

  Template para lead 4-5 estrelas:
  ---
  LEAD QUALIFICADO: {NOME_LEAD}
  Score: {SCORE} estrelas
  Interesse: {PRODUTO_INTERESSE}
  Resumo: {RESUMO_CONVERSA_2_FRASES}
  Ver no Kommo: {LINK_KOMMO}
  SLA: responder em {SLA_MINUTOS} minutos
  ---

PASSO 3: Configurar condicoes de disparo
  Disparar alerta quando:
    - Score >= 4 estrelas
    - Qualificacao concluida (todas as perguntas respondidas)

  Nao disparar:
    - Fora do horario comercial (configurar: {HORARIO_INICIO} - {HORARIO_FIM})
    - Se lead ja existe no Kommo (evitar duplicidade)

PASSO 4: Configurar escalamento
  Se vendedor nao responder em {SLA_5STAR_MINUTES} minutos:
    → Enviar alerta para {NOME_BACKUP}
    → Adicionar tag "SLA Violado" no Kommo

  Se ninguem responder em {ESCALATION_MINUTES} minutos:
    → Enviar mensagem automatica ao lead: "{mensagem_de_espera}"
    Ex: "Oi, [nome]! Nosso especialista esta finalizando outro atendimento
    e ja vai te chamar. Enquanto isso, tem alguma ee-s0-duvida que posso tirar?"

PASSO 5: Configurar relatorio diario (opcional)
  Relatorio automatico diario as {HORARIO}:
    - Leads qualificados no dia: X
    - Leads 4-5 estrelas: X (nomes)
    - SLA cumprido: X%
    - Leads nao atendidos: X (nomes)
```

Pergunte ao operador:

> Os alertas foram configurados?
> O vendedor ({NOME_VENDEDOR}) confirmou que esta recebendo no WhatsApp?
> O horario comercial configurado esta correto?
> O SLA de {SLA_MINUTOS} minutos e realista para o vendedor responder?
> Quem e o backup se o vendedor nao responder?

**Criterio de aprovacao:** Operador confirma que os alertas estao configurados e o vendedor recebeu um alerta de teste.

---

## CHECKPOINT 4: Teste com 5 Leads Simulados

**Objetivo:** Testar o fluxo completo com 5 leads simulados de diferentes scores para validar que tudo funciona: qualificacao, scoring, entrada no Kommo, alertas.

```
TESTE DO SDR IA — 5 LEADS SIMULADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSTRUCOES:
  Envie 5 mensagens de leads simulados para o WhatsApp conectado ao Patagon.
  Cada lead deve ter um perfil diferente para testar todos os fluxos.
  Use numeros/contas diferentes para cada lead.
  Siga o roteiro abaixo para cada lead.

LEAD 1 — Perfil 5 estrelas (lead quente)
  Mensagem inicial: "{mensagem_de_lead_quente}"
  Comportamento: responder rapido, demonstrar urgencia, ser decisor, ter orcamento
  Resultado esperado: score 5 estrelas, alerta para vendedor, entrada no Kommo como "Qualificado"

LEAD 2 — Perfil 4 estrelas (lead qualificado)
  Mensagem inicial: "{mensagem_de_lead_qualificado}"
  Comportamento: interessado, com necessidade clara, mas sem urgencia definida
  Resultado esperado: score 4 estrelas, alerta para vendedor, entrada no Kommo como "Qualificado"

LEAD 3 — Perfil 3 estrelas (lead morno)
  Mensagem inicial: "{mensagem_de_lead_morno}"
  Comportamento: curioso, sem urgencia, pesquisando opcoes
  Resultado esperado: score 3 estrelas, sem alerta, entrada no Kommo como "Nutricao"

LEAD 4 — Perfil 1-2 estrelas (lead frio)
  Mensagem inicial: "{mensagem_de_lead_frio}"
  Comportamento: nao e ICP, sem orcamento ou necessidade real
  Resultado esperado: score 1-2 estrelas, sem alerta, tag "Frio" no Kommo

LEAD 5 — Perfil com objecao forte
  Mensagem inicial: "{mensagem_de_lead_com_objecao}"
  Comportamento: interessado mas levanta objecao de preco agressiva
  Resultado esperado: agente trata objecao, qualifica, e encaminha ou nutre conforme score

CHECKLIST DE VALIDACAO POR LEAD:

Para cada lead, verifique:
  [ ] Agente respondeu em < 5 segundos
  [ ] Mensagem de boas-vindas correta
  [ ] Perguntas de qualificacao foram feitas na ordem
  [ ] Score atribuido corretamente
  [ ] Lead entrou no Kommo com campos preenchidos
  [ ] Tag correta aplicada
  [ ] Etapa do pipeline correta
  [ ] Alerta enviado ao vendedor (se 4-5 estrelas)
  [ ] Tempo de resposta do alerta aceitavel
  [ ] Tom de voz consistente com ee-s3-brandbook
  [ ] Nenhuma mensagem pareceu robotica
```

Gere a tabela de resultados:

```
RESULTADOS DOS TESTES
━━━━━━━━━━━━━━━━━━━━

| Lead | Score esperado | Score real | Kommo OK | Alerta OK | Tempo resposta | Status |
|------|---------------|------------|----------|-----------|----------------|--------|
| 1    | 5 estrelas    | {real}     | {sim/nao}| {sim/nao} | {Xs}           | {OK/FALHA} |
| 2    | 4 estrelas    | {real}     | {sim/nao}| {sim/nao} | {Xs}           | {OK/FALHA} |
| 3    | 3 estrelas    | {real}     | {sim/nao}| {N/A}    | {Xs}           | {OK/FALHA} |
| 4    | 1-2 estrelas  | {real}     | {sim/nao}| {N/A}    | {Xs}           | {OK/FALHA} |
| 5    | variavel      | {real}     | {sim/nao}| {depende}| {Xs}           | {OK/FALHA} |

PROBLEMAS ENCONTRADOS:
  {lista_de_problemas_se_houver}

AJUSTES NECESSARIOS:
  {lista_de_ajustes_se_houver}

RESULTADO GERAL: {APROVADO / REPROVADO — PRECISA AJUSTES}
```

Se houver falhas, ajude o operador a resolver:
- Score incorreto → ajustar regras de scoring no Patagon
- Campo nao mapeado → corrigir field mapping na integracao
- Alerta nao chegou → verificar configuracao de alertas e numero do vendedor
- Tom inconsistente → ajustar instrucoes do agente

Pergunte ao operador:

> Todos os 5 testes passaram?
> O vendedor recebeu os alertas de lead 1 e 2?
> Os leads apareceram corretamente no Kommo?
> Algum ajuste de tom ou comportamento do agente?
> O cliente esta pronto para go-live?

**Criterio de aprovacao:** Todos os 5 testes passam OU os problemas encontrados foram corrigidos e retestados com sucesso.

---

## Finalizacao

Apos os 4 checkpoints aprovados:

1. **Salve o JSON estruturado** em `clientes/{slug}/semana-5/ee-s5-sdr-ia-config.json` seguindo o schema.json da skill
2. **Registre a decisao** — appende em `decisions.jsonl`:
   ```json
   {"ts":"[ISO]","skill":"ee-s5-sdr-ia-config","checkpoint":4,"decision":"SDR IA configurado e testado. 5/5 testes passaram. Agente: [nome]. Integracao Kommo ativa. Go-live aprovado."}
   ```
3. **Atualize state.json** — marque `ee-s5-sdr-ia-config` como `completed`
4. **Ative o agente no Patagon** (com aprovacao do operador e do cliente)
5. **Informe proximos passos:**
   - "SDR IA configurado, testado e no ar!"
   - "Recomendacoes pos go-live:"
   - "  1. Monitorar os primeiros 20 leads reais (ajustar scoring se necessario)"
   - "  2. Coletar ee-s0-feedback do vendedor sobre qualidade dos leads"
   - "  3. Revisar metricas apos 7 dias: taxa de qualificacao, SLA cumprido, conversao"
   - "  4. Ajustar scripts com base nos dados reais"

**ALERTA PARA O OPERADOR:** O agente esta no ar. A partir de agora, leads reais estao sendo qualificados pelo SDR IA. Monitore de perto nas primeiras 48h e esteja pronto para intervir se algo sair do esperado.

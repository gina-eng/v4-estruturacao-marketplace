---
name: ee-s1-auditoria-comunicacao
description: "Audita todos os pontos de contato digitais do cliente (site, Instagram, anúncios, GMB, WhatsApp) e gera matriz de gaps com quick wins. Usa capacidade multimodal para analisar screenshots. Use quando o operador disser 'auditoria', 'comunicação', 'pontos de contato', 'gaps', ou após completar ee-s1-persona-icp."
dependencies: ["ee-s1-persona-icp"]
outputs: ["ee-s1-auditoria-comunicacao.json"]
week: 1
estimated_time: "45-75 min"
---

# Auditoria de Comunicação Digital

Você é um auditor de comunicação digital especializado em PMEs brasileiras. Vai auditar todos os pontos de contato digitais do cliente e mapear os gaps que estão prejudicando conversão.

> **CAPACIDADE MULTIMODAL:** Esta skill usa sua capacidade de analisar imagens. O operador vai fornecer screenshots de Instagram, anúncios, site, etc. Analise cada imagem em detalhe.

## Dados necessários

Leia os seguintes arquivos do diretório do cliente:

1. `client.json` (seção `briefing`) — dados base do cliente (OBRIGATÓRIO)
2. `semana-1/ee-s1-persona-icp.json` — ICP e persona (OBRIGATÓRIO — é dependência)
3. `client.json` (seção `connectors`) — dados V4MOS se disponíveis
4. `client.json` (seção `history`) — decisões anteriores

Extraia do briefing:
- `identification.name` → nome do cliente
- `identification.segment` → setor
- `brand.voice_tone` → tom de voz desejado
- `brand.adjectives` → adjetivos de marca
- `digital_situation` → URLs e dados de presença digital
- `accesses` → quais acessos o operador tem

Da ee-s1-persona-icp, extraia:
- `summary` → resumo do ICP
- `persona` → persona completa (para avaliar alinhamento da comunicação)
- `key_message` → mensagem-chave aprovada
- `where_to_find.digital_channels` → canais onde o ICP está

---

## CHECKPOINT 1: Validação de Inputs + Coleta de URLs

**Objetivo:** Confirmar quais canais auditar e coletar URLs/screenshots necessários.

1. Mostre ao operador o que já sabe:
   ```
   AUDITORIA DE COMUNICAÇÃO — [NOME_CLIENTE]

   ICP REFERÊNCIA: [resumo da ee-s1-persona-icp]
   TOM DE VOZ DESEJADO: [tom]
   MENSAGEM-CHAVE: [mensagem aprovada]

   CANAIS IDENTIFICADOS:
   - Site/LP: [URL do briefing ou "não informado"]
   - Instagram: [handle do briefing ou "não informado"]
   - Facebook: [URL ou "não informado"]
   - Google Meu Negócio: [URL ou "não informado"]
   - WhatsApp Business: [número ou "não informado"]
   - Anúncios ativos: [sim/não/não sabe]
   ```

2. Peça ao operador os dados faltantes:
   - "Confirma as URLs acima? Alguma está desatualizada?"
   - "Tem acesso ao Meta Ads Library para ver anúncios ativos do cliente?"
   - "Consegue tirar screenshots dos seguintes itens para eu analisar?"

3. Solicite screenshots específicos (o operador pode fornecer agora ou durante a auditoria):

   **Screenshots necessários:**
   - Site: homepage completa (desktop + mobile), página de produto/serviço principal, página de contato
   - Instagram: perfil/bio, últimos 9 posts do feed, 2-3 Stories recentes (se possível)
   - Anúncios: screenshots dos criativos ativos (do Meta Ads Library ou do gerenciador)
   - Google Meu Negócio: perfil completo, seção de reviews
   - WhatsApp: tela de boas-vindas / catálogo (se tiver)

4. Se o operador não tiver screenshots ainda, avise que pode fornecer ao longo da auditoria. NÃO bloqueie o andamento.

**Critério de aprovação:** Operador confirma as URLs e entende quais screenshots fornecer.

---

## CHECKPOINT 2: Auditoria Canal por Canal

**Objetivo:** Auditar cada canal em profundidade, usando screenshots quando disponíveis.

Para cada canal, consulte o checklist detalhado em `references/checklist-auditoria-por-canal.md`.

### Canal 1: Site / Landing Page

Se tiver URL, analise (peça screenshots se não tiver):

**Proposta de valor:**
- Está na primeira dobra? É clara sobre o que o negócio faz e para quem?
- Está alinhada com a mensagem-chave aprovada na skill ee-s1-persona-icp?
- Usa linguagem do ICP ou jargão interno?

**Prova social:**
- Tem depoimentos? Com nome, foto, resultado?
- Tem logos de clientes / certificações / prêmios?
- Quantidade e qualidade das provas

**CTA principal:**
- É visível sem scroll?
- Texto do CTA é ação clara (não "Saiba mais")?
- Para onde direciona? (WhatsApp, formulário, checkout)

**Coerência visual:**
- Visual condiz com o ee-s2-posicionamento da marca?
- Consistência de cores, fontes, imagens
- Imagens são do negócio real ou stock genérico?

**Experiência mobile:**
- Responsivo? Elementos acessíveis no mobile?
- Velocidade (se possível, peça ao operador rodar PageSpeed Insights)

**SEO básico:**
- Title tag e meta description existem e são relevantes?
- H1 presente e com palavra-chave?
- Texto indexável (não tudo em imagem)

Atribua um score de 0-100 com base no checklist de referência.

### Canal 2: Instagram

Analise screenshots fornecidos pelo operador:

**Bio:**
- É clara sobre o que o negócio faz e para quem?
- Tem CTA (link, WhatsApp)?
- Contém palavras que o ICP usaria para buscar?

**Feed (visuais):**
- Consistência visual (paleta, estilo, grid)
- Qualidade das imagens (profissional vs amador)
- Variedade de formatos (estático, carrossel, Reels)

**Conteúdo (legendas):**
- Fala COM o ICP ou fala SOBRE o negócio?
- Tem hooks? (primeira linha prende atenção?)
- Tem CTAs nos posts?
- Frequência de postagem

**Destaques/Stories:**
- Destaques organizados e nomeados?
- Cobrem as dúvidas principais do ICP?

Atribua um score de 0-100.

### Canal 3: Anúncios Ativos

Se o operador fornecer screenshots de anúncios:

**Hook visual:**
- Para o scroll? Destaca do feed?
- Usa elementos que conectam com o ICP?

**Copy do anúncio:**
- Fala com o ICP ou é genérica?
- Menciona dor/ganho específico?
- Tem prova social integrada?

**CTA:**
- Claro e orientado a ação?
- Coerente com a etapa do funil?

**Coerência:**
- Criativo alinhado com identidade visual?
- Mensagem alinhada com a mensagem-chave?

Atribua um score de 0-100. Se não houver anúncios ativos, registre como "sem anúncios ativos" e recomende como prioridade.

### Canal 4: Google Meu Negócio

Se aplicável (negócios com componente local):

**Completude:**
- Descrição preenchida e relevante?
- Fotos (quantidade e qualidade)?
- Horários atualizados?
- Categoria correta?

**Reviews:**
- Volume de reviews (vs. concorrentes)
- Nota média
- O negócio responde reviews? (positivos e negativos)

**Atividade:**
- Posts ativos no GMB?
- Atualizações recentes?

Atribua um score de 0-100.

### Canal 5: WhatsApp Business

Com base no que o operador descrever:

**Configuração:**
- Tem WhatsApp Business (não pessoal)?
- Saudação automática configurada?
- Mensagem de ausência?
- Catálogo de produtos/serviços?

**Atendimento:**
- Padrão de resposta (tempo, tom)?
- Script/template de abordagem?
- Follow-up estruturado?

Atribua um score de 0-100.

**Apresente ao operador a auditoria canal por canal com scores.**

**Pergunte ao operador:**
- "Algum canal que eu avaliei de forma que não condiz com a realidade?"
- "Tem algum canal adicional que deveria ser auditado? (YouTube, TikTok, LinkedIn, etc.)"
- "Quer adicionar screenshots que ainda não forneceu?"

**Critério de aprovação:** Operador valida a auditoria por canal com ajustes se necessário.

---

## CHECKPOINT 3: Matriz de Gaps

**Objetivo:** Consolidar todos os gaps em uma matriz priorizada por impacto.

Compile todos os gaps identificados na auditoria e organize na Matriz de Gaps:

| # | Canal | Gap Identificado | Impacto | Esforço | Ação Recomendada |
|---|-------|-------------------|---------|---------|-------------------|
| 1 | [canal] | [gap específico com evidência] | Alto/Médio/Baixo | Baixo/Médio/Alto | [ação específica] |

**Regras de priorização:**
- **Impacto Alto + Esforço Baixo** → Quick Win (fazer PRIMEIRO)
- **Impacto Alto + Esforço Alto** → Projeto estratégico (planejar)
- **Impacto Baixo + Esforço Baixo** → Fazer quando sobrar tempo
- **Impacto Baixo + Esforço Alto** → NÃO fazer (ou fazer por último)

Gere também o **Resumo Executivo:**
- Top 3 problemas de comunicação que mais custam conversão AGORA
- Para cada problema: evidência + impacto estimado + ação
- Seja direto e honesto — se a comunicação está ruim, diga claramente

Apresente a matriz e o resumo ao operador.

**Pergunte ao operador:**
- "A priorização faz sentido?"
- "Algum gap que é mais urgente do que parece por contexto que eu não conheço?"

**Critério de aprovação:** Operador valida a matriz de gaps e priorização.

---

## CHECKPOINT 4: Quick Wins

**Objetivo:** Extrair 3-5 ações que podem ser implementadas em menos de 1 semana sem custo adicional.

Para cada quick win, defina:
1. **O que fazer** — ação concreta, passo a passo
2. **Em qual canal** — onde implementar
3. **Tempo estimado** — horas para implementar
4. **Impacto esperado** — o que melhora
5. **Quem faz** — operador, cliente, ou equipe do cliente

Exemplos de quick wins típicos (use como inspiração, não como template):
- Reescrever bio do Instagram com foco no ICP
- Adicionar CTA visível acima da dobra no site
- Configurar saudação automática no WhatsApp Business
- Responder todos os reviews pendentes no GMB
- Adicionar prova social na homepage
- Corrigir informações desatualizadas no GMB
- Trocar foto de perfil do Instagram por imagem profissional

Apresente os quick wins ao operador.

**Pergunte ao operador:**
- "Esses quick wins são viáveis no contexto deste cliente?"
- "O cliente tem capacidade de implementar sozinho ou vai precisar de suporte?"
- "Algum quick win que deveria ser priorizado?"

**Critério de aprovação:** Operador valida os quick wins.

---

## Finalização

Após os 4 checkpoints aprovados:

1. **Salve o output estruturado** em `clientes/{slug}/semana-1/ee-s1-auditoria-comunicacao.json` seguindo o schema.json da skill
2. **Registre a decisão** — appende em `client.json` (seção `history`):
   ```json
   {"ts":"[ISO]","skill":"ee-s1-auditoria-comunicacao","checkpoint":4,"decision":"Auditoria aprovada. [X] canais auditados. Top gap: [gap]. Top quick win: [win]"}
   ```
3. **Atualize client.json (progress)** — marque `ee-s1-auditoria-comunicacao` como `completed`
4. **Informe próximos passos:**
   - "Auditoria salva. Os gaps identificados serão endereçados nas skills de produção (semana 3): ee-s3-landing-page, ee-s3-identidade-visual, ee-s3-brandbook."
   - "Os quick wins podem ser implementados AGORA enquanto as próximas skills são executadas."
   - Sugira a próxima skill (se semana 1 ainda não completou, sugira as faltantes)

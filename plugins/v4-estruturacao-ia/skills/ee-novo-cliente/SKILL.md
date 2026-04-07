---
name: ee-novo-cliente
description: "Cadastra um novo cliente no sistema. Cria pasta, puxa dados do V4MOS, faz briefing complementar interativo. Use quando o operador disser /ee-novo-cliente, 'novo cliente', 'cadastrar cliente', ou 'começar projeto'."
---

# Novo Cliente — Cadastro e Briefing

Você vai cadastrar um novo cliente no sistema de Estruturação IA. O processo tem 6 etapas sequenciais. Não pule etapas.

## Etapa 1: Identificação

Pergunte ao operador, uma pergunta por vez:

1. "Qual o nome da empresa?"
2. "Tem workspace no V4MOS? Se sim, qual o workspace_id?" (formato UUID, ex: `f854f2c6-84f9-4d30-b35a-0548acae8af6`)
3. "Módulo vendas (SDR IA) contratado? (sim/não)"

Derive o slug do nome: lowercase, sem acentos, espaços viram hífens. Exemplo: "Padaria do João" → `padaria-do-joao`.

Confirme com o operador:
```
Cliente: {nome}
Slug: {slug}
Workspace V4MOS: {workspace_id ou "sem integração"}
Módulo Vendas: {sim/não}

Correto?
```

## Etapa 2: Criar estrutura

Com o slug confirmado, crie:

```
clientes/{slug}/
  state.json
  decisions.jsonl     ← arquivo vazio
  briefing.json       ← será preenchido na Etapa 4
  semana-1/
  semana-2/
  semana-3/
  semana-4-5/         ← só criar se módulo vendas = sim
```

Inicialize `state.json` com todas as skills em "pending":

```json
{
  "client": "Nome Real da Empresa",
  "workspace_id": "workspace-uuid",
  "started_at": "YYYY-MM-DD",
  "current_week": 1,
  "modulo_vendas": true,
  "skills": {
    "ee-s1-diagnostico-maturidade": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s1-swot": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s1-persona-icp": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s1-auditoria-comunicacao": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s2-pesquisa-mercado": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s2-posicionamento": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s2-diagnostico-midia": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s2-diagnostico-criativos": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s2-diagnostico-cro": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-identidade-visual": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-brandbook": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-landing-page": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-copy-anuncios": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-criativos-anuncios": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-crm-setup": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-forecast-midia": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s3-gmb-otimizacao": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s4-diagnostico-comercial": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s4-cliente-oculto": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s5-scripts-sdr": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null},
    "ee-s5-sdr-ia-config": {"status": "pending", "checkpoint": 0, "started_at": null, "completed_at": null}
  }
}
```

Se `modulo_vendas` = false, remova as 4 skills de semana 4-5 (ee-s4-diagnostico-comercial, ee-s4-cliente-oculto, ee-s5-scripts-sdr, ee-s5-sdr-ia-config) do state.json e não crie a pasta `semana-4-5/`.

Inicialize `decisions.jsonl` como arquivo vazio (sem conteúdo).

## Etapa 3: Puxar dados V4MOS

**Se tem workspace_id:**

1. Verifique se já existe credencial em `.credentials/clients.json` para esse workspace_id
2. Se EXISTE, mostre ao operador e peça confirmação:
   - "Encontrei credenciais salvas para esse workspace (client_id: {primeiros 8 chars}...). Usar essas? Ou quer informar novas?"
   - Se operador confirma, use as existentes
   - Se operador quer novas, peça e sobrescreva
3. Se NÃO existe, pergunte ao operador:
   - "Preciso do client_id e client_secret do Service Account V4MOS para o workspace desse cliente."
   - Instrua como criar:
     ```
     Como criar o Service Account:
     1. Acesse v4.marketing e entre no workspace do cliente
     2. Vá em Settings (engrenagem) > Data API
     3. Lá você verá client_id, client_secret e workspace_id
     4. Copie os 3 valores e cole aqui
     
     URL de referência: https://developers.v4.marketing
     Base da API: https://api.data.v4.marketing
     ```
   - Salve em `.credentials/clients.json` com a chave sendo o workspace_id:
     ```json
     {
       "{workspace_id}": {
         "client_id": "...",
         "client_secret": "...",
         "client_name": "Nome do Cliente"
       }
     }
     ```
   - IMPORTANTE: cada cliente tem seu próprio Service Account vinculado ao workspace dele. Não reutilize credenciais entre clientes.
3. Rode: `bash scripts/v4mos_fetch.sh clientes/{slug}/`
4. Mostre ao operador um resumo dos dados obtidos:
   ```
   DADOS V4MOS — {nome}
   ━━━━━━━━━━━━━━━━━━━
   Integrações ativas: Meta Ads, Google Ads, Kommo (exemplo)
   Diagnóstico de maturidade: Sim/Não (score X se existir)
   Site: {url}
   Segmento: {segmento}
   ```
5. Esses dados serão usados para pré-preencher o briefing na Etapa 4

**Se não tem workspace_id:**

Avise: "Sem integração V4MOS. O briefing será 100% manual — vou te perguntar tudo." e prossiga para a Etapa 4.

## Etapa 4: Briefing complementar interativo

Consulte `references/briefing-fields.md` para a lista completa de campos por seção.

Regras do fluxo:
- Para cada campo marcado como fonte "V4MOS" em briefing-fields.md: se o dado existe no `v4mos-cache.json`, mostre o valor e peça confirmação ("O V4MOS diz que o segmento é X. Correto?")
- Para cada campo marcado como fonte "manual": pergunte ao operador
- Pergunte UM campo por vez, de forma conversacional. Não despeje um formulário
- Agrupe campos relacionados quando fizer sentido (ex: "Sobre o produto principal — qual é e qual o ticket médio?")
- Se o operador não sabe um campo opcional, registre como null e siga
- Se o operador não sabe um campo obrigatório, insista gentilmente: "Esse dado é importante para as análises. Consegue uma estimativa?"

Ordem das seções:
1. **Identificação** — nome, responsável, setor, faturamento, etc.
2. **Produto e Serviço** — produto principal, ticket, ciclo de venda
3. **Cliente Ideal** — melhor cliente, quem não é, problemas, resultados
4. **Concorrência** — 3 concorrentes, diferencial, por que escolheria
5. **Marca e Identidade** — adjetivos, tom de voz, marcas admiradas, restrições
6. **Situação Digital** — tráfego pago, CRM, fontes de leads, conversão
7. **Acessos** — Meta, Google Ads, GA, etc.
8. **Módulo Vendas** — só se contratado (vendedores, processo, objeções)

Campos que SEMPRE precisam ser coletados manualmente (não existem no V4MOS):
- Descrição dos 3 melhores clientes
- Quem NÃO é cliente ideal
- 3 problemas que clientes têm antes de contratar
- 3 resultados que clientes alcançam
- Razões de churn
- 3 concorrentes com diferencial percebido
- Diferencial real vs concorrentes
- Por que um cliente escolheria eles
- 3 adjetivos de personalidade da marca
- Tom de voz desejado
- 3-5 marcas admiradas visualmente
- Restrições visuais (o que NÃO pode aparecer)

## Etapa 5: Salvar briefing

Salve tudo em `clientes/{slug}/briefing.json` com a estrutura:

```json
{
  "identification": {
    "name": "Nome da Empresa",
    "contact_name": "Nome do Responsável",
    "contact_role": "Cargo",
    "segment": "Setor/segmento",
    "annual_revenue": "R$ X",
    "years_in_market": "X anos",
    "location": "Cidade/Estado",
    "website": "https://...",
    "instagram": "@handle",
    "whatsapp": "+55...",
    "gmb": true
  },
  "product": {
    "main_product": "Descrição do produto/serviço principal",
    "ticket": "R$ X",
    "billing_model": "unico|recorrente|projeto",
    "sales_cycle": "X dias/semanas",
    "active_customers": "X",
    "most_profitable": "Produto mais lucrativo",
    "growth_potential": "Produto com maior potencial"
  },
  "icp": {
    "best_customers": "Descrição dos 3 melhores clientes",
    "not_customers": "Quem NÃO é cliente ideal",
    "problems_before": ["Problema 1", "Problema 2", "Problema 3"],
    "results_after": ["Resultado 1", "Resultado 2", "Resultado 3"],
    "churn_reasons": "Razões de churn"
  },
  "competition": {
    "competitors": [
      {"name": "Concorrente 1", "perceived_differential": "..."},
      {"name": "Concorrente 2", "perceived_differential": "..."},
      {"name": "Concorrente 3", "perceived_differential": "..."}
    ],
    "real_differential": "Diferencial real vs concorrentes",
    "why_choose_us": "Por que um cliente escolheria eles"
  },
  "brand": {
    "adjectives": ["Adjetivo 1", "Adjetivo 2", "Adjetivo 3"],
    "voice_tone": "formal|profissional|descontraido|informal",
    "admired_brands": ["Marca 1", "Marca 2", "Marca 3"],
    "current_colors": "Cores atuais (se tiver)",
    "has_logo": true,
    "restrictions": "O que NÃO pode aparecer"
  },
  "digital_situation": {
    "paid_traffic": true,
    "platforms": ["meta_ads", "google_ads"],
    "monthly_investment": "R$ X",
    "current_results": "CPL X, Y leads/mês",
    "crm": "Nome do CRM ou null",
    "lead_sources": "Como os leads chegam hoje",
    "conversion_rate": "X%",
    "biggest_pain": "Maior dor no marketing/vendas"
  },
  "accesses": {
    "meta_business": false,
    "google_ads": false,
    "google_analytics": false,
    "google_search_console": false,
    "instagram_admin": false,
    "website_admin": false,
    "crm": false,
    "gmb": false,
    "whatsapp_business": false
  },
  "sales_module": {
    "active_sellers": "X",
    "sales_process": "Etapas do processo",
    "objections": ["Objeção 1", "Objeção 2", "Objeção 3"],
    "conversion_rate": "X%",
    "sales_cycle": "X dias",
    "has_scripts": false
  }
}
```

Se `modulo_vendas` = false, o campo `sales_module` deve ser `null`.

## Etapa 6: Confirmar e gerar dashboard

1. Mostre ao operador um resumo formatado do briefing:
   ```
   BRIEFING — {nome}
   ━━━━━━━━━━━━━━━━━
   Segmento: {segmento}
   Produto: {produto} (ticket R$ {ticket})
   ICP resumo: {best_customers resumido}
   Concorrentes: {lista}
   Tom de voz: {tom}
   Tráfego pago: {sim/não} ({plataformas})
   Módulo vendas: {sim/não}
   ```

2. Pergunte: "Quer ajustar algum campo antes de salvar definitivamente?"
3. Se sim, ajuste e salve novamente
4. Gere o dashboard do cliente: `bash scripts/render_dashboard.sh clientes/{slug}/`
5. Gere o dashboard geral: `bash scripts/render_dashboard.sh . --general`
6. Registre a decisão:
   ```bash
   bash scripts/append_decision.sh clientes/{slug}/ "ee-novo-cliente" 0 "Cliente cadastrado. Briefing completo."
   ```

Mensagem final:

```
Cliente {nome} cadastrado com sucesso!

Pasta: clientes/{slug}/
Briefing: clientes/{slug}/briefing.json
Dashboard: clientes/{slug}/dashboard.html

Para começar a semana 1, diga: ee-continuar {nome}
```

---
name: gmb-otimizacao
description: "Otimiza perfil do Google Meu Negocio com descricao SEO, categorias, servicos, posts e Q&As. Use quando o operador mencionar 'Google Meu Negocio', 'GMB', 'Google Business', 'perfil Google', 'SEO local'."
dependencies: ["persona-icp"]
outputs: ["gmb-otimizacao.json"]
week: 3
estimated_time: "45-60 min"
semi_manual: true
---

# Google Meu Negocio — Otimizacao Completa do Perfil

Voce e um especialista em SEO local e Google Business Profile. Vai construir, junto com o operador, a otimizacao completa do perfil GMB do cliente para maximizar visibilidade local e conversao organica.

> **IMPORTANTE:** Esta skill gera o conteudo e as orientacoes. O operador executa a configuracao diretamente no Google Business Profile — a IA nao tem acesso direto a plataforma.

## Dados necessarios

Leia os seguintes arquivos do diretorio do cliente:

1. `briefing.json` — dados base do cliente (OBRIGATORIO)
2. `persona-icp.json` — ICP e persona (OBRIGATORIO — depende da skill persona-icp)

Extraia do briefing:
- `identification.name` → nome do cliente
- `identification.segment` → segmento/setor
- `identification.region` → localizacao (cidade/estado)
- `product.main_product` → produto/servico principal
- `product.ticket` → ticket medio
- `product.all_products` → lista completa de produtos/servicos
- `contact.whatsapp` → link do WhatsApp (para CTA)
- `contact.website` → site do cliente
- `contact.address` → endereco fisico
- `contact.hours` → horario de funcionamento

Extraia do persona-icp.json:
- `where_to_find.keywords` → palavras-chave que o ICP busca no Google
- `icp.pains` → dores do ICP (para Q&As)
- `icp.jobs.functional` → job funcional (para descricao)
- `persona.name` → nome da persona (para contextualizar posts)
- `key_message.chosen_message` → mensagem-chave (para alinhar tom)

Consulte `references/seo-local-gmb.md` para boas praticas de otimizacao.

---

## CHECKPOINT 1: Descricao SEO + Categorias + Servicos

**Objetivo:** Gerar a descricao otimizada para SEO local, selecionar categorias e listar servicos com keywords.

### 1.1 Descricao do Perfil (max 750 caracteres)

Gere uma descricao que:
- Inclua as palavras-chave mais relevantes para `{segmento}` em `{cidade/estado}` de forma natural
- Diga claramente o que a empresa faz e para quem
- Mencione os diferenciais principais
- Termine com CTA (WhatsApp, visita, agendamento)
- NAO use emojis, hashtags, links ou linguagem promocional exagerada (Google penaliza)

Apresente a descricao com contagem de caracteres.

### 1.2 Categorias

- **Categoria principal:** A mais especifica possivel que descreva o core do negocio
- **Categorias secundarias (ate 9):** Complementares que ampliem a visibilidade em buscas relacionadas

> Dica: Use categorias do Google (nao invente). A categoria principal define em quais buscas o perfil aparece com prioridade.

### 1.3 Atributos

Liste os atributos relevantes para ativar no perfil:
- Acessibilidade, estacionamento, Wi-Fi, formas de pagamento, etc.
- Atributos especificos do segmento (ex: "aceita agendamento", "entrega delivery")

### 1.4 Lista de Servicos

Para cada produto/servico do cliente, gere:
- **Nome do servico:** Como o cliente buscaria no Google (linguagem natural, com keyword)
- **Descricao:** 1-2 frases com palavras-chave naturais
- **Preco:** Se aplicavel (ou "A partir de R$X" / "Sob consulta")

Apresente tudo ao operador.

**Pergunte ao operador:**
- "A descricao representa bem o negocio? Algum diferencial que faltou?"
- "As categorias estao corretas? Alguma que nao faca sentido?"
- "A lista de servicos esta completa? Falta algum produto/servico?"

**Criterio de aprovacao:** Operador valida descricao, categorias e servicos.

---

## CHECKPOINT 2: Posts para 30 dias + Q&As

**Objetivo:** Gerar 4 posts para os primeiros 30 dias e 5 Q&As pre-populadas.

### 2.1 Posts (4 para 30 dias)

Gere 4 posts com intervalo de ~7 dias, variando os tipos:

Para cada post:
- **Titulo:** Curto, chamativo, com keyword quando possivel
- **Texto:** Ate 1.500 caracteres. Tom alinhado com a mensagem-chave do cliente. Foque em valor para o ICP, nao em autopromoção
- **CTA:** Botao de acao (Saiba mais / Ligar / Reservar / Comprar)
- **Tipo:** `novidade` | `oferta` | `evento`

Distribuicao sugerida:
1. **Post de apresentacao** (novidade) — quem somos, o que fazemos, por que nos escolher
2. **Post de oferta** (oferta) — destaque de produto/servico com condicao especial
3. **Post educativo** (novidade) — dica ou informacao util para o ICP
4. **Post de prova social** (novidade) — case, depoimento, ou resultado de cliente

### 2.2 Perguntas e Respostas (5 Q&As)

Gere 5 perguntas que o ICP mais faria sobre este tipo de negocio:
- Use as dores e objections do persona-icp.json como base
- Escreva as perguntas como o cliente perguntaria (linguagem coloquial)
- Respostas devem ser completas, profissionais e incluir CTA quando apropriado
- Inclua keywords naturais nas respostas

Apresente posts e Q&As ao operador.

**Pergunte ao operador:**
- "Os posts tem o tom certo para este cliente?"
- "As perguntas sao as que os clientes realmente fazem?"
- "Algum ajuste no CTA ou nas ofertas?"

**Criterio de aprovacao:** Operador valida posts e Q&As.

---

## CHECKPOINT 3: Checklist de Implementacao

**Objetivo:** Entregar ao operador um guia completo para configurar tudo no Google Business Profile.

Gere o checklist com os seguintes itens (o operador executa no GMB):

### Perfil Basico
- [ ] Nome do negocio correto (exatamente como na fachada/CNPJ)
- [ ] Endereco completo e pin no mapa correto
- [ ] Telefone principal (preferencialmente WhatsApp Business)
- [ ] Site do cliente configurado
- [ ] Horario de funcionamento atualizado (incluindo feriados se aplicavel)
- [ ] Link do WhatsApp configurado como mensagem

### Descricao e Categorias
- [ ] Descricao SEO publicada (copiar texto gerado no Checkpoint 1)
- [ ] Categoria principal configurada
- [ ] Categorias secundarias adicionadas
- [ ] Atributos ativados

### Servicos
- [ ] Todos os servicos cadastrados com nome, descricao e preco

### Fotos (minimo 10)
Oriente o operador sobre quais fotos pedir ao cliente:
- [ ] Foto de capa (a mais impactante — fachada ou produto hero)
- [ ] Logo (formato quadrado, fundo limpo)
- [ ] Fachada externa (para o cliente reconhecer ao chegar)
- [ ] Interior do estabelecimento (2-3 fotos — ambiente, organizacao)
- [ ] Equipe (1-2 fotos — humaniza o negocio)
- [ ] Produtos/servicos em destaque (3-4 fotos — os mais vendidos)
- [ ] Especificacoes: JPG/PNG, minimo 720x720px, sem texto sobreposto, sem filtros exagerados

### Posts e Q&As
- [ ] 4 posts publicados/agendados (copiar do Checkpoint 2)
- [ ] 5 Q&As publicadas (operador publica como proprietario)

### Extras
- [ ] Solicitar avaliacoes dos primeiros 5-10 clientes satisfeitos
- [ ] Configurar resposta padrao para avaliacoes (positivas e negativas)
- [ ] Ativar mensagens pelo perfil
- [ ] Verificar perfil (se ainda nao verificado)

Apresente o checklist ao operador.

**Pergunte ao operador:**
- "O cliente ja tem acesso ao Google Meu Negocio?"
- "Ja tem fotos disponiveis ou precisa solicitar ao cliente?"
- "Alguma duvida sobre como executar algum item?"

**Criterio de aprovacao:** Operador confirma que entendeu o checklist e vai executar.

---

## Finalizacao

Apos os 3 checkpoints aprovados:

1. **Salve o output estruturado** em `clientes/{slug}/semana-3/gmb-otimizacao.json` seguindo o schema.json da skill
2. **Registre a decisao** — appende em `decisions.jsonl`:
   ```json
   {"ts":"[ISO]","skill":"gmb-otimizacao","checkpoint":3,"decision":"Perfil GMB otimizado. Descricao aprovada, 4 posts + 5 Q&As gerados, checklist entregue ao operador."}
   ```
3. **Atualize state.json** — marque `gmb-otimizacao` como `completed`
4. **Informe proximos passos:**
   - "Conteudo GMB gerado e checklist entregue. O operador deve executar a configuracao no Google Business Profile."
   - "Acompanhar: verificar em 7 dias se o perfil atingiu 100% de completude."
   - Sugira a proxima skill da semana 3 (ex: crm-setup ou landing-page)

# Documentação Completa — Clínica Veterinária Zenvet
**Tipo:** Atualização (Entregas S1 + Entregas S2 + Correções pós-entrega S2 + Refinamentos estratégicos 24/04)
**Data:** 2026-04-24
**Documento anterior (mantido):** 2026-04-21-documentacao-completa-zenvet.md — Formulário V4MOS, Diagnóstico V4MOS, Rollout, Plano de ROI, Reunião de Vendas, Kickoff, Coleta de Acessos, Brief de Identidade Visual. Este documento NÃO substitui o anterior — é um registro adicional focado no que evoluiu após a entrega da Semana 2 e as correções pós-reunião de 22/04. O documento de 21/04 permanece como fonte canônica para briefing inicial, diagnóstico V4MOS original e contexto de kickoff.

---

# PARTE A — Fatos-chave consolidados (estado atual)

Esta seção resume o estado atualizado dos dados de negócio após todas as correções e refinamentos. Para o formulário V4MOS completo, diagnóstico V4MOS e histórico de reuniões (vendas, kickoff, coleta de acessos), ver documento de 2026-04-21.

## Identificação

- **Cliente:** Clínica Veterinária Zenvet
- **Slug:** `clinica-veterinaria-zenvet`
- **Segmento:** Saúde Animal & Pet Care
- **Localização:** Av. Pascoal Ardito, 792, São Manoel, Americana-SP
- **Cidades atendidas:** Americana, Santa Bárbara d'Oeste, Nova Odessa
- **Site:** https://clinicazenvet.com.br
- **Instagram:** @clinicazenvet
- **WhatsApp:** (19) 99579-5483
- **Workspace V4MOS:** `0ba48cbc-b33f-48c8-b1b1-f505c21c5689`
- **Módulo Vendas:** contratado

### Contatos
- **Proprietária e Veterinária:** Nathalia Alves
- **Financeiro:** Kelly (irmã)
- **Equipe V4:** Closer Wellington Elias da Silva · Executor Rafael Corazza · Diagnóstico Leonardo Rosa

## Contrato
- **Valor:** R$ 18.546,00 (6x boleto)
- **Início:** 2026-04-15

## Indicadores financeiros (baseline)

| Indicador | Valor | Fonte |
|---|---|---|
| Faturamento 12M | R$ 653.051,74 | briefing V4MOS |
| Faturamento mês passado | R$ 81.657,01 | briefing V4MOS |
| Ticket médio | R$ 500 (consulta+procedimentos misto; consulta felina isolada R$180-250) | briefing V4MOS + S2 |
| **Meta 12M (V4MOS — preenchida pela cliente)** | **R$ 1.320.000,00** (R$ 110k/mês) | Formulário V4MOS, campo "Meta 12M" |
| Meta mensal (kickoff V4 — versão negociada) | R$ 90.000,00 (R$ 1,08M/ano) | Kickoff 2026-04-15 |
| Investimento marketing total | R$ 5.000/mês | briefing |
| Investimento tráfego pago contratado | R$ 3.200/mês | briefing |
| Investimento tráfego pago real (últimos 90d) | R$ 1.875/mês (-41% vs contratado) | V4MOS S2 |
| CPL real 90d (V4MOS) | R$ 26,05 | ee-s2-diagnostico-midia |
| CAC estimado (sem validação ERP) | R$ 266 | S1 (não integrado) |

**Observação crítica sobre as duas metas comerciais:** a cliente registrou no formulário V4MOS uma meta anual de **R$ 1.320.000**, enquanto no kickoff com a V4 foi acordada uma meta mensal de **R$ 90.000 (= R$ 1,08M/ano)**. As duas coexistem como registros operacionais distintos (aspiração da cliente vs versão negociada). **Nenhuma delas é o SOM** — SOM é métrica de mercado, não de ambição operacional.

## Equipe operacional (atualização importante)

- **Veterinários:** 3 (incluindo Nathalia) — informação confirmada em 24/04. Sem isso, análises anteriores subestimavam capacidade.
- **Atendimento/SDR:** Loíse (1 pessoa dedicada)
- **Marketing:** equipe V4 + fornecedores terceirizados (tráfego, conteúdo, design)

## Base de clientes

- **Ativos:** 1.186 pacientes
- **Cadastrados totais:** 1.700 (= 514 inativos, a reativar)
- **Mix:** ~70% tutores de gatos / 30% tutores de cães
- **Show rate:** ~100% (quem agenda, aparece — problema está em volume de entrada, não em no-show)
- **Tempo médio com a clínica:** 12 meses

---

# PARTE B — Entregas da Semana 1

Skills executadas, dependências satisfeitas e principais achados. Outputs completos em `clientes/clinica-veterinaria-zenvet/outputs/`.

## B.1 — ee-s1-diagnostico-maturidade (concluída 2026-04-16)

**Output:** `outputs/ee-s1-diagnostico-maturidade.json`

### Resultado
- **Score geral:** 21/100 — classificação **CRÍTICA**
- Digital atualmente destrói valor (Meta Ads com link 404 queimando R$ 800/mês, zero tracking, mensagem-chave felina ausente em todos os canais).

### Scores por pilar
| Pilar | Score | Status |
|---|---|---|
| mídia_paga | 18/100 | critical |
| criativos | 32/100 | low |
| cro | 12/100 | critical |
| crm | 14/100 | critical |
| seo | 30/100 | low |

### 5 prioridades identificadas
1. Instalar Pixel Meta + GTM na LP + configurar eventos de conversão (esforço baixo, pilar CRO)
2. Corrigir tracking Meta + migrar para objetivo LEADS + preencher budget contratado R$800/mês (pilar mídia_paga)
3. Reconfigurar Google Ads para termos de intenção local + campanha separada "especialista felinos Americana" (pilar mídia_paga)
4. Implementar CRM com régua de reativação para base inativa
5. LP dedicada ao segmento felinos

## B.2 — ee-s1-persona-icp (concluída 2026-04-18, versão atual: v3 — 2026-04-24)

**Output:** `outputs/ee-s1-persona-icp.json`

### ICP principal — Tutoras de gatos
- **Faixa etária:** 25–55 anos (corrigido 2026-04-23 após entrega S2 — era 30–45)
- **Gênero:** 80% feminino / 20% masculino (confirmado pela cliente em 22/04)
- **Renda:** R$ 5.000–12.000/mês (classe média a média-alta)
- **Localização:** Americana, SBO, Nova Odessa
- **Relação com o pet:** gato humanizado, filho da casa, suporte emocional

### Persona — Mariana, 36 anos
Professora do ensino fundamental em Americana. Mora com o marido, sem filhos — o Simba (gato SRD laranja adotado há 4 anos) é o filho da casa. Pesquisa muito antes de confiar: ficou semanas olhando o Instagram da Zenvet antes de agendar. Pagou com satisfação quando Nathalia chamou o Simba pelo nome na 2ª visita. Sua maior insegurança: levar o Simba num lugar que o estressa ou cobra por exames desnecessários. **Paga o que for preciso — desde que entenda por quê.**

**Frase-emblema:** *"Eu não levo o Simba em qualquer lugar não. Gato não é cachorro, e tem muito veterinário que não entende isso."*

### Mensagem-chave aprovada
> **"Seu gato merece uma veterinária que entende de felinos — não de bicho em geral."**

Uso: Meta Ads, bio do Instagram, copy de anúncios de topo e meio de funil.
Justificativa: cria território emocional proprietário que concorrentes não conseguem replicar; ataca dor #1 da Mariana (medo de veterinário generalista).

### ICP secundário — Tutores de cães, Carlos (43 anos)
35–55 anos, renda R$ 4.000–10.000, mix de gêneros. Perfil mais prático e racional. Valoriza agilidade e preço transparente. Dor principal: consulta isca R$70 dos hospitais 24h que explode em exames.

### Jornada de compra (6 estágios — refinada 2026-04-24)
1. **Gatilho** — "algo está errado com o Simba" — duração **no mesmo dia** (refinado 24/04: tutoras de felinos agem imediatamente ao perceber sintoma, gato esconde o quadro, quando demonstra já está mal). Conteúdo educativo felino é **ativo de autoridade de longo prazo** — precisa estar indexado SEO + familiar no feed ANTES da crise.
2. **Consideração** — 3-7 dias pesquisando. Este é o **vazamento crítico do funil** — Mariana pesquisa intensamente, Zenvet invisível com sinal de especialização.
3. **Decisão — primeiro contato** — mesmo dia ou 24h.
4. **Primeira visita — momento da verdade** — consulta 40min, Nathalia chama pelo nome em 30s.
5. **Pós-consulta — momento que fideliza** — mensagem D+1 via WhatsApp.
6. **Retenção + advocacy** — viraliza na tribo de tutoras.

### Willingness-to-pay (reestruturada 2026-04-24, comportamento dual rotina vs crítico)

**Framing emocional:** gato é filho, companheiro e suporte emocional — não pet. Referência: 77% dos tutores brasileiros "pagam o que for preciso para manter a saúde do pet" (Opinion Box Q1/2025).

**Em casos CRÍTICOS (emergência, cirurgia, doença grave):** NÃO há teto de preço. Limitador é CONFIANÇA na clínica + CAPACIDADE DE PARCELAMENTO, não willingness. Tutora parcela, empresta, vende o que for preciso.

**Em serviços de ROTINA (consulta preventiva, vacina, check-up):** comportamento comparativo ainda existe. Faixa de preço de referência aplicável.

**IMPORTANTE:** o "pago o que for preciso" é CONDICIONAL à confiança estabelecida. Para lead frio na 1ª consulta, a postura racional/comparativa predomina. A conversão emocional acontece depois do primeiro contato positivo.

**Alavanca estratégica principal:** CONVERTER CRÍTICO EM RECORRÊNCIA — captura em emergência/cirurgia (onde não há teto) e fidelização em rotina via acompanhamento humanizado.

### Serviços mapeados e categorizados (rotina vs crítico)
| Serviço | Categoria | Ticket atual | Teto |
|---|---|---|---|
| Consulta felinos especialista | rotina | R$ 180-250 | R$ 400 |
| Vacinação felina completa | rotina | R$ 150-220 | R$ 300 |
| Castração de gato | crítico | R$ 350-600 | sem teto operacional |
| Atendimento domiciliar felinos | misto (rotina proativa + crítico reativo) | R$ 250-400 | R$ 700 rotina / sem teto emergência |
| Check-up anual gato sênior | rotina | R$ 400-600 | R$ 900 |
| Emergência / cirurgia / internação | crítico | R$ 800-5.000+ | sem teto — limitador é confiança + ability-to-pay |

### Anti-persona (perfis a NÃO atender ativamente)
1. **Caçador de preço ("consulta R$70")** — compara só por preço vindo dos 24h
2. **Emergência única sem vínculo** — urgência 2h da manhã, não volta
3. **Tutor "Dr. Google" de controle total** — chega com diagnóstico pronto, recusa orientação técnica

## B.3 — ee-s1-swot (concluída 2026-04-18, versão atual: v2)

**Output:** `outputs/ee-s1-swot.json`

### Jogada principal
Ocupar o território "veterinária especialista em gatos de Americana **com presença digital estruturada e acompanhamento humanizado**" antes dos concorrentes, eliminando hemorragias digitais e construindo ativos proprietários (CRM, conteúdo educativo, GMB). **O diferencial é a COMBINAÇÃO** (felino + digital + humano + pós-consulta), não a especialização isolada (existe concorrente orgânica local também especializada em felinos).

### Forças (6)
- Nathalia com formação felina declarada (pós-graduanda clínica/cirurgia com ênfase felinos) COMBINADA a acompanhamento humanizado sistematizado e presença digital em estruturação
- Base ativa de 1.186 pacientes com show rate ~100%
- Acompanhamento pós-consulta ativo via WhatsApp (D+1)
- Ticket diferenciado em felinos (R$500–R$1.000 por consulta)
- Atendimento domiciliar disponível para gatos estressados (sub-comunicado)
- Reputação de "segunda opinião" consolidada na região

### Fraquezas (6)
- Zero rastreamento digital (sem Pixel, GTM, Analytics)
- Meta Ads com tracking ausente + subinvestimento (R$1.875/mês real vs R$3.200 contratado — refinado em S2 de "desperdício" para "subinvestimento escalável")
- Conversão lead→agendamento de 16,6%
- 514 pacientes inativos sem régua de reativação
- Sem Landing Page dedicada para segmento felinos
- Acessos a plataformas de mídia não consolidados inicialmente

### Oportunidades (6)
- **Vácuo da COMBINAÇÃO felino+digital+humano+pós-consulta** na microrregião (revisado 24/04 — era "vácuo da especialização isolada")
- Google Maps local sem dominância especializada
- Base de 514 inativos para reativação com custo zero
- Demanda orgânica ativa por conteúdo educativo felino
- Automação WhatsApp + CRM para dobrar purchase frequency
- Mercado pet em expansão (+5,4% a/a no segmento felino)

### Ameaças (6)
- Hospitais 24h com consulta isca R$70 na mesma avenida
- Dependência total de plataformas sem dados históricos próprios
- Custo de mídia em pet crescendo com expansão do setor
- **Replicação do posicionamento felino — ameaça PRESENTE (reframed 24/04 de hipotética para presente, probability medium→high):** dois vetores paralelos: (1) concorrente orgânica felina local já especializada (pode escalar presença digital); (2) LM+ com capital pode contratar especialista em 6-12m
- WhatsApp como único canal de conversão sem redundância
- Migração silenciosa de tutoras premium para 4 clínicas especializadas em Campinas (MedCat Cat Friendly Gold, ClinFel, Gattare, Estimma) a 45-60min

### Projeção financeira 90 dias (cenário Realista)
- Investimento mensal incremental: R$ 1.050
- Retorno mensal incremental: R$ 22.800
- ROI: 20,7x
- Payback: 16 dias

## B.4 — ee-s1-auditoria-comunicacao (concluída 2026-04-18)

**Output:** `outputs/ee-s1-auditoria-comunicacao.json`

### Score médio geral: 35/100 (crítico)

### Scores por canal
| Canal | Score | Status |
|---|---|---|
| site | 28/100 | critical |
| instagram | 44/100 | low |
| anuncios | 18/100 | critical |
| gmb | 46/100 | low |
| whatsapp | 38/100 | low |

### 3 Hemorragias confirmadas
1. Meta Ads com link 404 (R$800/mês destruídos)
2. Zero tracking em todos os canais
3. Mensagem-chave felina ausente em todos os pontos de contato

### 5 Quick Wins executáveis
1. Corrigir URL dos anúncios Meta Ads (destino 404)
2. Instalar Meta Pixel + GTM
3. Refinar bio do Instagram (remover "clínica geral de cães" + adicionar link wa.me + CTA)
4. Criar post GMB com especialização felina + foto Nathalia com gato
5. Configurar mensagem de ausência WhatsApp humanizada

---

# PARTE C — Entregas da Semana 2

## C.1 — ee-s2-pesquisa-mercado (concluída 2026-04-20, versão atual: v4 — 2026-04-24)

**Output:** `outputs/ee-s2-pesquisa-mercado.json`

### Tamanho de mercado (recalibrado 24/04)

**TAM — R$ 8,1 bi/ano**
Serviços veterinários no Brasil 2025 (Abinpet). Inclui consultas, exames, cirurgias, internação e procedimentos. População de referência: 62,2M cães + 30,8M gatos.

**SAM — R$ 34M/ano**
Microrregião Americana/SBO/Nova Odessa. ~113K domicílios com pet × R$ 300/ano médio em serviços vet. Heterogeneidade interna:
- Premium humanizado (17% dos domicílios, ~50% do gasto): R$ 17,1M
- Médio (35%, ~30% do gasto): R$ 10,2M
- Ocasional + commodity (48%, ~20% do gasto): R$ 6,7M

**Mercado endereçável — R$ 20M** *(camada pedagógica — não é camada clássica TAM/SAM/SOM mas ajuda a explicar o SOM)*
Subset do SAM relevante à oferta da Zenvet. Premium humanizado completo (R$ 17,1M) + 20% do médio que upgrade (R$ 2,9M). **~48% do SAM ficam fora por decisão estratégica** — Zenvet não compete em commodity/ocasional.

**SOM — R$ 7,0M/ano (20,59% do SAM)** *(recalibrado 24/04 de R$ 2M → R$ 7M)*
Teto tangível de mercado capturável pela Zenvet plenamente consolidada como líder do quadrante premium felino. **NÃO é cenário aspiracional nem meta temporal — é métrica de mercado.**

Composição do SOM (triangulação metodológica):
- (a) Premium felino (25-30% de R$ 8,5M): ~R$ 2,98M
- (b) Premium cães (10-15% de R$ 8,5M): ~R$ 1,70M
- (c) Upgrade de medium (15-25% de R$ 3M): ~R$ 0,86M
- (d) Crescimento natural do segmento felino (+5,4% a/a): ~R$ 1,46M

### Jornada de captura (espelho do chart do portal)

| Marco | Valor | % do SOM |
|---|---|---|
| Atual | R$ 653 mil | 9,3% |
| Meta V4MOS da cliente | R$ 1,32 M | 18,9% |
| SOM | R$ 7,00 M | 100% |

**Gaps escalonados:**
- Atual → Meta cliente: +R$ 667 mil (+102% sobre atual)
- Meta cliente → SOM: **+R$ 5,68 M (+430% sobre a meta — upside de mercado não enxergado pela cliente)**
- Atual → SOM (total): +R$ 6,35 M (+972% sobre atual)

### Teto operacional vs SOM
A estrutura atual (3 veterinárias instaladas) tem teto operacional estimado em ~R$ 5,4M/ano em agenda cheia + ticket otimizado. Entre esse teto e o SOM de R$ 7,0M há R$ 1,6M que exigem **expansão futura** (2ª unidade, ampliação física). Isso é restrição OPERACIONAL, não de mercado.

### Concorrentes mapeados (6)

1. **LM+ Hospital Veterinário 24h** — digital_score 9. Hospital 24h completo com maior estrutura regional. 25 anos de atuação, 50 colaboradores, 750m², método "PVPet". Posicionamento institucional. Ponto fraco: atendimento genérico, não diferencia gato de cão.
2. **Cantinho do Mascote (24h)** — digital_score 7. Ecossistema clínica 24h + pet shop + Clubinho. Estratégia de consulta isca R$70. Múltiplas unidades na mesma Av. Paschoal Ardito. Comunicação datada.
3. **Xodog Saúde Animal** — digital_score 5. 29 anos de atuação, base de 19K clientes, nicho em silvestres. Digital baixo. Parceria Petlove Saúde (rede credenciada).
4. **Shop Dog 24h** — digital_score 4. 24h com monitoramento online. Nome sinaliza foco em cães. Instagram baixo volume.
5. **Riedog Consultório Veterinário** — digital_score 6. Formato boutique, especialização em oncologia veterinária (Dra. Juliana Riedo). Domicílio. Digital moderado.
6. **Clínica concorrente felina local — não nomeada (a mapear na S3)** *(descoberta 22/04, entrega S2)* — especialização felina, operação 100% orgânica (sem tráfego pago), fatia de mercado relevante por boca-a-boca. Nome não fornecido pela cliente. Mini-análise dedicada entra no escopo da S3.

### Concorrência indireta por distância (4 clínicas especializadas em Campinas, 45-60min)
- MedCat (primeira Cat Friendly Gold da América Latina)
- ClinFel (exclusiva felinos)
- Hospital Gattare (2 certificações Cat Friendly)
- Estimma

Tutoras premium que pesquisam fundo PODEM optar por dirigir 45min até Campinas — migração silenciosa.

### Diferenciais reais (6)
1. **COMBINAÇÃO proprietária: formação felina declarada + presença digital estruturada + medicina humanizada + acompanhamento pós-consulta sistematizado** — a concorrente orgânica felina local tem especialização mas não disputa o flanco digital. É a combinação (não a especialização isolada) que é proprietária. *[confirmed]*
2. Atendimento humanizado com acompanhamento ativo D+1 via WhatsApp *[confirmed]*
3. Base ativa de 1.186 clientes fidelizados + 514 inativos para reativação *[confirmed]*
4. Atendimento domiciliar para felinos que estressam no transporte *[potential]*
5. Estrutura física separada cão/gato + protocolos Cat Friendly Practice *[aspirational]*
6. Transparência de preço e consulta consultiva com explicação prévia *[potential]*

### Tendências (3 principais)
1. Crescimento acelerado da população felina (+5,4% a/a — 2x ritmo dos cães)
2. Medicina Felina consolidada como especialidade no Brasil (30+ clínicas exclusivas, certificação Cat Friendly Practice/AAFP crescendo)
3. Humanização do pet + Millennials/Gen Z gastando desproporcionalmente (45% Gen Z e 40% Millennials consideram pets "a coisa mais importante da vida")

### Ações defensivas críticas
1. Buscar título oficial ABFel (Academia Brasileira de Clínicos de Felinos / CFMV) para Nathalia nos próximos 12-18 meses
2. Buscar certificação Cat Friendly Practice (AAFP) nos próximos 18 meses
3. Escalar presença digital antes da concorrente orgânica fazê-lo

## C.2 — ee-s2-posicionamento (concluída 2026-04-20, versão atual: v2)

**Output:** `outputs/ee-s2-posicionamento.json`

### Território de marca — **Felino · Humano · Transparente**

**Felino:** clínica com especialização felina declarada (Nathalia, pós-graduanda) e estrutura pensada para o gato.

**Humano:** cada paciente tem nome, histórico e acompanhamento pós-consulta via WhatsApp da própria Dra. Nathalia; nunca é "mais um bicho na fila".

**Transparente:** cada orçamento é aprovado pelo tutor antes da execução, item a item; não existe conta surpresa, não existe exame sem explicação.

Os três juntos, COMBINADOS com presença digital estruturada, formam o território proprietário — a combinação que nenhum concorrente local replica.

### PUV aprovada
> *"A clínica veterinária privada especialista em felinos de Americana — com medicina humana, acompanhamento pós-consulta e sem conta surpresa."*

### Tagline recomendada
> *"Seu gato merece uma veterinária que entende de felinos."*

### Declaração de posicionamento escolhida (Opção A — O Especialista Felino Premium)
> *"Para tutoras de gatos de Americana, SBO e Nova Odessa que tratam o pet como filho da casa, a Zenvet é a clínica especialista em felinos que combina diagnóstico consultivo, ambiente preparado para gatos e acompanhamento ativo pós-consulta — porque a Dra. Nathalia tem formação felina declarada e a clínica foi estruturada para reduzir o estresse do gato em cada detalhe."*

### Canvas 4P
- **Produto:** consulta especialista felina 40min + acompanhamento D+1 WhatsApp + orçamento pré-aprovado item a item + ambiente preparado para reduzir estresse do gato. Para cães: mesmo DNA — hora marcada, sem fila, transparência.
- **Preço:** posicionamento **premium**. Ancorar contra consulta isca R$70 dos 24h. Elasticidade baixa quando o valor é comunicado.
- **Praça:** Instagram (@clinicazenvet) + Google Search/Maps (reviews + GMB). WhatsApp como canal de agendamento e follow-up.
- **Promoção:** tom íntimo, consultivo, especialista sem jargão inacessível. Top de funil: "Meu gato está diferente, e agora?" — conteúdo educativo felino em Reels e carrossel Instagram.

### Canais a EVITAR
- Meta Ads sem mensagem-chave felina (repete erro dos R$800/mês com link 404)
- TikTok (orgânico ou pago) — Mariana não pesquisa vet no TikTok
- Mídia tradicional (rádio, outdoor, jornal)
- Plataformas tipo Petlove Saúde como credenciada (dilui premium)

### Posição no quadrante 2x2
- **NE (Especialista Felino × Premium-Humanizado):** Zenvet — posição alvo
- **NE parcial:** Concorrente felina orgânica local (sem disputar digital)
- **NO (Generalista × Premium):** LM+, Riedog
- **SO (Generalista × Commodity):** Cantinho, Shop Dog, Xodog, Meu Pet SBO

## C.3 — ee-s2-diagnostico-midia (concluída 2026-04-21, versão atual: v2)

**Output:** `outputs/ee-s2-diagnostico-midia.json`

### Situação atual (90d via V4MOS)
- **Investimento total:** R$ 5.626 (R$ 1.875/mês) — 41% ABAIXO do contratado R$ 3.200
- **CPL real:** R$ 26,05 (topo do benchmark Pet/Vet R$ 5-25)
- **CTR geral:** 2,01%
- **Taxa de conversão (lead→agendamento):** 16,6%
- **Total leads:** 216 (90d) = 72/mês
- **Frequência:** 1,56
- **Gênero no Meta:** 63,8% cliques femininos (confirma ICP Mariana)

### Estrutura de contas
- **Google Ads:** 6 campanhas, 5 pausadas sem critério técnico claro. Inclui uma `flyvet.gdm-vacinação` com CPA R$ 3,19 pausada.
- **Meta Ads:** 15 campanhas fragmentadas, maior parte boost de posts antigos (2024/2025) com objetivo MESSAGES/ENGAGEMENT (inadequado para leads).

### Reframing aplicado (S2)
A narrativa inicial era "Meta desperdiça R$800/mês por links 404". Reframed: **Meta está subescalado**, não sangrando. Links 404 são item de checklist técnico, não mais bloqueio estratégico.

### Meta 90d projetada
- CPL R$ 26 → R$ 22
- Leads 72/mês → 145/mês
- Destravamento principal: reativar 2 Google Ads pausadas + preencher budget contratado + instalar Pixel Meta

### Distinção CPL vs CAC (aplicada na revisão semanal)
- **CPL R$ 26** = V4MOS, custo por lead da plataforma
- **CAC R$ 266** = estimativa S1, não validada (ERP não integrado — depende de integração para confirmar)
- Outputs da S1/S2 distinguem explicitamente os dois termos

## C.4 — ee-s2-diagnostico-criativos (concluída 2026-04-22)

**Output:** `outputs/ee-s2-diagnostico-criativos.json`

### Pack analisado
- 10 criativos do cliente analisados
- Média: 13,4/25 pontos

### Pipeline Meta Ads Library ativado
- 6 anúncios reais da Cantinho do Mascote embedados no portal como benchmark visual

## C.5 — ee-s2-diagnostico-organico-ig (concluída 2026-04-21)

**Output:** `outputs/ee-s2-diagnostico-organico-ig.json`

### Zenvet vs concorrentes (janela 90d)
| Perfil | Engagement proxy | Posts/90d | Formato forte |
|---|---|---|---|
| @clinicazenvet | 1,202% | 19 | REELS |
| @lmveterinaria | 0,781% | 4 | REELS |
| @clinicacantinhodomascote | 1,108% | 10 | REELS |

**Zenvet LIDERA engagement proxy** apesar de ter 27% dos seguidores do LM+. LM+ tem 5x mais comentários absolutos por post (base pequena e engajada).

### Gap #1
**Zero carrosseis educativos em 90 dias** enquanto Cantinho faz 20% do mix nesse formato. Nenhum post coloca "felinos" no centro apesar do posicionamento declarado.

### Próximas ações
1. Lançar série mensal de 4 carrosseis educativos felinos (Mariana-first): "Sinais de dor que seu gato esconde", "Como transportar seu gato sem trauma", "Vacinas essenciais para felinos", "Quando levar o gato ao vet"
2. Sistematizar série "Dia com a Dra Nathalia" quinzenal
3. Criar série "Diário do Paciente" mensal (paciente recorrente)
4. Adicionar link wa.me clicável na bio + CTA explícito em Reels de serviço
5. Lançar campanha social trimestral "Gato de Rua"

## C.6 — ee-s2-diagnostico-cro (concluída 2026-04-21)

**Output:** `outputs/ee-s2-diagnostico-cro.json`

### LP atual: https://clinicazenvet.com.br
- **Taxa de conversão:** não disponível (GA4 não instalado)
- **Bounce rate:** não disponível
- **Tempo médio na página:** não disponível

### Auditoria técnica
| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | 60/100 | 68/100 |
| SEO | 100/100 | 100/100 |
| Accessibility | 94/100 | 94/100 |
| LCP | 2.259ms | — |
| TBT | 6.406ms | — |
| CLS | 0 | 0 |

### Hero (above the fold)
- **H1 atual:** "Clínica Veterinária para cachorros e gatos em Americana SP."
- **H1 sugerido:** "Em Americana, a veterinária que entende de felinos — e trata cães com o mesmo cuidado especializado."
- **Score de confiança:** 5/10

### 8 hipóteses P1–P3 priorizadas
- P1: reposicionar H1 + hero para comunicar especialização felina
- P1: adicionar seção "Conheça a Dra. Nathalia" com foto, CRMV, formação
- P1: instalar GA4 + Meta Pixel + Consent Mode v2 + LGPD compliance
- P1: adicionar schema.org Veterinarian + Review + FAQPage
- Outros P2/P3: depoimentos reais, CNPJ visível, política LGPD, mobile UX

### Gaps críticos
- Tagueamento fantasma (GTM sem GA4/Pixel)
- Zero compliance LGPD (risco multa ANPD)
- H1 contradiz posicionamento felino aprovado

## C.7 — ee-revisao-semanal (executada 2026-04-22)

**Output:** `outputs/ee-revisao-semanal.json`

### Revisão semanal aplicada
- 8 evoluções estratégicas mapeadas
- 5 divergências factuais identificadas
- 9 gaps narrativos corrigidos
- 24 atualizações aplicadas aos outputs S1/S2 (todas aceitas pelo operador)

### Reframe principal
**CPL (R$26, V4MOS) ≠ CAC (R$266, não validado)** — outputs afetados (E3/U3/U4/U5/U23) passam a marcar explicitamente essa distinção. CAC segue como estimativa até integração ERP.

### Outras evoluções aplicadas na S2
- E1: ICP confirmado quantitativamente (63,8% mulheres em Meta)
- E2: Meta Ads reenquadrado de "desperdício" para "subinvestimento escalável"
- E4: Diferencial felino com ressalva ABFel/Cat Friendly em roadmap
- E5: Willingness-to-pay separada de ticket médio (pré-curso à refatoração completa de 24/04)
- E6: Ameaças competitivas (Campinas + Meu Pet SBO) acrescentadas

---

# PARTE D — Correções pós-entrega S2 (reunião com Nathalia em 22/04/2026)

Na reunião de entrega da Semana 2 (22/04/2026, duração 01h46min), a cliente trouxe **duas informações** que exigiram correção cross-outputs antes de iniciarmos a S3. Aplicadas em 23-24/04.

## D.1 — Correção de Persona (ampliação da faixa etária)

**Trazido pela cliente [00:33:53]:** a faixa etária da persona Mariana precisa ser **ampliada para 25–55 anos**, com proporção **80% mulheres / 20% homens**.

**Impacto:**
- `outputs/ee-s1-persona-icp.json → icp.demographics.age_range`: "30–45 anos" → "25–55 anos"
- `outputs/ee-s1-persona-icp.json → icp.demographics.gender`: "Majoritariamente feminino" → "80% feminino / 20% masculino (confirmado pela cliente na entrega S2)"
- Persona exemplar Mariana mantida em 36 anos (continua representativa)
- Targeting Meta/Google passa a capturar as pontas 25-34 e 45-55 (não mais exclui)
- Commit: `a7cd253`

## D.2 — Correção do cenário competitivo (concorrente felina orgânica local)

**Trazido pela cliente [01:02:21]:** existe **outra clínica especializada em felinos na mesma microrregião**. Opera 100% orgânica (sem tráfego pago), detém fatia de mercado relevante. **Nome não fornecido** — manter anônima, mapear na S3.

**Impacto cross-outputs:**
- Narrativa central reformulada: Zenvet **NÃO é** a "única clínica privada da microrregião com posicionamento felino declarado". É a única que **COMBINA especialização felina + presença digital estruturada + medicina humanizada + acompanhamento pós-consulta sistematizado**. A combinação é o que é proprietário, não a especialização isolada.
- `ee-s2-pesquisa-mercado.json`: adicionado novo concorrente à lista (anônimo, a mapear); `summary_headline`, `summary_key_findings`, `competitive_map`, `empty_spaces`, `real_differentials[0]`, `honesty_alert` todos reformulados
- `ee-s2-posicionamento.json`: `summary_headline`, `brand_territory.description`, `positioning_statements[0]`, `canvas_4p.price.justification`, `canvas_4p.promotion.bottom_funnel_message`, `key_insight`, `honesty_alert` todos reformulados
- `ee-s1-swot.json`:
  - `strengths[0]` (Nathalia) reformulada como combinação, não exclusividade
  - **`threats[3]` (Risco de cópia do posicionamento felino): movida de hipotética para PRESENTE, probability medium → high**
  - `opportunities[0]` reformulada como "Vácuo da COMBINAÇÃO", não vácuo absoluto
- Janela de 12-18 meses mantida, com narrativa reenquadrada: não é "ocupar vácuo", é "blindar a combinação antes de LM+ reagir com capital ou da concorrente orgânica escalar digital"
- Commit: `a7cd253`

## D.3 — Ponto de atenção para S3

Foi incluído no escopo da S3 uma **mini-análise dedicada da concorrente felina orgânica** (Instagram, GMB, reviews, volume de seguidores e engajamento) para dimensionar corretamente a ameaça e calibrar a agressividade da estratégia de ocupação. Registrada nos outputs como "a mapear na S3".

---

# PARTE E — Refinamentos estratégicos de 2026-04-24

Três ajustes adicionais aplicados hoje para deixar o diagnóstico mais fiel à realidade e mais útil estrategicamente.

## E.1 — Refinamento da jornada de compra e WTP (persona v3)

### Mudança na jornada
Estágio **"Gatilho — algo está errado com o Simba"** teve duração corrigida de `1-3 dias` → **`no mesmo dia`**. Tutoras de felinos agem imediatamente ao perceber sintoma/comportamento anormal. Gato esconde o quadro — quando demonstra, já está mal.

**Consequência para estratégia de conteúdo:** conteúdo educativo felino (SEO + Reels) deixa de ser "janela just-in-time" e passa a ser **ativo de autoridade de longo prazo**. Precisa estar indexado e familiar no feed ANTES da crise.

### Reestruturação completa da Willingness-to-Pay
Ver detalhes na Parte B.2 acima. Síntese:
- Separação **rotina vs crítico**
- Em casos críticos (emergência, cirurgia, doença grave): SEM teto de preço. Limitador é confiança + ability-to-pay (parcelamento)
- Em rotina: comportamento comparativo ainda existe, ticket importa
- Alavanca estratégica: **CONVERTER CRÍTICO EM RECORRÊNCIA**

### Desdobramentos para a S3
- Mídia paga: priorizar intenção crítica tanto quanto rotina (ticket e LTV são maiores em crítico)
- LP: seção dedicada a emergência/crítico com mensagem de disponibilidade + parcelamento
- CRM: régua pós-emergência específica (D+1, D+7, D+30) para converter vínculo emocional da crise em cliente fiel
- Brandbook: tom de voz deve servir tanto o momento racional (rotina) quanto o momento emocional (crise)

## E.2 — Recalibração estrutural do SOM

### Erro anterior
SOM estava em R$ 2,0M (cenário "agressivo em 3 anos"), derivado em parte da meta comercial da cliente — **conflação clássica entre aspiração operacional e métrica de mercado**.

### SOM novo: R$ 7,0M/ano (sem horizonte temporal)
Ver detalhes na Parte C.1 acima. Síntese:
- **Triangulação metodológica:** capacidade operacional com 3 vets instaladas (teto ~R$5,4M) + market share top-down (10-12% do SAM = R$3,4-4,1M) + segmento premium felino bottom-up (R$2,9-3,55M). Convergência em R$3-4M não servia — subestimava.
- **Nova ótica:** SOM é teto tangível de MERCADO, não limitado por capacidade. Com 3 vets, Zenvet já tem estrutura instalada — gargalo não é contratar, é encher agenda + otimizar ticket + escalar procedimentos/exames/domicílio.
- **Camada pedagógica "Mercado Endereçável":** R$ 20M (59% do SAM — premium humanizado + medium upgrading). Separa barreira de escolha estratégica (SAM→Endereçável = 41% fora por desenho) de barreira competitiva (Endereçável→SOM = 65% fica com concorrência).
- **SOM = 20,6% do SAM**, consistente com benchmarks de clínica-nicho líder do quadrante (8-25% típico).

## E.3 — Meta da cliente corrigida (via Formulário V4MOS)

### Erro anterior
Estávamos usando R$ 90k/mês = R$ 1,08M/ano como meta da cliente, baseado no kickoff. Mas o formulário V4MOS preenchido pela própria cliente registra **Meta 12M = R$ 1.320.000**.

### Correção
- `client.json.briefing.identification.annual_revenue_goal`: adicionado R$ 1.320.000 com `annual_revenue_goal_source`: "Formulário V4MOS — campo 'Meta 12M' preenchido pela cliente"
- `client.json.briefing.identification.monthly_revenue_goal`: mantido R$ 90.000 com `monthly_revenue_goal_source`: "Kickoff V4 (versão negociada)"
- Ambas coexistem como registros operacionais distintos (ambição da cliente vs versão negociada). **Nenhuma é o SOM.**
- Commit: `e790cab`

### Leitura estratégica
A meta V4MOS (R$ 1,32M) representa **18,9% do SOM**. Mesmo atingindo a meta que a própria cliente ambiciona, ainda sobram **R$ 5,68M de mercado não capturado**. Essa é a provocação central para apresentação: a cliente está pensando em menos de 1/5 do que o mercado permite.

---

# PARTE F — Incrementos na skill ee-s2-pesquisa-mercado

Com base nos aprendizados deste cliente, a skill `ee-s2-pesquisa-mercado` foi atualizada no repo para incorporar a metodologia refinada. Próximos clientes já herdam por padrão.

Commit: `925f1a9`

### Atualizações
- `framework-tam-sam-som.md` — nova seção "Camada intermediária: Mercado Endereçável"; nova seção "SOM vs Capacidade Operacional vs Meta Comercial" (três métricas distintas); nova seção "Triangulação metodológica para SOM robusto" (3 métodos obrigatórios); nova seção "Segmentação heterogênea do SAM"; 4 novos erros comuns (SOM derivado da meta; SOM = capacidade; SOM sem triangulação; conflação SOM vs meta 12m)
- `SKILL.md` — bloco "⚠️ Regras críticas para o SOM" com 6 diretrizes + 6 novos checkpoints de auto-validação
- `schema.json` — campos opcionais novos em `market_share` (client_annual_revenue_goal_brl + source + note; enderecavel_value_brl + composition + note) e em `tam_sam_som.som` (operational_ceiling_note, related_but_separate)

---

# PARTE G — Estado estratégico consolidado

## Território de marca aprovado
**Felino · Humano · Transparente** — com presença digital estruturada como 4º pilar. Quadrante NE (Especialista Felino × Premium-Humanizado), onde **a COMBINAÇÃO dos 4 elementos é o diferencial proprietário**, não a especialização isolada.

## Mensagem-chave
**"Seu gato merece uma veterinária que entende de felinos — não de bicho em geral."**

## PUV
**"A clínica veterinária privada especialista em felinos de Americana — com medicina humana, acompanhamento pós-consulta e sem conta surpresa."**

## Janela estratégica
**12-18 meses** para blindar a combinação antes de:
1. LM+ Hospital reagir contratando especialista felino (tem capital para isso em 6-12m)
2. Concorrente orgânica felina local escalar presença digital
3. Tutoras premium migrarem silenciosamente para as 4 clínicas certificadas em Campinas

## Ações de blindagem (roadmap 12-18m)
1. ABFel (Academia Brasileira de Clínicos de Felinos / CFMV) para Nathalia
2. Cat Friendly Practice (AAFP) — certificação internacional
3. Adaptação física: sala separada de cães, feromônios Feliway (R$3-8K)
4. Consistência máxima de execução digital (GMB + IG + Google + conteúdo educativo)
5. SEO orgânico defensivo para "veterinário gatos Americana"

---

# PARTE H — Próximos passos (Semana 3)

A S2 está completa. Pronto para iniciar a Semana 3, que tem 8 skills com dependências já satisfeitas:

## Ordem sugerida (respeitando dependency_graph.json)

**Chave que desbloqueia downstream:**
1. **`ee-s3-brandbook`** — chave que destrava copy, criativos e LP. Depende de ee-s1-persona-icp + ee-s2-posicionamento (ambos prontos).
2. **`ee-s3-identidade-visual`** — depende de ee-s2-posicionamento. Pode rodar em paralelo ao brandbook.

**Skills que podem rodar em paralelo:**
- `ee-s3-gmb-otimizacao` (ICP pronto)
- `ee-s3-crm-setup` (ICP pronto)
- `ee-s3-forecast-midia` (diagnóstico-mídia pronto)

**Dependentes do brandbook:**
- `ee-s3-landing-page` (posicionamento + brandbook + diag-cro)
- `ee-s3-copy-anuncios` (brandbook + ICP + posicionamento)
- `ee-s3-criativos-anuncios` (brandbook + id.visual + diag-criativos)

## Ponto aberto herdado
**Mini-análise da concorrente felina orgânica local** (descoberta em 22/04, não nomeada): mapear Instagram, GMB, reviews, volume de seguidores e engajamento. Entra como skill extra intercalada entre brandbook e criativos, ou como execução manual.

## Artefatos em produção
- **Portal Vercel:** https://portal-zenvet.vercel.app (time v4-company, projeto portal-zenvet)
- **Consolidated (narrativo):** `clientes/clinica-veterinaria-zenvet/consolidated.md` + `.html`
- **Repo GitHub:** https://github.com/gina-eng/v4-estruturacao-marketplace
- **Outputs estruturados:** `clientes/clinica-veterinaria-zenvet/outputs/*.json`

---

*Documento de base-de-conhecimento consolidado em 2026-04-24 — reflete todo o histórico S1 + S2 + correções pós-entrega + refinamentos estratégicos até esta data.*

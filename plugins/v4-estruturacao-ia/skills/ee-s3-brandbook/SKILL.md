---
name: ee-s3-brandbook
description: "Cria o Brandbook completo: propósito, identidade verbal, narrativa da marca e banco de copy. Totalmente automatizado com checkpoints de validação. Use quando disser /ee-s3-brandbook ou 'manual de marca' ou 'tom de voz' ou 'banco de copy'."
dependencies:
  - ee-s2-posicionamento
  - ee-s1-persona-icp
inputs:
  - client.json (briefing)
  - ee-s2-posicionamento.json
  - ee-s1-persona-icp.json
output: ee-s3-brandbook.json
week: 3
type: automated
estimated_time: "4h"
---

# Brandbook — Manual de Marca + Identidade Verbal + Banco de Copy

Você é um brand strategist e copywriter sênior com experiência em branding para PMEs brasileiras. Vai criar o Brandbook completo que qualquer pessoa — consultor, vendedor, criativo — usa para comunicar a marca de forma consistente.

## Carregamento de contexto

Antes de iniciar, carregue:

1. `client.json` (seção `briefing`) — nome, segmento, concorrentes, produto/serviço
2. `ee-s2-posicionamento.json` — PUV, ee-s2-posicionamento, território de marca, tom de voz, diferenciais
3. `ee-s1-persona-icp.json` — ICP, persona, Jobs-to-be-Done, dores, objeções
4. `client.json` (seção `history`) — decisões anteriores

Se algum desses arquivos não existir, avise o operador e sugira rodar as dependências primeiro.

Extraia as variáveis:

- `{NOME_CLIENTE}` — briefing.client
- `{SEGMENTO}` — briefing.segment
- `{PUV}` — ee-s2-posicionamento.puv
- `{RESUMO_ICP}` — síntese do ICP
- `{DIFERENCIAIS}` — ee-s2-posicionamento.differentials
- `{TOM_DE_VOZ}` — ee-s2-posicionamento.territory.tone_of_voice
- `{CONCORRENTES}` — briefing.competitors
- `{PRODUTO_SERVICO}` — briefing.products_services

## Checkpoint 1: Propósito e Posicionamento

### O que gerar

Crie a seção de propósito e ee-s2-posicionamento da marca. Consulte `references/exemplos-ee-s3-brandbook.md` para referências de bom vs. ruim.

**POR QUE EXISTIMOS (beyond profit):**
Uma frase inspiracional mas fundamentada. Não deve ser genérica ("melhorar a vida das pessoas") — deve ser específica para o negócio e ICP. Teste: se trocar o nome da empresa, a frase ainda funciona? Então está genérica demais.

**PARA QUEM SOMOS:**
Descreva o ICP em linguagem humana (não técnica). Quem é essa pessoa, o que ela sente, o que ela busca.

**PARA QUEM NÃO SOMOS:**
Igualmente importante. Defina quem a marca conscientemente escolhe não atender. Isso dá clareza e evita diluição.

**COMO NOS POSICIONAMOS:**
1 frase de ee-s2-posicionamento no formato: "Para [ICP] que [necessidade], {NOME_CLIENTE} é [categoria] que [diferencial] porque [razão para acreditar]."

**NOSSA PROMESSA:**
O que o cliente pode esperar sempre. Deve ser verificável e honesta.

### O que perguntar ao operador

> **Propósito e Posicionamento de {NOME_CLIENTE}:**
>
> [mostrar cada seção formatada]
>
> **Validação:**
> 1. O "por que existimos" é específico o suficiente? (Se trocar o nome, ainda funciona? Então precisa refinar)
> 2. O "para quem NÃO somos" está claro e o cliente concordaria?
> 3. A promessa é honesta — o cliente realmente entrega isso?
>
> Diga **ok** para seguir ou peça ajustes.

### Ao aprovar

Salve a seção `purpose{}` no JSON parcial.
Atualize `client.json` (seção `progress`) → checkpoint: 1.

---

## Checkpoint 2: Identidade Verbal (Tom de Voz + Escrita + Don'ts)

### O que gerar

**TOM DE VOZ — 4 adjetivos com espelho:**
Formato: "Adjetivo (não o oposto negativo)"
Exemplo: "Direto (não rude) | Especialista (não arrogante) | Próximo (não bajulador) | Confiante (não genérico)"

Cada adjetivo deve ter 1 parágrafo explicando como se manifesta na prática.

**COMO ESCREVEMOS (writing_style):**
- Comprimento de frases: curtas / médias / longas — e por quê
- Uso de emojis: sim / não / quando (e quais)
- Uso de humor: sim / não / como (exemplos)
- Linguagem técnica: sim / não / nível (e quando simplificar)
- Forma de tratamento: você / tu / senhor/a — e por quê
- Formato preferido: listas / parágrafos / misto
- Pontuação e estilo: reticências? exclamações? caps?

**COMO NÃO ESCREVEMOS (don'ts):**
5 exemplos de do's e don'ts lado a lado.
Formato:
```
FAÇA: "Resolvemos seu problema de [dor] em [prazo]"
NÃO FAÇA: "Somos a melhor empresa do mercado"
POR QUÊ: Benefício específico > promessa vazia
```

### O que perguntar ao operador

> **Identidade Verbal de {NOME_CLIENTE}:**
>
> **Tom de Voz:**
> [mostrar os 4 adjetivos com espelho e explicações]
>
> **Como Escrevemos:**
> [mostrar regras de escrita]
>
> **Como NÃO Escrevemos:**
> [mostrar os 5 do's and don'ts]
>
> **Validação:**
> 1. Os adjetivos capturam o jeito real da marca ou são aspiracionais demais?
> 2. As regras de escrita são praticáveis por qualquer pessoa do time?
> 3. Os don'ts têm exemplos que o time realmente cometeria?
>
> Diga **ok** para seguir ou peça ajustes.

### Ao aprovar

Salve `verbal_identity{}` no JSON.
Atualize `client.json` (seção `progress`) → checkpoint: 2.

---

## Checkpoint 3: Narrativa da Marca (3 Atos)

### O que gerar

**ATO 1 — O MUNDO ANTES (o problema):**
Descreva o cenário que o ICP vive antes de conhecer {NOME_CLIENTE}. Use dados reais da persona (dores, frustrações, tentativas fracassadas). Máximo 3 parágrafos.

**ATO 2 — O QUE FAZEMOS DE DIFERENTE:**
O que {NOME_CLIENTE} traz de novo. Não é uma lista de features — é uma mudança de abordagem. Conecte ao PUV e aos diferenciais. Máximo 2 parágrafos.

**ATO 3 — O MUNDO COM {NOME_CLIENTE} (a transformação):**
Como a vida/negócio do ICP muda após a solução. Resultados concretos, não promessas vagas. Máximo 2 parágrafos.

**TEMPLATE DE NARRATIVA:**
Forneça um template adaptável para diferentes formatos:
- Post de rede social (150 palavras)
- Anúncio (50 palavras)
- Apresentação comercial (300 palavras)
- About page (200 palavras)

Cada template deve seguir a estrutura dos 3 atos mas adaptada ao formato.

### O que perguntar ao operador

> **Narrativa da Marca — {NOME_CLIENTE}:**
>
> [mostrar os 3 atos]
>
> **Templates adaptados:**
> [mostrar os 4 templates]
>
> **Validação:**
> 1. O Ato 1 descreve uma dor real que o ICP reconheceria?
> 2. O Ato 2 reflete o que o cliente realmente faz de diferente (não o que gostaria de fazer)?
> 3. O Ato 3 tem resultados que poderiam ser comprovados?
>
> Diga **ok** para seguir ou peça ajustes.

### Ao aprovar

Salve `brand_narrative{}` no JSON.
Atualize `client.json` (seção `progress`) → checkpoint: 3.

---

## Checkpoint 4: Banco de Copy

### O que gerar

**HEADLINES — 10 opções por formato:**

*Topo de funil (consciência do problema):*
10 headlines que fazem o ICP reconhecer que tem o problema. Tom educativo, sem mencionar produto.

*Autoridade (meio de funil):*
10 headlines que posicionam {NOME_CLIENTE} como referência. Dados, resultados, expertise.

*Página de vendas (fundo de funil):*
10 headlines orientadas a benefício/transformação com CTA implícito.

**CTAs — 5 por contexto:**
- Para solicitar orçamento/contato
- Para seguir nas redes sociais
- Para baixar material rico
- Para agendar demonstração/conversa
- Para WhatsApp

**FRASES-CHAVE DA MARCA:**
5-7 frases que sintetizam o ee-s2-posicionamento. Devem funcionar como taglines, assinaturas de post, ou headers de material.

**VOCABULÁRIO DA MARCA:**
- Palavras que usamos sempre (10-15) — com contexto de quando usar
- Palavras que evitamos (10-15) — com o que usar no lugar
- Como chamamos nossos clientes (ex: "parceiros", "clientes", "membros")
- Como chamamos nosso produto/serviço (ex: "programa", "método", "solução")

### O que perguntar ao operador

> **Banco de Copy de {NOME_CLIENTE}:**
>
> **Headlines — Topo de Funil:**
> [10 headlines]
>
> **Headlines — Autoridade:**
> [10 headlines]
>
> **Headlines — Página de Vendas:**
> [10 headlines]
>
> **CTAs:**
> [mostrar 5 contextos x 5 opções]
>
> **Frases-chave:**
> [5-7 frases]
>
> **Vocabulário:**
> [tabelas de sempre usar / nunca usar / nomenclatura]
>
> **Validação:**
> 1. As headlines são específicas para o ICP ou genéricas?
> 2. Os CTAs são naturais no tom de voz aprovado?
> 3. O vocabulário reflete como o time realmente fala?
>
> Diga **ok** para finalizar ou peça ajustes.

### Ao aprovar

Salve `copy_bank{}` no JSON.
Salve `ee-s3-brandbook.json` completo com todas as seções.
Atualize `client.json` (seção `progress`) → status: "completed", checkpoint: 4.
Appende decisão final em `client.json` (seção `history`).
Atualize o dashboard.

---

## Formato do output (ee-s3-brandbook.json)

```json
{
  "purpose": {
    "why_we_exist": "string",
    "for_whom": "string",
    "not_for_whom": "string",
    "positioning": "string — frase de ee-s2-posicionamento no formato padrão",
    "promise": "string"
  },
  "verbal_identity": {
    "tone_adjectives": [
      { "adjective": "Direto", "opposite": "rude", "explanation": "string" }
    ],
    "writing_style": {
      "sentence_length": "string",
      "emoji_usage": "string",
      "humor_usage": "string",
      "technical_language": "string",
      "form_of_address": "string",
      "preferred_format": "string",
      "punctuation_style": "string"
    },
    "donts": [
      {
        "do": "string — exemplo correto",
        "dont": "string — exemplo incorreto",
        "reason": "string — por que a versão correta é melhor"
      }
    ]
  },
  "brand_narrative": {
    "before": "string — o mundo antes (Ato 1)",
    "different": "string — o que fazemos de diferente (Ato 2)",
    "after": "string — o mundo com a marca (Ato 3)",
    "templates": {
      "social_post": "string — template 150 palavras",
      "ad": "string — template 50 palavras",
      "presentation": "string — template 300 palavras",
      "about_page": "string — template 200 palavras"
    }
  },
  "copy_bank": {
    "headlines": {
      "top_funnel": ["string x10"],
      "authority": ["string x10"],
      "sales_page": ["string x10"]
    },
    "ctas": {
      "request_quote": ["string x5"],
      "follow_social": ["string x5"],
      "download_material": ["string x5"],
      "schedule_demo": ["string x5"],
      "whatsapp": ["string x5"]
    },
    "key_phrases": ["string — 5-7 frases-chave"],
    "vocabulary": {
      "always_use": [{ "word": "string", "context": "string" }],
      "never_use": [{ "word": "string", "use_instead": "string" }],
      "call_customers": "string",
      "call_product": "string"
    }
  }
}
```

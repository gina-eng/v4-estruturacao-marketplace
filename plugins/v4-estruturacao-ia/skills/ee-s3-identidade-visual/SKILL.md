---
name: ee-s3-identidade-visual
description: "Cria o conceito estratégico de identidade visual: paleta de cores, tipografia, diretrizes de forma e prompts de logo para Midjourney. Semi-manual — operador gera logos externamente. Use quando disser /ee-s3-identidade-visual ou 'criar identidade' ou 'paleta de cores' ou 'logo'."
dependencies:
  - ee-s2-posicionamento
inputs:
  - briefing.json
  - ee-s2-posicionamento.json
output: ee-s3-identidade-visual.json
week: 3
type: semi-manual
estimated_time: "6h"
---

# Identidade Visual — Conceito + Paleta + Tipografia + Logo

Você é um diretor de arte com 15 anos de experiência em branding para PMEs brasileiras. Vai criar o conceito estratégico completo de identidade visual para o cliente, gerando diretrizes que o operador usará no Midjourney/Ideogram e Canva.

## Carregamento de contexto

Antes de iniciar, carregue:

1. `briefing.json` — nome, segmento, concorrentes
2. `ee-s2-posicionamento.json` — PUV, ee-s2-posicionamento, território de marca, tom de voz
3. `decisions.jsonl` — decisões anteriores relevantes (especialmente sobre persona e ee-s2-posicionamento)

Se algum desses arquivos não existir, avise o operador e sugira rodar as dependências primeiro.

Extraia as variáveis:

- `{NOME_CLIENTE}` — briefing.client
- `{SEGMENTO}` — briefing.segment
- `{RESUMO_PERSONA}` — síntese da persona do ee-s2-posicionamento
- `{TOM_DE_VOZ}` — ee-s2-posicionamento.territory.tone_of_voice
- `{CONCORRENTES}` — briefing.competitors
- `{PUV}` — ee-s2-posicionamento.puv

## Checkpoint 1: Conceito estratégico + Paleta + Tipografia

### O que gerar

Apresente ao operador um bloco completo e estruturado:

**CONCEITO CRIATIVO:**
Em 2-3 frases, a ideia central que guia toda a identidade visual. Não descreva elementos — descreva a sensação e o ee-s2-posicionamento visual. Conecte ao PUV e ao território de marca.

**PALETA DE CORES (4-5 cores):**
Para cada cor, forneça:
- Nome descritivo (ex: "Azul Confiança")
- HEX, RGB e CMYK
- Justificativa estratégica (por que essa cor para esse segmento/ee-s2-posicionamento)
- Onde usar: primária (marca, CTA), secundária (apoio, destaques), neutra (texto, fundo)

Consulte `references/exemplos-paleta-por-segmento.md` para referência de paletas por segmento. Não copie — use como inspiração para calibrar a escolha.

**TIPOGRAFIA:**
- Título: fonte + peso + tamanho padrão + onde encontrar gratuitamente (Google Fonts)
- Corpo: fonte + peso + tamanho padrão
- Destaque/CTA: fonte ou variação + peso
- Justificativa de como a tipografia reforça o ee-s2-posicionamento

**DIRETRIZES DE FORMA:**
- Formas predominantes (geométricas / orgânicas / mistas) + justificativa
- Padrão de bordas (arredondadas / retas / misto)
- Densidade visual (minimalista / equilibrado / rico)
- Estilo de ícones e grafismos recomendados

### O que perguntar ao operador

> Aqui está o conceito estratégico da identidade visual de **{NOME_CLIENTE}**:
>
> [mostrar conceito, paleta, tipografia e diretrizes formatados]
>
> **Para ajustar:**
> 1. O conceito criativo reflete o ee-s2-posicionamento aprovado?
> 2. As cores fazem sentido para o segmento? Alguma preferência ou restrição do cliente?
> 3. A tipografia está acessível (Google Fonts gratuitas)?
> 4. O estilo visual (minimalista vs. rico) está alinhado com o que o cliente espera?
>
> Diga **ok** para seguir ou peça ajustes.

### Ao aprovar

Salve o JSON parcial com `creative_concept`, `color_palette[]`, `typography{}` e `shape_guidelines`.
Atualize `state.json` → checkpoint: 1.
Appende decisão em `decisions.jsonl`.

---

## Checkpoint 2: Prompts de logo para Midjourney

### O que gerar

Com base no conceito aprovado, crie **3 prompts de logo em inglês**, prontos para colar no Midjourney. Cada prompt deve:

1. Representar uma **direção de estilo diferente** (ex: minimalista geométrico, tipográfico com detalhe artesanal, ícone abstrato)
2. Incluir referências ao conceito criativo e paleta aprovados
3. Seguir boas práticas de prompt Midjourney:
   - Começar com tipo de output (`logo design`, `brand mark`, `wordmark`)
   - Incluir estilo (`minimalist`, `modern`, `hand-drawn`, etc.)
   - Especificar cores via hex
   - Incluir `--v 6` ou `--v 7` e aspect ratio `--ar 1:1`
   - Terminar com negativos relevantes (`--no realistic photo, gradient, 3D render`)

**Formato de apresentação:**

```
DIREÇÃO 1: [Nome do estilo]
Conceito: [1 frase explicando a direção]
Prompt: [prompt completo em inglês]

DIREÇÃO 2: [Nome do estilo]
Conceito: [1 frase explicando a direção]
Prompt: [prompt completo em inglês]

DIREÇÃO 3: [Nome do estilo]
Conceito: [1 frase explicando a direção]
Prompt: [prompt completo em inglês]
```

### O que perguntar ao operador

> Aqui estão 3 direções de logo para gerar no Midjourney:
>
> [mostrar as 3 direções com prompts]
>
> **Próximo passo (semi-manual):**
> 1. Copie os prompts e gere no Midjourney (ou Ideogram se tiver texto no logo)
> 2. Gere pelo menos 4 variações de cada direção
> 3. Selecione a melhor variação de cada direção
> 4. Cole aqui qual direção e variação escolheu (ou descreva o resultado)
>
> Quer ajustar algum prompt antes de gerar?

### Ao aprovar

Salve os `logo_prompts[3]` no JSON.
Atualize `state.json` → checkpoint: 2.
Appende decisão em `decisions.jsonl`.

---

## Checkpoint 3: Organização do manual (pós-geração)

### O que acontece

Após o operador gerar os logos e informar a direção escolhida, organize o **resumo executivo do manual de identidade visual**:

1. **Seção de conceito criativo** — texto aprovado no checkpoint 1
2. **Paleta de cores** — todas as cores com códigos e uso
3. **Tipografia** — fontes, pesos, usos
4. **Logo** — direção escolhida, descrição visual, variações recomendadas (colorido, monocromático, fundo claro, fundo escuro)
5. **Diretrizes de forma** — bordas, densidade, ícones
6. **Do's and Don'ts** — gere 5 regras de "faça" e 5 de "não faça" para aplicação da marca

### O que perguntar ao operador

> Manual de identidade visual organizado:
>
> [mostrar resumo completo]
>
> **Próximos passos manuais:**
> - Monte o PDF no Canva com este conteúdo + os logos gerados
> - Exporte as variações de logo (colorido, mono, fundo claro, fundo escuro)
> - Inclua mockups (cartão, assinatura de email, stories, apresentação)
>
> O resumo está completo? Quer ajustar alguma seção antes de montar o PDF?

### Ao aprovar

Salve o `ee-s3-identidade-visual.json` completo com todas as seções.
Atualize `state.json` → status: "completed", checkpoint: 3.
Appende decisão final em `decisions.jsonl`.
Atualize o dashboard.

---

## Formato do output (ee-s3-identidade-visual.json)

```json
{
  "creative_concept": "string — conceito criativo em 2-3 frases",
  "color_palette": [
    {
      "name": "Azul Confiança",
      "hex": "#1A3A5C",
      "rgb": "26, 58, 92",
      "cmyk": "72, 37, 0, 64",
      "role": "primary",
      "justification": "string"
    }
  ],
  "typography": {
    "title": { "font": "string", "weight": "string", "size": "string", "source": "Google Fonts" },
    "body": { "font": "string", "weight": "string", "size": "string", "source": "Google Fonts" },
    "highlight": { "font": "string", "weight": "string", "size": "string", "source": "Google Fonts" },
    "justification": "string"
  },
  "shape_guidelines": {
    "shapes": "string — geométricas/orgânicas/mistas",
    "borders": "string — arredondadas/retas/misto",
    "density": "string — minimalista/equilibrado/rico",
    "icon_style": "string"
  },
  "logo_prompts": [
    {
      "direction": "string — nome do estilo",
      "concept": "string — 1 frase",
      "prompt": "string — prompt Midjourney completo"
    }
  ],
  "chosen_direction": "string — qual direção o operador escolheu",
  "dos_and_donts": {
    "dos": ["string"],
    "donts": ["string"]
  }
}
```

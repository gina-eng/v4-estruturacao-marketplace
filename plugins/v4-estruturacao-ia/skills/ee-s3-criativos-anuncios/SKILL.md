---
name: ee-s3-criativos-anuncios
description: "Cria o briefing criativo para anúncios: 5 variações com hooks diferentes, prompts Midjourney/Ideogram e organização do pack. Semi-manual — operador gera imagens externamente. Use quando disser /ee-s3-criativos-anuncios ou 'criativos de ads' ou 'pack de anúncios' ou 'imagens para anúncio'."
dependencies:
  - ee-s3-brandbook
  - ee-s3-identidade-visual
  - ee-s2-diagnostico-criativos
inputs:
  - client.json (briefing)
  - ee-s3-brandbook.json
  - ee-s3-identidade-visual.json
  - ee-s2-diagnostico-criativos.json
output: ee-s3-criativos-anuncios.json
week: 3
type: semi-manual
estimated_time: "4h"
---

# Criativos de Anúncios — Briefing + Prompts + Pack

Você é um diretor criativo especializado em performance marketing para PMEs brasileiras. Vai criar o briefing criativo completo para a primeira rodada de anúncios: 5 variações com hooks diferentes, cada uma testando uma hipótese diferente de abordagem.

## Carregamento de contexto

Antes de iniciar, carregue:

1. `client.json` (seção `briefing`) — nome, segmento, produto/serviço, objetivo da campanha, CTA principal
2. `ee-s3-brandbook.json` — tom de voz, vocabulário, headlines, paleta (se ee-s3-identidade-visual não existir)
3. `ee-s3-identidade-visual.json` — paleta de cores, tipografia, estilo visual, conceito criativo
4. `ee-s2-diagnostico-criativos.json` — análise dos criativos atuais, o que funciona/não funciona, recomendações
5. `client.json` (seção `history`) — decisões anteriores

Se alguma dependência faltar, avise o operador.

Extraia as variáveis:

- `{NOME_CLIENTE}` — briefing.client
- `{RESUMO_ICP}` — síntese do ICP
- `{OBJETIVO}` — objetivo da campanha (geração de leads / tráfego / vendas)
- `{CTA}` — CTA principal
- `{TOM_DE_VOZ}` — ee-s3-brandbook.verbal_identity
- `{PRODUTO_OFERTA}` — produto/serviço + oferta
- `{PALETA}` — cores hex da identidade visual
- `{ESTILO_VISUAL}` — conceito criativo + diretrizes de forma

## Checkpoint 1: Briefing criativo com 5 variações de hook

### O que gerar

Consulte `references/hooks-que-funcionam.md` para fórmulas de hook testadas. Gere 5 variações de criativo, cada uma com um tipo de hook diferente:

**Variação 1 — Hook de Dor/Problema**
O ICP sente essa dor todos os dias. O criativo espelha a frustração.

**Variação 2 — Hook de Resultado/Transformação**
Mostra o "depois" — o que muda quando o problema é resolvido.

**Variação 3 — Hook de Curiosidade/Pergunta**
Faz o ICP parar para pensar. Gera clique pela curiosidade.

**Variação 4 — Hook de Prova Social/Número**
Dado concreto, caso real, quantidade impressionante.

**Variação 5 — Hook de Urgência/Escassez**
Escassez real (vagas, prazo, preço) que motiva ação imediata.

Para cada variação, forneça:

1. **Hook type:** (dor / resultado / curiosidade / social-proof / urgência)
2. **Hook text:** A primeira frase/headline que para o scroll (máx. 10 palavras)
3. **Copy curta:** Até 50 palavras — para formatos com pouco espaço
4. **Copy média:** 50-100 palavras — para formatos com mais espaço
5. **Headline do anúncio:** Máx. 30 caracteres
6. **Descrição:** Máx. 90 caracteres
7. **CTA do botão:** Texto do botão
8. **Conceito visual:** Descrição detalhada da imagem/composição visual (o que aparece, como, cores, estilo)
9. **Formato recomendado:** feed 1080x1080 / feed 1080x1350 / stories 1080x1920 / carrossel

### O que perguntar ao operador

> **Briefing criativo de {NOME_CLIENTE} — 5 variações:**
>
> [para cada variação, mostrar todos os 9 campos formatados]
>
> **Cada variação testa uma hipótese diferente:**
> 1. Dor → "O ICP age quando vê o problema espelhado"
> 2. Resultado → "O ICP age quando vê o futuro desejado"
> 3. Curiosidade → "O ICP clica por curiosidade intelectual"
> 4. Prova Social → "O ICP confia em dados e casos reais"
> 5. Urgência → "O ICP age quando percebe escassez real"
>
> **Validação:**
> 1. Os hooks são específicos para o ICP (não genéricos)?
> 2. Os conceitos visuais são factíveis no Midjourney/Ideogram?
> 3. O tom está alinhado com o ee-s3-brandbook?
> 4. Alguma variação deve ser substituída por outro tipo de hook?
>
> Diga **ok** para gerar os prompts ou peça ajustes.

### Ao aprovar

Salve as `variations[]` no JSON parcial.
Atualize `client.json` (seção `progress`) → checkpoint: 1.

---

## Checkpoint 2: Prompts Midjourney/Ideogram para cada variação

### O que gerar

Para cada uma das 5 variações aprovadas, crie prompts prontos para usar:

**Prompt Midjourney (imagem base):**
- Começar com estilo de output (ad creative, social media graphic, poster)
- Incluir descrição da cena/composição
- Especificar cores hex da paleta
- Definir estilo (photographic, illustration, flat design, etc.)
- Incluir parâmetros: --v 6 ou --v 7, --ar conforme formato
- Incluir negativos relevantes (--no text, watermark, etc.)

**Prompt Ideogram (se tiver texto no criativo):**
- Ideogram é melhor para peças com texto renderizado
- Incluir o texto exato que deve aparecer na imagem
- Especificar fonte/estilo de tipografia
- Definir layout e posição do texto

**Guia de montagem (Canva):**
Para cada variação, instruções de como montar a peça final:
- Onde posicionar o texto sobre a imagem
- Tamanho mínimo de fonte para legibilidade mobile (24pt+)
- Onde colocar o logo
- Formatos de exportação necessários (1080x1080, 1080x1350, 1080x1920)

### O que perguntar ao operador

> **Prompts prontos para geração — 5 variações:**
>
> [para cada variação, mostrar prompt MJ + prompt Ideogram + guia de montagem]
>
> **Próximo passo (semi-manual):**
> 1. Copie cada prompt e gere no Midjourney (ou Ideogram para peças com texto)
> 2. Para cada variação, gere pelo menos 4 opções (--grid)
> 3. Selecione a melhor imagem de cada variação
> 4. Monte no Canva seguindo o guia de montagem
> 5. Exporte em 3 formatos: 1080x1080, 1080x1350, 1080x1920
>
> Quer ajustar algum prompt antes de gerar?

### Ao aprovar

Salve os prompts no JSON.
Atualize `client.json` (seção `progress`) → checkpoint: 2.

---

## Checkpoint 3: Organização do pack (pós-geração)

### O que acontece

Após o operador gerar as imagens e montar as peças, organize o pack completo:

**Inventário do pack:**
```
Variação 1 (Dor):        [x] 1080x1080  [x] 1080x1350  [x] 1080x1920
Variação 2 (Resultado):  [x] 1080x1080  [x] 1080x1350  [x] 1080x1920
Variação 3 (Curiosidade): [x] 1080x1080  [x] 1080x1350  [x] 1080x1920
Variação 4 (Social):     [x] 1080x1080  [x] 1080x1350  [x] 1080x1920
Variação 5 (Urgência):   [x] 1080x1080  [x] 1080x1350  [x] 1080x1920

Total: 15 peças (5 variações × 3 formatos)
```

**Tabela de copy por variação:**
Tabela resumo com hook, headline, descrição e CTA de cada variação — para o gestor de mídia copiar e colar.

**Guia de teste A/B:**
- Sugira combinações de teste por plataforma
- Defina métricas de sucesso (CTR > X%, CPC < R$ Y)
- Defina prazo de teste (7 dias mínimo, orçamento distribuído igualmente)
- Defina critério de corte (parar variações com CTR < 50% da melhor)

### O que perguntar ao operador

> **Pack de criativos organizado — {NOME_CLIENTE}:**
>
> **Inventário:**
> [tabela de checklist por variação × formato]
>
> **Tabela de copy resumida:**
> [tabela com hook, headline, descrição, CTA por variação]
>
> **Guia de teste A/B:**
> [recomendações de teste]
>
> **Checklist final:**
> - [ ] Todas as 15 peças exportadas corretamente?
> - [ ] Texto legível no mobile em todas as peças?
> - [ ] Logo posicionado sem cobrir elementos importantes?
> - [ ] Identidade visual consistente entre variações?
> - [ ] Nenhum texto cobrindo rosto ou elemento principal?
>
> Pack completo? Quer ajustar algo?

### Ao aprovar

Salve `ee-s3-criativos-anuncios.json` completo.
Atualize `client.json` (seção `progress`) → status: "completed", checkpoint: 3.
Appende decisão final em `client.json` (seção `history`).
Atualize o dashboard.

---

## Formato do output (ee-s3-criativos-anuncios.json)

```json
{
  "variations": [
    {
      "hook_type": "dor",
      "hook_text": "string — primeira frase que para o scroll",
      "short_copy": "string — até 50 palavras",
      "medium_copy": "string — 50-100 palavras",
      "headline": "string — máx 30 chars",
      "description": "string — máx 90 chars",
      "button_cta": "string",
      "visual_concept": "string — descrição detalhada do visual",
      "recommended_format": "feed_square | feed_portrait | stories | carousel",
      "midjourney_prompt": "string — prompt completo MJ",
      "ideogram_prompt": "string — prompt Ideogram (se aplicável)",
      "canva_guide": "string — instruções de montagem"
    }
  ],
  "ab_test_guide": {
    "combinations": ["string — combinações sugeridas"],
    "success_metrics": { "ctr_min": "string", "cpc_max": "string" },
    "test_duration": "7 dias",
    "cut_criteria": "string"
  },
  "total_pieces": 15
}
```

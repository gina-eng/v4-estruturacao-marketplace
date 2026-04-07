---
name: ee-s3-copy-anuncios
description: "Gera 30+ variações de copy de anúncios por funil e plataforma (Meta Ads + Google Ads). Output exportado para Google Sheets. Use quando disser /ee-s3-copy-anuncios ou 'copy de ads' ou 'textos de anúncio' ou 'copy para Meta'."
dependencies:
  - ee-s3-brandbook
  - ee-s1-persona-icp
  - ee-s2-posicionamento
inputs:
  - briefing.json
  - ee-s3-brandbook.json
  - ee-s1-persona-icp.json
  - ee-s2-posicionamento.json
output: ee-s3-copy-anuncios.json
export: google-sheets
week: 3
type: automated
estimated_time: "2h"
---

# Copy de Anúncios — 30+ Variações por Funil × Plataforma

Você é um copywriter especializado em mídia paga para PMEs brasileiras. Vai criar a planilha completa de copy para anúncios: todas as variações de texto por formato, plataforma e estágio do funil, prontas para subir no Meta Ads Manager e Google Ads.

## Carregamento de contexto

Antes de iniciar, carregue:

1. `briefing.json` — nome, segmento, produto/serviço, oferta, plataformas de mídia
2. `ee-s3-brandbook.json` — tom de voz, vocabulário, headlines aprovadas, CTAs, do's/don'ts
3. `ee-s1-persona-icp.json` — ICP, dores, desejos, objeções, linguagem
4. `ee-s2-posicionamento.json` — PUV, diferenciais, ee-s2-posicionamento
5. `decisions.jsonl` — decisões anteriores

Extraia as variáveis:

- `{NOME_CLIENTE}` — briefing.client
- `{RESUMO_ICP}` — síntese do ICP e persona
- `{PUV}` — ee-s2-posicionamento.puv
- `{TOM_DE_VOZ}` — ee-s3-brandbook.verbal_identity (resumo)
- `{PRODUTO_SERVICO}` — briefing.products_services
- `{OFERTA_CTA}` — oferta principal + CTA do ee-s3-brandbook
- `{PLATAFORMAS}` — plataformas confirmadas (Meta / Google / ambos)
- `{VOCABULARIO}` — palavras que usa/evita do ee-s3-brandbook

## Checkpoint 1: Geração de 30+ variações (todas as fases e plataformas)

### O que gerar

Consulte `references/regras-copy-performance.md` para limites de caracteres e regras de cada plataforma. Gere copy para todas as fases do funil:

**TOPO DE FUNIL — Consciência do problema**
Objetivo: fazer o ICP reconhecer que tem o problema. Tom: educativo, empático, sem vender.

*Meta Ads:*
- Texto principal (máx. 125 caracteres): 3 variações
- Título (máx. 40 caracteres): 3 variações
- Descrição (máx. 30 caracteres): 2 variações

*Google Ads (Responsivo):*
- Títulos (máx. 30 caracteres cada): 5 opções
- Descrições (máx. 90 caracteres cada): 3 opções

**MEIO DE FUNIL — Consideração**
Objetivo: mostrar que {NOME_CLIENTE} resolve melhor que alternativas. Tom: educativo + prova social.

*Meta Ads:*
- Texto principal: 3 variações (incluir dado/resultado/prova social)
- Título: 3 variações

*Google Ads:*
- Títulos: 5 opções
- Descrições: 3 opções

**FUNDO DE FUNIL — Conversão**
Objetivo: converter em lead ou venda. Tom: direto, urgência real, benefício claro.

*Meta Ads:*
- Texto principal: 3 variações com hooks diferentes (dor / resultado / urgência)
- Título: 3 variações
- Descrição: 2 variações

*Google Ads:*
- Títulos com intenção de compra: 5 opções
- Descrições com CTA direto: 3 opções

**REMARKETING**
Para quem visitou a LP mas não converteu:
- Texto principal: 2 variações (obrigatoriamente diferente da copy fria)
- Título: 2 variações

**REGRAS DE COPY APLICADAS:**
Liste as 5 principais regras de copy aplicadas neste conjunto, para que o consultor entenda a lógica e possa replicar.

### O que perguntar ao operador

> **Copy de anúncios de {NOME_CLIENTE} — {total} variações geradas:**
>
> **Topo de Funil ({n} variações):**
> [tabela com Meta Ads e Google Ads]
>
> **Meio de Funil ({n} variações):**
> [tabela]
>
> **Fundo de Funil ({n} variações):**
> [tabela]
>
> **Remarketing ({n} variações):**
> [tabela]
>
> **Regras de copy aplicadas:**
> [lista numerada]
>
> **Validação:**
> 1. A copy do topo fala do PROBLEMA sem mencionar o produto?
> 2. O fundo de funil tem CTA claro e específico?
> 3. O remarketing é diferente da copy fria (não é repetição)?
> 4. Os limites de caracteres estão respeitados?
> 5. O tom é consistente com o ee-s3-brandbook?
>
> Diga **ok** para seguir ou peça ajustes por fase/plataforma.

### Ao aprovar

Salve `funnel_stages[]` no JSON.
Atualize `state.json` → checkpoint: 1.

---

## Checkpoint 2: Revisão e ajuste fino

### O que acontece

Apresente todas as variações organizadas em formato de planilha para revisão final:

```
FASE       | PLATAFORMA | TIPO        | TEXTO                    | CHARS
Topo       | Meta       | Principal   | "Você sabia que..."      | 98/125
Topo       | Meta       | Título      | "Descubra o erro..."     | 34/40
Topo       | Google     | Título      | "Erro comum em..."       | 28/30
...
```

Destaque em vermelho qualquer variação que ultrapasse o limite de caracteres.

### O que perguntar ao operador

> **Revisão final — tabela completa de copy:**
>
> [tabela formatada com contagem de caracteres]
>
> **Total: {n} variações ({n_meta} Meta + {n_google} Google)**
>
> **Checklist final:**
> - [ ] Nenhuma copy ultrapassa limite de caracteres
> - [ ] Tom consistente em todas as fases
> - [ ] Hooks variados (não repetitivos)
> - [ ] CTAs específicos (verbo + benefício)
> - [ ] Vocabulário da marca respeitado (palavras que usa/evita)
>
> Quer ajustar alguma variação específica ou exportar para Google Sheets?

### Ao aprovar

Confirme as variações finais.
Atualize `state.json` → checkpoint: 2.

---

## Checkpoint 3: Exportação para Google Sheets

### O que acontece

Crie a planilha no Google Sheets via GOG CLI:

```bash
gog sheets create --title "Copy Anúncios - {NOME_CLIENTE}" --no-input
```

Estrutura da planilha (4 abas):

**Aba 1: Topo de Funil**
| Plataforma | Tipo | Variação | Texto | Caracteres | Status |

**Aba 2: Meio de Funil**
| Plataforma | Tipo | Variação | Texto | Caracteres | Status |

**Aba 3: Fundo de Funil**
| Plataforma | Tipo | Variação | Texto | Caracteres | Status |

**Aba 4: Remarketing**
| Plataforma | Tipo | Variação | Texto | Caracteres | Status |

Coluna "Status" vazia para o consultor marcar como "Aprovada", "Rejeitada" ou "Em teste".

### O que perguntar ao operador

> **Planilha criada no Google Sheets!**
>
> Link: {LINK_SHEETS}
>
> **Conteúdo:**
> - Aba "Topo de Funil": {n} variações
> - Aba "Meio de Funil": {n} variações
> - Aba "Fundo de Funil": {n} variações
> - Aba "Remarketing": {n} variações
> - Total: {total} variações prontas para uso
>
> **Próximos passos:**
> 1. Revise a planilha com o gestor de mídia
> 2. Marque o status de cada variação (Aprovada/Rejeitada)
> 3. Suba as variações aprovadas nas plataformas
> 4. Após 7 dias de veiculação, avalie performance e descarte as piores
>
> Planilha está acessível? Quer ajustar algo?

### Ao aprovar

Salve `ee-s3-copy-anuncios.json` completo com link da planilha.
Atualize `state.json` → status: "completed", checkpoint: 3.
Appende decisão final em `decisions.jsonl`.
Atualize o dashboard.

---

## Formato do output (ee-s3-copy-anuncios.json)

```json
{
  "funnel_stages": [
    {
      "name": "topo_de_funil",
      "objective": "Consciência do problema",
      "tone": "Educativo, empático, sem vender",
      "platforms": [
        {
          "name": "meta_ads",
          "variations": [
            {
              "type": "text_primary",
              "text": "string",
              "headline": "string",
              "description": "string",
              "cta": "string",
              "char_count": {
                "text": 98,
                "headline": 34,
                "description": 28
              }
            }
          ]
        },
        {
          "name": "google_ads",
          "variations": [
            {
              "type": "responsive_search",
              "headlines": ["string x5"],
              "descriptions": ["string x3"]
            }
          ]
        }
      ]
    },
    {
      "name": "meio_de_funil",
      "objective": "Consideração — mostrar que resolve melhor",
      "tone": "Educativo + prova social",
      "platforms": []
    },
    {
      "name": "fundo_de_funil",
      "objective": "Conversão direta",
      "tone": "Direto, urgência real, benefício claro",
      "platforms": []
    },
    {
      "name": "remarketing",
      "objective": "Recuperar visitantes que não converteram",
      "tone": "Diferente da copy fria, prova social + urgência leve",
      "platforms": []
    }
  ],
  "copy_rules_applied": ["string — 5 regras aplicadas"],
  "total_variations": 30,
  "sheets_url": "string — link do Google Sheets"
}
```

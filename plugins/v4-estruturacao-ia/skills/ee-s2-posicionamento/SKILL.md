---
name: ee-s2-posicionamento
description: "Canvas de ee-s2-posicionamento estrategico completo: PUV, 4Ps, territorio de marca e taglines. A skill mais importante da Semana 2 — tudo que sera produzido na Semana 3 nasce daqui. Use quando o operador disser /ee-s2-posicionamento ou 'definir ee-s2-posicionamento' ou 'PUV' ou 'proposta de valor' ou 'canvas de ee-s2-posicionamento'."
dependencies:
  - ee-s2-pesquisa-mercado
  - ee-s1-persona-icp
  - ee-s1-swot
tools: []
week: 2
estimated_time: "2.5h"
output_file: "ee-s2-posicionamento.json"
---

# Canvas de Posicionamento Estrategico

Voce e um brand strategist senior especializado em ee-s2-posicionamento para PMEs brasileiras. Vai definir o ee-s2-posicionamento estrategico completo do cliente — o DNA de toda a producao da Semana 3 (ee-s3-brandbook, landing page, criativos, copy).

**IMPORTANCIA:** Esta e a skill mais critica do processo. Se o ee-s2-posicionamento for generico, TUDO que vier depois sera generico. Se for afiado e verdadeiro, toda a producao ganha forca.

## Setup

1. Leia `briefing.json` — extraia: NOME_CLIENTE, SEGMENTO, PRODUTO_SERVICO, marca_valores
2. Leia `ee-s1-persona-icp.json` — extraia: RESUMO_ICP, dores, desejos, linguagem, Jobs-to-be-Done
3. Leia `ee-s2-pesquisa-mercado.json` — extraia: DIFERENCIAIS_REAIS, POSICIONAMENTOS_CONCORRENTES, mapa_competitivo, oportunidade_inexplorada
4. Leia `ee-s1-swot.json` — extraia: RESUMO_SWOT (forcas + oportunidades prioritarias)

Apresente ao operador um resumo dos inputs carregados:

```
INPUTS PARA POSICIONAMENTO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ICP: {resumo_em_1_frase}
Dor principal: {dor_principal_do_ICP}
Diferenciais reais: {lista_curta}
Forcas SWOT: {top_2_forcas}
Concorrentes e seus ee-s2-posicionamentos:
  - {concorrente_1}: {ee-s2-posicionamento}
  - {concorrente_2}: {ee-s2-posicionamento}
  - {concorrente_3}: {ee-s2-posicionamento}
Espaco vazio no mapa competitivo: {espaco_identificado}
Oportunidade inexplorada: {oportunidade}
```

Se algum input critico estiver faltando, alerte o operador e sugira completar a dependencia primeiro.

---

## Checkpoint 1 — Validar inputs e direcao

Antes de gerar qualquer ee-s2-posicionamento, confirme com o operador a direcao estrategica.

Pergunte:

> Antes de comecarmos, preciso alinhar a direcao. Olhando os dados:
>
> 1. **Diferencial mais forte que voce sente no dia a dia** — dos que mapeamos, qual voce vive na pratica? Qual o cliente elogia mais?
>
> 2. **Onde voce quer estar no mapa competitivo?** O espaco vazio identificado foi {espaco}. Faz sentido como direcao ou voce prefere disputar outro territorio?
>
> 3. **Restricao de ee-s2-posicionamento:** Existe algo que o cliente NAO quer ser associado? (ex: "nao quero ser visto como barato", "nao quero ser comparado com X")
>
> 4. **Tom de comunicacao:** Mais tecnico/profissional, mais proximo/informal, ou mais aspiracional/premium?

**So avance apos o operador responder. As respostas aqui mudam TUDO que vem depois.**

---

## Checkpoint 2 — Mapa de ee-s2-posicionamento competitivo + 3 opcoes de PUV

Com base nos inputs e nas respostas do checkpoint 1, gere o mapa de ee-s2-posicionamento e 3 opcoes de direcao.

### Mapa de ee-s2-posicionamento 2x2

```
MAPA DE POSICIONAMENTO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Eixo X: {eixo_escolhido} (ex: Generalista → Especialista)
Eixo Y: {eixo_escolhido} (ex: Acessivel → Premium)

                    {EIXO Y+}
                       |
  {Concorrente A}      |      {Concorrente B}
                       |
  {EIXO X-} ──────────┼──────────── {EIXO X+}
                       |
  {Concorrente C}      |   ★ {NOME_CLIENTE}
                       |      (posicao recomendada)
                    {EIXO Y-}

Justificativa da posicao recomendada:
{por_que_este_quadrante_e_a_melhor_opcao}
```

### 3 Declaracoes de ee-s2-posicionamento

Gere 3 opcoes usando o formato classico:

> "Para **[ICP]**, **{NOME_CLIENTE}** e o **[categoria]** que **[beneficio principal]** porque **[razao para acreditar]**."

```
OPCAO A — {nome_da_direcao} (ex: "O Especialista")
"Para [ICP], {NOME_CLIENTE} e o [categoria] que [beneficio] porque [razao]."
Aposta: {o_que_esta_opcao_prioriza}
Risco: {onde_pode_falhar}

OPCAO B — {nome_da_direcao} (ex: "O Parceiro de Crescimento")
"Para [ICP], {NOME_CLIENTE} e o [categoria] que [beneficio] porque [razao]."
Aposta: {o_que_esta_opcao_prioriza}
Risco: {onde_pode_falhar}

OPCAO C — {nome_da_direcao} (ex: "O Resultado Garantido")
"Para [ICP], {NOME_CLIENTE} e o [categoria] que [beneficio] porque [razao]."
Aposta: {o_que_esta_opcao_prioriza}
Risco: {onde_pode_falhar}

RECOMENDACAO: Opcao {X}
Motivo: {justificativa_baseada_nos_dados}
```

Pergunte ao operador:

> Qual direcao faz mais sentido para {NOME_CLIENTE}? Pode ser uma das 3, um mix, ou nenhuma — me diz o que sentiu e eu refino.

**O operador ESCOLHE a direcao. So avance apos escolha explicita.**

---

## Checkpoint 3 — PUV final + Canvas de Posicionamento (4Ps)

Com a direcao escolhida pelo operador, gere a PUV final e o canvas completo.

Consulte `references/exemplos-puv.md` e `references/canvas-4p-guide.md` para garantir qualidade.

### PUV (Proposta Unica de Valor)

```
PUV — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━

"{PUV_em_1_frase}"

Teste de qualidade:
  [x] E verdadeira? (baseada em diferencial real, nao aspiracional)
  [x] E especifica? (nao serve para nenhum concorrente)
  [x] E relevante? (resolve a dor principal do ICP)
  [x] E memoravel? (o ICP consegue repetir para alguem)
  [x] E diferente? (nenhum concorrente diz isso)
```

### Canvas de Posicionamento (4Ps Estrategico)

```
CANVAS DE POSICIONAMENTO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUTO
  O que entregamos de verdade (alem das features):
    {transformacao_que_o_cliente_vive}
  Qual transformacao o cliente vive:
    {antes_e_depois_concreto}
  O que NAO entregamos (delimitacao honesta):
    {limitacoes_claras}

PRECO
  Posicionamento: {premium / mid-market / value}
  Justificativa na comunicacao:
    {como_comunicar_o_preco_sem_ser_sobre_preco}
  Estrategia de ancoragem:
    {se_aplicavel_como_ancorar_o_valor_percebido}

PRACA (CANAIS)
  Canal principal de aquisicao: {canal}
  Justificativa: {por_que_este_canal_para_este_ICP}
  Canal de suporte: {canal_secundario}
  Canais a evitar:
    - {canal_a_evitar_1} — Motivo: {motivo}
    - {canal_a_evitar_2} — Motivo: {motivo}

PROMOCAO
  Tom e estilo de comunicacao: {descricao_do_tom}
  Mensagem de entrada no funil (topo):
    "{mensagem_topo_funil}"
  Mensagem de conversao (fundo):
    "{mensagem_fundo_funil}"
```

Pergunte ao operador:

> O canvas esta alinhado com a realidade do cliente? Algum P que precisa de ajuste? Especialmente:
> - O que "nao entregamos" esta honesto?
> - O tom de comunicacao soa como o cliente falaria?
> - Os canais a evitar fazem sentido?

**So avance apos aprovacao do operador.**

---

## Checkpoint 4 — Territorio de marca + taglines

Com o ee-s2-posicionamento e canvas validados, defina o territorio de marca e crie opcoes de tagline.

Consulte `references/territorio-de-marca.md` para garantir que o territorio escolhido esta disponivel.

### Territorio de marca

```
TERRITORIO DE MARCA — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Em 3 palavras: {palavra_1} + {palavra_2} + {palavra_3}

O que isso significa:
  {NOME_CLIENTE} quer ser lembrado como {descricao_do_territorio}.
  Quando o ICP pensar em {situacao}, deve pensar em {NOME_CLIENTE}.

Territorios ja ocupados pelos concorrentes:
  - {concorrente_1}: {territorio_deles}
  - {concorrente_2}: {territorio_deles}
  - {concorrente_3}: {territorio_deles}

Por que {territorio_do_cliente} esta disponivel:
  {justificativa}
```

### 3 opcoes de tagline

```
TAGLINES — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━

OPCAO 1: "{tagline_1}"
  Tom: {descricao_do_tom}
  Justificativa: {por_que_funciona}
  Melhor uso: {onde_usar — site, assinatura, anuncios}

OPCAO 2: "{tagline_2}"
  Tom: {descricao_do_tom}
  Justificativa: {por_que_funciona}
  Melhor uso: {onde_usar}

OPCAO 3: "{tagline_3}"
  Tom: {descricao_do_tom}
  Justificativa: {por_que_funciona}
  Melhor uso: {onde_usar}

RECOMENDACAO: Opcao {X}
Motivo: {justificativa}
```

Pergunte ao operador:

> Qual tagline conecta mais? Pode ser uma das 3 ou uma mistura. Se nenhuma acertou, me diz o que faltou que eu gero novas opcoes.
>
> Tambem valide o territorio de marca: as 3 palavras representam como {NOME_CLIENTE} quer ser percebido?

**O operador ESCOLHE a tagline e valida o territorio. So avance apos escolha explicita.**

---

## Checkpoint 5 — Revisao final integrada

Apresente tudo junto para revisao final antes de salvar:

```
POSICIONAMENTO COMPLETO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DECLARACAO DE POSICIONAMENTO:
"{declaracao_escolhida}"

PUV:
"{puv_final}"

CANVAS 4P:
  Produto: {resumo_1_frase}
  Preco: {ee-s2-posicionamento}
  Praca: {canal_principal}
  Promocao: {tom_em_2_palavras}

TERRITORIO: {3_palavras}

TAGLINE: "{tagline_escolhida}"

MENSAGEM TOPO DE FUNIL:
"{mensagem_topo}"

MENSAGEM FUNDO DE FUNIL:
"{mensagem_fundo}"
```

Pergunte:

> Este e o ee-s2-posicionamento que vai guiar TUDO da Semana 3: ee-s3-brandbook, landing page, criativos, copy de anuncios. Esta consistente e aprovado?
>
> Se tiver qualquer ajuste, agora e a hora. Depois de salvar, qualquer mudanca aqui impacta tudo que ja foi produzido.

**So salve apos aprovacao EXPLICITA do operador.**

---

## Finalizacao

Apos aprovacao final:

1. **Salve o JSON estruturado** em `clientes/{cliente}/ee-s2-posicionamento.json` seguindo o schema
2. **Atualize state.json** — marque `ee-s2-posicionamento` como `completed`
3. **Appende em decisions.jsonl** as decisoes de cada checkpoint (direcao escolhida, PUV, tagline)
4. **Apresente o resumo final:**

```
POSICIONAMENTO CONCLUIDO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PUV: "{puv_final}"
Tagline: "{tagline_final}"
Territorio: {3_palavras}
Tom: {descricao_curta}

Este ee-s2-posicionamento sera usado por:
  - /ee-s3-brandbook → manual de copy e tom de voz
  - /ee-s3-landing-page → copy e estrutura da pagina
  - /ee-s3-copy-anuncios → mensagens de anuncio por funil
  - /ee-s3-criativos-anuncios → briefing criativo
  - /ee-s3-identidade-visual → direcionamento de design

Proximo passo recomendado: /ee-s2-diagnostico-midia ou /ee-s2-diagnostico-criativos
(Skills que podem rodar em paralelo)
```

Pergunte: "Quer seguir para qual skill agora?"

---
name: ee-s4-cliente-oculto
description: "Simulacao de cliente oculto: cria perfil de comprador ficticio, operador executa no canal real, IA analisa a conversa e gera relatorio com nota 0-10. Use quando o operador disser 'cliente oculto', 'mystery shopping', 'testar atendimento', 'simular compra', ou apos o diagnostico comercial."
dependencies:
  - ee-s4-diagnostico-comercial
outputs: ["ee-s4-cliente-oculto.json"]
week: 4
estimated_time: "1.5h"
---

# Cliente Oculto IA

Voce e um especialista em avaliacao de experiencia de compra e mystery shopping. Vai criar um cenario de simulacao realista para testar o atendimento comercial do cliente e, apos a execucao pelo operador, analisar a conversa gerando um relatorio detalhado com nota e recomendacoes.

> **IMPORTANCIA:** Este teste revela a realidade do atendimento — nao o que o cliente diz que faz, mas o que realmente acontece. O resultado alimenta diretamente os scripts do SDR IA e a configuracao do Patagon.

## Setup

1. Leia `client.json` (seção `briefing`) do cliente — extraia: NOME_CLIENTE, PRODUTO_SERVICO, CANAL_CONTATO
2. Leia `ee-s1-persona-icp.json` — extraia: RESUMO_ICP, perfil demografico, comportamento de compra
3. Leia `ee-s4-diagnostico-comercial.json` — extraia: objecoes mapeadas, gargalos do funil, SLA definido
4. Se houver `client.json` (seção `connectors`), verifique dados adicionais de canais

Antes de iniciar, confirme com o operador:

> Vamos criar e executar um cliente oculto para {NOME_CLIENTE}.
> Canal de contato principal: {CANAL — WhatsApp / formulario / email / Instagram DM}
> Esse canal esta correto? O contato sera feito nesse canal ou em outro?
> IMPORTANTE: o operador (voce) vai precisar executar a simulacao manualmente no canal real. Eu vou criar o roteiro e depois analisar a conversa.

---

## CHECKPOINT 1: Perfil do Comprador Simulado + Script da Simulacao

**Objetivo:** Criar um perfil de comprador ficticio tao realista que o time de vendas nao perceba que e um teste. O perfil deve espelhar o ICP real do cliente.

Com base no ICP e no diagnostico comercial, gere:

```
PERFIL DO COMPRADOR SIMULADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome ficticio: {nome_comum_para_o_perfil}
Contexto: {situacao_que_justifica_o_interesse — deve ser plausivel e especifica}
  Ex: "Dono de uma academia de bairro que abriu ha 6 meses, esta com dificuldade
  de atrair alunos novos e ouviu falar do servico pelo Instagram."

Urgencia: {alta/media/baixa} — {motivo_da_urgencia}
  Ex: "Media — quer resolver nos proximos 30 dias, mas nao e emergencia."

Budget declarado: {quanto vai mencionar se perguntado}
  Ex: "Nao menciona valor espontaneamente. Se perguntado, diz que tem
  entre R$2.000 e R$3.000/mes para investir."

Objecao principal que vai surgir: {objecao — alinhada com o diagnostico}
  Ex: "Vai questionar o preco quando chegar na proposta: 'Achei caro,
  o outro orcamento que peguei era metade disso.'"

Nivel de conhecimento do produto: {baixo/medio/alto}
  Ex: "Medio — sabe que precisa de marketing digital mas nao entende
  as diferencas entre os servicos."
```

```
SCRIPT DA SIMULACAO
━━━━━━━━━━━━━━━━━━━

MENSAGEM DE ABERTURA (como o ICP real enviaria):
  "{mensagem_natural_que_um_lead_real_enviaria}"
  Ex: "Oi, boa tarde! Vi o Instagram de voces e queria saber mais sobre
  o servico de marketing pra academia. Como funciona?"

MENSAGENS DE ACOMPANHAMENTO (se nao houver resposta):
  Apos 30 minutos:
    "{mensagem_gentil_de_follow_up}"
    Ex: "Oi, consegui falar com alguem? To querendo resolver essa parte
    do marketing logo."
  Apos 2 horas:
    "{mensagem_mais_direta}"
    Ex: "Pessoal, mandei mensagem mais cedo sobre marketing pra academia.
    Voces atendem esse tipo de empresa?"

PERGUNTAS PARA FAZER AO LONGO DA CONVERSA:
  1. {pergunta_para_testar_conhecimento_do_produto}
     Objetivo: avaliar se o atendente conhece o que vende
     Ex: "Qual a diferenca entre o plano basico e o completo?"

  2. {pergunta_para_testar_objecao_de_preco}
     Objetivo: avaliar como lidam com objecao de preco
     Ex: "Achei um pouco acima do que eu esperava. Tem como fazer um valor menor?"

  3. {pergunta_para_testar_urgencia_e_follow_up}
     Objetivo: avaliar se tentam criar urgencia e se fazem follow-up
     Ex: "Vou pensar e te dou um retorno semana que vem, ok?"

  4. {pergunta_para_testar_personalizacao}
     Objetivo: avaliar se adaptam a abordagem ao contexto do lead
     Ex: "Mas voces ja atenderam alguma academia? Meu caso e bem especifico."

COMPORTAMENTO DO COMPRADOR SIMULADO:
  - Responder com atraso de {5-15} minutos (simular lead real)
  - Nao demonstrar entusiasmo excessivo (lead real e cauteloso)
  - Fazer a objecao de preco quando chegar a proposta de valor
  - No final, dizer que "vai pensar" para testar o follow-up
  - Se o atendimento for muito bom, pode demonstrar mais interesse
```

Consulte `references/criterios-avaliacao-ee-s4-cliente-oculto.md` para os criterios que serao usados na avaliacao.

Apresente o perfil e script ao operador.

Pergunte:

> O perfil parece realista para o tipo de lead que {NOME_CLIENTE} recebe?
> A objecao principal faz sentido com o diagnostico que fizemos?
> O canal de contato ({CANAL}) esta correto?
> Algum ajuste antes de voce executar a simulacao?

**Criterio de aprovacao:** Operador valida que o perfil e roteiro sao realistas e o time nao vai perceber que e teste.

---

## CHECKPOINT 2: Execucao da Simulacao (Operador Executa)

**Objetivo:** O operador executa a simulacao no canal real e documenta a conversa.

> **ATENCAO: Esta etapa e MANUAL.** Voce (operador) vai executar a simulacao seguindo o roteiro que criamos. Eu nao consigo enviar mensagens pelo WhatsApp ou canal do cliente.
>
> **Instrucoes:**
> 1. Use um numero de telefone/conta que NAO esteja associado a V4 ou ao seu nome
> 2. Siga o roteiro, mas adapte naturalmente (nao soe robotico)
> 3. Anote os tempos exatos de cada resposta
> 4. Documente TODA a conversa (print ou copia)
> 5. NAO revele que e um teste, mesmo se o atendimento for pessimo
> 6. Se pedirem dados sensiveis (CPF, endereco), invente dados ficticios
>
> Quando terminar, cole aqui o historico completo da conversa incluindo os horarios de cada mensagem.
>
> Pronto para executar?

Aguarde o operador executar e colar o historico da conversa.

Se o operador colar a conversa, prossiga para o Checkpoint 3.

Se o operador tiver dificuldades:
- "Nao tenho numero alternativo" → Sugira usar numero pessoal ou chip pre-pago
- "O canal e formulario, nao WhatsApp" → Adapte o script para email/formulario
- "O cliente nao respondeu em 24h" → Isso ja e um dado valioso para o relatorio

**Criterio de aprovacao:** Operador confirma que a simulacao foi executada e cola o historico da conversa.

---

## CHECKPOINT 3: Analise da Conversa e Relatorio

**Objetivo:** Analisar a conversa completa e gerar um relatorio com nota 0-10, pontos fortes, pontos criticos e impacto esperado do SDR IA.

Consulte `references/criterios-avaliacao-ee-s4-cliente-oculto.md` para aplicar os criterios de avaliacao.

Analise a conversa e gere o relatorio:

```
RELATORIO DE CLIENTE OCULTO — {NOME_CLIENTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data da simulacao: {data}
Canal testado: {canal}
Atendente(s): {nome_se_identificou ou "nao se identificou"}

NOTA GERAL: {X}/10
Classificacao: {EXCELENTE (9-10) / BOM (7-8) / REGULAR (5-6) / RUIM (3-4) / CRITICO (0-2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITERIO 1: Tempo de Primeira Resposta
  Meta: < 5 minutos
  Resultado: {tempo_real}
  Nota: {0-10}
  Evidencia: "{trecho_da_conversa_com_horarios}"

CRITERIO 2: Qualidade da Abordagem Inicial
  Nota: {0-10}
  Observacao: {personalizada ou generica? Se apresentou? Fez pergunta?}
  Evidencia: "{trecho_da_conversa}"

CRITERIO 3: Identificacao de Necessidade
  Nota: {0-10}
  Observacao: {fizeram perguntas ou so apresentaram o produto?}
  Evidencia: "{trecho_da_conversa}"

CRITERIO 4: Conhecimento do Produto
  Nota: {0-10}
  Observacao: {sabia responder sobre o produto? Com seguranca?}
  Evidencia: "{trecho_da_conversa}"

CRITERIO 5: Tratamento de Objecao de Preco
  Nota: {0-10}
  Observacao: {como reagiu? Demonstrou valor? Ou so deu desconto?}
  Evidencia: "{trecho_da_conversa}"

CRITERIO 6: CTA e Tentativa de Avancar o Funil
  Nota: {0-10}
  Observacao: {tentou agendar? Enviar proposta? Ou ficou passivo?}
  Evidencia: "{trecho_da_conversa}"

CRITERIO 7: Follow-up Apos Conversa
  Nota: {0-10}
  Observacao: {houve follow-up? Quanto tempo depois? Qual abordagem?}
  Evidencia: "{trecho_ou_ausencia_de_follow_up}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PONTOS FORTES:
  1. {ponto_forte_com_evidencia}
  2. {ponto_forte_com_evidencia}
  [...]

PONTOS CRITICOS DE MELHORIA (em ordem de impacto):
  1. {ponto_critico_principal}
     Impacto: {estimativa_de_quantos_leads_perde_por_isso}
     Como o SDR IA vai resolver: {acao_especifica}

  2. {ponto_critico_secundario}
     Impacto: {estimativa}
     Como o SDR IA vai resolver: {acao_especifica}

  3. {ponto_critico_terciario}
     Impacto: {estimativa}
     Como o SDR IA vai resolver: {acao_especifica}

IMPACTO ESTIMADO DO SDR IA:
  Se os 3 pontos criticos acima forem resolvidos pelo SDR IA:
  - Tempo de resposta: de {atual} para < 5 segundos
  - Taxa de contato estimada: de {atual}% para {projecao}%
  - Taxa de qualificacao estimada: de {atual}% para {projecao}%
  - Impacto financeiro estimado: +R${valor}/mes em leads nao perdidos
```

Pergunte ao operador:

> O relatorio reflete fielmente o que voce observou durante a simulacao?
> Algum detalhe que eu interpretei errado?
> Os pontos criticos estao na ordem certa de impacto?
> Quer que eu ajuste alguma recomendacao?

**Criterio de aprovacao:** Operador valida que o relatorio e preciso e os pontos criticos estao corretos.

---

## Finalizacao

Apos os 3 checkpoints aprovados:

1. **Salve o JSON estruturado** em `clientes/{slug}/semana-4/ee-s4-cliente-oculto.json` seguindo o schema.json da skill
2. **Registre a decisao** — appende em `client.json` (seção `history`):
   ```json
   {"ts":"[ISO]","skill":"ee-s4-cliente-oculto","checkpoint":3,"decision":"Cliente oculto executado. Nota geral: [X]/10. Pontos criticos: [lista]. Impacto SDR IA estimado: +R$[valor]/mes."}
   ```
3. **Atualize client.json (progress)** — marque `ee-s4-cliente-oculto` como `completed`
4. **Informe proximos passos:**
   - "Cliente oculto concluido. Os pontos criticos identificados vao ser resolvidos nos scripts do SDR IA."
   - Sugira a proxima skill: `/ee-s5-scripts-sdr` (para criar os scripts que corrigem os problemas encontrados)

**NOTA PARA O OPERADOR:** Se quiser, o relatorio de cliente oculto pode ser compartilhado com o cliente como evidencia do valor do SDR IA. O contraste "antes vs depois" e muito poderoso para justificar o investimento.

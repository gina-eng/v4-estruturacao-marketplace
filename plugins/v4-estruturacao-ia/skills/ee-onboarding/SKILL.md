---
name: ee-onboarding
description: "Setup inicial da workspace de estruturação IA. Configura diretórios, credenciais, e ensina o operador a usar o sistema. Use quando o operador disser /ee-onboarding ou 'configurar workspace' ou 'primeiro uso'."
---

# Onboarding — Setup da Workspace

Você está configurando a workspace de estruturação IA para um novo operador. Siga cada etapa em ordem, confirmando o resultado antes de avançar.

## Pré-requisitos

Verifique se o operador tem as ferramentas necessárias. Rode os comandos abaixo e reporte o status de cada um:

| Ferramenta | Comando de verificação | Se não tiver |
|---|---|---|
| Claude Code | Já está rodando (é onde estamos) | — |
| GOG CLI | `gog --version` | `npm install -g @nicecode/gog` |
| Vercel CLI | `vercel --version` | `npm install -g vercel` |
| jq | `jq --version` | Mac: `brew install jq` / Linux: `apt install jq` / Windows: `choco install jq` |

Se alguma ferramenta estiver faltando, instrua a instalação e aguarde confirmação antes de prosseguir. Se o operador não precisar de deploy (Vercel) ou integração Google (GOG) no momento, registre como pendente mas continue.

## Etapa 1: Criar estrutura de diretórios

No diretório atual do operador, crie:

```
.credentials/
  clients.json       ← inicializar com {}
clientes/
dashboard-geral.html ← arquivo vazio por enquanto
.gitignore
```

Conteúdo do `.gitignore`:
```
.credentials/
clientes/*/v4mos-cache.json
dashboard-geral.html
*.tmp
```

Após criar, confirme ao operador:

```
Estrutura criada:
  .credentials/clients.json  ← credenciais V4MOS (privado, no .gitignore)
  clientes/                  ← pasta de clientes (cada cliente terá sua subpasta)
  dashboard-geral.html       ← dashboard de progresso geral
  .gitignore                 ← protege credenciais e caches
```

## Etapa 2: Configurar credenciais V4MOS

Pergunte ao operador:

> Você já tem um Service Account no V4MOS para algum cliente?

**Se sim:**
1. Peça: `client_id`, `client_secret`, `workspace_id` e nome do cliente
2. Salve em `.credentials/clients.json`:

```json
{
  "ws-abc123": {
    "client_id": "xxx",
    "client_secret": "yyy",
    "client_name": "Nome do Cliente"
  }
}
```

Pode haver múltiplos workspaces no mesmo arquivo. Cada chave é um `workspace_id`.

**Se não:**
Explique o passo a passo:

> Para integrar com o V4MOS, você precisa de um Service Account:
> 1. Acesse V4MOS > Settings > Data API
> 2. Clique em "Create Service Account"
> 3. Copie o client_id e client_secret gerados
> 4. Anote o workspace_id (aparece na URL: v4.marketing/workspaces/{workspace_id})
>
> Quando tiver, me diz que eu configuro. Ou podemos pular por agora e configurar quando cadastrar o primeiro cliente.

Se o operador quiser pular, registre que a configuração ficou pendente e siga para a próxima etapa.

## Etapa 3: Tutorial rápido

Apresente ao operador o guia de uso diário:

```
COMO USAR O SISTEMA DE ESTRUTURAÇÃO IA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comandos principais:
  /ee-novo-cliente      → Cadastrar um novo cliente (cria pasta, briefing, etc.)
  ee-continuar          → Retomar trabalho (mostra panorama de clientes + próximo passo)
  /ee-duvida [pergunta] → Tirar dúvida sobre o sistema
  /ee-feedback          → Reportar problema ou sugerir melhoria

Fluxo de trabalho:
  1. Cadastre o cliente com /ee-novo-cliente
  2. O sistema guia semana a semana (diagnóstico → pesquisa → produção → vendas)
  3. Cada skill tem checkpoints — você valida antes de avançar
  4. Entregáveis são gerados como HTML (deploy Vercel) ou Google Sheets

Progresso:
  Abra clientes/{nome}/dashboard.html no browser para ver progresso do cliente
  Abra dashboard-geral.html para ver todos os clientes

Semanas do processo:
  Semana 1 — Diagnóstico (maturidade, SWOT, ICP, auditoria)
  Semana 2 — Pesquisa e Posicionamento (mercado, PUV, mídia, criativos, CRO)
  Semana 3 — Produção (identidade, ee-s3-brandbook, landing page, copy, CRM, forecast)
  Semana 4-5 — Vendas (diagnóstico comercial, cliente oculto, scripts, SDR IA)
```

## Etapa 4: Teste de conexão

Se o operador configurou credenciais na Etapa 2:

1. Crie um diretório temporário: `clientes/_teste/`
2. Crie um `state.json` mínimo com o workspace_id informado:
   ```json
   {
     "client": "_teste",
     "workspace_id": "ws-xxx",
     "started_at": "2026-01-01",
     "current_week": 0,
     "skills": {}
   }
   ```
3. Rode: `bash scripts/v4mos_fetch.sh clientes/_teste/`
4. Verifique o resultado:
   - Se gerou `v4mos-cache.json` com dados: "Conexão com V4MOS funcionando."
   - Se deu erro de autenticação: debug da credencial (client_id/secret errados?)
   - Se deu erro de rede: verificar URL base e conectividade
5. Remova o diretório de teste: `rm -rf clientes/_teste/`

Se o operador não configurou credenciais, pule esta etapa e avise:

> Teste de conexão pulado (sem credenciais configuradas). Quando cadastrar o primeiro cliente com workspace V4MOS, o sistema vai pedir.

## Finalização

Apresente a mensagem final:

```
Workspace configurada com sucesso!

Próximo passo: cadastre seu primeiro cliente com /ee-novo-cliente

Se tiver dúvidas a qualquer momento, diga /ee-duvida [sua pergunta].
```

Pergunte: "Quer cadastrar o primeiro cliente agora?"

Se sim, inicie a skill `/ee-novo-cliente`.
Se não, encerre normalmente.

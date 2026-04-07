#!/bin/bash
# v4mos_fetch.sh — Fetch client data from V4MOS API
# Usage: ./v4mos_fetch.sh <client_dir>
# Reads credentials from .credentials/clients.json
# Saves cache to <client_dir>/v4mos-cache.json
#
# Environment variables (override defaults):
#   V4MOS_API_URL          — Core V4 Marketing API (workspaces, diagnoses)
#   V4MOS_INTEGRATION_URL  — Integration Hub API (integrations, OAuth)
#
# IMPORTANT: You must set these URLs correctly for your environment.
# The defaults below are placeholders — ask your V4 team for production URLs.

set -euo pipefail

CLIENT_DIR="$1"

# Find credentials file (search up from client dir)
CREDENTIALS_FILE=""
SEARCH_DIR="$CLIENT_DIR"
for i in 1 2 3 4 5; do
  SEARCH_DIR="$(dirname "$SEARCH_DIR")"
  if [ -f "$SEARCH_DIR/.credentials/clients.json" ]; then
    CREDENTIALS_FILE="$SEARCH_DIR/.credentials/clients.json"
    break
  fi
done

if [ -z "$CREDENTIALS_FILE" ]; then
  echo "ERROR: .credentials/clients.json not found (searched up from $CLIENT_DIR)"
  exit 1
fi

# Extract workspace info from state.json
if [ ! -f "$CLIENT_DIR/state.json" ]; then
  echo "ERROR: state.json not found in $CLIENT_DIR"
  exit 1
fi

CLIENT_NAME=$(jq -r '.client' "$CLIENT_DIR/state.json")
WORKSPACE_ID=$(jq -r '.workspace_id' "$CLIENT_DIR/state.json")

if [ "$WORKSPACE_ID" = "null" ] || [ -z "$WORKSPACE_ID" ]; then
  echo "ERROR: No workspace_id in state.json"
  exit 1
fi

# Find credentials for this workspace
CLIENT_ID=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_id // empty' "$CREDENTIALS_FILE")
CLIENT_SECRET=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_secret // empty' "$CREDENTIALS_FILE")

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "ERROR: No credentials found for workspace $WORKSPACE_ID in $CREDENTIALS_FILE"
  echo ""
  echo "To fix: add credentials to .credentials/clients.json:"
  echo "  {"
  echo "    \"$WORKSPACE_ID\": {"
  echo "      \"client_id\": \"your-client-id\","
  echo "      \"client_secret\": \"your-client-secret\","
  echo "      \"client_name\": \"$CLIENT_NAME\""
  echo "    }"
  echo "  }"
  echo ""
  echo "Get these from V4MOS > Settings > Data API"
  exit 1
fi

# API URLs — MUST be configured for your environment
# Ask your V4 team for the correct production URLs
V4MOS_API_URL="${V4MOS_API_URL:-https://api.data.v4.marketing}"

echo "Fetching V4MOS data for: $CLIENT_NAME (workspace: $WORKSPACE_ID)"
echo "API URL: $V4MOS_API_URL"
echo ""

# Helper function for API calls with error handling
fetch_endpoint() {
  local endpoint="$1"
  local label="$2"
  local url="$V4MOS_API_URL$endpoint"

  local response
  local http_code

  # Capture both body and HTTP status code
  response=$(curl -s -w "\n%{http_code}" \
    -H "x-client-id: $CLIENT_ID" \
    -H "x-client-secret: $CLIENT_SECRET" \
    -H "x-workspace-id: $WORKSPACE_ID" \
    -H "Content-Type: application/json" \
    "$url" 2>/dev/null)

  http_code=$(echo "$response" | tail -1)
  local body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "  ✅ $label (HTTP $http_code)"
    echo "$body"
  elif [ "$http_code" = "401" ] || [ "$http_code" = "403" ]; then
    echo "  ❌ $label (HTTP $http_code) — credenciais inválidas ou sem permissão"
    echo "null"
  elif [ "$http_code" = "404" ]; then
    echo "  ⚠️  $label (HTTP $http_code) — endpoint não encontrado ou sem dados"
    echo "null"
  else
    echo "  ❌ $label (HTTP $http_code) — erro inesperado"
    echo "null"
  fi
}

# Fetch each data type
echo "Buscando dados..."
WORKSPACE=$(fetch_endpoint "/workspaces/$WORKSPACE_ID" "Workspace")
DIAGNOSES=$(fetch_endpoint "/workspaces/$WORKSPACE_ID/diagnoses" "Diagnoses")
INTEGRATIONS=$(fetch_endpoint "/workspaces/$WORKSPACE_ID/integrations/status" "Integrations")

echo ""

# Compose cache (use "null" for failed fetches, not broken JSON)
WORKSPACE_JSON=$(echo "$WORKSPACE" | tail -1)
DIAGNOSES_JSON=$(echo "$DIAGNOSES" | tail -1)
INTEGRATIONS_JSON=$(echo "$INTEGRATIONS" | tail -1)

# Validate JSON before composing
for var_name in WORKSPACE_JSON DIAGNOSES_JSON INTEGRATIONS_JSON; do
  val="${!var_name}"
  if ! echo "$val" | jq . > /dev/null 2>&1; then
    eval "$var_name=null"
  fi
done

jq -n \
  --argjson workspace "$WORKSPACE_JSON" \
  --argjson diagnoses "$DIAGNOSES_JSON" \
  --argjson integrations "$INTEGRATIONS_JSON" \
  --arg fetched_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --arg api_url "$V4MOS_API_URL" \
  '{
    fetched_at: $fetched_at,
    api_url: $api_url,
    workspace: $workspace,
    diagnoses: $diagnoses,
    integrations: $integrations
  }' > "$CLIENT_DIR/v4mos-cache.json"

echo "Cache salvo em: $CLIENT_DIR/v4mos-cache.json"

# Summary
echo ""
echo "Resumo:"
[ "$WORKSPACE_JSON" != "null" ] && echo "  ✅ Dados do workspace obtidos" || echo "  ⚠️  Workspace: sem dados (verifique URL e credenciais)"
[ "$DIAGNOSES_JSON" != "null" ] && echo "  ✅ Diagnósticos obtidos" || echo "  ⚠️  Diagnósticos: sem dados"
[ "$INTEGRATIONS_JSON" != "null" ] && echo "  ✅ Integrações obtidas" || echo "  ⚠️  Integrações: sem dados"

# If everything is null, warn about possible wrong URL
if [ "$WORKSPACE_JSON" = "null" ] && [ "$DIAGNOSES_JSON" = "null" ] && [ "$INTEGRATIONS_JSON" = "null" ]; then
  echo ""
  echo "⚠️  TODOS os endpoints retornaram erro."
  echo "Possíveis causas:"
  echo "  1. URL da API incorreta (atual: $V4MOS_API_URL)"
  echo "  2. Credenciais inválidas (client_id/secret errados)"
  echo "  3. Workspace_id não existe"
  echo ""
  echo "Para testar manualmente:"
  echo "  curl -H 'x-client-id: $CLIENT_ID' -H 'x-client-secret: $CLIENT_SECRET' -H 'x-workspace-id: $WORKSPACE_ID' $V4MOS_API_URL/workspaces/$WORKSPACE_ID"
fi

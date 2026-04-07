#!/bin/bash
# v4mos_fetch.sh — Fetch connector/integration data from V4MOS Data API
# Usage: ./v4mos_fetch.sh <client_dir>
#
# What this does:
#   Pulls data from connected platforms (Meta Ads, Google Ads, etc.)
#   via the V4MOS Data API. This is MEDIA/CONNECTOR data only —
#   workspace info, diagnoses, and marketing profiles are NOT available
#   via this API and must be collected manually in the briefing.
#
# Reads credentials from .credentials/clients.json
# Saves cache to <client_dir>/v4mos-cache.json

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
  echo "ERROR: .credentials/clients.json not found"
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
  echo "SKIP: No workspace_id — client has no V4MOS integration"
  echo '{"fetched_at":null,"has_v4mos":false,"integrations":null}' > "$CLIENT_DIR/v4mos-cache.json"
  exit 0
fi

# Find credentials
CLIENT_ID=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_id // empty' "$CREDENTIALS_FILE")
CLIENT_SECRET=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_secret // empty' "$CREDENTIALS_FILE")

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "ERROR: No credentials for workspace $WORKSPACE_ID"
  echo "Add to .credentials/clients.json → Settings > Data API no V4MOS"
  exit 1
fi

V4MOS_API_URL="${V4MOS_API_URL:-https://api.data.v4.marketing}"

echo "Fetching V4MOS connector data: $CLIENT_NAME"
echo "API: $V4MOS_API_URL | Workspace: $WORKSPACE_ID"
echo ""

# Fetch integrations/connectors status
response=$(curl -s -w "\n%{http_code}" \
  -H "x-client-id: $CLIENT_ID" \
  -H "x-client-secret: $CLIENT_SECRET" \
  -H "x-workspace-id: $WORKSPACE_ID" \
  -H "Content-Type: application/json" \
  "$V4MOS_API_URL/workspaces/$WORKSPACE_ID/integrations/status" 2>/dev/null || echo -e "\n000")

http_code=$(echo "$response" | tail -1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
  echo "✅ Integrações obtidas (HTTP $http_code)"
  INTEGRATIONS="$body"
else
  echo "⚠️  Integrações: HTTP $http_code"
  if [ "$http_code" = "401" ] || [ "$http_code" = "403" ]; then
    echo "   Credenciais inválidas. Verifique client_id/secret em Settings > Data API"
  elif [ "$http_code" = "404" ]; then
    echo "   Endpoint não encontrado. A API pode não suportar este endpoint."
  fi
  INTEGRATIONS="null"
fi

# Save cache
if echo "$INTEGRATIONS" | jq . > /dev/null 2>&1; then
  INTEGRATIONS_SAFE="$INTEGRATIONS"
else
  INTEGRATIONS_SAFE="null"
fi

jq -n \
  --argjson integrations "$INTEGRATIONS_SAFE" \
  --arg fetched_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --arg workspace_id "$WORKSPACE_ID" \
  '{
    fetched_at: $fetched_at,
    has_v4mos: true,
    workspace_id: $workspace_id,
    integrations: $integrations,
    note: "Data API only provides connector/integration data. Workspace details, diagnoses, and marketing profiles are collected in the briefing."
  }' > "$CLIENT_DIR/v4mos-cache.json"

echo ""
echo "Cache: $CLIENT_DIR/v4mos-cache.json"

if [ "$INTEGRATIONS_SAFE" != "null" ]; then
  # Show summary of active integrations
  count=$(echo "$INTEGRATIONS_SAFE" | jq 'if type == "array" then length else 0 end' 2>/dev/null || echo "0")
  echo "Conectores encontrados: $count"
else
  echo ""
  echo "Nenhum dado obtido. Para debug:"
  echo "  curl -H 'x-client-id: $CLIENT_ID' -H 'x-client-secret: ***' -H 'x-workspace-id: $WORKSPACE_ID' $V4MOS_API_URL/workspaces/$WORKSPACE_ID/integrations/status"
fi

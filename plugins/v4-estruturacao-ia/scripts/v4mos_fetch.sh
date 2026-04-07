#!/bin/bash
# v4mos_fetch.sh — Fetch client data from V4MOS API
# Usage: ./v4mos_fetch.sh <client_dir>
# Reads credentials from .credentials/clients.json
# Saves cache to <client_dir>/v4mos-cache.json

set -euo pipefail

CLIENT_DIR="$1"
CREDENTIALS_FILE="$(dirname "$CLIENT_DIR")/../.credentials/clients.json"

if [ ! -f "$CREDENTIALS_FILE" ]; then
  echo "ERROR: .credentials/clients.json not found"
  exit 1
fi

# Extract client name from state.json
CLIENT_NAME=$(jq -r '.client' "$CLIENT_DIR/state.json")
WORKSPACE_ID=$(jq -r '.workspace_id' "$CLIENT_DIR/state.json")

# Find credentials for this workspace
CLIENT_ID=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_id // empty' "$CREDENTIALS_FILE")
CLIENT_SECRET=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_secret // empty' "$CREDENTIALS_FILE")

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "ERROR: No credentials found for workspace $WORKSPACE_ID"
  exit 1
fi

V4MOS_BASE_URL="${V4MOS_BASE_URL:-https://api.v4.marketing}"

# Fetch integrations status
INTEGRATIONS=$(curl -s -H "x-client-id: $CLIENT_ID" \
  -H "x-client-secret: $CLIENT_SECRET" \
  -H "x-workspace-id: $WORKSPACE_ID" \
  "$V4MOS_BASE_URL/workspaces/$WORKSPACE_ID/integrations/status" 2>/dev/null || echo "[]")

# Fetch diagnoses
DIAGNOSES=$(curl -s -H "x-client-id: $CLIENT_ID" \
  -H "x-client-secret: $CLIENT_SECRET" \
  -H "x-workspace-id: $WORKSPACE_ID" \
  "$V4MOS_BASE_URL/workspaces/$WORKSPACE_ID/diagnoses" 2>/dev/null || echo "[]")

# Fetch workspace details
WORKSPACE=$(curl -s -H "x-client-id: $CLIENT_ID" \
  -H "x-client-secret: $CLIENT_SECRET" \
  -H "x-workspace-id: $WORKSPACE_ID" \
  "$V4MOS_BASE_URL/workspaces/$WORKSPACE_ID" 2>/dev/null || echo "{}")

# Compose cache
jq -n \
  --argjson integrations "$INTEGRATIONS" \
  --argjson diagnoses "$DIAGNOSES" \
  --argjson workspace "$WORKSPACE" \
  --arg fetched_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  '{
    fetched_at: $fetched_at,
    workspace: $workspace,
    integrations: $integrations,
    diagnoses: $diagnoses
  }' > "$CLIENT_DIR/v4mos-cache.json"

echo "V4MOS data cached at $CLIENT_DIR/v4mos-cache.json"

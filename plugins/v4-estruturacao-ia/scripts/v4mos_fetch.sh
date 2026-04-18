#!/bin/bash
# v4mos_fetch.sh — Fetch media data from V4MOS Data API
# Usage: ./v4mos_fetch.sh <client_dir> [date_start] [date_end]
#
# Reads:  <client_dir>/client.json (meta.workspace_id, meta.name)
#         .credentials/clients.json (client_id, client_secret)
# Writes: <client_dir>/client.json (connectors section)
#
# API: https://api.data.v4.marketing/v1
# Auth: x-client-id + x-client-secret headers
# workspaceId is a QUERY PARAMETER on every request

set -euo pipefail

CLIENT_DIR="$1"
DATE_START="${2:-$(date -u -v-90d +%Y-%m-%dT00:00:00Z 2>/dev/null || date -u -d '90 days ago' +%Y-%m-%dT00:00:00Z)}"
DATE_END="${3:-$(date -u +%Y-%m-%dT23:59:59Z)}"
CLIENT_JSON="$CLIENT_DIR/client.json"
V4MOS_API="https://api.data.v4.marketing/v1"

if [ ! -f "$CLIENT_JSON" ]; then
  echo "ERROR: client.json não encontrado em $CLIENT_DIR"
  exit 1
fi

CLIENT_NAME=$(jq -r '.meta.name // "Cliente"' "$CLIENT_JSON")
WORKSPACE_ID=$(jq -r '.meta.workspace_id // empty' "$CLIENT_JSON")

if [ -z "$WORKSPACE_ID" ] || [ "$WORKSPACE_ID" = "null" ]; then
  echo "SKIP: workspace_id não definido — cliente sem integração V4MOS"
  exit 0
fi

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
  echo "ERROR: .credentials/clients.json não encontrado"
  exit 1
fi

CLIENT_ID=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_id // empty' "$CREDENTIALS_FILE")
CLIENT_SECRET=$(jq -r --arg ws "$WORKSPACE_ID" '.[$ws].client_secret // empty' "$CREDENTIALS_FILE")

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "ERROR: Credenciais não encontradas para workspace $WORKSPACE_ID"
  exit 1
fi

FETCHED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)
echo "Buscando dados V4MOS: $CLIENT_NAME"
echo "Período: $DATE_START → $DATE_END"
echo ""

# ── Fetch all pages for an endpoint ─────────────────────────────────────────
fetch_all_pages() {
  local endpoint="$1"
  local all_data="[]"
  local page=1
  local has_next="true"

  while [ "$has_next" = "true" ]; do
    local url="${V4MOS_API}/${endpoint}?workspaceId=${WORKSPACE_ID}&createdStart=${DATE_START}&createdEnd=${DATE_END}&limit=500&page=${page}"
    local response
    response=$(curl -s -w "\n%{http_code}" "$url" \
      -H "x-client-id: $CLIENT_ID" \
      -H "x-client-secret: $CLIENT_SECRET" \
      -H "Content-Type: application/json" 2>/dev/null || echo -e "\n000")

    local http_code body
    http_code=$(echo "$response" | tail -1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" != "200" ] && [ "$http_code" != "201" ]; then
      echo "⚠️  $endpoint: HTTP $http_code (página $page)" >&2
      [ "$http_code" = "401" ] && echo "   Credenciais inválidas" >&2
      [ "$http_code" = "400" ] && echo "   Integração não disponível para este workspace" >&2
      echo "null"
      return
    fi

    local page_data meta
    page_data=$(echo "$body" | jq -r '.data // []')
    meta=$(echo "$body" | jq -r '.meta // {}')
    has_next=$(echo "$meta" | jq -r '.hasNextPage // false')

    all_data=$(echo "$all_data $page_data" | jq -s '.[0] + .[1]')
    page=$((page + 1))
    [ "$has_next" = "true" ] && sleep 0.2
  done

  echo "$all_data"
}

# ── Aggregate Google Ads campaigns ──────────────────────────────────────────
echo "→ Google Ads..."
GADS_RAW=$(fetch_all_pages "google/ads/campaigns")

if [ "$GADS_RAW" = "null" ]; then
  GADS_AGGREGATED="null"
else
  GADS_AGGREGATED=$(echo "$GADS_RAW" | python3 << 'PYEOF'
import sys, json

data = json.load(sys.stdin)
campaigns = {}
for r in data:
    name = r.get('campaign_name', 'unknown')
    if name not in campaigns:
        campaigns[name] = {
            'name': name,
            'type': r.get('campaign_advertising_channel_type'),
            'status': r.get('campaign_status'),
            'budget_daily': float(r.get('campaign_budget_amount') or 0),
            'cost': 0, 'clicks': 0, 'impressions': 0, 'conversions': 0
        }
    campaigns[name]['cost'] += float(r.get('metrics_cost') or 0)
    campaigns[name]['clicks'] += int(r.get('metrics_clicks') or 0)
    campaigns[name]['impressions'] += int(r.get('metrics_impressions') or 0)
    campaigns[name]['conversions'] += float(r.get('metrics_conversions') or 0)

for c in campaigns.values():
    c['ctr'] = round(c['clicks']/c['impressions']*100, 2) if c['impressions'] else 0
    c['cost'] = round(c['cost'], 2)
    c['cpa'] = round(c['cost']/c['conversions'], 2) if c['conversions'] else None

total_cost = round(sum(c['cost'] for c in campaigns.values()), 2)
total_conv = round(sum(c['conversions'] for c in campaigns.values()), 1)
total_imp = sum(c['impressions'] for c in campaigns.values())
total_clicks = sum(c['clicks'] for c in campaigns.values())

result = {
    'total_campaigns': len(campaigns),
    'total_cost': total_cost,
    'total_clicks': total_clicks,
    'total_impressions': total_imp,
    'total_conversions': total_conv,
    'avg_cpa': round(total_cost/total_conv, 2) if total_conv else None,
    'avg_ctr': round(total_clicks/total_imp*100, 2) if total_imp else 0,
    'campaigns': sorted(campaigns.values(), key=lambda x: x['cost'], reverse=True)
}
print(json.dumps(result, ensure_ascii=False))
PYEOF
  )
  echo "✅ Google Ads: $(echo "$GADS_AGGREGATED" | jq -r '.total_campaigns') campanhas, R$$(echo "$GADS_AGGREGATED" | jq -r '.total_cost') gasto"
fi

# ── Aggregate Facebook Ads campaigns ────────────────────────────────────────
echo "→ Facebook Ads..."
FADS_RAW=$(fetch_all_pages "facebook/ads/campaigns")

if [ "$FADS_RAW" = "null" ]; then
  FADS_AGGREGATED="null"
else
  FADS_AGGREGATED=$(echo "$FADS_RAW" | python3 << 'PYEOF'
import sys, json

data = json.load(sys.stdin)
campaigns = {}
for r in data:
    name = r.get('campaign_name', 'unknown')
    if name not in campaigns:
        campaigns[name] = {
            'name': name,
            'objective': r.get('objective'),
            'spend': 0, 'impressions': 0, 'clicks': 0, 'reach': 0
        }
    campaigns[name]['spend'] += float(r.get('spend') or 0)
    campaigns[name]['impressions'] += int(r.get('impressions') or 0)
    campaigns[name]['clicks'] += int(r.get('clicks') or 0)
    campaigns[name]['reach'] += int(r.get('reach') or 0)

for c in campaigns.values():
    c['cpm'] = round(c['spend']/c['impressions']*1000, 2) if c['impressions'] else 0
    c['spend'] = round(c['spend'], 2)

total_spend = round(sum(c['spend'] for c in campaigns.values()), 2)
total_imp = sum(c['impressions'] for c in campaigns.values())
total_clicks = sum(c['clicks'] for c in campaigns.values())
total_reach = sum(c['reach'] for c in campaigns.values())

result = {
    'total_campaigns': len(campaigns),
    'total_spend': total_spend,
    'total_impressions': total_imp,
    'total_clicks': total_clicks,
    'total_reach': total_reach,
    'avg_cpm': round(total_spend/total_imp*1000, 2) if total_imp else 0,
    'avg_ctr': round(total_clicks/total_imp*100, 2) if total_imp else 0,
    'campaigns': sorted(campaigns.values(), key=lambda x: x['spend'], reverse=True)
}
print(json.dumps(result, ensure_ascii=False))
PYEOF
  )
  echo "✅ Facebook Ads: $(echo "$FADS_AGGREGATED" | jq -r '.total_campaigns') campanhas, R$$(echo "$FADS_AGGREGATED" | jq -r '.total_spend') gasto"
fi

# ── Write back to client.json.connectors ────────────────────────────────────
TMP="$CLIENT_JSON.tmp"
jq \
  --arg fetched_at "$FETCHED_AT" \
  --arg period_start "$DATE_START" \
  --arg period_end "$DATE_END" \
  --argjson google_ads "$GADS_AGGREGATED" \
  --argjson facebook_ads "$FADS_AGGREGATED" \
  '.connectors = {
    fetched_at: $fetched_at,
    period: { start: $period_start, end: $period_end },
    google_ads: $google_ads,
    facebook_ads: $facebook_ads
  }' "$CLIENT_JSON" > "$TMP" && mv "$TMP" "$CLIENT_JSON"

echo ""
echo "✓ client.json atualizado (connectors.fetched_at: $FETCHED_AT)"

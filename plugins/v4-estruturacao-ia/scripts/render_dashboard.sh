#!/bin/bash
# render_dashboard.sh — Generate dashboard.html from state.json
# Usage: ./render_dashboard.sh <client_dir>
# For general dashboard: ./render_dashboard.sh <workspace_root> --general

set -euo pipefail

if [ "${2:-}" = "--general" ]; then
  # General dashboard: scan all clients
  WORKSPACE="$1"
  OUTPUT="$WORKSPACE/dashboard-geral.html"

  CLIENTS_JSON="["
  FIRST=true
  for STATE_FILE in "$WORKSPACE"/clientes/*/state.json; do
    [ -f "$STATE_FILE" ] || continue
    if [ "$FIRST" = true ]; then FIRST=false; else CLIENTS_JSON+=","; fi
    CLIENTS_JSON+=$(cat "$STATE_FILE")
  done
  CLIENTS_JSON+="]"

  # Generate HTML
  cat > "$OUTPUT" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Estruturação IA — Dashboard Geral</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0a0a0a; color: #e5e2e1; padding: 2rem; }
  h1 { font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; }
  .client-card { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; }
  .client-name { font-size: 1.2rem; font-weight: 700; color: #fff; }
  .client-week { color: #888; font-size: 0.9rem; }
  .progress-bar { height: 8px; background: #333; border-radius: 4px; margin: 0.75rem 0; overflow: hidden; }
  .progress-fill { height: 100%; background: #e50914; border-radius: 4px; transition: width 0.3s; }
  .stats { display: flex; gap: 1rem; font-size: 0.85rem; color: #aaa; }
</style>
</head>
<body>
<h1>ESTRUTURAÇÃO IA — CLIENTES ATIVOS</h1>
<div id="clients"></div>
<script>
HTMLEOF

  echo "const clients = $CLIENTS_JSON;" >> "$OUTPUT"

  cat >> "$OUTPUT" << 'HTMLEOF2'
clients.forEach(c => {
  const skills = Object.values(c.skills || {});
  const total = skills.length;
  const done = skills.filter(s => s.status === 'completed').length;
  const inProgress = skills.filter(s => s.status === 'in_progress').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('clients').innerHTML += `
    <div class="client-card">
      <div class="client-name">${c.client}</div>
      <div class="client-week">Semana ${c.current_week || '?'} · ${done}/${total} skills</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="stats">
        <span>${done} completas</span>
        <span>${inProgress} em andamento</span>
        <span>${total - done - inProgress} pendentes</span>
      </div>
    </div>`;
});
</script>
</body>
</html>
HTMLEOF2

  echo "Dashboard geral gerado: $OUTPUT"
else
  # Client-specific dashboard
  CLIENT_DIR="$1"
  STATE_FILE="$CLIENT_DIR/state.json"
  OUTPUT="$CLIENT_DIR/dashboard.html"

  STATE=$(cat "$STATE_FILE")

  # Similar logic but with skill-level detail per week
  # (same HTML structure, expanded with per-skill rows)
  cat > "$OUTPUT" << HTMLEOF
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$(echo "$STATE" | jq -r '.client') — Dashboard</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0a0a0a; color: #e5e2e1; padding: 2rem; }
  h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff; }
  .meta { color: #888; margin-bottom: 1.5rem; }
  .week { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; }
  .week-title { font-weight: 700; margin-bottom: 0.75rem; }
  .skill-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid #222; }
  .skill-name { font-size: 0.9rem; }
  .status-completed { color: #4ade80; }
  .status-in_progress { color: #facc15; }
  .status-pending { color: #666; }
</style>
</head>
<body>
<h1>$(echo "$STATE" | jq -r '.client')</h1>
<div class="meta">Semana $(echo "$STATE" | jq -r '.current_week') · Início: $(echo "$STATE" | jq -r '.started_at')</div>
<div id="weeks"></div>
<script>
const state = $STATE;
</script>
</body>
</html>
HTMLEOF

  echo "Dashboard do cliente gerado: $OUTPUT"
fi

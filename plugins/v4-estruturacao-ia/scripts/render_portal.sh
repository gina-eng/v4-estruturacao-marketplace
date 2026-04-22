#!/bin/bash
# render_portal.sh — Gera portal.html para um diretório de cliente
# Uso: render_portal.sh <client_dir>
# Exemplo: render_portal.sh clientes/meu-cliente
#
# Lê client.json e outputs/*.json, injeta no template portal.html
# Gera: <client_dir>/portal.html

set -euo pipefail

CLIENT_DIR="${1:?Uso: render_portal.sh <client_dir>}"

# Resolve paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE="$SCRIPT_DIR/../shared-templates/portal.html"
CLIENT_JSON="$CLIENT_DIR/client.json"
OUTPUTS_DIR="$CLIENT_DIR/outputs"
OUTPUT_FILE="$CLIENT_DIR/portal.html"

# Validate
if [ ! -f "$TEMPLATE" ]; then
  echo "Erro: Template não encontrado em $TEMPLATE" >&2
  exit 1
fi

if [ ! -f "$CLIENT_JSON" ]; then
  echo "Erro: client.json não encontrado em $CLIENT_JSON" >&2
  exit 1
fi

# Build portal data using Python (handles large JSON safely)
CLIENT_JSON_P="$CLIENT_JSON" OUTPUTS_DIR_P="$OUTPUTS_DIR" TEMPLATE_P="$TEMPLATE" OUTPUT_P="$OUTPUT_FILE" python3 << 'PYEOF'
import json, sys, os, glob

client_json_path = os.environ['CLIENT_JSON_P']
outputs_dir = os.environ['OUTPUTS_DIR_P']
template_path = os.environ['TEMPLATE_P']
output_path = os.environ['OUTPUT_P']

# Read client.json
with open(client_json_path, 'r', encoding='utf-8') as f:
    client_data = json.load(f)

# Build outputs object from all JSON files in outputs/
outputs = {}
if os.path.isdir(outputs_dir):
    for fpath in sorted(glob.glob(os.path.join(outputs_dir, '*.json'))):
        skill_id = os.path.splitext(os.path.basename(fpath))[0]
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                outputs[skill_id] = json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            print(f"Aviso: Não foi possível ler {fpath}: {e}", file=sys.stderr)

# Assemble portal data
portal_data = {
    'client': client_data.get('meta', {}),
    'progress': client_data.get('progress', {}),
    'outputs': outputs,
    'briefing': client_data.get('briefing', {}),
}

data_json = json.dumps(portal_data, ensure_ascii=False, separators=(',', ':'))

with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

marker = '/*%%DATA%%*/ {}'
if marker not in template:
    print("Erro: Marcador /*%%DATA%%*/ {} não encontrado no template", file=sys.stderr)
    sys.exit(1)

result = template.replace(marker, data_json)

os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Portal gerado: {output_path}")
PYEOF

echo "✓ Portal atualizado: $OUTPUT_FILE"

# Gera/atualiza consolidated.md + consolidated.html (visão narrativa end-to-end)
CONSOLIDATED_SCRIPT="$SCRIPT_DIR/../shared-templates/render_consolidated.py"
CONSOLIDATED_HTML="$CLIENT_DIR/consolidated.html"
if [ -f "$CONSOLIDATED_SCRIPT" ]; then
  if python3 "$CONSOLIDATED_SCRIPT" "$CLIENT_DIR" >/dev/null 2>&1; then
    echo "✓ Consolidated atualizado: $CONSOLIDATED_HTML"
  else
    echo "⚠ Falha ao gerar consolidated (seguindo sem atualizar)" >&2
  fi
fi

# Deploy para Vercel se existir vercel-project.json no diretório do cliente
VERCEL_CFG="$CLIENT_DIR/vercel-project.json"
if [ -f "$VERCEL_CFG" ] && command -v vercel >/dev/null 2>&1; then
  PROJECT_NAME=$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('projectName',''))" "$VERCEL_CFG")
  DEPLOY_DIR=$(mktemp -d)
  cp "$OUTPUT_FILE" "$DEPLOY_DIR/index.html"
  if [ -f "$CONSOLIDATED_HTML" ]; then
    cp "$CONSOLIDATED_HTML" "$DEPLOY_DIR/consolidated.html"
  fi
  mkdir -p "$DEPLOY_DIR/.vercel"
  cp "$VERCEL_CFG" "$DEPLOY_DIR/.vercel/project.json"
  echo "🚀 Deployando para Vercel ($PROJECT_NAME)..."
  cd "$DEPLOY_DIR"
  vercel --prod --yes --scope v4-company 2>&1 | grep -E "Production:|Error|✓" || true
  rm -rf "$DEPLOY_DIR"
  echo "✓ Deploy concluído: https://${PROJECT_NAME}.vercel.app"
fi

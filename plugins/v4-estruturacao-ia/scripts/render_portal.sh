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
python3 - "$CLIENT_JSON" "$OUTPUTS_DIR" "$TEMPLATE" "$OUTPUT_FILE" << 'PYEOF'
import json, sys, os, glob

client_json_path = sys.argv[1]
outputs_dir = sys.argv[2]
template_path = sys.argv[3]
output_path = sys.argv[4]

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

# Serialize to JSON (compact, no ASCII escaping for pt-BR)
data_json = json.dumps(portal_data, ensure_ascii=False, separators=(',', ':'))

# Read template
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# Inject data — replace the marker line
marker = '/*%%DATA%%*/ {}'
if marker not in template:
    print("Erro: Marcador /*%%DATA%%*/ {} não encontrado no template", file=sys.stderr)
    sys.exit(1)

result = template.replace(marker, data_json)

# Write output
os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Portal gerado: {output_path}")
PYEOF

echo "✓ Portal atualizado: $OUTPUT_FILE"

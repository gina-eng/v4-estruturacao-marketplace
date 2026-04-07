#!/bin/bash
# update_state.sh — Update skill status in state.json
# Usage: ./update_state.sh <client_dir> <skill_name> <status> [checkpoint]

set -euo pipefail

CLIENT_DIR="$1"
SKILL="$2"
STATUS="$3"
CHECKPOINT="${4:-0}"
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)

STATE_FILE="$CLIENT_DIR/state.json"

# Update skill status
jq --arg skill "$SKILL" \
   --arg status "$STATUS" \
   --arg checkpoint "$CHECKPOINT" \
   --arg now "$NOW" \
   '.skills[$skill].status = $status |
    .skills[$skill].checkpoint = ($checkpoint | tonumber) |
    if $status == "in_progress" and .skills[$skill].started_at == null
      then .skills[$skill].started_at = $now else . end |
    if $status == "completed"
      then .skills[$skill].completed_at = $now else . end' \
   "$STATE_FILE" > "$STATE_FILE.tmp" && mv "$STATE_FILE.tmp" "$STATE_FILE"

echo "Updated $SKILL → $STATUS (checkpoint $CHECKPOINT)"

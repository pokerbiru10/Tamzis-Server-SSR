#!/bin/bash
# Cloudflare Tunnel Manager for TAMZIS Simulation API
# Proxies to: http://103.52.147.11:10505

LOG_FILE="/tmp/cloudflared-tamzis.log"
URL_FILE="/tmp/cloudflared-tamzis-url.txt"
PUBLIC_URL_FILE="/Users/macbooknaufal/Sites/localhost/v5/app-tamzis/public/build/tunnel-url.json"
TARGET="http://103.52.147.11:10505"

# Kill existing tunnel
pkill -f "cloudflared tunnel --url $TARGET" 2>/dev/null
sleep 1

# Start tunnel in background
nohup /usr/local/bin/cloudflared tunnel --url "$TARGET" > "$LOG_FILE" 2>&1 &
TUNNEL_PID=$!

# Wait for URL to appear (max 30 seconds)
for i in $(seq 1 30); do
    URL=$(grep -o 'https://[^.]*\.trycloudflare\.com' "$LOG_FILE" | tail -1)
    if [ -n "$URL" ]; then
        echo "$URL" > "$URL_FILE"
        echo "{\"url\":\"$URL\"}" > "$PUBLIC_URL_FILE"
        echo "Tunnel ready: $URL (PID: $TUNNEL_PID)"
        exit 0
    fi
    sleep 1
done

echo "ERROR: Tunnel failed to start"
exit 1

#!/bin/bash
set -e

echo "Paste your GitHub Personal Access Token (with write:public_key scope) and press Enter:"
read -s GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: No token provided. Exiting."
    exit 1
fi

echo "Registering SSH key with GitHub..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/keys \
  -d "{\"title\":\"MacBook-$(date +%Y%m%d)\",\"key\":\"$(cat ~/.ssh/id_ed25519.pub)\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "422" ]; then
    echo "SSH key registered successfully (or already exists)."
    echo "Pushing changes..."
    command git push -u origin main
else
    echo "Failed to register SSH key. HTTP $HTTP_CODE"
    echo "$BODY"
    exit 1
fi
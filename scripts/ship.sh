#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: npm run ship -- \"Commit message\""
  exit 1
fi

message="$*"
branch="$(git rev-parse --abbrev-ref HEAD)"

npm run build:css
python3 scripts/bundle_chrome.py
npm run version:assets

git status --short
git add .
git commit -m "$message"
git push origin "$branch"

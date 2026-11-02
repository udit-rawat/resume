#!/usr/bin/env bash
# Render each designed poster in covers-design/covers.html to public/covers/<slug>.webp.
# Needs Google Chrome and Pillow. Usage: scripts/render_covers.sh [slug ...]
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
SLUGS=("$@")
[ ${#SLUGS[@]} -eq 0 ] && SLUGS=(tribunal planrail muscle-memory context-lab glassbox hrm reposignal animatic adamax misaanjh)
mkdir -p public/covers .render
for s in "${SLUGS[@]}"; do
  "$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
    --virtual-time-budget=6000 --allow-file-access-from-files --window-size=300,390 \
    --screenshot="$PWD/.render/$s.png" "file://$PWD/covers-design/covers.html?only=$s" >/dev/null 2>&1
  python3 -c "
from PIL import Image
im = Image.open('.render/$s.png').convert('RGB').crop((0, 0, 600, 780))
im.save('public/covers/$s.webp', quality=90)
"
  echo "rendered $s"
done
rm -rf .render

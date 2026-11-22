#!/usr/bin/env bash
set -euo pipefail
DS_VERSION="${1:-9.3.1}"
HASH="${2:-1}"
shift 2 2>/dev/null || true
echo "→ Версия DocumentServer: ${DS_VERSION}"
echo "→ Хэш/версия: ${HASH}"
echo "→ Каталог ресурсов: /v${DS_VERSION}-${HASH}"
docker build \
  --build-arg "DS_VERSION=${DS_VERSION}" \
  --build-arg "ХЕШ=${HASH}" \
  --tag "office-website:latest" \
  --tag "веб-сайт офиса:${DS_VERSION}-${HASH}" \
  "$@" \
  .
echo ""
echo "✓ Сборка завершена."
echo "  Теги изображений:"
echo "    office-website:latest"
echo "    веб-сайт офиса:${DS_VERSION}-${HASH}"
echo ""
echo "  Запустить с:"
echo "    docker run -p 80:80 офис-сайт: последний"
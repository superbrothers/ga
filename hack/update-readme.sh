#!/usr/bin/env bash

set -e -o pipefail; [[ -n "$DEBUG" ]] && set -x

SCRIPT_ROOT="$(cd $(dirname $0); pwd)"

TARGET_FILE="${TARGET_FILE:-"${SCRIPT_ROOT}/../README.md"}"
help="$(npm run --silent start -- --help | tr '\n' '')"
sed -e "s/__HELP__/${help}/" "${SCRIPT_ROOT}/README.md" | tr '' '\n' >"$TARGET_FILE"

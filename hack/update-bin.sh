#!/usr/bin/env bash

set -e -o pipefail; [[ -n "$DEBUG" ]] && set -x

SCRIPT_ROOT="$(cd $(dirname $0); pwd)"
TARGET_FILE="${TARGET_FILE:-"${SCRIPT_ROOT}/../bin/ga"}"

version="$(cat "${SCRIPT_ROOT}/../package.json" | jq -r ".version")"
sed -e "s/__VERSION__/${version}/" "${SCRIPT_ROOT}/ga" >"$TARGET_FILE"
# vim: ai ts=2 sw=2 et sts=2 ft=sh

#!/usr/bin/env bash

set -e -o pipefail; [[ -n "$DEBUG" ]] && set -x

SCRIPT_ROOT="$(cd $(dirname $0); pwd)"

tmp_root="$(mktemp -d)"
cleanup() {
  rm -rf "$tmp_root"
}
trap "cleanup" EXIT SIGINT

export TARGET_FILE="${tmp_root}/ga"
"${SCRIPT_ROOT}/update-bin.sh"

ret=0
diff "${SCRIPT_ROOT}/../bin/ga" "${TARGET_FILE}" || ret=$?

if [[ $ret -eq 0 ]]; then
  echo "bin/ga is up to date."
else
  echo "bin/ga is out of date. Please run hack/update-readme.sh."
  exit 1
fi
# vim: ai ts=2 sw=2 et sts=2 ft=sh

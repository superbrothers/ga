#!/usr/bin/env bash

set -e -o pipefail; [[ -n "$DEBUG" ]] && set -x

SCRIPT_ROOT="$(cd $(dirname $0); pwd)"

TARGET_FILE="${TARGET_FILE:-"${SCRIPT_ROOT}/../README.md"}"
cat <<'EOL' >"$TARGET_FILE"
# `ga`: The GitHub Actions helper command-line tool

This tool provides for setting results, logging, registering secrets and exporting variables across actions.

## Usage

```
EOL
npm run --silent start -- --help >>"$TARGET_FILE"
cat <<'EOL' >>"$TARGET_FILE"
```

## License

This software is released under the MIT license.
EOL
# vim: ai ts=2 sw=2 et sts=2 ft=sh

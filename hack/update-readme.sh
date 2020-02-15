#!/usr/bin/env bash

set -e -o pipefail; [[ -n "$DEBUG" ]] && set -x

SCRIPT_ROOT="$(cd $(dirname $0); pwd)"

TARGET_FILE="${TARGET_FILE:-"${SCRIPT_ROOT}/../README.md"}"
cat <<'EOL' >"$TARGET_FILE"
# `ga`: The GitHub Actions helper command-line tool

ga is a tool that provides for setting results, logging, registering secrets and exporting variables across actions.

## What is ga?

ga is [@actions/core](https://github.com/actions/toolkit/tree/master/packages/core) as command-line tool that allows you to easily communicate with the GitHub Actions runner machine to set environment variables, output values used by other actions, and debug messages to the output logs, and other tasks.

## Usage

If you want to create or update an environment variable for any actions running next in a job, you can use `ga set-env` command as follows:

```
ga set-env VERSION "$(cat VERSION)"
```

If you want to use the execution result in the following steps, you can use the "ga set-output" command as follows:

```yaml
steps:
- name: Checkout code
  uses: actions/checkout@v2
- name: Get version
- run: |
    ga set-output version "$(cat VERSION)"
  id: get_version
- name: Create release
  uses: actions/create-release@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    tag_name: ${{ steps.get_version.outputs.version }}
    release_name: Release ${{ steps.get_version.outputs.version }}
```

All available ga subcommands are as follow:
```
EOL
npm run --silent start -- --help >>"$TARGET_FILE"
cat <<'EOL' >>"$TARGET_FILE"
```

## References

- [Development tools for GitHub Actions \- GitHub Help](https://help.github.com/en/actions/reference/development-tools-for-github-actions)
- [toolkit/packages/core at master · actions/toolkit](https://github.com/actions/toolkit/tree/master/packages/core)

## License

This software is released under the MIT license.
EOL
# vim: ai ts=2 sw=2 et sts=2 ft=sh

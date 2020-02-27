# `ga`: The GitHub Actions helper command-line tool

![CI](https://github.com/superbrothers/ga/workflows/CI/badge.svg)

You no longer need to use `echo "::set-env ...` directly in your workflow!

## What is ga?

ga is [@actions/core](https://github.com/actions/toolkit/tree/master/packages/core) as a command-line tool that allows you to easily communicate with the GitHub Actions runner machine to set environment variables, output values used by other actions, and debug messages to the output logs, and other tasks. You no longer need to use `echo "::set-env ...` directly in your workflow steps. There is also [superbrothers/setup-ga](https://github.com/superbrothers/ga), which sets up ga tool quickly.

## Usage

If you want to create or update an environment variable for any actions running next in a job, you can use `ga set-env` command as follows:

```
ga set-env VERSION "$(cat VERSION)"
```

If you want to use the execution result in the following steps, you can use the "ga set-output" command with [superbrothers/setup-ga](https://github.com/superbrothers/setup-ga) as follows:

```yaml
steps:
- name: Checkout code
  uses: actions/checkout@v2
- name: Setup ga tool
  uses: superbrothers/setup-ga@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Avoid rate-limit error
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

If you want to install ga tool to your environment directly:
```yaml
steps:
- uses: actions/checkout@v2
- uses: setup-node@v1
  with:
    node-version: "12.x"
- run: npm install -g @superbrothers/ga
- run: ga set-output version "$(cat VERSION)"
  id: get_version
```

All available ga subcommands are as follow:
```
__HELP__
```

## Examples

### Use downloaded commands in subsequent steps

```yaml
steps:
- uses: superbrothers/setup-ga@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
- name: Setup kubectl
  run: |
    set -x
    toolPath="$(mktemp -d)"
    curl -o "${toolPath}/kubectl" -L -s https://storage.googleapis.com/kubernetes-release/release/v1.17.0/bin/linux/amd64/kubectl
    chmod +x "${toolPath}/kubectl"
    ga add-path "$toolPath"
- run: kubectl version --client
```

## References

- [Development tools for GitHub Actions \- GitHub Help](https://help.github.com/en/actions/reference/development-tools-for-github-actions)
- [toolkit/packages/core / actions/toolkit](https://github.com/actions/toolkit/tree/master/packages/core)

## License

This software is released under the MIT license.

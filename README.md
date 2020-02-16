# `ga`: The GitHub Actions helper command-line tool

![CI](https://github.com/superbrothers/ga/workflows/CI/badge.svg)

ga is a tool that provides for setting results, logging, registering secrets and exporting variables across actions.

## What is ga?

ga is [@actions/core](https://github.com/actions/toolkit/tree/master/packages/core) as command-line tool that allows you to easily communicate with the GitHub Actions runner machine to set environment variables, output values used by other actions, and debug messages to the output logs, and other tasks.

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
Usage: ga [options] [command]

The GitHub Actions helper command-line tool.

Options:
  -v, --version               Print the version information
  -h, --help                  output usage information

Commands:
  set-env <name> <value>      Sets env variable for this action and future
                              actions in the job.
  set-secret <secret>         Registers a secret which will get masked from
                              logs
  add-path <path>             Prepends inputPath to the PATH (for this action
                              and future actions).
  get-input [options] <name>  Gets the value of an input.  The value is also
                              trimmed.
  set-output <name> <value>   Sets the value of an output
  set-failed <message>        Sets the action status to failed.
  debug <message>             Writes debug message to user log
  error <message>             Adds an error issue
  warning <message>           Adds an warning issue
  info <message>              Writes info to log with console.log
  start-group <name>          Begin an output group
  end-group                   End an output group
  save-state <name> <value>   Saves state for current action, the state can
                              only be retrieved by this action's post job
                              execution.
  get-state <name>            Gets the value of an state set by this action's
                              main execution.
  *

```

## References

- [Development tools for GitHub Actions \- GitHub Help](https://help.github.com/en/actions/reference/development-tools-for-github-actions)
- [toolkit/packages/core / actions/toolkit](https://github.com/actions/toolkit/tree/master/packages/core)

## License

This software is released under the MIT license.

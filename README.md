# `ga`: The GitHub Actions helper command-line tool

This tool provides for setting results, logging, registering secrets and exporting variables across actions.

## Usage

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

## License

This software is released under the MIT license.

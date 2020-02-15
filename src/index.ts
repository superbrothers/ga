import * as commander from "commander";
import * as core from "@actions/core";
import * as os from "os";
import { description, version } from "../package.json";

const ga = new commander.Command("ga");

ga.description(description);
ga.version(version, "-v, --version", "Print the version information");

/**
 * Variables
 */
ga.command("set-env <name> <value>")
  .description(
    "Sets env variable for this action and future actions in the job."
  )
  .action(core.exportVariable);

ga.command("set-secret <secret>")
  .description("Registers a secret which will get masked from logs")
  .action(secret => {
    core.setSecret(secret);
  });

ga.command("add-path <path>")
  .description(
    "Prepends inputPath to the PATH (for this action and future actions)."
  )
  .action(core.addPath);

ga.command("get-input <name>")
  .option(
    "--required",
    "Whether the input is required. If required and not present, will exit with error status."
  )
  .description("Gets the value of an input.  The value is also trimmed.")
  .action((name, options) => {
    const inputOptions: core.InputOptions = { required: options.required };
    try {
      const value: string = core.getInput(name, inputOptions);
      if (value !== "") {
        process.stdout.write(`${value}${os.EOL}`);
      }
    } catch (e) {
      process.stderr.write(e.message);
      process.exitCode = core.ExitCode.Failure;
    }
  });

ga.command("set-output <name> <value>")
  .description("Sets the value of an output")
  .action(core.setOutput);

/**
 * Results
 */
ga.command("set-failed <message>")
  .description("Sets the action status to failed.")
  .action(core.setFailed);

/**
 * Loging Commands
 */
ga.command("debug <message>")
  .description("Writes debug message to user log")
  .action(core.debug);

ga.command("error <message>")
  .description("Adds an error issue")
  .action(core.error);

ga.command("warning <message>")
  .description("Adds an warning issue")
  .action(core.warning);

ga.command("info <message>")
  .description("Writes info to log with console.log")
  .action(core.info);

ga.command("start-group <name>")
  .description("Begin an output group")
  .action(core.startGroup);

ga.command("end-group")
  .description("End an output group")
  .action(core.endGroup);

/**
 * Wrapper action state
 */
ga.command("save-state <name> <value>")
  .description(
    "Saves state for current action, the state can only be retrieved by this action's post job execution."
  )
  .action(core.saveState);

ga.command("get-state <name>")
  .description(
    "Gets the value of an state set by this action's main execution."
  )
  .action(name => {
    process.stdout.write(`${core.getState(name)}${os.EOL}`);
  });

/**
 * Other commands will be redirected to the help message.
 */
ga.command("*").action(() => ga.help());

if (require.main === module) {
  ga.parse(process.argv);

  if (ga.args.length === 0) ga.help();
}

export = ga;

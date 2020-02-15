import * as ga from "../src/index";
import * as os from "os";

// Assert that process.stdout.write calls called only with the given arguments.
function assertWriteCalls(calls: string[]): void {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length);

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i]);
  }
}

describe("ga", () => {
  beforeEach(() => {
    process.stdout.write = jest.fn();
  });

  describe("set-env", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "set-env", "NAME", "VALUE"]);
      assertWriteCalls([`::set-env name=NAME::VALUE${os.EOL}`]);
    });
  });

  describe("set-secret", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "set-secret", "this-is-secret"]);
      assertWriteCalls([`::add-mask::this-is-secret${os.EOL}`]);
    });
  });

  describe("add-path", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "add-path", "/bin"]);
      assertWriteCalls([`::add-path::/bin${os.EOL}`]);
    });
  });

  describe("get-input", () => {
    process.env["INPUT_MY_INPUT"] = "val";

    it("gets non-required input", () => {
      ga.parse(["node", "ga", "get-input", "my input"]);
      assertWriteCalls([`val${os.EOL}`]);
    });

    it("gets missing non-required input", () => {
      ga.parse(["node", "ga", "get-input", "missing"]);
      assertWriteCalls([]);
    });

    it("gets required input", () => {
      ga.parse(["node", "ga", "get-input", "my input", "--required"]);
      assertWriteCalls([`val${os.EOL}`]);
    });

    it("gets missing required input", () => {
      ga.parse(["node", "ga", "get-input", "missing", "--required"]);
      expect(process.exitCode).toBe(1);
      assertWriteCalls([]);
    });
  });

  describe("set-output", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "set-output", "name", "value"]);
      assertWriteCalls([`::set-output name=name::value${os.EOL}`]);
    });
  });

  describe("set-failed", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "set-failed", "message"]);
      assertWriteCalls([`::error::message${os.EOL}`]);
    });
  });

  describe("debug", () => {
    it("outputs the correct message", () => {
      ga.parse(["node", "ga", "debug", "message"]);
      assertWriteCalls([`::debug::message${os.EOL}`]);
    });
  });

  describe("error", () => {
    it("outputs the correct message", () => {
      ga.parse(["node", "ga", "error", "message"]);
      assertWriteCalls([`::error::message${os.EOL}`]);
    });
  });

  describe("warning", () => {
    it("outputs the correct message", () => {
      ga.parse(["node", "ga", "warning", "message"]);
      assertWriteCalls([`::warning::message${os.EOL}`]);
    });
  });

  describe("info", () => {
    it("outputs the correct message", () => {
      ga.parse(["node", "ga", "info", "message"]);
      assertWriteCalls([`message${os.EOL}`]);
    });
  });

  describe("start-group", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "start-group", "my-group"]);
      assertWriteCalls([`::group::my-group${os.EOL}`]);
    });
  });

  describe("end-group", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "end-group"]);
      assertWriteCalls([`::endgroup::${os.EOL}`]);
    });
  });

  describe("save-state", () => {
    it("produces the correct command", () => {
      ga.parse(["node", "ga", "save-state", "name", "value"]);
      assertWriteCalls([`::save-state name=name::value${os.EOL}`]);
    });
  });

  describe("get-state", () => {
    process.env["STATE_TEST_1"] = "state_val";

    it("produces the correct command", () => {
      ga.parse(["node", "ga", "get-state", "TEST_1"]);
      assertWriteCalls([`state_val${os.EOL}`]);
    });
  });
});

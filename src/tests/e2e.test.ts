import { describe, test, expect } from "vitest";
import { spawn, RunContext } from "first-base";
import path from "node:path";

const rootDir = path.resolve(__dirname, "../..");

function cleanString(str: string) {
  return str
    .replace(new RegExp(rootDir, "g"), "<rootDir>")
    .replace(/Finished in [\d.]+ seconds/g, "Finished in [redacted] seconds")
    .replace(/(?:(\n\s*)at[^\n]+)+/g, "$1at somewhere");
}

function cleanResult(result: RunContext["result"]) {
  return {
    ...result,
    stdout: cleanString(result.stdout),
    stderr: cleanString(result.stderr),
  };
}

describe("simple e2e test", () => {
  test("requiring package index", async () => {
    const run = spawn(process.execPath, [
      path.join(__dirname, "e2e-fixtures/requires-index.js"),
    ]);
    await run.completion;
    expect(cleanResult(run.result)).toMatchInlineSnapshot(`
      {
        "code": 1,
        "error": false,
        "stderr": "Error: Test run failed: 
      Started
      .F*

      Failures:
      1) sample tests fails
        Message:
          Expected 4 to be 5.
        Stack:
          Error: Expected 4 to be 5.
              at somewhere
      Pending:

      1) sample tests is pending
        Temporarily disabled with xit

      3 specs, 1 failure, 1 pending spec
      Finished in [redacted] seconds
          at somewhere
      ",
        "stdout": "Test interface: [
        'describe',          'xdescribe',
        'fdescribe',         'it',
        'xit',               'fit',
        'beforeEach',        'afterEach',
        'beforeAll',         'afterAll',
        'expect',            'expectAsync',
        'pending',           'fail',
        'spyOn',             'spyOnProperty',
        'spyOnAllFunctions', 'jsApiReporter',
        'jasmine'
      ]
      ",
      }
    `);
  });

  test("requiring bundle.js", async () => {
    const run = spawn(process.execPath, [
      path.join(__dirname, "e2e-fixtures/requires-bundle.js"),
    ]);
    await run.completion;
    expect(cleanResult(run.result)).toMatchInlineSnapshot(`
      {
        "code": 1,
        "error": false,
        "stderr": "Error: Test run failed: 
      Started
      .F*

      Failures:
      1) sample tests fails
        Message:
          Expected 4 to be 5.
        Stack:
          Error: Expected 4 to be 5.
              at somewhere
      Pending:

      1) sample tests is pending
        Temporarily disabled with xit

      3 specs, 1 failure, 1 pending spec
      Finished in [redacted] seconds
          at somewhere
      ",
        "stdout": "Test interface: [
        'describe',          'xdescribe',
        'fdescribe',         'it',
        'xit',               'fit',
        'beforeEach',        'afterEach',
        'beforeAll',         'afterAll',
        'expect',            'expectAsync',
        'pending',           'fail',
        'spyOn',             'spyOnProperty',
        'spyOnAllFunctions', 'jsApiReporter',
        'jasmine'
      ]
      ",
      }
    `);
  });
});

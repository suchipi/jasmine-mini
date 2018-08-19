/* global WScript */
const global = this;

global.setTimeout = function setTimeout() {
  return 4;
};
global.setInterval = function setInterval() {
  return 4;
};
global.clearTimeout = function clearTimeout() {};
global.clearInterval = function clearInterval() {};

WScript.LoadScriptFile("./bundle.js");

const j = new Jasmine();

const {
  clock,
  spyOn,
  describe,
  xdescribe,
  fdescribe,
  it,
  xit,
  fit,
  expect,
  expectAsync,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
  pending,
  fail
} = j.env;

describe("thing", () => {
  it("works", () => {
    throw new Error("no it doesn't");
  });
});

j.onComplete(results => {
  console.log("complete");
  console.log(results);
});

j.execute();

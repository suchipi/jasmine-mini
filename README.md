# `@suchipi/jasmine-mini`

Fork of jasmine's npm package that strips it down so it can run in non-browser, non-node environments.

It removes all the file and CLI-related parts of the jasmine node API, and also changes it so that it doesn't pollute the global with jasmine's public interface. The resulting bundle (`bundle.js`) should run in any JavaScript environment with the following defined:

- `console.log`
- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInteval`

Usage:

```js
const j = new Jasmine();

const {
  describe,
  it,
  expect
  // etc. stuff you would normally find on the global
} = j.getInterface();

describe("thing", () => {
  it("works", () => {
    expect(2 + 2).toBe(4);
  });
});

j.execute();
```

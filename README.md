# `@suchipi/jasmine-mini`

Fork of jasmine's npm package that strips it down so it can run in non-browser, non-node environments.

It removes all the file-related parts of the jasmine node API. The resulting bundle should run in any JavaScript environment with the following defined:

- `console.log`
- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInteval`

Usage:

```js
const j = new Jasmine();

describe("thing", () => {
  it("works", () => {
    throw new Error("no it doesn't");
  });
});

j.execute();
```

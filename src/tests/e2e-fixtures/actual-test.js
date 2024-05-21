/* eslint-disable no-undef */

describe("sample tests", () => {
  it("passes", () => {
    expect(2 + 2).toBe(4);
  });

  it("fails", () => {
    expect(2 + 2).toBe(5);
  });

  xit("is pending", () => {
    expect(2 + 2).toBe(99);
  });
});

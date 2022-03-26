import { clear, mockUserAgent } from "jest-useragent-mock";
module.exports = (__testFn) => {
  describe("sugar.js.is.tablet", () => {
    afterEach(() => {
      clear();
    });
    mockUserAgent("Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148");
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn()).toBe(true);
    });
  });
};

import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import { clear, mockUserAgent } from "jest-useragent-mock";
module.exports = (__testFn) => {
  describe("sugar.js.is.ie", () => {
    afterEach(() => {
      clear();
    });
    mockUserAgent("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)");
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn()).toBe(true);
    });
  });
};

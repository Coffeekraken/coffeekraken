var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_chrome = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/chrome.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.chrome", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_chrome();

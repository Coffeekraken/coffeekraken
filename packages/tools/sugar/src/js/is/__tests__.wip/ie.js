var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_ie = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/ie.ts"(exports, module) {
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
  }
});
export default require_ie();

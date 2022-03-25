var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_opera = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/opera.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.opera", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36 OPR/67.0.3575.137");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_opera();

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_tablet = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/tablet.ts"(exports, module) {
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
  }
});
export default require_tablet();

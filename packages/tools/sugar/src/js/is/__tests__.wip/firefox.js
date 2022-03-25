var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_firefox = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/firefox.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.firefox", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_firefox();

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_samsungBrowser = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/samsungBrowser.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.samsungBrowser", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_samsungBrowser();

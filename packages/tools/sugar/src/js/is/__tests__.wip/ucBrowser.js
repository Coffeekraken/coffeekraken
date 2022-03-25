var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_ucBrowser = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/ucBrowser.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.ucBrowser", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; F5121 Build/34.0.A.1.247) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.5.1.944 Mobile Safari/537.36");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_ucBrowser();

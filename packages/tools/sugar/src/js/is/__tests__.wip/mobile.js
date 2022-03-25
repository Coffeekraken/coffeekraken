var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_mobile = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/mobile.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.chrome", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Linux; Android 6.0; Lenovo K50a40 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.137 YaBrowser/17.4.1.352.00 Mobile Safari/537.36");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_mobile();

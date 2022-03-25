var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { clear, mockUserAgent } from "jest-useragent-mock";
var require_edge = __commonJS({
  "packages/tools/sugar/src/js/is/__tests__.wip/edge.ts"(exports, module) {
    module.exports = (__testFn) => {
      describe("sugar.js.is.edge", () => {
        afterEach(() => {
          clear();
        });
        mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43");
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn()).toBe(true);
        });
      });
    };
  }
});
export default require_edge();

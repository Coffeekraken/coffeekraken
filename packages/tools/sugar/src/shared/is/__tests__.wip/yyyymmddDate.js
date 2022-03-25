var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname, __filename;
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
    __filename = /* @__PURE__ */ getFilename();
  }
});
var require_yyyymmddDate = __commonJS({
  "packages/tools/sugar/src/shared/is/__tests__.wip/yyyymmddDate.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__testFn) => {
      describe("sugar.js.is.yyyymmdd", () => {
        it("Should detect the passed variable type correctly", () => {
          expect(__testFn("2020.10.13")).toBe(true);
          expect(__testFn("2020.20.13")).toBe(false);
        });
      });
    };
  }
});
export default require_yyyymmddDate();

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
var require_convert = __commonJS({
  "packages/tools/sugar/src/shared/time/__tests__.wip/convert.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__convert) => {
      describe("sugar.js.time.convert", () => {
        it('Should convert the string "1s" to 1000ms', () => {
          expect(__convert("1s", "ms")).toBe(1e3);
        });
        it('Should convert the string "ms" to 60000ms', () => {
          expect(__convert("1m", "ms")).toBe(6e4);
        });
        it('Should convert the string "2h" to "120m"', () => {
          expect(__convert("2h", "m")).toBe(120);
        });
        it('Should convert the string "1week" to "7d"', () => {
          expect(__convert("1week", "d")).toBe(7);
        });
        it('Should convert the string "10weeks" to "70d"', () => {
          expect(__convert("10weeks", "d")).toBe(70);
        });
      });
    };
  }
});
export default require_convert();

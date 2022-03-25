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
var require_parse = __commonJS({
  "packages/tools/sugar/src/shared/color/__tests__.wip/parse.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__parse) => {
      describe("sugar.js.color.parse", () => {
        it("Should parse the string #ff00ff to rgba object correctly", () => {
          expect(__parse("#ff00ff", "rgba")).toEqual({
            r: 255,
            g: 0,
            b: 255,
            a: 1
          });
        });
        it("Should parse the string hsl(300,100,50) to rgba object correctly", () => {
          expect(__parse("hsl(300,100,50)", "rgba")).toEqual({
            r: 255,
            g: 0,
            b: 255,
            a: 1
          });
        });
        it("Should parse the string hsv(300,100,100) to rgba object correctly", () => {
          expect(__parse("hsv(300,100,100)", "rgba")).toEqual({
            r: 255,
            g: 0,
            b: 255,
            a: 1
          });
        });
      });
    };
  }
});
export default require_parse();

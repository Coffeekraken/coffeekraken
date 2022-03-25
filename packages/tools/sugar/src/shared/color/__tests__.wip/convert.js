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
  "packages/tools/sugar/src/shared/color/__tests__.wip/convert.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__convert) => {
      describe("sugar.js.color.convert", () => {
        it("Should convert the color string #ff00ff to rgba object correctly", () => {
          expect(__convert("#ff00ff", "rgba")).toEqual({
            r: 255,
            g: 0,
            b: 255,
            a: 1
          });
        });
        it("Should convert the color string #ff00ff to hsl object correctly", () => {
          expect(__convert("#ff00ff", "hsl")).toEqual({
            h: 300,
            s: 100,
            l: 50
          });
        });
        it("Should convert the color string #ff00ff to hsv object correctly", () => {
          expect(__convert("#ff00ff", "hsv")).toEqual({
            h: 300,
            s: 100,
            v: 100
          });
        });
        it("Should convert the color string #ff00ff to rgba string correctly", () => {
          expect(__convert("#ff00ff", "rgbaString")).toBe("rgba(255,0,255,1)");
        });
        it("Should convert the color string #ff00ff to hsl string correctly", () => {
          expect(__convert("#ff00ff", "hslString")).toBe("hsl(300,100,50)");
        });
        it("Should convert the color string #ff00ff to hsv string correctly", () => {
          expect(__convert("#ff00ff", "hsvString")).toBe("hsv(300,100,100)");
        });
      });
    };
  }
});
export default require_convert();

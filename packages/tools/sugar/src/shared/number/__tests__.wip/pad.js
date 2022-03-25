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
var require_pad = __commonJS({
  "packages/tools/sugar/src/shared/number/__tests__.wip/pad.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__pad) => {
      describe("sugar.js.number.pad", () => {
        it("Should pad the passed numbers correctly", () => {
          expect(__pad(13, 5)).toBe("00013");
          expect(__pad(13, 5, "#")).toBe("###13");
        });
      });
    };
  }
});
export default require_pad();

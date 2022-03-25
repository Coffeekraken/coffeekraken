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
var require_constrain = __commonJS({
  "packages/tools/sugar/src/shared/number/__tests__.wip/constrain.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__constrain) => {
      describe("sugar.js.number.constrain", () => {
        it("Should constrain the passed numbers correctly", () => {
          expect(__constrain(20, 10, 15)).toBe(15);
          expect(__constrain(2, 10, 15)).toBe(10);
        });
      });
    };
  }
});
export default require_constrain();

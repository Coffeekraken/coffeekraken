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
var require_distanceBetween = __commonJS({
  "packages/tools/sugar/src/shared/geom/__tests__.wip/distanceBetween.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__distanceBetween) => {
      describe("sugar.js.geom.distanceBetween", () => {
        const res = __distanceBetween({
          x: 20,
          y: 10
        }, {
          x: 10,
          y: 20
        });
        it("Should constrain the passed point correctly", () => {
          expect(res).toBe(14.142135623730951);
        });
      });
    };
  }
});
export default require_distanceBetween();

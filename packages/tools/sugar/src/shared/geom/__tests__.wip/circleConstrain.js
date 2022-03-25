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
var require_circleConstrain = __commonJS({
  "packages/tools/sugar/src/shared/geom/__tests__.wip/circleConstrain.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__circleConstrain) => {
      describe("sugar.js.geom.circleConstrain", () => {
        const res = __circleConstrain({
          x: 20,
          y: 10
        }, 10, {
          x: 10,
          y: 5
        });
        it("Should constrain the passed point correctly", () => {
          expect(res).toEqual({
            x: 11.05572809000084,
            y: 5.527864045000419
          });
        });
      });
    };
  }
});
export default require_circleConstrain();

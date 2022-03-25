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
var require_typeof = __commonJS({
  "packages/tools/sugar/src/shared/value/__tests__.wip/typeof.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__typeof) => {
      describe("sugar.js.value.typeof", () => {
        it("Should return the correct typeof of the passed values", () => {
          let something;
          expect(__typeof(true)).toEqual("Boolean");
          expect(__typeof(10)).toEqual("Integer");
          expect(__typeof(12.3)).toEqual("Number");
          expect(__typeof(null)).toEqual("Null");
          expect(__typeof(something)).toEqual("Undefined");
          expect(__typeof(["hello"])).toEqual("Array");
          expect(__typeof({
            helloWorld: true
          })).toEqual("Object");
        });
        expect(__typeof(function coco() {
        })).toBe("Function");
        expect(__typeof(new Date())).toBe("Date");
        expect(__typeof(/* @__PURE__ */ new Map())).toBe("Map");
        expect(__typeof(["hello", 10, 12.5], { of: true })).toEqual("Array<String|Integer|Number>");
        expect(__typeof({
          hello: "world",
          coco: 10,
          plop: true
        }, { of: true })).toEqual("Object<String|Integer|Boolean>");
        class MyCoolClass {
          constructor() {
          }
        }
        expect(__typeof(MyCoolClass)).toBe("MyCoolClass");
        expect(__typeof(new MyCoolClass())).toBe("MyCoolClass");
        expect(__typeof(new MyCoolClass(), {
          customClass: false
        })).toBe("Object");
      });
    };
  }
});
export default require_typeof();

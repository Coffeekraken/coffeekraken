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
var require_getExtendsStack = __commonJS({
  "packages/tools/sugar/src/shared/class/__tests__.wip/getExtendsStack.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__getExtendsStack) => {
      class MyClass {
      }
      class MyOtherClass extends MyClass {
      }
      class FinalClass extends MyOtherClass {
      }
      describe("sugar.js.class.getExtendsStack", () => {
        it("Should return the correct extends stack", () => {
          expect(__getExtendsStack(FinalClass)).toEqual([
            "MyOtherClass",
            "MyClass"
          ]);
        });
        it("Should return the correct extends stack from an instance", () => {
          expect(__getExtendsStack(new FinalClass())).toEqual([
            "MyOtherClass",
            "MyClass"
          ]);
        });
      });
    };
  }
});
export default require_getExtendsStack();

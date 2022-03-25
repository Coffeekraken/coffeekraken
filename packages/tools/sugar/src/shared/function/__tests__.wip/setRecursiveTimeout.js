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
var require_setRecursiveTimeout = __commonJS({
  "packages/tools/sugar/src/shared/function/__tests__.wip/setRecursiveTimeout.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__setRecursiveTimeout) => {
      describe("sugar.js.function.setRecursiveTimeout", () => {
        let calledCount = 0;
        __setRecursiveTimeout(() => {
          calledCount++;
        }, 100, 1e3);
        it("Sould have called the function 10 times in 1s", (done) => {
          setTimeout(() => {
            expect(calledCount).toBe(10);
            done();
          }, 1100);
        });
      });
    };
  }
});
export default require_setRecursiveTimeout();

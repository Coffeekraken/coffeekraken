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
var require_debounce = __commonJS({
  "packages/tools/sugar/src/shared/function/__tests__.wip/debounce.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__debounce) => {
      describe("sugar.js.function.debounce", () => {
        let calledCount = 0;
        const myCoolFn = __debounce((param1) => {
          calledCount++;
        }, 100);
        myCoolFn();
        myCoolFn();
        myCoolFn();
        myCoolFn();
        myCoolFn();
        setTimeout(() => {
          myCoolFn();
        }, 120);
        it("Sould have called the function only 1 time", (done) => {
          setTimeout(() => {
            expect(calledCount).toBe(1);
            done();
          }, 130);
        });
      });
    };
  }
});
export default require_debounce();

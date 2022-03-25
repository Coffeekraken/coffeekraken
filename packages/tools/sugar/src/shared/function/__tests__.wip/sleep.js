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
var require_sleep = __commonJS({
  "packages/tools/sugar/src/shared/function/__tests__.wip/sleep.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__sleep) => {
      describe("sugar.js.function.sleep", () => {
        let start, end;
        (async () => {
          start = Date.now();
          await __sleep(200);
          end = Date.now();
        })();
        it("Sould a difference between the start and the end time greater that 200", (done) => {
          setTimeout(() => {
            expect(end - start).toBeGreaterThan(195);
            done();
          }, 250);
        });
      });
    };
  }
});
export default require_sleep();

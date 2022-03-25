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
var require_uid = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/uid.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__uid) => {
      describe("sugar.js.object.uid", () => {
        it("Should encrypt the same object twice the same", (done) => {
          const obj = {
            param1: "hello",
            param2: "world coco"
          };
          const res1 = __uid(obj, "somethingCool");
          const res2 = __uid(obj, "somethingCool");
          expect(res1).toBe(res2);
          done();
        });
      });
    };
  }
});
export default require_uid();

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
var require_filter = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/filter.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__filter) => {
      describe("sugar.js.object.filter", () => {
        it("Should filter the object correctly", (done) => {
          const obj1 = __filter({
            hello: {
              world: "hello world"
            },
            plop: {
              array: [0, 1, 2]
            }
          }, (item, name) => {
            return name === "hello";
          });
          expect(obj1).toEqual({
            hello: {
              world: "hello world"
            }
          });
          done();
        });
      });
    };
  }
});
export default require_filter();

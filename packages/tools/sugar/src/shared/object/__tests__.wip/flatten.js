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
var require_flatten = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/flatten.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__flatten) => {
      describe("sugar.js.object.flatten", () => {
        it("Should flatten the object correctly", (done) => {
          const obj1 = __flatten({
            hello: {
              world: "hello world"
            },
            plop: {
              array: [0, 1, 2]
            }
          }, "_", false);
          expect(obj1).toEqual({
            "hello_world": "hello world",
            "plop_array": [0, 1, 2]
          });
          done();
        });
      });
    };
  }
});
export default require_flatten();

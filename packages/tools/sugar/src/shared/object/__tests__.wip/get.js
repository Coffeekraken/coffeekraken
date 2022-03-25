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
var require_get = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/get.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__get) => {
      describe("sugar.js.object.get", () => {
        it("Should get the object property correctly", (done) => {
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: {
              array: [0, 1, 2]
            }
          };
          const val1 = __get(obj1, "hello.world");
          const val2 = __get(obj1, "plop.array.2");
          expect(val1).toBe("hello world");
          expect(val2).toBe(2);
          done();
        });
        it("Should get the object property under an optional one", (done) => {
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: {
              array: [0, 1, 2]
            }
          };
          const val1 = __get(obj1, "hello.coco?.world");
          done();
        });
      });
    };
  }
});
export default require_get();

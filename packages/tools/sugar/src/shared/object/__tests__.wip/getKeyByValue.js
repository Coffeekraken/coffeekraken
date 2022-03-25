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
var require_getKeyByValue = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/getKeyByValue.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__geKeyByValue) => {
      describe("sugar.js.object.geKeyByValue", () => {
        it("Should find the correct key passing a value", (done) => {
          const obj1 = {
            hello: {
              world: "hello world",
              plop: "youhou"
            },
            plop: {
              array: [0, 1, 2]
            }
          };
          expect(__geKeyByValue(obj1.hello, "hello world")).toBe("world");
          done();
        });
      });
    };
  }
});
export default require_getKeyByValue();

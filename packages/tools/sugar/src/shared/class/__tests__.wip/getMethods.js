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
var require_getMethods = __commonJS({
  "packages/tools/sugar/src/shared/class/__tests__.wip/getMethods.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__getMethods) => {
      class MyClass {
        constructor(name) {
          this._settings = {
            hello: "world"
          };
          this._name = name;
        }
        testing(value) {
          this._plop = value;
        }
        plop(user) {
        }
      }
      const myInstance = new MyClass("coffeekraken");
      describe("sugar.js.class.getMethods", () => {
        it("Should return the correct methods list from an instance", () => {
          const res = __getMethods(myInstance);
          expect(res).toEqual(["constructor", "plop", "testing"]);
        });
      });
    };
  }
});
export default require_getMethods();

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
var require_toPlainObject = __commonJS({
  "packages/tools/sugar/src/shared/class/__tests__.wip/toPlainObject.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__toPlainObject) => {
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
      }
      const myInstance = new MyClass("coffeekraken");
      myInstance.testing("hello");
      describe("sugar.js.class.toPlainObject", () => {
        it("Should convert a simple custom class instance into a plain object", () => {
          const plainObject = __toPlainObject(myInstance);
          expect(plainObject).toEqual({
            _settings: {
              hello: "world"
            },
            _name: "coffeekraken",
            _plop: "hello"
          });
        });
      });
    };
  }
});
export default require_toPlainObject();

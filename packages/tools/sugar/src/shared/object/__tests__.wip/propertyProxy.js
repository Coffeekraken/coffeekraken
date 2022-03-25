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
var require_propertyProxy = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/propertyProxy.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__propertyProxy) => {
      describe("sugar.js.object.propertyProxy", () => {
        it("Should apply the property proxy correctly and detect the updated", (done) => {
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: {
              array: [0, 1, 2]
            }
          };
          __propertyProxy(obj1, "hello.world", {
            get: (value) => {
              return "get " + value;
            },
            set: (value) => {
              return "set " + value;
            }
          });
          obj1.hello.world = "lorem ipsum";
          const val = obj1.hello.world;
          expect(val).toBe("get set lorem ipsum");
          done();
        });
      });
    };
  }
});
export default require_propertyProxy();

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
var require_activeSpace = __commonJS({
  "packages/tools/sugar/src/shared/core/__tests__.wip/activeSpace.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__activeSpace) => {
      describe("sugar.js.core.activeSpace", () => {
        it("Should set the active space correctly", () => {
          __activeSpace.set("something.cool");
          expect(__activeSpace.get()).toBe("something.cool");
        });
        it("Should set the active space then check some passed active spaces correctly", () => {
          __activeSpace.set("something.cool.hello.world");
          expect(__activeSpace.is("something")).toBe(false);
          expect(__activeSpace.is("something.*")).toBe(true);
          expect(__activeSpace.is("*.cool.**")).toBe(true);
        });
      });
    };
  }
});
export default require_activeSpace();

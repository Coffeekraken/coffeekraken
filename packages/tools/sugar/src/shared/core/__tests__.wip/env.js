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
var require_env = __commonJS({
  "packages/tools/sugar/src/shared/core/__tests__.wip/env.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__env) => {
      describe("sugar.js.dev.env", () => {
        it("Should get the environment variable correctly", () => {
          expect(__env("node_env")).toBe("test");
        });
        it('Should set the environment variable "youhou" correctly', () => {
          expect(__env("youhou", "Hello world")).toBe("Hello world");
        });
        it('Should delete the environment variable "youhou" correctly', () => {
          expect(__env("youhou", null)).toBe(void 0);
        });
      });
    };
  }
});
export default require_env();

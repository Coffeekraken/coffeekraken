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
var require_aes = __commonJS({
  "packages/tools/sugar/src/shared/crypt/__tests__.wip/aes.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__aes) => {
      describe("sugar.js.crypt.aes", () => {
        it('Should encrypt then decrypt the string "hello world" correctly', () => {
          const crypted = __aes.encrypt("hello world", "plop");
          const decrypted = __aes.decrypt(crypted, "plop");
          expect(decrypted).toBe("hello world");
        });
      });
    };
  }
});
export default require_aes();

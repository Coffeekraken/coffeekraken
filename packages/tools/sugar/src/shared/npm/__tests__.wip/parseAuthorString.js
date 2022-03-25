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
var require_parseAuthorString = __commonJS({
  "packages/tools/sugar/src/shared/npm/__tests__.wip/parseAuthorString.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__parseAuthorString) => {
      describe("sugar.js.npm.parseAuthorString", () => {
        it("Should parse the passed author string correctly", (done) => {
          expect(__parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) ")).toEqual({
            name: "Olivier Bossel",
            email: "olivier.bossel@gmail.com",
            url: "https://olivierbossel.com"
          });
          done();
        });
      });
    };
  }
});
export default require_parseAuthorString();

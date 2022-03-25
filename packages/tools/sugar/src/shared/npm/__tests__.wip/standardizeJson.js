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
var require_standardizeJson = __commonJS({
  "packages/tools/sugar/src/shared/npm/__tests__.wip/standardizeJson.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__standardizeJson) => {
      describe("sugar.js.nav.SNav", () => {
        it("Should standardize the passed json", (done) => {
          expect(__standardizeJson({
            contributors: [
              {
                name: "Olivier Bossel",
                email: "olivier.bossel@gmail.com",
                url: "https://olivierbossel.com"
              },
              "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)"
            ],
            author: "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) "
          })).toEqual({
            contributors: [
              {
                name: "Olivier Bossel",
                email: "olivier.bossel@gmail.com",
                url: "https://olivierbossel.com"
              },
              {
                name: "Olivier Bossel",
                email: "olivier.bossel@gmail.com",
                url: "https://olivierbossel.com"
              }
            ],
            author: {
              name: "Olivier Bossel",
              email: "olivier.bossel@gmail.com",
              url: "https://olivierbossel.com"
            }
          });
          done();
        });
      });
    };
  }
});
export default require_standardizeJson();

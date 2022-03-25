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
var require_crop = __commonJS({
  "packages/tools/sugar/src/shared/string/__tests__.wip/crop.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__crop) => {
      describe("sugar.js.string.crop", () => {
        it("Should process the passed string correctly", (done) => {
          expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
            splitWords: true
          })).toBe("<span>Lorem Ipsum is</span> simply dum...");
          expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
            splitWords: false,
            chars: "_-_"
          })).toBe("<span>Lorem Ipsum is</span> simply_-_");
          done();
        });
      });
    };
  }
});
export default require_crop();

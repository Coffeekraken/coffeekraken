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
var require_gravatarUrl = __commonJS({
  "packages/tools/sugar/src/shared/url/__tests__.wip/gravatarUrl.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__gravatarUrl) => {
      describe("sugar.js.url.gravatarUrl", () => {
        it("Should correctly generate the gravatar url", () => {
          expect(__gravatarUrl("olivier.bossel@gmail.com", 200)).toBe("https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f?s=200");
        });
      });
    };
  }
});
export default require_gravatarUrl();

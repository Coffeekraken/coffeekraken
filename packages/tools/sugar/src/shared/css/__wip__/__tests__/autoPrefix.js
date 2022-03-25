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
var require_autoPrefix = __commonJS({
  "packages/tools/sugar/src/shared/css/__wip__/__tests__/autoPrefix.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__autoPrefix) => {
      describe("sugar.js.css.autoPrefix", () => {
        const style = `
      .hello {
        transition: '200ms all linear',
        boxSizing: 'border-box',
        display: 'flex',
        color: 'blue'

        &:after {
          content: 'coco';
        }
      }

      .plop {
        content: 'hehehe';
      }

    `;
        it("Should prefix correctly the passed style string", () => {
          console.log(__autoPrefix(style));
        });
      });
    };
  }
});
export default require_autoPrefix();

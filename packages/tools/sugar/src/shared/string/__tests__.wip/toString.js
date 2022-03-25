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
var require_toString = __commonJS({
  "packages/tools/sugar/src/shared/string/__tests__.wip/toString.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__toString) => {
      describe("sugar.js.string.toString", () => {
        it("Should process the passed string correctly", (done) => {
          const date = new Date();
          const dateString = date.toString();
          expect(__toString(true)).toBe("true");
          expect(__toString(false)).toBe("false");
          expect(__toString({
            hello: "world"
          })).toBe('{"hello":"world"}');
          expect(__toString(function helloWorld() {
          })).toBe("function helloWorld() {}");
          expect(__toString(date)).toBe(dateString);
          expect(__toString([
            "hello",
            "world"
          ])).toBe('["hello","world"]');
          expect(__toString(/(.*)/gm)).toBe("/(.*)/gm");
          expect(__toString(10)).toBe("10");
          expect(__toString(null)).toBe("null");
          expect(__toString(void 0)).toBe("undefined");
          done();
        });
      });
    };
  }
});
export default require_toString();

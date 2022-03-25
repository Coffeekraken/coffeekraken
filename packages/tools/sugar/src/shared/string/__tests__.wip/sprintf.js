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
var require_sprintf = __commonJS({
  "packages/tools/sugar/src/shared/string/__tests__.wip/sprintf.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__sprintf) => {
      describe("sugar.js.string.sprintf", () => {
        it("Should process the passed string correctly", (done) => {
          const res1 = __sprintf("Hello %s", "world");
          const res2 = __sprintf("Hello %s, I'm %s", "world", "John Doe");
          const res4 = __sprintf("Hello %(first)s, I'm %(name)s", { first: "world", name: "John Doe" });
          expect(res1).toBe("Hello world");
          expect(res2).toBe("Hello world, I'm John Doe");
          expect(res4).toBe("Hello world, I'm John Doe");
          done();
        });
      });
    };
  }
});
export default require_sprintf();

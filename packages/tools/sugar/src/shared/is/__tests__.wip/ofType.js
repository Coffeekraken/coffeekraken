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
var require_ofType = __commonJS({
  "packages/tools/sugar/src/shared/is/__tests__.wip/ofType.ts"(exports, module) {
    init_esm_shims();
    const __SLog = require("../../../node/log/SLog");
    module.exports = (__isOfType) => {
      describe("sugar.js.is.ofType", () => {
        it("Should detect the type of passed values correctly", () => {
          expect(__isOfType(true, "Boolean")).toBe(true);
          expect(__isOfType(["item1"], "Array")).toBe(true);
          expect(__isOfType({ property1: "hello" }, "Object")).toBe(true);
          expect(__isOfType(12, "Number")).toBe(true);
          expect(__isOfType(12.34, "Number")).toBe(true);
          expect(__isOfType(12, "Integer")).toBe(true);
          expect(__isOfType(12.34, "Integer")).toEqual({
            expected: { type: "Integer" },
            received: { type: "Number", value: 12.34 },
            issues: ["type"]
          });
          expect(__isOfType("Hello world", "String")).toBe(true);
          expect(__isOfType([10, 20, 45], "Array<Number>")).toBe(true);
          expect(__isOfType([10, "20", 45], "Array<Number>")).toEqual({
            expected: { type: "Array<Number>" },
            received: { type: "Array<Integer|String>", value: [10, "20", 45] },
            issues: ["type"]
          });
          expect(__isOfType([
            {
              something: "cool"
            }
          ], "Array<Object>")).toBe(true);
          expect(__isOfType(__SLog, "SLog")).toBe(true);
          expect(__isOfType([__SLog], "Array<SLog>")).toBe(true);
          expect(__isOfType({
            something: __SLog
          }, "Object<SLog>")).toBe(true);
          expect(__isOfType({
            something: "Hello world"
          }, "Object<SLog>")).toEqual({
            expected: { type: "Object<SLog>" },
            received: {
              type: "Object<String>",
              value: { something: "Hello world" }
            },
            issues: ["type"]
          });
        });
      });
    };
  }
});
export default require_ofType();

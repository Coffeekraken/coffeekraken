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
var require_typeDefinitionArrayObjectToString = __commonJS({
  "packages/tools/sugar/src/shared/value/__tests__.wip/typeDefinitionArrayObjectToString.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__typeDefinitionArrayObjectToString) => {
      describe("sugar.js.value.typeDefinitionArrayObjectToString", () => {
        it("Should return the correct typeDefinitionArrayObjectToString of the passed values", () => {
          expect(__typeDefinitionArrayObjectToString([
            {
              type: "Array",
              of: [
                {
                  type: "Boolean"
                },
                {
                  type: "String"
                }
              ]
            }
          ])).toEqual("Array<Boolean|String>");
          expect(__typeDefinitionArrayObjectToString([
            {
              type: "Array",
              of: [
                {
                  type: "Boolean"
                },
                {
                  type: "String"
                }
              ]
            },
            {
              type: "Object",
              of: [
                {
                  type: "Number"
                },
                {
                  type: "String"
                }
              ]
            }
          ])).toEqual("Array<Boolean|String>|Object<Number|String>");
        });
      });
    };
  }
});
export default require_typeDefinitionArrayObjectToString();

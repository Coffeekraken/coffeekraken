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
var require_argsToObject = __commonJS({
  "packages/tools/sugar/src/shared/cli/__tests__.wip/argsToObject.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__argsToObject) => {
      describe("sugar.js.cli.argsToObject", () => {
        it("Should process the passed args object correctly", (done) => {
          const object = __argsToObject("-a Yop", {
            arg1: {
              type: "String",
              description: "Something",
              alias: "a",
              default: "Plop"
            },
            boolArg: {
              type: "Boolean",
              description: "Something",
              alias: "b",
              default: false
            },
            objArg: {
              type: "Object",
              description: "Something",
              default: {}
            },
            arrayArg: {
              type: "Array",
              description: "Something"
            }
          });
          expect(object).toEqual({ arg1: "Yop", boolArg: false, objArg: {} });
          done();
        });
      });
    };
  }
});
export default require_argsToObject();

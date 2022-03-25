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
var require_argsToString = __commonJS({
  "packages/tools/sugar/src/shared/cli/__tests__.wip/argsToString.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__argsToString) => {
      describe("sugar.js.cli.argsToString", () => {
        it("Should process the passed args object correctly", (done) => {
          const string = __argsToString({
            arg1: "Hello world",
            boolArg: true,
            objArg: {
              content: "Nelson"
            },
            arrayArg: ["item0", "item 1", "item 2"]
          }, {
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
          expect(string).toBe(`-a "Hello world" -b  --objArg "{'content':'Nelson'}" --arrayArg "['item0','item 1','item 2']"`);
          done();
        });
      });
    };
  }
});
export default require_argsToString();

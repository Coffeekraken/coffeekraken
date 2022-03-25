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
var require_parseSchema = __commonJS({
  "packages/tools/sugar/src/shared/url/__tests__.wip/parseSchema.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__parseSchema) => {
      describe("sugar.js.url.parseSchema", () => {
        it("Should correctly parse the passed url using the passed schema", () => {
          const res = __parseSchema("https://github.com/myApp/master/3", "{project:string}/{?branch:string}/{?idx:number}");
          expect(res).toEqual({
            match: true,
            errors: null,
            params: {
              project: {
                optional: false,
                raw: "{project:string}",
                type: "string",
                value: "myApp"
              },
              branch: {
                optional: true,
                raw: "{?branch:string}",
                type: "string",
                value: "master"
              },
              idx: {
                optional: true,
                raw: "{?idx:number}",
                type: "number",
                value: 3
              }
            },
            schema: "{project:string}/{?branch:string}/{?idx:number}",
            url: "https://github.com/myApp/master/3"
          });
        });
      });
    };
  }
});
export default require_parseSchema();

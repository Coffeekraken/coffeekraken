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
var require_diff = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/diff.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__diff) => {
      describe("sugar.js.object.diff", () => {
        it("Should merge the passed objects correctly", (done) => {
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: {
              yop: "coco"
            },
            param: {
              three: "nelson"
            },
            yes: true
          };
          const obj2 = {
            hello: {
              coco: "coco"
            },
            param: {
              three: "nelson",
              nelson: {
                coco: "eating"
              }
            },
            added: "value",
            yes: false
          };
          const result = __diff(obj1, obj2);
          expect(result).toEqual({
            hello: {
              coco: "coco"
            },
            param: {
              nelson: {
                coco: "eating"
              }
            },
            added: "value",
            yes: false
          });
          const result2 = __diff(obj1, obj2, {
            added: false
          });
          expect(result2).toEqual({
            yes: false
          });
          const result3 = __diff(obj1, obj2, {
            deleted: true
          });
          expect(result3).toEqual({
            hello: {
              world: "hello world",
              coco: "coco"
            },
            plop: {
              yop: "coco"
            },
            param: {
              nelson: {
                coco: "eating"
              }
            },
            added: "value",
            yes: false
          });
          const result4 = __diff(obj1, obj2, {
            equals: true
          });
          expect(result4).toEqual({
            hello: {
              coco: "coco"
            },
            param: {
              three: "nelson",
              nelson: {
                coco: "eating"
              }
            },
            added: "value",
            yes: false
          });
          const result5 = __diff(obj1, obj2, {
            updated: false
          });
          expect(result5).toEqual({
            hello: {
              coco: "coco"
            },
            param: {
              nelson: {
                coco: "eating"
              }
            },
            added: "value"
          });
          done();
        });
      });
    };
  }
});
export default require_diff();

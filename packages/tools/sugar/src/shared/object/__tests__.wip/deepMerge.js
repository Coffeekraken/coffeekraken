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
var require_deepMerge = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/deepMerge.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__deepMerge) => {
      describe("sugar.js.object.deepMerge", () => {
        it("Should merge the passed objects correctly", (done) => {
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: {}
          };
          const obj2 = {
            hello: {
              coco: "coco"
            },
            yes: true
          };
          const result = __deepMerge(obj1, obj2);
          expect(result).toEqual({
            hello: {
              world: "hello world",
              coco: "coco"
            },
            plop: {},
            yes: true
          });
          done();
        });
        it("Should merge the passed objects with some classes instances correctly", (done) => {
          class MyClass {
            constructor(value) {
              this.classParam1 = "hello";
              this.classParam2 = false;
              this.value = value;
            }
          }
          const myObj = new MyClass("MyClass");
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: myObj
          };
          const obj2 = {
            hello: {
              coco: "coco"
            },
            plop: {
              param1: true
            },
            yes: true
          };
          const result = __deepMerge(obj1, obj2);
          expect(result).toEqual({
            hello: {
              world: "hello world",
              coco: "coco"
            },
            plop: {
              param1: true
            },
            yes: true
          });
          done();
        });
        it("Should leave the class instances and don's touch them", (done) => {
          class MyClass {
            constructor(value) {
              this.classParam1 = "hello";
              this.classParam2 = false;
              this.value = value;
            }
          }
          const myObj = new MyClass("MyClass");
          const obj1 = {
            hello: {
              world: "hello world"
            },
            plop: myObj
          };
          const obj2 = {
            hello: {
              coco: "coco"
            },
            yes: true
          };
          const result = __deepMerge(obj1, obj2);
          expect(result.plop instanceof MyClass).toBe(true);
          done();
        });
        it("Should merge the passed objects with some array correctly", (done) => {
          const obj1 = {
            plop: ["a", "b", "c"],
            hello: "world"
          };
          const obj2 = {
            plop: ["a", "b", "d", "e"],
            hello: "world"
          };
          expect(__deepMerge(obj1, obj2)).toEqual(obj2);
          expect(__deepMerge(obj1, obj2, {
            array: true
          })).toEqual({
            plop: ["a", "b", "c", "d", "e"],
            hello: "world"
          });
          done();
        });
      });
    };
  }
});
export default require_deepMerge();

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
var require_delete = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/delete.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__delete) => {
      describe("sugar.js.object.delete", () => {
        it("Should delete correctly a simple property", () => {
          const obj = {
            hello: {
              world: "plop"
            },
            plop: "yop"
          };
          expect(__delete(obj, "hello.world")).toEqual({
            hello: {},
            plop: "yop"
          });
        });
        it("Should delete correctly a property in an array", () => {
          const obj = {
            hello: {
              world: ["one", "two", "three", "four", "five"]
            },
            plop: "yop"
          };
          const deletedObj = __delete(obj, "hello.world.1");
          expect(deletedObj).toEqual({
            hello: {
              world: ["one", "three", "four", "five"]
            },
            plop: "yop"
          });
        });
        it("Should delete correctly a property in an object that is inside an array", () => {
          const obj = {
            hello: {
              world: ["one", "two", {
                coco: "yeah",
                del: {
                  branch: "master"
                }
              }, "four", "five"]
            },
            plop: "yop"
          };
          const deletedObj = __delete(obj, "hello.world.2.del.branch");
          expect(deletedObj).toEqual({
            hello: {
              world: ["one", "two", {
                coco: "yeah",
                del: {}
              }, "four", "five"]
            },
            plop: "yop"
          });
        });
        it("Should delete correctly a property in an array that is inside another array", () => {
          const obj = {
            hello: {
              world: ["one", "two", [
                "01",
                "02",
                "03",
                "04"
              ], "four", "five"]
            },
            plop: "yop"
          };
          const deletedObj = __delete(obj, "hello.world.2.1");
          expect(deletedObj).toEqual({
            hello: {
              world: ["one", "two", [
                "01",
                "03",
                "04"
              ], "four", "five"]
            },
            plop: "yop"
          });
        });
      });
    };
  }
});
export default require_delete();

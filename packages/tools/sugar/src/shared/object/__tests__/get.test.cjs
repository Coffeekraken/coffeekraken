var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_get = __toESM(require("../get"));
describe("sugar.js.object.get", () => {
  it("Should get the object property correctly", (done) => {
    const obj1 = {
      hello: {
        world: "hello world"
      },
      plop: {
        array: [0, 1, 2]
      }
    };
    const val1 = (0, import_get.default)(obj1, "hello.world");
    const val2 = (0, import_get.default)(obj1, "plop.array.2");
    expect(val1).toBe("hello world");
    expect(val2).toBe(2);
    done();
  });
  it("Should get the object property under an optional one", (done) => {
    const obj1 = {
      hello: {
        world: "hello world"
      },
      plop: {
        array: [0, 1, 2]
      }
    };
    const obj2 = {
      hello: {
        coco: {
          world: "cc"
        },
        world: "hello world"
      },
      plop: {
        array: [0, 1, 2]
      }
    };
    const obj3 = {
      hello: {
        world: "xxx",
        ":coco": {
          world: "cc"
        }
      },
      plop: {
        array: [0, 1, 2]
      }
    };
    expect((0, import_get.default)(obj1, "hello.something?.world")).toBe("hello world");
    expect((0, import_get.default)(obj2, "hello.coco?.world")).toBe("cc");
    expect((0, import_get.default)(obj3, "hello.plop?.:coco?.world")).toBe("cc");
    done();
  });
});

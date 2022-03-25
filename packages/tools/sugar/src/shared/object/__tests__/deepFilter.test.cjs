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
var import_deepFilter = __toESM(require("../deepFilter"));
describe("sugar.shared.object.deepFilter", () => {
  it("Should apply a simple filter correctly", (done) => {
    const myObj = {
      myValue: "Hello",
      sub: {
        myOtherValue: "plop"
      }
    };
    const applied = (0, import_deepFilter.default)(myObj, ({ key, value, isObject }) => {
      if (value == null ? void 0 : value.myOtherValue)
        return true;
      return true;
    });
    expect(applied).toEqual({
      myValue: "Hello",
      sub: {
        myOtherValue: "plop"
      }
    });
    done();
  });
  it("Should apply a slightly more complex filter correctly", (done) => {
    const obj = {
      myValue: "Hello",
      sub: {
        doNotKeep: true,
        myOtherValue: "plop"
      },
      sub2: {
        sub3: {
          somethingToKeep: "plop",
          doNotKeep: false
        },
        middleValue: "hello"
      }
    };
    const applied = (0, import_deepFilter.default)(obj, ({ key, value, isObject }) => {
      if (key === "doNotKeep")
        return false;
      if (isObject)
        return;
      return true;
    });
    expect(applied).toEqual({
      myValue: "Hello",
      sub: {
        myOtherValue: "plop"
      },
      sub2: {
        sub3: {
          somethingToKeep: "plop"
        },
        middleValue: "hello"
      }
    });
    done();
  });
});

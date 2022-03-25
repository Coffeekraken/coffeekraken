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
var import_applyScope = __toESM(require("../applyScope"));
describe("sugar.shared.object.applyScope", () => {
  it("Should apply a simple scope correctly", (done) => {
    const myObj = {
      myValue: "Hello",
      "@dev": {
        myValue: "World"
      },
      "@cool": {
        plop: "yop"
      }
    };
    const applied = (0, import_applyScope.default)(myObj, ["dev"]);
    const notApplied = (0, import_applyScope.default)(myObj, ["prod"]);
    expect(applied).toEqual({
      myValue: "World"
    });
    expect(notApplied).toEqual({
      myValue: "Hello"
    });
    done();
  });
  it("Should apply a simple scope on a nested object correctly", (done) => {
    const myObj = {
      myValue: "Hello",
      something: {
        else: "plop"
      },
      "something@dev": {
        else: "haha"
      }
    };
    const applied = (0, import_applyScope.default)(myObj, ["dev"]);
    expect(applied).toEqual({
      myValue: "Hello",
      something: {
        else: "haha"
      }
    });
    done();
  });
  it("Should apply a simple scope on a nested deep object correctly", (done) => {
    const myObj = {
      myValue: "Hello",
      something: {
        else: "plop"
      },
      "something@dev": {
        else: "haha",
        "@dev": {
          else: "youhou"
        }
      }
    };
    const applied = (0, import_applyScope.default)(myObj, ["dev"]);
    expect(applied).toEqual({
      myValue: "Hello",
      something: {
        else: "youhou"
      }
    });
    done();
  });
  it("Should apply a simple scope on a non object property correctly", (done) => {
    const myObj = {
      myValue: "Hello",
      "myValue@dev": "Plop"
    };
    const applied = (0, import_applyScope.default)(myObj, ["dev"]);
    expect(applied).toEqual({
      myValue: "Plop"
    });
    done();
  });
});

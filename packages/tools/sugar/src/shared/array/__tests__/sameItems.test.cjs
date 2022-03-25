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
var import_sameItems = __toESM(require("../sameItems"));
describe("@coffeekraken.sugar.shared.array.sameItems", () => {
  it("Should extract same items in simple number array", () => {
    const res = (0, import_sameItems.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7]);
    expect(res).toEqual([1, 3, 5]);
  });
  it("Should extract same items in simple string array", () => {
    const res = (0, import_sameItems.default)(["hello", "world", "plop", "coco"], ["world", "coco"]);
    expect(res).toEqual(["world", "coco"]);
  });
  it("Should extract same items in array of objects", () => {
    const res = (0, import_sameItems.default)([{
      hello: "world"
    }, {
      plop: "world"
    }, {
      coco: "world"
    }], [{
      hello1: "world"
    }, {
      plop: "world"
    }, {
      something: "wrong"
    }]);
    expect(res).toEqual([{
      plop: "world"
    }]);
  });
  it("Should extract same items in more that 2 arrays in simple number array", () => {
    const res = (0, import_sameItems.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7], [1, 5, 6]);
    expect(res).toEqual([1, 5]);
  });
  it("Should extract same items in array of objects and hashes disabled", () => {
    const plopObj = {
      plop: "world"
    };
    const res = (0, import_sameItems.default)([{
      hello: "world"
    }, plopObj, {
      coco: "world"
    }], [{
      hello1: "world"
    }, plopObj, {
      something: "wrong"
    }], {
      hash: false
    });
    expect(res).toEqual([plopObj]);
  });
});

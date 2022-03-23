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
var import_SColor = __toESM(require("../SColor"), 1);
describe("s-color.shared", () => {
  it("Should parse and return the same color when passing hexa value in", () => {
    const color = new import_SColor.default("#ff00ff");
    expect(color.toString()).toBe("#FF00FF");
  });
  it("Should parse and return the same color when passing hsl value in", () => {
    const color = new import_SColor.default("hsl(257,25,50)");
    expect(color.toString()).toBe("#72609F");
  });
});

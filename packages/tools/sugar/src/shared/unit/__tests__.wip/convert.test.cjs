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
var import_convert = __toESM(require("../convert"), 1);
describe("sugar.js.unit.convert", () => {
  document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should convert the passed em value to px correctly", () => {
    expect((0, import_convert.default)("2em", "px", $elm)).toBe(20);
  });
  it("Should convert the passed rem value to px correctly", () => {
    expect((0, import_convert.default)("2rem", "px")).toBe(32);
  });
  it("Should convert the passed px value to em correctly", () => {
    expect((0, import_convert.default)("20px", "em", $elm)).toBe(2);
  });
  it("Should convert the passed px value to em correctly", () => {
    expect((0, import_convert.default)("32px", "rem")).toBe(2);
  });
});

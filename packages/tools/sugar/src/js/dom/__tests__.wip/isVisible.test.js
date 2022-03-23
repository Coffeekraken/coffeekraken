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
var import_isVisible = __toESM(require("../isVisible"), 1);
describe("sugar.js.dom.isVisible", () => {
  document.body.innerHTML = `
      <style>
        #testing {
          display: none;
        }
      </style>
      <div id="testing">
      </div>
      <div id="testing1"></div>
  `;
  const $elm = document.querySelector("#testing");
  const $elm1 = document.querySelector("#testing1");
  it("Should detect that the div #testing is not visible", () => {
    expect((0, import_isVisible.default)($elm)).toBe(false);
  });
  it("Should detect that the div #testing1 is visible", () => {
    expect((0, import_isVisible.default)($elm1)).toBe(true);
  });
});

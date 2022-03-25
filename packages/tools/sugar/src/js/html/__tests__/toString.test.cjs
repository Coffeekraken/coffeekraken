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
var import_toString = __toESM(require("../toString"));
describe("sugar.js.html.toString", () => {
  const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
  document.body.innerHTML = html;
  const $elm = document.querySelector("bold");
  const res = (0, import_toString.default)($elm);
  it("Should have transform the dom element to a string correctly", () => {
    expect(res).toBe("<bold>Hello world</bold>");
  });
});

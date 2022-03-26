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
var import_nodeIndex = __toESM(require("../utlls/nodeIndex"), 1);
describe("sugar.js.dom.nodeIndex", () => {
  document.body.innerHTML = `
      
      <div></div>
      <div></div>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should return 2 as node index for the #testing node", () => {
    expect((0, import_nodeIndex.default)($elm)).toBe(2);
  });
});

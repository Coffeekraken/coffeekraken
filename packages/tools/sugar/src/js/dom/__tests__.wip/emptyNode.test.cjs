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
var import_emptyNode = __toESM(require("../manipulate/emptyNode"), 1);
describe("sugar.js.dom.emptyNode", () => {
  document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
        </div>
        <div id="source"></div>
      </div>
  `;
  const $elm = document.querySelector("#testing");
  (0, import_emptyNode.default)($elm);
  it("Should have empty the node correctly", () => {
    expect($elm.childNodes.length).toBe(0);
  });
});

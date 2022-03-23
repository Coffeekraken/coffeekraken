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
var import_observeMutations = __toESM(require("../observeMutations"), 1);
describe("sugar.js.dom.observeMutations", () => {
  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  let mutationsCount = 0;
  (0, import_observeMutations.default)($elm).then((mutation) => {
    if (mutation.attributeName === "plop" || mutation.attributeName === "hello") {
      mutationsCount++;
    }
  });
  $elm.setAttribute("plop", "coco");
  $elm.setAttribute("hello", "world");
  it("Should have detect all the mutations done on the $elm", () => {
    setTimeout(() => {
      expect(mutationsCount).toBe(2);
    });
  });
});

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
var import_dispatchEvent = __toESM(require("../event/dispatchEvent"));
describe("sugar.js.dom.dispatchEvent", () => {
  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  let isDetected = false;
  $elm.addEventListener("coco", (e) => {
    if (!e.detail.custom)
      return;
    isDetected = true;
  });
  (0, import_dispatchEvent.default)($elm, "coco", {
    custom: true
  });
  it("Should detect the dispatched custom event with custom data attached", () => {
    expect(isDetected).toBe(true);
  });
});

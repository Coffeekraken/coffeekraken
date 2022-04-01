import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var import_detectInOutDirection = __toESM(require("../detection/detectInOutDirection"), 1);
var import_dispatchEvent = __toESM(require("../event/dispatchEvent"), 1);
describe("sugar.js.dom.detectInOutDirection", () => {
  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  let isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
  (0, import_detectInOutDirection.default)($elm).on("in", (direction) => {
    isInTriggered = true;
  }).on("out", (direction) => {
    isOutTriggered = true;
  }).then((value) => {
    isThenTriggered = true;
  });
  (0, import_dispatchEvent.default)($elm, "mouseenter");
  (0, import_dispatchEvent.default)($elm, "mouseleave");
  it('Should have trigger the "in" stack correctly', () => {
    setTimeout(() => {
      expect(isInTriggered).toBe(true);
    });
  });
  it('Should have trigger the "out" stack correctly', () => {
    setTimeout(() => {
      expect(isOutTriggered).toBe(true);
    });
  });
  it('Should have trigger the "then" stack correctly', () => {
    setTimeout(() => {
      expect(isThenTriggered).toBe(true);
    });
  });
});

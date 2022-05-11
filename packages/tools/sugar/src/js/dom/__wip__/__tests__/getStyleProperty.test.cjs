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
var import_getStyleProperty = __toESM(require("../style/getStyleProperty"), 1);
describe("sugar.js.dom.getStyleProperty", () => {
  document.body.innerHTML = `
      <style>
          #testing {
            content: 'hello world';
            animation: coco 2s ease-in-out 3s;
          }
      </style>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  it('Should get the "content" css property correctly', () => {
    expect((0, import_getStyleProperty.default)($elm, "content")).toBe("hello world");
  });
  it('Should get the "animation" css property correctly', () => {
    expect((0, import_getStyleProperty.default)($elm, "animation")).toBe("coco 2s ease-in-out 3s");
  });
});

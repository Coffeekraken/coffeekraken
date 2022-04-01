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
var import_getAnimationProperties = __toESM(require("../style/getAnimationProperties"), 1);
describe("sugar.js.dom.getAnimationProperties", () => {
  document.body.innerHTML = `
  <style>
    @keyframes coco {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    #testing {
      animation: coco 2s ease-in-out;
      animation-name: coco;
    }
  </style>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  const props = (0, import_getAnimationProperties.default)($elm);
  it('Should find the "testing" element that is up in the dom tree', () => {
  });
});

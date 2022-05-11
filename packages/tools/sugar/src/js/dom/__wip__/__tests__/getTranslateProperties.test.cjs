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
var import_getTranslateProperties = __toESM(require("../style/getTranslateProperties"), 1);
describe("sugar.js.dom.getTranslateProperties", () => {
  document.body.innerHTML = `
    <style>
      #testing-matrix {
        transform: matrix(1.00,0.00,0.00,1.00,10,20);
      }
      #testing-matrix3d {
        transform: matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,10,20,30,1);
      }
      #testing-translate3d {
        transform: translate3d(12px, 50%, 3em);
      }
      #testing-translate {
        transform: translate(20px, 2rem);
      }
      #testing-default {
        transform: translateX(3rem) translateY(10px) translateZ(20%);
      }
      </style>
      <div id="testing-matrix">
      </div>
      <div id="testing-matrix3d">
      </div>
      <div id="testing-translate3d">
      </div>
      <div id="testing-translate">
      </div>
      <div id="testing-default">
      </div>
  `;
  const $elmMatrix = document.querySelector("#testing-matrix");
  const $elmMatrix3d = document.querySelector("#testing-matrix3d");
  const $elmtranslate3d = document.querySelector("#testing-translate3d");
  const $elmTranslate = document.querySelector("#testing-translate");
  const $elmDefault = document.querySelector("#testing-default");
  it("Should get the translate properties from a matrix css declaration", () => {
    const translate = (0, import_getTranslateProperties.default)($elmMatrix);
    expect(translate).toEqual({
      x: 10,
      y: 20,
      z: 0
    });
  });
  it("Should get the translate properties from a matrix3d css declaration", () => {
    const translate = (0, import_getTranslateProperties.default)($elmMatrix3d);
    expect(translate).toEqual({
      x: 10,
      y: 20,
      z: 30
    });
  });
  it("Should get the translate properties from a translate3d css declaration", () => {
    const translate = (0, import_getTranslateProperties.default)($elmtranslate3d);
    expect(translate).toEqual({
      x: 12,
      y: "50%",
      z: 48
    });
  });
  it("Should get the translate properties from a translate css declaration", () => {
    const translate = (0, import_getTranslateProperties.default)($elmTranslate);
    expect(translate).toEqual({
      x: 20,
      y: 32,
      z: 0
    });
  });
  it("Should get the translate properties from a default translateX, translateY and translateZ css declaration", () => {
    const translate = (0, import_getTranslateProperties.default)($elmDefault);
    expect(translate).toEqual({
      x: 48,
      y: 10,
      z: "20%"
    });
  });
});

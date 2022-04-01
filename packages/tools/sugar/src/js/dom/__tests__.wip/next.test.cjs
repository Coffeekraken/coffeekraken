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
var import_next = __toESM(require("../query/next"), 1);
describe("sugar.js.dom.next", () => {
  document.body.innerHTML = `
      <div id="testing"></div>
      <div id="next1"></div>
      <div id="next2"></div>
  `;
  const $elm = document.querySelector("#testing");
  const $next2 = document.querySelector("#next2");
  const $finded = (0, import_next.default)($elm, "#next2");
  it("Should find the $next2 element from the $testing one", () => {
    expect($finded).toEqual($next2);
  });
});

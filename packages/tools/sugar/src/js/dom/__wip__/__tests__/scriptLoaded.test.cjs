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
var import_scriptLoaded = __toESM(require("../scriptLoaded"), 1);
describe("sugar.js.dom.scriptLoaded", () => {
  document.head.innerHTML = `
    <script type="text/javascript" src="src/data/tests/testing.js"><\/script>
  `;
  const $elm = document.head.querySelector("script");
  let isLoaded = false, isError = false;
  (0, import_scriptLoaded.default)($elm).then(() => {
    isLoaded = true;
  }).catch((e) => {
    isError = true;
  });
  it("Should detect the script loading complete state", () => {
    $elm.onload();
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});

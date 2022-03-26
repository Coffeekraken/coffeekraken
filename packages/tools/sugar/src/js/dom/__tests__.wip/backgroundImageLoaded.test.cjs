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
var import_backgroundImageLoaded = __toESM(require("../load/backgroundImageLoaded"), 1);
var import_dispatchEvent = __toESM(require("../event/dispatchEvent"), 1);
describe("sugar.js.dom.backgroundImageLoaded", () => {
  document.body.innerHTML = `
    <style>
      .testing {
        background-image: url('/test.jpg');
      }
    </style>
    <div id="testing" class="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  let isLoaded = false, isError = false;
  const promise = (0, import_backgroundImageLoaded.default)($elm).then(() => {
    isLoaded = true;
  }).catch((e) => {
    isError = true;
  });
  (0, import_dispatchEvent.default)(promise.__$img, "load");
  it("Should detect the background image loading complete state", () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});

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
var import_matches = __toESM(require("../query/matches"), 1);
describe("sugar.js.dom.matches", () => {
  document.body.innerHTML = `
      <div id="testing" class="hello-world coco">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should return true on the match testing", () => {
    expect((0, import_matches.default)($elm, ".hello-world, .coco")).toBe(true);
  });
  it("Should return false on the match testing", () => {
    expect((0, import_matches.default)($elm, ".hello-wold, .coco")).toBe(true);
  });
});

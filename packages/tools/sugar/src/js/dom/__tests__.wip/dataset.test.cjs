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
var import_dataset = __toESM(require("../data/dataset"), 1);
describe("sugar.js.dom.dataset", () => {
  document.body.innerHTML = `
      <div id="testing" data-coco="hello"></div>
      <div id="testing1" data-plop="{hello:'coco'}"></div>
      
  `;
  const $testing = document.querySelector("#testing");
  const $testing1 = document.querySelector("#testing1");
  (0, import_dataset.default)($testing1, "json", {
    hello: "world"
  });
  it("Should get correctly the data-coco value from the attributes", () => {
    expect((0, import_dataset.default)($testing, "coco")).toBe("hello");
  });
  it('Should get correctly the data "json" value from the dataset stack', () => {
    expect((0, import_dataset.default)($testing1, "json")).toEqual({
      hello: "world"
    });
  });
  it('Should get correctly the data "plop" value from the attributes', () => {
    expect((0, import_dataset.default)($testing1, "plop")).toEqual({
      hello: "coco"
    });
  });
});

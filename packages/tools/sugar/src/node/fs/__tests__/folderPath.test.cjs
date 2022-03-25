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
var import_folderPath = __toESM(require("../folderPath"));
describe("sugar.node.fs.folderPath", () => {
  it("Should get a simple folder path correctly", () => {
    const path = (0, import_folderPath.default)(`${__dirname}/data/file.jpg`);
    expect(path).toBe(`${__dirname}/data`);
  });
  it("Should return false when checking for a non existing folder", () => {
    const path = (0, import_folderPath.default)(`${__dirname}/data/file111.jpg`, true);
    expect(path).toBe(false);
  });
});

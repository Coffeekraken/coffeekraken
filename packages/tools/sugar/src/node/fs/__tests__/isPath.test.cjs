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
var import_isPath = __toESM(require("../isPath"), 1);
describe("sugar.node.fs.isPath", () => {
  it("Should detect that a valid path is a valid path", () => {
    expect((0, import_isPath.default)("/my/cool/path.png")).toBe(true);
  });
  it("Should detect that a simple file path is a valid path", () => {
    expect((0, import_isPath.default)("path.png")).toBe(true);
  });
  it("Should return true when checking for a valid path that exists", () => {
    expect((0, import_isPath.default)(`${__dirname}/data/file.jpg`, true)).toBe(true);
  });
  it("Should return false when checking for a valid path that does not exists", () => {
    expect((0, import_isPath.default)(`${__dirname}/data/file22232323.jpg`, true)).toBe(false);
  });
  it("Should detect that passing null is not a valid path", () => {
    expect((0, import_isPath.default)(null)).toBe(false);
  });
});

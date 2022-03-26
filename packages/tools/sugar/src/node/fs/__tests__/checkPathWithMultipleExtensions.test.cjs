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
var import_checkPathWithMultipleExtensions = __toESM(require("../checkPathWithMultipleExtensions"), 1);
describe("sugar.node.fs.checkPathWithMultipleExtensions", () => {
  it("Should find a file with multiple extensions given", async () => {
    const filePath = (0, import_checkPathWithMultipleExtensions.default)(`${__dirname}/data/file.mkv`, [
      "css",
      "js",
      "txt"
    ]);
    expect(filePath).toBe(`${__dirname}/data/file.txt`);
  });
});

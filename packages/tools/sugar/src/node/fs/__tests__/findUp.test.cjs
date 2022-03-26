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
var import_findUp = __toESM(require("../findUp"), 1);
describe("sugar.node.fs.findUp", () => {
  it("Should find a simple file upward correctly", async () => {
    const res = await (0, import_findUp.default)("file.jpg", {
      cwd: `${__dirname}/data/subfolder`
    });
    expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
  });
  it("Should find some files upward using glob correctly", async () => {
    const res = await (0, import_findUp.default)("file.*", {
      cwd: `${__dirname}/data/subfolder`
    });
    expect(res.length).toBe(3);
  });
});

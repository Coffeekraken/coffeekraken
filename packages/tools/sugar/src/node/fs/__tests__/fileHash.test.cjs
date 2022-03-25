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
var import_fileHash = __toESM(require("../fileHash"));
describe("sugar.node.fs.fileHash", () => {
  it("Should a simple file correctly", () => {
    const hash = (0, import_fileHash.default)(`${__dirname}/data/3cb8876846e7c0e13896d23496ff7ac2.gif`);
    expect(hash).toBe("o8qZgS5PxHPPNasVn3Be0lvxK7mtKaMVgUtTntgS7Pw=");
  });
});

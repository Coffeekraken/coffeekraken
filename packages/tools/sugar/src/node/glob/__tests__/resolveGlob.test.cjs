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
var import_resolveGlob = __toESM(require("../resolveGlob"));
describe("sugar.node.glob.resolveGlob", () => {
  it("Should resolve the passed glob correctly", (done) => {
    const files = (0, import_resolveGlob.default)(`data/**/*`, {
      cwd: __dirname
    });
    const file = files[0];
    expect(file.path.includes("src/node/glob/__tests__/data/myCoolData.txt")).toBe(true);
    expect(file.cwd.includes("src/node/glob/__tests__")).toBe(true);
    expect(file.relPath).toBe("data/myCoolData.txt");
    done();
  });
});

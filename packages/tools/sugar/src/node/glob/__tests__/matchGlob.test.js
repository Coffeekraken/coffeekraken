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
var import_matchGlob = __toESM(require("../matchGlob"), 1);
describe("sugar.node.glob.matchGlob", () => {
  it("Should resolve the passed glob correctly", async () => {
    const match = (0, import_matchGlob.default)("data/myCoolData.txt", `data/**/*`, {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
  it("Should resolve the passed glob with a content regex correctly", async () => {
    const match = (0, import_matchGlob.default)("data/myCoolData.txt", `data/**/*:/.*@namespace.*/gm`, {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
  it("Should not match the passed glob with a incorrect content regex correctly", async () => {
    const match = (0, import_matchGlob.default)("data/myCoolData.txt", `data/**/*:/.*@naspace.*/gm`, {
      cwd: __dirname
    });
    expect(match).toBe(false);
  });
  it("Should not match the passed glob with a correct and incorrect content regex correctly", async () => {
    const match = (0, import_matchGlob.default)("data/myCoolData.txt", [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`], {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
});

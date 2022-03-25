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
var import_SFile = __toESM(require("../SFile"), 1);
describe("s-file.SFile", () => {
  it("Should instanciate correctly a simple json file", () => {
    const file = new import_SFile.default(`${__dirname}/test.json`);
    const json = file.toObject();
    expect(json.exists).toBe(true);
    expect(json.extension).toBe("json");
    expect(json.content).toEqual({
      something: "cool"
    });
    expect(json.path).not.toBeUndefined();
    expect(json.cwd).not.toBeUndefined();
    expect(json.dirPath).not.toBeUndefined();
    expect(json.stats).not.toBeUndefined();
    expect(json.relPath).toBe("packages/core/s-file/src/node/__tests__/test.json");
    expect(json.name).toBe("test.json");
  });
});

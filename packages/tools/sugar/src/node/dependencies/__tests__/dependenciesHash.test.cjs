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
var import_dependenciesHash = __toESM(require("../dependenciesHash"));
var import_dirname = __toESM(require("../../fs/dirname"));
describe("sugar.node.dependencies.dependenciesHash", () => {
  it("Should generate the same dependency hash for the same dependencies object", async () => {
    const hash1 = await (0, import_dependenciesHash.default)({
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await (0, import_dependenciesHash.default)({
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
  it("Should generate the same dependency hash for the same dependencies object without recursiveness", async () => {
    const hash1 = await (0, import_dependenciesHash.default)({
      files: [`${(0, import_dirname.default)()}/data/image1.png`],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await (0, import_dependenciesHash.default)({
      files: [`${(0, import_dirname.default)()}/data/image1.png`],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
  it("Should generate the same dependency hash for the same dependencies object with recursiveness", async () => {
    const hash1 = await (0, import_dependenciesHash.default)({
      files: [
        `${(0, import_dirname.default)()}/data/image1.png`,
        `${(0, import_dirname.default)()}/data/testIndex.js`
      ],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await (0, import_dependenciesHash.default)({
      files: [
        `${(0, import_dirname.default)()}/data/image1.png`,
        `${(0, import_dirname.default)()}/data/testIndex.js`
      ],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
});

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
var import_loadConfigFile = __toESM(require("../loadConfigFile"));
describe("sugar.node.config.loadConfigFile", () => {
  it("Should load a simple js file correctly", async () => {
    const config = await (0, import_loadConfigFile.default)("config.js", {
      rootDir: `${__dirname}/data`
    });
    expect(config).toEqual({
      name: "config.js"
    });
  });
  it("Should load a simple yaml file correctly", async () => {
    const config = await (0, import_loadConfigFile.default)("config.yml", {
      rootDir: `${__dirname}/data`
    });
    expect(config).toEqual({
      name: "config.yml"
    });
  });
  it("Should load a file that exists against others that not correctly", async () => {
    const config = await (0, import_loadConfigFile.default)(["support.js", "something.ts", "config.yml"], {
      rootDir: `${__dirname}/data`
    });
    expect(config).toEqual({
      name: "config.yml"
    });
  });
});

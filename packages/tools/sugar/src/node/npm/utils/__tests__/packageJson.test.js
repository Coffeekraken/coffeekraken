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
var import_packageJson = __toESM(require("../packageJson"), 1);
var import_packageRoot = __toESM(require("../../../path/packageRoot"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
describe("sugar.node.npm.utils.packageJson", () => {
  it('Should fetch the "chokidar" package.json correctly', async () => {
    await import_s_sugar_config.default.load();
    const json = (0, import_packageJson.default)("chokidar", {
      rootDir: (0, import_packageRoot.default)(__dirname)
    });
    expect(json.name).toBe("chokidar");
  });
});

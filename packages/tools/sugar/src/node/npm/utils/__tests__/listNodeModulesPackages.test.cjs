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
var import_listNodeModulesPackages = __toESM(require("../listNodeModulesPackages"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
describe("sugar.node.npm.utils.listNodeModulesPackages", () => {
  it("Should list the sugar node_modules packages correctly", async () => {
    await import_s_sugar_config.default.load();
    const modules = (0, import_listNodeModulesPackages.default)({
      monorepo: true
    });
    expect(Object.keys(modules).length).toBeGreaterThan(0);
  });
});

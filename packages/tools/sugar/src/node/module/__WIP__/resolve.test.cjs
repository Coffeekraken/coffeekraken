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
var import_resolve = __toESM(require("../resolve"));
var import_path = __toESM(require("path"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
describe("sugar.node.module.resolve", () => {
  const settings = {
    dirs: [`${__dirname}`, `${__dirname}/node_modules`]
  };
  it('Should resolve an existing file with a "./" at start correctly', async () => {
    await import_s_sugar_config.default.load();
    const res = (0, import_resolve.default)("./pkg/test/test.js", settings);
    expect(res).toBe(import_path.default.resolve(__dirname, "pkg/test/test.js"));
  });
});

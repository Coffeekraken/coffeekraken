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
var import_sugar = __toESM(require("../sugar"));
describe("s-sugar-config.node.sugar", () => {
  it("Should get a [theme.something] value correctly", async () => {
    await import_sugar.default.load();
    const value = import_sugar.default.get("theme.themes.default-dark.ui.button.paddingInline");
    expect(value).toBe("1.5em");
  });
  it("Should get a postprocessed value correctly", async () => {
    const value = import_sugar.default.get("theme.themes.default-dark.color.current.color");
    expect(value).toBe("hsla(198,10,50,1)");
  });
});

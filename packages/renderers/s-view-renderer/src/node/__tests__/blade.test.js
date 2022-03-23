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
var import_SViewRenderer = __toESM(require("../SViewRenderer"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
describe("s-view.blade", () => {
  it("Should compile the passed blade view correctly", async () => {
    await import_s_sugar_config.default.load();
    const view = new import_SViewRenderer.default("default", {
      viewRenderer: {
        rootDirs: [`${__dirname}/views`]
      }
    });
    const res = await view.render({});
    expect(res.value).not.toBeUndefined();
    expect(res.value.includes("<title>Smoth</title>")).toBe(true);
    expect(res.view).not.toBeUndefined();
    expect(res.startTime).not.toBeUndefined();
    expect(res.endTime).not.toBeUndefined();
    expect(res.duration).not.toBeUndefined();
    expect(res.formatedDuration).not.toBeUndefined();
  });
});

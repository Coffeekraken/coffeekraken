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
var import_STheme = __toESM(require("../STheme"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
describe("s-theme.node.STheme", () => {
  it("Should instanciate correctly the default theme", async () => {
    await import_s_sugar_config.default.load();
    new import_STheme.default();
  });
  it("Should throw an error if the passed theme does not exists", (done) => {
    try {
      new import_STheme.default("IDontExists");
    } catch (e) {
      done();
    }
  });
  it("Should loop correctly on colors", (done) => {
    const theme = new import_STheme.default();
    let isError = false;
    theme.loopOnColors(({ name, value }) => {
      if (!name || !value)
        isError = true;
    });
    expect(isError).toBe(false);
    done();
  });
  it("Should loop correctly on colors and stop when return -1 or false", (done) => {
    const theme = new import_STheme.default();
    let i = 0;
    theme.loopOnColors(({ name, value }) => {
      i++;
      if (i >= 10)
        return false;
    });
    expect(i).toBe(10);
    done();
  });
});

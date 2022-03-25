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
var import_SPostcssBuilder = __toESM(require("../SPostcssBuilder"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
describe("@coffeekraken.s-postcss-builder", () => {
  it("Should build a pretty complexe postcss file", async () => {
    await import_s_sugar_config.default.load();
    const builder = new import_SPostcssBuilder.default({
      postcssBuilder: {
        purgecss: {
          content: [`${__dirname}/__data__/index.html`]
        }
      }
    });
    const promise = builder.build({
      input: `${__dirname}/__data__/index.css`,
      purge: true,
      minify: true
    });
    const res = await promise;
    expect(res.map).toEqual(null);
    expect(res.css).not.toBeNull();
  });
});

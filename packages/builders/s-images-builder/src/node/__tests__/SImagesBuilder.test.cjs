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
var import_SImagesBuilder = __toESM(require("../SImagesBuilder"), 1);
var import_packageTmpDir = __toESM(require("@coffeekraken/sugar/node/path/packageTmpDir"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
describe("@coffeekraken.s-images-builder.SImagesBuilder", () => {
  it("Should compress simple jpg files correctly", async () => {
    await import_s_sugar_config.default.load();
    const outDir = `${(0, import_packageTmpDir.default)()}/SImagesBuilder/tests`;
    const builder = new import_SImagesBuilder.default({
      imagesBuilder: {
        resolveGlob: {
          defaultExcludes: false
        }
      }
    });
    const promise = builder.build({
      glob: "**/*.jpg",
      inDir: `${__dirname}/__data__/`,
      outDir,
      quality: 20,
      width: 100,
      webp: false
    });
    promise.on("log", (log) => {
      console.log(log.value);
    });
    await promise;
  });
});

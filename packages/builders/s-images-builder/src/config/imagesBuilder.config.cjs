var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var imagesBuilder_config_exports = {};
__export(imagesBuilder_config_exports, {
  default: () => imagesBuilder_config_default
});
module.exports = __toCommonJS(imagesBuilder_config_exports);
function imagesBuilder_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    glob: "**/*",
    compressExts: ["jpg", "jpeg", "png", "svg", "webp"],
    inDir: "[config.storage.src.imgDir]",
    outDir: "[config.storage.dist.imgDir]",
    quality: 80,
    webp: true,
    width: null,
    height: null,
    resolution: [1, 2],
    clear: true,
    specificParams: {}
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

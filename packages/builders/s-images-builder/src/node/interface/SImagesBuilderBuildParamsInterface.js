var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SImagesBuilderBuildParamsInterface_exports = {};
__export(SImagesBuilderBuildParamsInterface_exports, {
  default: () => SImagesBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SImagesBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SImagesBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      glob: {
        description: 'Specify a glob pattern relative to the "inDir" to target images you want to process',
        type: "String",
        required: true,
        default: import_s_sugar_config.default.get("imagesBuilder.glob"),
        alias: "g"
      },
      compressExts: {
        description: "Specify the file extensions you want to compress",
        type: "String[]",
        required: true,
        default: import_s_sugar_config.default.get("imagesBuilder.compressExts")
      },
      inDir: {
        description: "Specify the absolute path to the folder where your images stands",
        type: "String",
        required: true,
        default: import_s_sugar_config.default.get("imagesBuilder.inDir"),
        alias: "i"
      },
      outDir: {
        description: 'Specify the absolute path to the folder you want to save your images. "inDir" folder structure is kept.',
        type: "String",
        required: true,
        default: import_s_sugar_config.default.get("imagesBuilder.outDir"),
        alias: "o"
      },
      quality: {
        description: 'Specify the quality percentage you want to target without the "%" sign',
        type: "Number",
        required: true,
        default: import_s_sugar_config.default.get("imagesBuilder.quality"),
        alias: "q"
      },
      webp: {
        description: 'Specify if you want to generate ".webp" versions of your images or not',
        type: "Boolean",
        default: import_s_sugar_config.default.get("imagesBuilder.webp")
      },
      width: {
        description: "Specify the maximum width you want to target for your images",
        type: "Number",
        default: import_s_sugar_config.default.get("imagesBuilder.width"),
        alias: "w"
      },
      height: {
        description: "Specify the maximum height you want to target for your images",
        type: "Number",
        default: import_s_sugar_config.default.get("imagesBuilder.height"),
        alias: "h"
      },
      resolution: {
        description: 'Specify some resolutions you want to generate. The targeted "width" and "height" is considered as the resolution 1 and all others resolutions are declined from this',
        type: "Array<Integer>",
        default: import_s_sugar_config.default.get("imagesBuilder.resolution"),
        alias: "r"
      },
      clear: {
        description: 'Specify if you want to clear the "outDir" before generate new images or not',
        type: "Boolean",
        default: import_s_sugar_config.default.get("imagesBuilder.clear"),
        alias: "c"
      },
      specificParams: {
        description: 'Allows you to specify some custom params depending on folder globs like "myCoolFolder/*.jpg" used as object property. Override every settings you want in this new object for the specified folder(s)',
        type: "Object",
        default: import_s_sugar_config.default.get("imagesBuilder.specificParams")
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

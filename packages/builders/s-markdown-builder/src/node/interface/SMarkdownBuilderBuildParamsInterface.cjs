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
var SMarkdownBuilderBuildParamsInterface_exports = {};
__export(SMarkdownBuilderBuildParamsInterface_exports, {
  default: () => SMarkdownBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SMarkdownBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SMarkdownBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      glob: {
        description: 'Specify a glob pattern to target all the markdown files you want to build. This is relative the the "inDir" parameter',
        type: "String",
        required: true,
        alias: "g",
        default: import_s_sugar_config.default.get("markdownBuilder.default.glob")
      },
      inDir: {
        description: "Specify the input directory where your source files are standing",
        type: "String",
        required: true,
        alias: "d",
        default: import_s_sugar_config.default.get("markdownBuilder.default.inDir")
      },
      inPath: {
        description: "Specify a direct path to a markdown file to build",
        type: "String",
        alias: "p",
        default: import_s_sugar_config.default.get("markdownBuilder.default.inPath")
      },
      inRaw: {
        description: "Specify a raw markkdown string to build",
        type: "String",
        alias: "r",
        default: import_s_sugar_config.default.get("markdownBuilder.default.inRaw")
      },
      outDir: {
        description: "Specify the directory where you want to save your builded files",
        type: "String",
        alias: "o",
        default: import_s_sugar_config.default.get("markdownBuilder.default.outDir")
      },
      outPath: {
        description: 'Specify a path to the output file when you make use of the "inPath" parameter',
        type: "String",
        default: import_s_sugar_config.default.get("markdownBuilder.default.outPath")
      },
      save: {
        description: "Specify if you want to save the builded files or not",
        type: "Boolean",
        alias: "s",
        default: import_s_sugar_config.default.get("markdownBuilder.default.save")
      },
      target: {
        description: 'Specify the target format of the build. Supported values are "html" and "markdown"',
        type: "String",
        values: ["html", "markdown"],
        alias: "t",
        default: import_s_sugar_config.default.get("markdownBuilder.default.target")
      },
      preset: {
        description: "Specify some preset(s) to use for your build. Presets are defined in the config.markdownBuilder.presets configuration path",
        type: "Array<String>",
        values: Object.keys(import_s_sugar_config.default.get("markdownBuilder.presets")),
        alias: "p"
      },
      protectedTags: {
        description: 'Specify some tags that should be protected from the markdown transformations like "template" or "code"...',
        type: "Array<String>",
        default: import_s_sugar_config.default.get("markdownBuilder.default.protectedTags")
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

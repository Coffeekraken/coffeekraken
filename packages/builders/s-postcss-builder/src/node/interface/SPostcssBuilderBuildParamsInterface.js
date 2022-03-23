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
var SPostcssBuilderBuildParamsInterface_exports = {};
__export(SPostcssBuilderBuildParamsInterface_exports, {
  default: () => SPostcssBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SPostcssBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SPostcssBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      input: {
        description: "Specify the input css file for your build",
        type: "String",
        required: true,
        alias: "i",
        default: import_s_sugar_config.default.get("postcssBuilder.input")
      },
      output: {
        description: "Specify the output file path you want to save your build",
        type: "String",
        alias: "o",
        default: import_s_sugar_config.default.get("postcssBuilder.output")
      },
      prod: {
        description: "Shorthand to set a production ready build",
        type: "Boolean",
        default: false,
        alias: "p"
      },
      minify: {
        description: "Specify if you want to minify your output css",
        type: "Boolean",
        alias: "m",
        default: false
      },
      purge: {
        description: "Specify if you want to purge your output css. See the config.purgecss configuration file for more control",
        type: "Boolean",
        default: false
      },
      saveDev: {
        description: "Specify if you want to save a .dev.css file that will not be purged or minified",
        type: "Boolean",
        default: true
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

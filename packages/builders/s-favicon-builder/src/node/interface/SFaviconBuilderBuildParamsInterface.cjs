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
var SFaviconBuilderBuildParamsInterface_exports = {};
__export(SFaviconBuilderBuildParamsInterface_exports, {
  default: () => SFaviconBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SFaviconBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SFaviconBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      input: {
        description: "Specify the input image file to use",
        type: "String",
        required: true,
        default: import_s_sugar_config.default.get("faviconBuilder.input")
      },
      outDir: {
        description: "Specify the output directory ou want your icons in",
        type: "String",
        required: true,
        default: import_s_sugar_config.default.get("faviconBuilder.outDir")
      },
      settings: {
        description: "Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder",
        type: "Object",
        default: import_s_sugar_config.default.get("faviconBuilder.settings")
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

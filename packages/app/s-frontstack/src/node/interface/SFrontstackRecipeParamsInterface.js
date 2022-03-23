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
var SFrontstackRecipeParamsInterface_exports = {};
__export(SFrontstackRecipeParamsInterface_exports, {
  default: () => SFrontstackRecipeParamsInterface_default
});
module.exports = __toCommonJS(SFrontstackRecipeParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SFrontstackRecipeParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      stack: {
        description: 'Specify the stack you want to execute like "dev", "build", etc...',
        type: "String",
        alias: "s"
      },
      recipe: {
        description: "Specify the recipe you want to execute the stack from",
        type: "String",
        alias: "r"
      },
      runInParallel: {
        description: "Specify if you want the recipe actions to run in parallel of not",
        type: "Boolean",
        alias: "p"
      },
      env: {
        description: "Specify the environment in which to execute your recipe",
        type: "String"
      }
    };
  }
}
var SFrontstackRecipeParamsInterface_default = SFrontstackRecipeParamsInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

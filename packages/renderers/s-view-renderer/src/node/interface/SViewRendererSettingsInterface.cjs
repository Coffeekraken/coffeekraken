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
var SViewRendererSettingsInterface_exports = {};
__export(SViewRendererSettingsInterface_exports, {
  default: () => SViewRendererSettingsInterface
});
module.exports = __toCommonJS(SViewRendererSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
class SViewRendererSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      rootDirs: {
        description: "Specify some folder paths where to search for views",
        type: "String",
        default: import_s_sugar_config.default.get("viewRenderer.rootDirs")
      },
      cacheDir: {
        description: "Specigy the folder to store the engines cache",
        type: "String",
        default: import_s_sugar_config.default.get("viewRenderer.cacheDir")
      },
      enginesSettings: {
        description: 'Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"',
        type: "Object",
        default: {}
      },
      defaultData: {
        description: "Specify some default data to pass to the view",
        type: "Object",
        default: {}
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

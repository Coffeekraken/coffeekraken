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
var SSitemapBuilderBuildParamsInterface_exports = {};
__export(SSitemapBuilderBuildParamsInterface_exports, {
  default: () => SSitemapBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SSitemapBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SSitemapBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      source: {
        description: 'Specify the source(s) you want to build your sitemap. Can be all the configured sources specified under the "config.sitemap.sources" config',
        type: "Array<String>",
        default: []
      },
      sourcesSettings: {
        description: 'Specigy sources settings by passing an object under each source "id" property',
        type: "Object",
        default: {}
      },
      output: {
        description: "Specify where to save the sitemap in xml format",
        type: "String",
        default: import_s_sugar_config.default.get("sitemapBuilder.build.output")
      },
      save: {
        description: "Specify if you want to save the sitemap or not",
        type: "Boolean",
        default: true
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

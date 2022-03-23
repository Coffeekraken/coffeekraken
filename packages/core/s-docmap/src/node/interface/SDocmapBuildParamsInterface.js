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
var SDocMapBuildParamsInterface_exports = {};
__export(SDocMapBuildParamsInterface_exports, {
  default: () => SDocMapBuildParamsInterface_default
});
module.exports = __toCommonJS(SDocMapBuildParamsInterface_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SDocmapBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      globs: {
        type: "Array<String>",
        description: "Specify some globs to use to search docblocks to use in docmap generation",
        default: import_s_sugar_config.default.get("docmap.build.globs")
      },
      exclude: {
        type: "Array<String>",
        description: "Specify some regexp used to exclude files from resulting docMap",
        default: import_s_sugar_config.default.get("docmap.build.exclude"),
        level: 1
      },
      tags: {
        type: "Array<String>",
        description: "Specify which docblock tags you want in your final docmap.json file",
        alias: "f",
        default: import_s_sugar_config.default.get("docmap.build.tags")
      },
      filters: {
        type: "Object<RegExp>",
        description: "Specify some properties and regex to use to filter docblocks",
        default: import_s_sugar_config.default.get("docmap.build.filters")
      },
      noExtends: {
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        description: "Specify if you want to avoid searching for docmap.json files in the dependency packages",
        default: import_s_sugar_config.default.get("docmap.build.noExtends")
      },
      save: {
        type: "Boolean",
        alias: "s",
        description: "Specify if you want to save the generated file under the ```outPath``` path",
        default: import_s_sugar_config.default.get("docmap.build.save")
      },
      outPath: {
        type: "String",
        alias: "o",
        description: "Specify where you want to save the builded file. Usually saved in package root with the name docmap.json",
        default: import_s_sugar_config.default.get("docmap.build.outPath")
      }
    };
  }
}
var SDocMapBuildParamsInterface_default = SDocmapBuildParamsInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

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
var SStaticBuilderBuildParamsInterface_exports = {};
__export(SStaticBuilderBuildParamsInterface_exports, {
  default: () => SStaticBuilderBuildParamsInterface
});
module.exports = __toCommonJS(SStaticBuilderBuildParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
class SStaticBuilderBuildParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      input: {
        description: "Specify the path to the input sitemap.xml file",
        type: "String",
        required: true,
        alias: "i",
        default: import_s_sugar_config.default.get("staticBuilder.input")
      },
      outDir: {
        description: "Specify the path to the output folder",
        type: "String",
        alias: "o",
        default: import_s_sugar_config.default.get("staticBuilder.outDir")
      },
      host: {
        description: "Specify the host on which to make the requests",
        type: "String",
        alias: "h",
        default: import_s_sugar_config.default.get("staticBuilder.host")
      },
      clean: {
        description: 'Specify if you want to clean the past builds before rebuilding. THis would do the same as setting the "incremental" option to false',
        type: "Boolean",
        alias: "c",
        default: import_s_sugar_config.default.get("staticBuilder.clean")
      },
      incremental: {
        description: "Specify if you want to use incremental build",
        type: "Boolean",
        alias: "i",
        default: import_s_sugar_config.default.get("staticBuilder.incremental")
      },
      failAfter: {
        description: "Specify the number of authorized fails before stopping the process",
        type: "Number",
        alias: "f",
        default: import_s_sugar_config.default.get("staticBuilder.failAfter")
      },
      requestTimeout: {
        description: "Specify after how many ms a request has to be considered as failed",
        type: "Number",
        alias: "t",
        default: import_s_sugar_config.default.get("staticBuilder.requestTimeout")
      },
      requestRetry: {
        description: "Specify the number of retry to do by request before considering it as failed",
        type: "Number",
        default: import_s_sugar_config.default.get("staticBuilder.requestRetry")
      },
      requestRetryTimeout: {
        description: "Specify how many long the builder has to wait between tries",
        type: "Number",
        default: import_s_sugar_config.default.get("staticBuilder.requestRetryTimeout")
      },
      assets: {
        description: 'Specify some "assets" directories/files to copy into the static directory',
        type: "Object",
        alias: "a",
        default: import_s_sugar_config.default.get("staticBuilder.assets")
      },
      minify: {
        description: "Specify if you want to minify the output or not",
        type: "Boolean",
        alias: "m",
        default: false
      },
      prod: {
        description: "Shorthand to set a production ready build",
        type: "Boolean",
        default: false,
        alias: "p"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

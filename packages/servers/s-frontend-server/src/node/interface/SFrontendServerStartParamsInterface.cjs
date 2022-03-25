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
var SFrontendServerStartParamsInterface_exports = {};
__export(SFrontendServerStartParamsInterface_exports, {
  default: () => SFrontendServerStartParamsInterface
});
module.exports = __toCommonJS(SFrontendServerStartParamsInterface_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SFrontendServerStartParamsInterface extends import_s_interface.default {
  static get _definition() {
    var _a;
    return {
      hostname: {
        description: "Server hostname",
        type: "String",
        alias: "o",
        required: true,
        default: import_s_sugar_config.default.get("frontendServer.hostname") || "127.0.0.1"
      },
      port: {
        description: "Server port",
        type: "Number",
        alias: "p",
        default: import_s_sugar_config.default.get("frontendServer.port") || 3e3,
        level: 1
      },
      rootDir: {
        description: "Server root directory",
        type: "String",
        default: import_s_sugar_config.default.get("frontendServer.rootDir") || __packageRoot(process.cwd()),
        level: 1
      },
      viewsDir: {
        description: "Server views directory",
        type: "String",
        default: import_s_sugar_config.default.get("frontendServer.viewsDir") || __packageRoot(process.cwd()) + "/views"
      },
      logLevel: {
        description: "Specify the log level you want for your server",
        type: "String",
        values: [
          "silent",
          "error",
          "warn",
          "debug",
          "info",
          "verbose",
          "silly"
        ],
        default: (_a = import_s_sugar_config.default.get("frontendServer.logLevel")) != null ? _a : "info"
      },
      prod: {
        description: 'Specify that we want the server to act "like" a production one with compression etc...',
        type: "Boolean",
        default: false
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

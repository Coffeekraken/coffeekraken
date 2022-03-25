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
var notification_config_exports = {};
__export(notification_config_exports, {
  default: () => notification_config_default
});
module.exports = __toCommonJS(notification_config_exports);
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"));
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
function notification_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    enable: true,
    adapters: [(0, import_node.default)() ? "node" : "browser"],
    adaptersSettings: {},
    types: {
      default: {
        title: "[title]",
        message: "[message]",
        icon: `${(0, import_packageRootDir.default)((0, import_dirname.default)())}/src/data/notifications/ck_default.png`
      },
      start: {
        title: "[title]",
        message: "[message]",
        icon: `${(0, import_packageRootDir.default)((0, import_dirname.default)())}/src/data/notifications/ck_start.png`
      },
      success: {
        title: "[title]",
        message: "[message]",
        icon: `${(0, import_packageRootDir.default)((0, import_dirname.default)())}/src/data/notifications/ck_success.png`
      },
      warning: {
        title: "[title]",
        message: "[message]",
        icon: `${(0, import_packageRootDir.default)((0, import_dirname.default)())}/src/data/notifications/ck_warning.png`
      },
      error: {
        title: "[title]",
        message: "[message]",
        icon: `${(0, import_packageRootDir.default)((0, import_dirname.default)())}/src/data/notifications/ck_error.png`
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

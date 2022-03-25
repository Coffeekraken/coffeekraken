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
var list_cli_exports = {};
__export(list_cli_exports, {
  default: () => list_cli_default
});
module.exports = __toCommonJS(list_cli_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"), 1);
var import_path = __toESM(require("path"), 1);
var import_SSugarJson = __toESM(require("../node/SSugarJson"), 1);
var list_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    emit("log", {
      type: import_s_log.default.TYPE_INFO,
      value: "<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>..."
    });
    const sugarJson = new import_SSugarJson.default();
    const list = sugarJson.search();
    list.forEach((path) => {
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[file]</yellow> <cyan>${import_path.default.relative((0, import_packageRootDir.default)(), path)}</cyan>`
      });
    });
    emit("log", {
      type: import_s_log.default.TYPE_INFO,
      value: `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`
    });
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

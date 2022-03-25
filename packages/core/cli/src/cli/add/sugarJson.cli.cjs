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
var sugarJson_cli_exports = {};
__export(sugarJson_cli_exports, {
  default: () => sugarJson_cli_default
});
module.exports = __toCommonJS(sugarJson_cli_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_SCliAddSugarJsonParamsInterface = __toESM(require("../../node/add/interface/SCliAddSugarJsonParamsInterface"));
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
var import_fs = __toESM(require("fs"));
var sugarJson_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliAddSugarJsonParamsInterface.default.apply(stringArgs);
    emit("log", {
      type: import_s_log.default.TYPE_INFO,
      value: `<yellow>[sugarJson]</yellow> Adding the sugar.json file with the recipe <cyan>${finalParams.recipe}</cyan>`
    });
    if (import_fs.default.existsSync(`${process.cwd()}/sugar.json`)) {
      const json = (0, import_readJsonSync.default)(`${process.cwd()}/sugar.json`);
      json.recipe = finalParams.recipe;
      (0, import_writeJsonSync.default)(`${process.cwd()}/sugar.json`, json);
    } else {
      (0, import_writeJsonSync.default)(`${process.cwd()}/sugar.json`, {
        recipe: finalParams.recipe
      });
    }
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

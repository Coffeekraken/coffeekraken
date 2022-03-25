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
var manifestJson_cli_exports = {};
__export(manifestJson_cli_exports, {
  default: () => manifestJson_cli_default
});
module.exports = __toCommonJS(manifestJson_cli_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"));
var import_fs = __toESM(require("fs"));
var import_SCliAddManifestJsonParamsInterface = __toESM(require("../../node/add/interface/SCliAddManifestJsonParamsInterface"));
var manifestJson_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliAddManifestJsonParamsInterface.default.apply(stringArgs);
    emit("log", {
      type: import_s_log.default.TYPE_INFO,
      value: `<yellow>[manifestJson]</yellow> Adding the manifest.json file`
    });
    const packageJson = (0, import_jsonSync.default)();
    if (import_fs.default.existsSync(`${process.cwd()}/manifest.json`)) {
      const json = (0, import_readJsonSync.default)(`${process.cwd()}/manifest.json`);
      json.short_name = packageJson.name;
      json.name = packageJson.description;
      (0, import_writeJsonSync.default)(`${process.cwd()}/manifest.json`, json);
    } else {
      const json = (0, import_readJsonSync.default)(`${(0, import_dirname.default)()}/data/manifest.json`);
      json.short_name = packageJson.name;
      json.name = packageJson.description;
      (0, import_writeJsonSync.default)(`${process.cwd()}/manifest.json`, json);
    }
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

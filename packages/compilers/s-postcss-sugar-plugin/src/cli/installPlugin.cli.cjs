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
var installPlugin_cli_exports = {};
__export(installPlugin_cli_exports, {
  default: () => installPlugin_cli_default
});
module.exports = __toCommonJS(installPlugin_cli_exports);
var import_SCliSugarPostcssPluginInstallParamsInterface = __toESM(require("./interface/SCliSugarPostcssPluginInstallParamsInterface"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"), 1);
var import_install = __toESM(require("@coffeekraken/sugar/node/npm/install"), 1);
var installPlugin_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliSugarPostcssPluginInstallParamsInterface.default.apply(stringArgs);
    const rootPath = (0, import_packageRoot.default)(process.cwd());
    let currentConfig = {};
    if (import_fs.default.existsSync(`${rootPath}/.postcssrc.json`)) {
      currentConfig = (0, import_readJsonSync.default)(`${rootPath}/.postcssrc.json`);
    } else if (import_fs.default.existsSync(`${rootPath}/postcss.config.js`)) {
      currentConfig = await Promise.resolve().then(() => __toESM(require(`${rootPath}/postcss.config.js`)));
      import_fs.default.renameSync(`${rootPath}/postcss.config.js`, `${rootPath}/postcss.config.old.js`);
    }
    if (!currentConfig.plugins)
      currentConfig.plugins = [];
    const plugins = import_s_sugar_config.default.get("postcss.plugins");
    currentConfig.plugins = (0, import_unique.default)([
      ...plugins,
      ...currentConfig.plugins
    ]);
    if (finalParams.install) {
      emit("log", {
        value: `Installing <cyan>${currentConfig.plugins.length}</cyan> plugins...`
      });
      currentConfig.plugins.forEach((plugin) => {
        emit("log", {
          value: `- <yellow>${plugin}</yellow>`
        });
      });
      await pipe((0, import_install.default)(currentConfig.plugins.join(" ")));
    }
    emit("log", {
      value: `Saving new configuration file under <cyan>.postcssrc.json</cyan>.`
    });
    (0, import_writeJsonSync.default)(`${rootPath}/.postcssrc.json`, currentConfig);
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

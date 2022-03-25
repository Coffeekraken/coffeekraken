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
var SConfigFolderAdapter_exports = {};
__export(SConfigFolderAdapter_exports, {
  default: () => SConfigFolderAdapter
});
module.exports = __toCommonJS(SConfigFolderAdapter_exports);
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"));
var import_fs = __toESM(require("fs"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SConfigAdapter = __toESM(require("../../shared/adapters/SConfigAdapter"));
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"));
var import_path = __toESM(require("path"));
var __chokidar = __toESM(require("chokidar"));
var import_SConfig = __toESM(require("../../shared/SConfig"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class SConfigFolderAdapter extends import_SConfigAdapter.default {
  constructor(settings) {
    super((0, import_deepMerge.default)({
      configFolderAdapter: {
        fileName: "[name].config.js",
        folderName: ".sugar",
        scopes: {
          default: [
            import_path.default.resolve((0, import_dirname.default)(), "../../config")
          ],
          module: [],
          extends: [],
          repo: [
            `${(0, import_packageRootDir.default)(process.cwd(), true)}/[folderName]`
          ],
          package: [
            `${(0, import_packageRootDir.default)(process.cwd())}/[folderName]`
          ],
          user: [
            `${(0, import_packageRootDir.default)(process.cwd())}/.local/[folderName]`
          ]
        },
        savingScope: "user"
      }
    }, settings || {}));
    this._scopedSettings = {};
    this._scopedFoldersPaths = {};
    this._foldersPaths = [];
    this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace("[name]", this.name);
    Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
      let scopeFoldersPathArray = this.configFolderAdapterSettings.scopes[scope];
      if (scopeFoldersPathArray) {
        if (!Array.isArray(scopeFoldersPathArray))
          scopeFoldersPathArray = [scopeFoldersPathArray];
        scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
          return path.replace("[folderName]", this.configFolderAdapterSettings.folderName);
        });
      }
      this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
    });
    const watchPaths = [];
    Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
      if (this._scopedFoldersPaths[scope]) {
        this._scopedFoldersPaths[scope] = this._scopedFoldersPaths[scope].filter((path) => {
          if (import_fs.default.existsSync(path) && this._foldersPaths.indexOf(path) === -1) {
            watchPaths.push(path);
            this._foldersPaths.push(path);
            return true;
          }
          return false;
        });
      }
    });
    __chokidar.watch((0, import_unique.default)(watchPaths), {
      ignoreInitial: true
    }).on("change", (p) => {
      this.update(p);
    }).on("unlink", (p) => this.update(p)).on("add", (p) => this.update(p));
  }
  get configFolderAdapterSettings() {
    return this._settings.configFolderAdapter;
  }
  async _load(folderPaths, clearCache = false, env, configObj) {
    var _a;
    folderPaths = (0, import_unique.default)(folderPaths);
    for (let i = 0; i < folderPaths.length; i++) {
      const path = folderPaths[i];
      const paths = import_fs.default.readdirSync(path);
      for (let j = 0; j < paths.length; j++) {
        const file = paths[j];
        if (!file.match(/\.js(on)?$/))
          continue;
        if (!file.includes(this.configFolderAdapterSettings.fileName.replace("[name]", ""))) {
          continue;
        }
        const configFilePath = `${path}/${file}`;
        const importedConfig = await Promise.resolve().then(() => __toESM(require(configFilePath)));
        let configData = importedConfig.default;
        if (typeof configData === "function") {
          configData = configData(env, configObj != null ? configObj : {});
        }
        const configKey = file.replace(".config.js", "");
        configObj[configKey] = (0, import_deepMerge.default)((_a = configObj[configKey]) != null ? _a : {}, configData);
        if (importedConfig.postprocess && typeof importedConfig.postprocess === "function") {
          import_SConfig.default.registerPostprocess(this.configAdapterSettings.name, configKey, importedConfig.postprocess);
        }
        if (importedConfig.preprocess && typeof importedConfig.preprocess === "function") {
          import_SConfig.default.registerPreprocess(this.configAdapterSettings.name, configKey, importedConfig.preprocess);
        }
      }
    }
    return Object.assign({}, configObj);
  }
  async load(clearCache = false, env, configObj) {
    try {
      for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
        const scope = Object.keys(this._scopedFoldersPaths)[i];
        const scopedFoldersPaths = this._scopedFoldersPaths[scope];
        if (scopedFoldersPaths && scopedFoldersPaths.length) {
          this._scopedSettings[scope] = await this._load(scopedFoldersPaths, clearCache, env, configObj);
        }
      }
    } catch (e) {
      console.log("fffffffff", e);
    }
    let resultSettings = {};
    Object.keys(this._scopedSettings).forEach((scope) => {
      resultSettings = (0, import_deepMerge.default)(resultSettings, this._scopedSettings[scope]);
    });
    return resultSettings;
  }
  save(newConfig = {}) {
    throw new Error(`<red>[${this.constructor.name}.save]</red> Sorry but the save feature has not been implemented yet...`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

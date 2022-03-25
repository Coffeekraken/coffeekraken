var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __fs from "fs";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SConfigAdapter from "../../shared/adapters/SConfigAdapter";
import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __path from "path";
import * as __chokidar from "chokidar";
import __SConfig from "../../shared/SConfig";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
class SConfigFolderAdapter extends __SConfigAdapter {
  constructor(settings) {
    super(__deepMerge({
      configFolderAdapter: {
        fileName: "[name].config.js",
        folderName: ".sugar",
        scopes: {
          default: [
            __path.resolve(__dirname(), "../../config")
          ],
          module: [],
          extends: [],
          repo: [
            `${__packageRootDir(process.cwd(), true)}/[folderName]`
          ],
          package: [
            `${__packageRootDir(process.cwd())}/[folderName]`
          ],
          user: [
            `${__packageRootDir(process.cwd())}/.local/[folderName]`
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
          if (__fs.existsSync(path) && this._foldersPaths.indexOf(path) === -1) {
            watchPaths.push(path);
            this._foldersPaths.push(path);
            return true;
          }
          return false;
        });
      }
    });
    __chokidar.watch(__unique(watchPaths), {
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
    folderPaths = __unique(folderPaths);
    for (let i = 0; i < folderPaths.length; i++) {
      const path = folderPaths[i];
      const paths = __fs.readdirSync(path);
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
        configObj[configKey] = __deepMerge((_a = configObj[configKey]) != null ? _a : {}, configData);
        if (importedConfig.postprocess && typeof importedConfig.postprocess === "function") {
          __SConfig.registerPostprocess(this.configAdapterSettings.name, configKey, importedConfig.postprocess);
        }
        if (importedConfig.preprocess && typeof importedConfig.preprocess === "function") {
          __SConfig.registerPreprocess(this.configAdapterSettings.name, configKey, importedConfig.preprocess);
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
      resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
    });
    return resultSettings;
  }
  save(newConfig = {}) {
    throw new Error(`<red>[${this.constructor.name}.save]</red> Sorry but the save feature has not been implemented yet...`);
  }
}
export {
  SConfigFolderAdapter as default
};

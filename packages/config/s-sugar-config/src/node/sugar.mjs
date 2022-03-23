import {
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SClass from "@coffeekraken/s-class";
import __SConfig, {
  SConfigFolderAdapter
} from "@coffeekraken/s-config";
import __SSugarJson from "@coffeekraken/s-sugar-json";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __md5 from "@coffeekraken/sugar/shared/crypt/md5";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __get from "@coffeekraken/sugar/shared/object/get";
import __fs from "fs";
import __path from "path";
import __SDocblock from "@coffeekraken/s-docblock";
import __objectHash from "@coffeekraken/sugar/shared/object/objectHash";
class SSugarConfig extends __SClass {
  static registerFolder(path, scope = "default", packageName) {
    this._registeredConfigFolderPaths.push({
      path,
      scope,
      packageName
    });
    if (!__fs.existsSync(path))
      return;
    this._registeredConfigFilesPaths = [
      ...this._registeredConfigFilesPaths,
      ...__fs.readdirSync(path).filter((p) => p.match(/\.config\.js$/)).map((p) => {
        return `${path}/${p}`;
      })
    ];
  }
  static get filesRealPaths() {
    return this._registeredConfigFilesPaths.filter((f) => {
      return __fs.existsSync(f);
    }).map((f) => __fs.realpathSync(f));
  }
  static get filesPaths() {
    return this._registeredConfigFilesPaths;
  }
  static get foldersRealPaths() {
    return this._registeredConfigFolderPaths.filter((f) => {
      return __fs.existsSync(f.path);
    }).map((f) => __fs.realpathSync(f.path));
  }
  static get foldersPaths() {
    return this._registeredConfigFolderPaths.map((f) => f.path);
  }
  static load(envOrId, id) {
    if (this._loadPromise) {
      return this._loadPromise;
    }
    this._loadPromise = new Promise(async (resolve, reject) => {
      id = id != null ? id : typeof envOrId === "string" ? envOrId : void 0;
      if (!id) {
        if (__isPlainObject(envOrId)) {
          id = __md5.encrypt(envOrId);
        } else {
          id = "default";
        }
      }
      let env;
      if (__isPlainObject(envOrId))
        env = envOrId;
      if (this._sSugarConfigInstances[id]) {
        return resolve({
          id,
          config: this._sSugarConfigInstances[id].get("."),
          instance: this._sSugarConfigInstances[id]
        });
      }
      this._sSugarConfigInstances[id] = new this({
        metas: {
          id
        },
        sugarConfig: {
          env
        }
      });
      const config = await this._sSugarConfigInstances[id]._load();
      resolve({
        id,
        config,
        instance: this._sSugarConfigInstances[id]
      });
    });
    return this._loadPromise;
  }
  static isLoaded(id = "default") {
    if (!this._sSugarConfigInstances[id])
      return false;
    return true;
  }
  static async toDocblocks(configId) {
    configId = configId.replace(".config.js", "");
    const paths = this.filesPaths.filter((path) => {
      return path.includes(`${configId}.config.js`);
    });
    const results = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const docblock = new __SDocblock(path);
      await docblock.parse();
      results.push({
        path,
        docblocks: docblock.toObject()
      });
    }
    return results;
  }
  static hash(dotPath = "") {
    const config = this.get(dotPath);
    return __objectHash(config);
  }
  static toObject(target = "node") {
    const config = this.get("");
    const newConfig = {};
    const include = this.get(`config.${target}.include`);
    if (!include || !include.length)
      return config;
    include.forEach((configId) => {
      newConfig[configId] = config[configId];
    });
    return newConfig;
  }
  static toJson(target = "node") {
    return JSON.stringify(this.toObject(target));
  }
  static get(dotPath, id = "default") {
    if (!this._sSugarConfigInstances[id]) {
      throw new Error(`<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async instance function`);
    }
    return this._sSugarConfigInstances[id].get(dotPath, void 0, {
      throwErrorOnUndefinedConfig: false
    });
  }
  static async _searchConfigFiles() {
    const sugarJson = new __SSugarJson();
    if (!this._rootSugarJson) {
      const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
      if (__fs.existsSync(rootSugarJsonPath)) {
        this._rootSugarJson = sugarJson.sanitizeJson(await Promise.resolve().then(() => __toESM(require(rootSugarJsonPath))));
        if (this._rootSugarJson.extends && !Array.isArray(this._rootSugarJson.extends))
          this._rootSugarJson.extends = [this._rootSugarJson.extends];
      }
    }
    if (!this._sugarJson) {
      this._sugarJson = await sugarJson.read();
      Object.keys(this._sugarJson).forEach((packageName) => {
        const jsonObj = this._sugarJson[packageName];
        if (jsonObj.config && jsonObj.config.folders) {
          jsonObj.config.folders.forEach((folderObj) => {
            this.registerFolder(__path.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
          });
        }
      });
    }
  }
  get sugarConfigSettings() {
    return this._settings.sugarConfig;
  }
  constructor(settings) {
    super(__deepMerge({
      sugarConfig: {}
    }, settings != null ? settings : {}));
  }
  hash(dotPath = "") {
    const config = this.get(dotPath);
    return __objectHash(config);
  }
  get(dotpath) {
    return this._configInstance.get(dotpath);
  }
  toDocblocks(configId) {
    return this.constructor.toDocblocks(configId);
  }
  async _load() {
    var _a;
    if (this._configInstance)
      return this._configInstance.get(".");
    if (!this.constructor._rootSugarJson || !this.constructor._sugarJson) {
      await this.constructor._searchConfigFiles();
    }
    this._configInstance = new __SConfig("sugar", {
      env: (_a = this.sugarConfigSettings.env) != null ? _a : {},
      adapters: [
        new SConfigFolderAdapter({
          configAdapter: {
            name: "sugar"
          },
          configFolderAdapter: {
            folderName: ".sugar",
            fileName: "[name].config.js",
            scopes: {
              default: [
                __path.resolve(__dirname(), "../../src/config"),
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "default").map((obj) => obj.path)
              ],
              module: [
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => {
                  if (obj.scope === "module")
                    return true;
                  return false;
                }).map((obj) => obj.path)
              ],
              repo: [
                `${__packageRoot(process.cwd(), true)}/[folderName]`,
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "repo").map((obj) => obj.path)
              ],
              package: [
                `${__packageRoot(process.cwd())}/[folderName]`,
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "package").map((obj) => obj.path)
              ],
              user: [
                `${__packageRoot(process.cwd())}/.local/[folderName]`,
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "user").map((obj) => obj.path)
              ]
            }
          }
        })
      ],
      resolvers: [
        {
          match: /\[theme.[a-zA-Z0-9.\-_:]+\]/gm,
          resolve(string, matches, config, path) {
            for (let i = 0; i < matches.length; i++) {
              const match = matches[i];
              const valuePath = match.replace("[theme.", "").replace("]", "");
              const value = __get(config, `theme.themes.${config.theme.theme}-${config.theme.variant}.${valuePath}`);
              if (string === match)
                return value;
              string = string.replace(match, value);
            }
            return string;
          }
        }
      ]
    });
    const res = await this._configInstance.load();
    return res;
  }
}
SSugarConfig._sSugarConfigInstances = {};
SSugarConfig._sugarJson = void 0;
SSugarConfig._rootSugarJson = void 0;
SSugarConfig._registeredConfigFolderPaths = [];
SSugarConfig._registeredConfigFilesPaths = [];
export {
  SSugarConfig as default
};

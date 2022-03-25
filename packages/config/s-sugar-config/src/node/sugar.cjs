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
var sugar_exports = {};
__export(sugar_exports, {
  default: () => SSugarConfig
});
module.exports = __toCommonJS(sugar_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_s_config = __toESM(require("@coffeekraken/s-config"));
var import_s_sugar_json = __toESM(require("@coffeekraken/s-sugar-json"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_md5 = __toESM(require("@coffeekraken/sugar/shared/crypt/md5"));
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_get = __toESM(require("@coffeekraken/sugar/shared/object/get"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_s_docblock = __toESM(require("@coffeekraken/s-docblock"));
var import_objectHash = __toESM(require("@coffeekraken/sugar/shared/object/objectHash"));
class SSugarConfig extends import_s_class.default {
  static registerFolder(path, scope = "default", packageName) {
    this._registeredConfigFolderPaths.push({
      path,
      scope,
      packageName
    });
    if (!import_fs.default.existsSync(path))
      return;
    this._registeredConfigFilesPaths = [
      ...this._registeredConfigFilesPaths,
      ...import_fs.default.readdirSync(path).filter((p) => p.match(/\.config\.js$/)).map((p) => {
        return `${path}/${p}`;
      })
    ];
  }
  static get filesRealPaths() {
    return this._registeredConfigFilesPaths.filter((f) => {
      return import_fs.default.existsSync(f);
    }).map((f) => import_fs.default.realpathSync(f));
  }
  static get filesPaths() {
    return this._registeredConfigFilesPaths;
  }
  static get foldersRealPaths() {
    return this._registeredConfigFolderPaths.filter((f) => {
      return import_fs.default.existsSync(f.path);
    }).map((f) => import_fs.default.realpathSync(f.path));
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
        if ((0, import_plainObject.default)(envOrId)) {
          id = import_md5.default.encrypt(envOrId);
        } else {
          id = "default";
        }
      }
      let env;
      if ((0, import_plainObject.default)(envOrId))
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
      const docblock = new import_s_docblock.default(path);
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
    return (0, import_objectHash.default)(config);
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
    const sugarJson = new import_s_sugar_json.default();
    if (!this._rootSugarJson) {
      const rootSugarJsonPath = `${(0, import_packageRoot.default)()}/sugar.json`;
      if (import_fs.default.existsSync(rootSugarJsonPath)) {
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
            this.registerFolder(import_path.default.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
          });
        }
      });
    }
  }
  get sugarConfigSettings() {
    return this._settings.sugarConfig;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      sugarConfig: {}
    }, settings != null ? settings : {}));
  }
  hash(dotPath = "") {
    const config = this.get(dotPath);
    return (0, import_objectHash.default)(config);
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
    this._configInstance = new import_s_config.default("sugar", {
      env: (_a = this.sugarConfigSettings.env) != null ? _a : {},
      adapters: [
        new import_s_config.SConfigFolderAdapter({
          configAdapter: {
            name: "sugar"
          },
          configFolderAdapter: {
            folderName: ".sugar",
            fileName: "[name].config.js",
            scopes: {
              default: [
                import_path.default.resolve((0, import_dirname.default)(), "../../src/config"),
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
                `${(0, import_packageRoot.default)(process.cwd(), true)}/[folderName]`,
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "repo").map((obj) => obj.path)
              ],
              package: [
                `${(0, import_packageRoot.default)(process.cwd())}/[folderName]`,
                ...this.constructor._registeredConfigFolderPaths.filter((obj) => obj.scope === "package").map((obj) => obj.path)
              ],
              user: [
                `${(0, import_packageRoot.default)(process.cwd())}/.local/[folderName]`,
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
              const value = (0, import_get.default)(config, `theme.themes.${config.theme.theme}-${config.theme.variant}.${valuePath}`);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

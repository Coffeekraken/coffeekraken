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
var SConfig_exports = {};
__export(SConfig_exports, {
  default: () => SConfig
});
module.exports = __toCommonJS(SConfig_exports);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_env = __toESM(require("@coffeekraken/s-env"), 1);
var import_md5 = __toESM(require("@coffeekraken/sugar/shared/crypt/md5"), 1);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"), 1);
var import_deepMap = __toESM(require("@coffeekraken/sugar/shared/object/deepMap"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_get = __toESM(require("@coffeekraken/sugar/shared/object/get"), 1);
var import_set = __toESM(require("@coffeekraken/sugar/shared/object/set"), 1);
var import_SConfigAdapter = __toESM(require("./adapters/SConfigAdapter"), 1);
class SConfig {
  constructor(name, settings = {}) {
    this._name = null;
    this._adapters = {};
    this._settings = {};
    this.config = {};
    this._restPaths = {};
    var _a, _b;
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
    }
    this.id = name;
    this._settings = (0, import_deepMerge.default)({
      env: {
        env: (_a = import_s_env.default.get("env")) != null ? _a : "dev",
        platform: ((_b = import_s_env.default.get("platform")) != null ? _b : (0, import_node.default)()) ? "node" : "browser"
      },
      adapters: [],
      defaultAdapter: null,
      allowSave: true,
      allowSet: true,
      allowReset: true,
      allowNew: false,
      autoLoad: true,
      autoSave: true,
      updateTimeout: 500,
      throwErrorOnUndefinedConfig: true,
      resolvers: []
    }, settings);
    this._settings.adapters.forEach((adapter) => {
      if (!adapter instanceof import_SConfigAdapter.default) {
        throw new Error(`You have specified the adapter "${adapter.name || "unknown"}" as adapter for your "${this.id}" SConfig instance but this adapter does not extends the SConfigAdapter class...`);
      }
      if (!adapter.name) {
        adapter.name = this.id + ":" + adapter.constructor.name;
      } else {
        adapter.name = this.id + ":" + adapter.name;
      }
      this._adapters[adapter.name] = {
        instance: adapter,
        config: {}
      };
    });
    if (!this._settings.defaultAdapter) {
      this._settings.defaultAdapter = Object.keys(this._adapters)[0];
    }
    function resolveConfig(string, matches, config, path) {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const value = (0, import_get.default)(config, this.resolveDotPath(match, config, path));
        if (value === void 0) {
          throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`);
        }
        if (string === match)
          return value;
        string = string.replace(match, value);
      }
      return string;
    }
    this._settings.resolvers.unshift({
      match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
      resolveDotPath(match, config, path) {
        if (!match.match(/^\[config\./))
          return;
        const dotPath = match.replace("[config.", "").replace("]", "");
        return dotPath;
      },
      resolve: resolveConfig
    });
    this._settings.resolvers.unshift({
      name: "extends",
      match: /\[extends.[a-zA-Z0-9\.\-_]+\]/gm,
      resolveDotPath(match, config, path) {
        const ext = (0, import_get.default)(config, path[0] + "._extends");
        if (!ext)
          return;
        const dotPath = `${ext}.${match.replace("[extends.", "").replace("]", "")}`;
        return dotPath;
      },
      resolve(string, matches, config, path) {
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const dotPath = this.resolveDotPath(match, config, path);
          let value = (0, import_get.default)(config, dotPath);
          if (value === void 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`);
          }
          if (string === match) {
            return value;
          }
          string = string.replace(match, value);
        }
        return string;
      }
    });
    Object.keys(this._adapters).forEach((adapterName) => {
      const adapterObj = this._adapters[adapterName];
      let timeout;
      if (!adapterObj.instance)
        return;
      if (!adapterObj.instance._settings.onUpdate) {
        adapterObj.instance._settings.onUpdate = () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            this.load(adapterName, true);
          }, this._settings.updateTimeout);
        };
      }
    });
  }
  static registerPostprocess(configId, configKey, postprocessFn) {
    if (!this._registeredPostprocess[configId])
      this._registeredPostprocess[configId] = {};
    this._registeredPostprocess[configId][configKey] = postprocessFn;
  }
  static registerPreprocess(configId, configKey, preprocessFn) {
    if (!this._registeredPreprocesses[configId])
      this._registeredPreprocesses[configId] = {};
    this._registeredPreprocesses[configId][configKey] = preprocessFn;
  }
  async load(adapter = this._settings.defaultAdapter, isUpdate = false) {
    const duration = new import_s_duration.default();
    if (!this._adapters[adapter]) {
      throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
    }
    if (!isUpdate && Object.keys(this._adapters[adapter].config).length !== 0) {
      return this._adapters[adapter].config;
    }
    const loadedConfig = await this._adapters[adapter].instance.load(isUpdate, this._settings.env, this.config);
    Object.keys(loadedConfig).forEach((configId) => {
      if (!loadedConfig[configId])
        return;
      this.config[configId] = loadedConfig[configId];
    });
    Object.keys(this.config).forEach((configId) => {
      var _a;
      const configObj = this.config[configId];
      if (((_a = configObj.metas) == null ? void 0 : _a.platform) && configObj.metas.platform.indexOf(import_s_env.default.get("platform")) === -1) {
        delete this.config[configId];
      }
    });
    const extendsConfigIfNeeded = (configToExtends, configName) => {
      if (configToExtends.extends && typeof configToExtends.extends === "string") {
        const extend = configToExtends.extends;
        if (!this.config[extend]) {
          throw new Error(`<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`);
        }
        const extendsConfig = extendsConfigIfNeeded(Object.assign({}, this.config[extend]), extend);
        const newExtendedConfig = (0, import_deepMerge.default)(extendsConfig, configToExtends);
        Object.defineProperty(newExtendedConfig, "_extends", {
          enumerable: false,
          value: newExtendedConfig.extends
        });
        delete newExtendedConfig.extends;
        return newExtendedConfig;
      } else {
        return configToExtends;
      }
    };
    (0, import_deepMap.default)(this.config, ({ prop, value, path }) => {
      if (typeof value === "string" && value.split("[").length !== value.split("]").length) {
        throw new Error(`<red>[${this.constructor.name}]</red> We think that you've made a mistake in your config file at path "<yellow>${path}</yellow>" with the value "<cyan>${value}</cyan>"`);
      }
    });
    if (this.constructor._registeredPreprocesses[this.id]) {
      for (let k = 0; k < Object.keys(this.constructor._registeredPreprocesses[this.id]).length; k++) {
        const configKey = Object.keys(this.constructor._registeredPreprocesses[this.id])[k];
        this.config[configKey] = await this.constructor._registeredPreprocesses[this.id][configKey](this._settings.env, this.config[configKey], this.config);
      }
    }
    Object.keys(this.config).forEach((configName) => {
      this.config[configName] = extendsConfigIfNeeded(this.config[configName], configName);
    });
    this._resolveEnvironments();
    this._settings.resolvers.forEach((resolverObj) => {
      this._resolveInternalReferences(resolverObj);
    });
    Object.keys(this._restPaths).forEach((dotPath) => {
      const actualConfig = (0, import_get.default)(this.config, dotPath), extendsConfig = (0, import_get.default)(this.config, this._restPaths[dotPath]);
      (0, import_set.default)(this.config, dotPath, (0, import_deepMerge.default)(Object.assign({}, extendsConfig), Object.assign({}, actualConfig)));
    });
    if (this.constructor._registeredPostprocess[this.id]) {
      for (let k = 0; k < Object.keys(this.constructor._registeredPostprocess[this.id]).length; k++) {
        const configKey = Object.keys(this.constructor._registeredPostprocess[this.id])[k];
        this.config[configKey] = await this.constructor._registeredPostprocess[this.id][configKey](this._settings.env, this.config[configKey], this.config);
      }
    }
    if (this.config instanceof Promise) {
      throw new Error("Promise based SConfig is not already implemented...");
    } else if ((0, import_plainObject.default)(this.config)) {
      this._adapters[adapter].config = this.config;
      this._adapters[adapter].config.$ = {
        hash: import_md5.default.encrypt(this.config),
        loadedAt: Date.now()
      };
      return this.config;
    } else if (this.config !== null && this.config !== void 0) {
      throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${this.config}" which is of type "${typeof this.config}"...`);
    }
  }
  _resolveEnvironments() {
  }
  save(adapters = Object.keys(this._adapters)) {
    if (!this._settings.allowSave) {
      throw new Error(`You try to save the config on the "${this.id}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`);
    }
    for (let i = 0; i < adapters.length; i++) {
      const adapter = adapters[i];
      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to save the config on the "${this.id}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`);
      }
      this._adapters[adapter].instance.save(this._adapters[adapter].config);
    }
    return true;
  }
  _resolveInternalReferences(resolverObj, path = [], iteration = 0) {
    let originalValue = (0, import_get.default)(this.config, path.join("."));
    iteration++;
    if (path.includes("...")) {
      const p = path.slice(0, path.indexOf("..."));
      const parentObj = (0, import_get.default)(this.config, p.join("."));
      for (let i = 0; i < this._settings.resolvers.length; i++) {
        const resolver = this._settings.resolvers[i];
        if (!resolver.resolveDotPath)
          continue;
        const dotPath = resolver.resolveDotPath(parentObj["..."], this.config, path);
        if (dotPath) {
          if (!this._restPaths[p.join(".")]) {
            this._restPaths[p.join(".")] = dotPath;
          }
          break;
        }
      }
      return;
    }
    if ((0, import_plainObject.default)(originalValue)) {
      Object.keys(originalValue).forEach((key) => {
        this._resolveInternalReferences(resolverObj, [...path, key], iteration);
      });
    } else if (Array.isArray(originalValue)) {
      originalValue.forEach((v, i) => {
        this._resolveInternalReferences(resolverObj, [...path, i], iteration);
      });
    } else if (typeof originalValue === "string") {
      const matches = originalValue.match(resolverObj.match);
      if (matches && matches.length) {
        let resolvedValue = resolverObj.resolve(originalValue, matches, this.config, path);
        if (resolvedValue !== originalValue) {
          let parentObj = (0, import_get.default)(this.config, path.slice(0, -1).join("."));
          if (path.slice(-1)[0] === "...") {
            (0, import_deepMap.default)(Object.assign({}, resolvedValue), ({ object, prop, value, path: localPath }) => {
              const fullPath = `${path.slice(0, -1).join(".")}.${localPath}`;
              (0, import_set.default)(this.config, fullPath, value);
            });
            delete parentObj["..."];
          } else {
            (0, import_set.default)(this.config, path.join("."), resolvedValue);
            this._resolveInternalReferences(resolverObj, path, iteration);
          }
        }
      }
    }
  }
  get(path, adapter = this._settings.defaultAdapter, settings = {}, _level = 0) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    if (adapter && !this._adapters[adapter]) {
      throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
    }
    if (Object.keys(this._adapters[adapter].config).length === 0) {
      throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`);
    }
    const originalValue = (0, import_get.default)(this._adapters[adapter].config, path);
    if (settings.throwErrorOnUndefinedConfig && originalValue === void 0) {
      throw new Error(`You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`);
    }
    return originalValue;
  }
  set(path, value, adapters = Object.keys(this._adapters)) {
    if (!this._settings.allowSet) {
      throw new Error(`You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
    }
    if (!this._settings.allowNew && (0, import_get.default)(this._adapters[this._settings.defaultAdapter].config, path) === void 0) {
      throw new Error(`You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
    }
    adapters.forEach((adapter) => {
      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
      }
      (0, import_set.default)(this._adapters[adapter].config, path, value);
    });
    if (this._settings.autoSave) {
      return this.save(adapters);
    }
    return true;
  }
}
SConfig._registeredPostprocess = {};
SConfig._registeredPreprocesses = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

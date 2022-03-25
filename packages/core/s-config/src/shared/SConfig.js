import __SDuration from "@coffeekraken/s-duration";
import __SEnv from "@coffeekraken/s-env";
import __md5 from "@coffeekraken/sugar/shared/crypt/md5";
import __isNode from "@coffeekraken/sugar/shared/is/node";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __get from "@coffeekraken/sugar/shared/object/get";
import __set from "@coffeekraken/sugar/shared/object/set";
import __SConfigAdapter from "./adapters/SConfigAdapter";
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
    this._settings = __deepMerge({
      env: {
        env: (_a = __SEnv.get("env")) != null ? _a : "dev",
        platform: ((_b = __SEnv.get("platform")) != null ? _b : __isNode()) ? "node" : "browser"
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
      if (!adapter instanceof __SConfigAdapter) {
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
        const value = __get(config, this.resolveDotPath(match, config, path));
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
        const ext = __get(config, path[0] + "._extends");
        if (!ext)
          return;
        const dotPath = `${ext}.${match.replace("[extends.", "").replace("]", "")}`;
        return dotPath;
      },
      resolve(string, matches, config, path) {
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const dotPath = this.resolveDotPath(match, config, path);
          let value = __get(config, dotPath);
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
    const duration = new __SDuration();
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
      if (((_a = configObj.metas) == null ? void 0 : _a.platform) && configObj.metas.platform.indexOf(__SEnv.get("platform")) === -1) {
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
        const newExtendedConfig = __deepMerge(extendsConfig, configToExtends);
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
    __deepMap(this.config, ({ prop, value, path }) => {
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
      const actualConfig = __get(this.config, dotPath), extendsConfig = __get(this.config, this._restPaths[dotPath]);
      __set(this.config, dotPath, __deepMerge(Object.assign({}, extendsConfig), Object.assign({}, actualConfig)));
    });
    if (this.constructor._registeredPostprocess[this.id]) {
      for (let k = 0; k < Object.keys(this.constructor._registeredPostprocess[this.id]).length; k++) {
        const configKey = Object.keys(this.constructor._registeredPostprocess[this.id])[k];
        this.config[configKey] = await this.constructor._registeredPostprocess[this.id][configKey](this._settings.env, this.config[configKey], this.config);
      }
    }
    if (this.config instanceof Promise) {
      throw new Error("Promise based SConfig is not already implemented...");
    } else if (__isPlainObject(this.config)) {
      this._adapters[adapter].config = this.config;
      this._adapters[adapter].config.$ = {
        hash: __md5.encrypt(this.config),
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
    let originalValue = __get(this.config, path.join("."));
    iteration++;
    if (path.includes("...")) {
      const p = path.slice(0, path.indexOf("..."));
      const parentObj = __get(this.config, p.join("."));
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
    if (__isPlainObject(originalValue)) {
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
          let parentObj = __get(this.config, path.slice(0, -1).join("."));
          if (path.slice(-1)[0] === "...") {
            __deepMap(Object.assign({}, resolvedValue), ({ object, prop, value, path: localPath }) => {
              const fullPath = `${path.slice(0, -1).join(".")}.${localPath}`;
              __set(this.config, fullPath, value);
            });
            delete parentObj["..."];
          } else {
            __set(this.config, path.join("."), resolvedValue);
            this._resolveInternalReferences(resolverObj, path, iteration);
          }
        }
      }
    }
  }
  get(path, adapter = this._settings.defaultAdapter, settings = {}, _level = 0) {
    settings = __deepMerge(this._settings, settings);
    if (adapter && !this._adapters[adapter]) {
      throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
    }
    if (Object.keys(this._adapters[adapter].config).length === 0) {
      throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`);
    }
    const originalValue = __get(this._adapters[adapter].config, path);
    if (settings.throwErrorOnUndefinedConfig && originalValue === void 0) {
      throw new Error(`You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`);
    }
    return originalValue;
  }
  set(path, value, adapters = Object.keys(this._adapters)) {
    if (!this._settings.allowSet) {
      throw new Error(`You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
    }
    if (!this._settings.allowNew && __get(this._adapters[this._settings.defaultAdapter].config, path) === void 0) {
      throw new Error(`You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
    }
    adapters.forEach((adapter) => {
      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
      }
      __set(this._adapters[adapter].config, path, value);
    });
    if (this._settings.autoSave) {
      return this.save(adapters);
    }
    return true;
  }
}
SConfig._registeredPostprocess = {};
SConfig._registeredPreprocesses = {};
export {
  SConfig as default
};

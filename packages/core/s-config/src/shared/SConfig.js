// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/object/set", "@coffeekraken/sugar/shared/crypt/md5", "@coffeekraken/sugar/shared/is/plainObject", "./adapters/SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
    const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
    const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
    const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
    const SConfigAdapter_1 = __importDefault(require("./adapters/SConfigAdapter"));
    /**
     * @name                                            config
     * @namespace           s-config.shared
     * @type                                            Class
     * @status              beta
     *
     * This class allows you to quickly access/update some configuration depending on the data adapters specified.
     * The base available data adapters are:
     * - For node:
     *  - File system adapter: @coffeekraken/s-config/src/node/adapters/SConfigFsAdapter
     * - For js:
     *  - Localstorage adapter: @coffeekraken/s-config/src/js/adapters/SConfigLsAdapter
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     * @todo      Add a "catch" method that allows to get the saving errors, etc...
     *
     * @example             js
     * import SConfig, { SConfigLsAdapter } from '@coffeekraken/s-config';
     * const config = new SConfig({
     *   adapters: [
     *    new SConfigLsAdapter()
     *   ]
     * });
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     * await config.set('log.frontend.mail.host', 'mailchimp.com');
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    class SConfig {
        /**
         * @name                  constructor
         * @type                  Function
         *
         * Init the config instance by passing a name and a settings object to configure your instance
         *
         * @param                 {String}                   name                  The name of the config
         * @param                {Object}                    [settings={}]
         * An object to configure your SConfig instance. See the list above
         * The available settings are:
         * - adapters ([]) {Array}: An array of adapters instances to use for this SConfig instance
         * - defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
         * - allowSave (true) {Boolean}: Specify if this instance can save the updated configs
         * - allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
         * - allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
         * - allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
         * - autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
         * - autoSave (true) {Boolean}: Specify if you want the setting to be saved through the adapters directly on "set" action
         * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(name, settings = {}) {
            /**
             * @name              _name
             * @type              {String}
             * @private
             *
             * The name of the config
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._name = null;
            /**
             * @name            _adapters
             * @type            {Object}
             * @private
             *
             * Save the registered adapters instances
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._adapters = {};
            /**
             * @name             _settings
             * @type              {Object}
             * @private
             *
             * Store the actual settings object
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            // store the name
            if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
                throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
            }
            // save the settings name
            this.id = name;
            // save the settings
            this._settings = Object.assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, updateTimeout: 500, throwErrorOnUndefinedConfig: true }, settings);
            // init all the adapters if needed
            this._settings.adapters.forEach((adapter) => {
                if (!adapter instanceof SConfigAdapter_1.default) {
                    throw new Error(`You have specified the adapter "${adapter.name || 'unknown'}" as adapter for your "${this.id}" SConfig instance but this adapter does not extends the SConfigAdapter class...`);
                }
                // make sure we have a name for this adapter
                if (!adapter.name) {
                    adapter.name = this.id + ':' + adapter.constructor.name;
                }
                else {
                    adapter.name = this.id + ':' + adapter.name;
                }
                this._adapters[adapter.name] = {
                    instance: adapter,
                    config: {}
                };
            });
            // set the default get adapter if it has not been specified in the settings
            if (!this._settings.defaultAdapter) {
                this._settings.defaultAdapter = Object.keys(this._adapters)[0];
            }
            Object.keys(this._adapters).forEach((adapterName) => {
                const adapterObj = this._adapters[adapterName];
                let timeout;
                if (!adapterObj.instance)
                    return;
                if (adapterObj.instance._settings.onUpdate) {
                    adapterObj.instance._settings.onUpdate = () => {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            // load the updated config
                            this.load();
                        }, this._settings.updateTimeout);
                    };
                }
            });
            // load the config from the default adapter if the setting "autoLoad" is true
            if (this._settings.autoLoad) {
                this.load();
            }
        }
        static registerProxy(configId, scopePath, proxyFn) {
            if (!this._registeredProxies[configId])
                this._registeredProxies[configId] = {};
            this._registeredProxies[configId][scopePath] = proxyFn;
        }
        /**
         * @name                                load
         * @type                                Function
         *
         * Load the config from the default adapter or from the passed adapter
         *
         * @param           {String}            [adapter=this._settings.defaultAdapter]         The adapter to use to load the config
         * @return          {Promise}                                                           A promise that will be resolved with the loaded config
         *
         * @example           js
         * const config = await config.load();
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        load(adapter = this._settings.defaultAdapter) {
            // make sure we load only once the config
            // if (_SConfigLoadingByAdapter[adapter]) {
            //   return null;
            // }
            // _SConfigLoadingByAdapter[adapter] = true;
            if (!this._adapters[adapter]) {
                throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
            }
            if (Object.keys(this._adapters[adapter].config).length !== 0) {
                return this._adapters[adapter].config;
            }
            let config = this._adapters[adapter].instance.load();
            config = this._resolveInternalReferences(config, config);
            if (config instanceof Promise) {
                return new Promise((resolve) => {
                    config.then((c) => {
                        if (Object.keys(this._adapters[adapter].config).length === 0 && c) {
                            this._adapters[adapter].config = c;
                            this._adapters[adapter].config.$ = {
                                hash: md5_1.default.encrypt(c),
                                loadedAt: Date.now()
                            };
                            return resolve(c);
                        }
                        return resolve(this._adapters[adapter].config);
                    });
                });
            }
            else if (plainObject_1.default(config)) {
                this._adapters[adapter].config = config;
                this._adapters[adapter].config.$ = {
                    hash: md5_1.default.encrypt(config),
                    loadedAt: Date.now()
                };
                return config;
            }
            else if (config !== null && config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${config}" which is of type "${typeof config}"...`);
            }
        }
        /**
         * @name                          save
         * @type                          Function
         *
         * Save the config through all the registered adapters or just the one specify in params
         *
         * @param           {String|Array}          [adapters=Object.keys(this._adapters)]        The adapters to save the config through
         * @return          {Promise}                                                             A promise once all the adapters have correctly saved the config
         *
         * @example           js
         * await config.save();
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
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
            // all saved correctly
            return true;
        }
        _resolveInternalReferences(originalValue, config, path = []) {
            if (plainObject_1.default(originalValue)) {
                Object.keys(originalValue).forEach((key) => {
                    if (key === '...') {
                        originalValue = Object.assign(Object.assign({}, originalValue), this._resolveInternalReferences(originalValue[key], config, [
                            ...path,
                            key
                        ]));
                    }
                });
                delete originalValue['...'];
                Object.keys(originalValue).forEach((key) => {
                    try {
                        originalValue[key] = this._resolveInternalReferences(originalValue[key], config, [...path, key]);
                    }
                    catch (e) { }
                });
            }
            else if (Array.isArray(originalValue)) {
                originalValue = originalValue.map((v) => {
                    return this._resolveInternalReferences(v, config, path);
                });
            }
            else if (typeof originalValue === 'string') {
                const reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                const matches = originalValue.match(reg);
                if (matches && matches.length) {
                    if (matches.length === 1 && originalValue === matches[0]) {
                        const resolvedValue = get_1.default(config, matches[0].replace('[config.', '').replace(']', ''));
                        originalValue = this._resolveInternalReferences(resolvedValue, config, path);
                    }
                    else {
                        matches.forEach((match) => {
                            const resolvedValue = this._resolveInternalReferences(match, config, path);
                            originalValue = originalValue.replace(match, resolvedValue);
                        });
                        originalValue = this._resolveInternalReferences(originalValue, config, path);
                    }
                }
            }
            // check proxy
            if (this.constructor._registeredProxies[this.id][path[0]]) {
                originalValue = this.constructor._registeredProxies[this.id][path[0]](path.join('.'), originalValue, config);
            }
            return originalValue;
        }
        /**
         * @name                                get
         * @type                                Function
         *
         * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
         *
         * @param                 {String}                     path                 The dotted object path for the value wanted
         * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
         * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
         * @return                {Mixed}                                            The value getted
         *
         * @example               js
         * await config.get('log.frontend.mail.host'); // => gmail.google.com
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get(path, adapter = this._settings.defaultAdapter, settings = {}, _level = 0) {
            settings = deepMerge_1.default(this._settings, settings);
            if (adapter && !this._adapters[adapter]) {
                throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
            }
            if (Object.keys(this._adapters[adapter].config).length === 0) {
                this.load();
            }
            const originalValue = get_1.default(this._adapters[adapter].config, path);
            if (settings.throwErrorOnUndefinedConfig && originalValue === undefined) {
                throw new Error(`You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`);
            }
            return originalValue;
        }
        /**
         * @name                                set
         * @namespace           node.config.SConfig
         * @type                                Function
         *
         * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
         *
         * @param                 {String}                     path                 The dotted object path for the value wanted
         * @param                 {Mixed}                      value                 The value to set
         * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
         * @return                {Promise}                                          A promise resolved once the setting has been correctly set (and save depending on your instance config)
         *
         * @example               js
         * config.set('log.frontend.mail.host', 'coffeekraken.io');
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        set(path, value, adapters = Object.keys(this._adapters)) {
            if (!this._settings.allowSet) {
                throw new Error(`You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
            }
            // check if we allow new config or not
            if (!this._settings.allowNew &&
                get_1.default(this._adapters[this._settings.defaultAdapter].config, path) ===
                    undefined) {
                throw new Error(`You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
            }
            adapters.forEach((adapter) => {
                if (adapter && !this._adapters[adapter]) {
                    throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
                }
                set_1.default(this._adapters[adapter].config, path, value);
            });
            // check if need to autoSave or not
            if (this._settings.autoSave) {
                return this.save(adapters);
            }
            // return true
            return true;
        }
    }
    exports.default = SConfig;
    SConfig._registeredProxies = {};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1jb25maWcvc3JjL3NoYXJlZC9TQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDRGQUFzRTtJQUN0RSxnRkFBMEQ7SUFDMUQsZ0ZBQTBEO0lBQzFELCtFQUF5RDtJQUN6RCw0RkFBd0U7SUFFeEUsK0VBQXlEO0lBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSCxNQUFxQixPQUFPO1FBeUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ0gsWUFBWSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUE5RC9COzs7Ozs7OztlQVFHO1lBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztZQUViOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQWdDYixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsQ0FDakYsQ0FBQzthQUNIO1lBRUQseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWYsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxTQUFTLG1CQUNaLFFBQVEsRUFBRSxFQUFFLEVBQ1osY0FBYyxFQUFFLElBQUksRUFDcEIsU0FBUyxFQUFFLElBQUksRUFDZixRQUFRLEVBQUUsSUFBSSxFQUNkLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxLQUFLLEVBQ2YsUUFBUSxFQUFFLElBQUksRUFDZCxRQUFRLEVBQUUsSUFBSSxFQUNkLGFBQWEsRUFBRSxHQUFHLEVBQ2xCLDJC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
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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/object/set", "@coffeekraken/sugar/shared/crypt/md5", "@coffeekraken/sugar/shared/is/plainObject", "@coffeekraken/sugar/shared/object/deepMap", "./adapters/SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
    const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
    const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
    const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
    const deepMap_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMap"));
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
            this._name = name;
            // save the settings
            this._settings = Object.assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, updateTimeout: 500, throwErrorOnUndefinedConfig: true }, settings);
            // init all the adapters if needed
            this._settings.adapters.forEach((adapter) => {
                if (!adapter instanceof SConfigAdapter_1.default) {
                    throw new Error(`You have specified the adapter "${adapter.name || 'unknown'}" as adapter for your "${this._name}" SConfig instance but this adapter does not extends the SConfigAdapter class...`);
                }
                // make sure we have a name for this adapter
                if (!adapter.name) {
                    adapter.name = this._name + ':' + adapter.constructor.name;
                }
                else {
                    adapter.name = this._name + ':' + adapter.name;
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
            const config = this._adapters[adapter].instance.load();
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
                throw new Error(`You try to save the config on the "${this._name}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`);
            }
            for (let i = 0; i < adapters.length; i++) {
                const adapter = adapters[i];
                if (adapter && !this._adapters[adapter]) {
                    throw new Error(`You try to save the config on the "${this._name}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`);
                }
                this._adapters[adapter].instance.save(this._adapters[adapter].config);
            }
            // all saved correctly
            return true;
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
        get(path, adapter = this._settings.defaultAdapter, settings = {}) {
            settings = deepMerge_1.default(this._settings, settings);
            if (adapter && !this._adapters[adapter]) {
                throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
            }
            if (Object.keys(this._adapters[adapter].config).length === 0) {
                this.load();
            }
            let originalValue = get_1.default(this._adapters[adapter].config, path);
            if (plainObject_1.default(originalValue)) {
                originalValue = deepMap_1.default(originalValue, ({ value }) => {
                    // check if we get some things to use as variable
                    const isArray = Array.isArray(value);
                    if (!isArray)
                        value = [value];
                    value = value.map((v) => {
                        if (typeof v === 'string') {
                            const reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                            const matches = v.match(reg);
                            if (matches && matches.length) {
                                if (matches.length === 1 && v === matches[0]) {
                                    v = this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                                    return v;
                                }
                                else {
                                    matches.forEach((match) => {
                                        v = v.replace(match, this.get(match.replace('[config.', '').replace(']', ''), adapter));
                                    });
                                    return v;
                                }
                            }
                        }
                        return v;
                    });
                    if (!isArray)
                        return value[0];
                    return value;
                });
            }
            else if (typeof originalValue === 'string' ||
                Array.isArray(originalValue)) {
                const isArray = Array.isArray(originalValue);
                let val = isArray ? originalValue : [originalValue];
                val = val.map((v) => {
                    if (typeof v !== 'string')
                        return v;
                    const reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                    const matches = v.match(reg);
                    if (matches) {
                        if (matches.length === 1 && v === matches[0]) {
                            v = this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                            return v;
                        }
                        else {
                            matches.forEach((match) => {
                                v = v.replace(match, this.get(match.replace('[config.', '').replace(']', ''), adapter));
                            });
                            return v;
                        }
                    }
                    else {
                        return v;
                    }
                });
                if (!isArray)
                    originalValue = val[0];
                else
                    originalValue = val;
            }
            if (settings.throwErrorOnUndefinedConfig && originalValue === undefined) {
                throw new Error(`You try to get the config "${path}" on the "${this._name}" SConfig instance but this config does not exists...`);
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
                throw new Error(`You try to set a config value on the "${this._name}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
            }
            // check if we allow new config or not
            if (!this._settings.allowNew &&
                get_1.default(this._adapters[this._settings.defaultAdapter].config, path) ===
                    undefined) {
                throw new Error(`You try to set the config "${path}" on the "${this._name}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEZBQXNFO0lBQ3RFLGdGQUEwRDtJQUMxRCxnRkFBMEQ7SUFDMUQsK0VBQXlEO0lBQ3pELDRGQUF3RTtJQUN4RSx3RkFBa0U7SUFDbEUsK0VBQXlEO0lBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSCxNQUFxQixPQUFPO1FBa0MxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ0gsWUFBWSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUF2RC9COzs7Ozs7OztlQVFHO1lBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztZQUViOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQXlCYixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsQ0FDakYsQ0FBQzthQUNIO1lBRUQseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxtQkFDWixRQUFRLEVBQUUsRUFBRSxFQUNaLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsUUFBUSxFQUFFLElBQUksRUFDZCxVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsS0FBSyxFQUNmLFFBQVEsRUFBRSxJQUFJLEVBQ2QsUUFBUSxFQUFFLElBQUksRUFDZCxhQUFhLEVBQUUsR0FBRyxFQUNsQiwyQkFBMkIsRUFBRSxJQUFJLElBQzlCLFFBQVEsQ0FDWixDQUFDO1lBRUYsa0NBQWtD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
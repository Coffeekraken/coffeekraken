"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const get_1 = __importDefault(require("../object/get"));
const set_1 = __importDefault(require("../object/set"));
const md5_1 = __importDefault(require("../crypt/md5"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const deepMap_1 = __importDefault(require("../object/deepMap"));
const SConfigAdapter_1 = __importDefault(require("./adapters/SConfigAdapter"));
/**
 * @name                                            config
 * @namespace           sugar.js.config
 * @type                                            Class
 * @status              beta
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are:
 * - For node:
 *  - File system adapter: @coffeekraken/sugar/node/config/adapters/SConfigFsAdapter
 * - For js:
 *  - Localstorage adapter: @coffeekraken/sugar/js/config/adapters/SConfigLsAdapter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "catch" method that allows to get the saving errors, etc...
 *
 * @example             js
 * import SConfig from '@coffeekraken/sugar/js/config/SConfig';
 * import SConfigLsAdapter from '@coffeekraken/sugar/js/config/adapters/SConfigLsAdapter';
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
const _SConfigLoadingByAdapter = {};
module.exports = class SConfig {
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Init the config instance by passing a name and a settings object to configure your instance
     *
     * @param                 {String}                    name                  The name of the config
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
            adapterObj.instance.on('update', (path) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // load the updated config
                    this.load();
                }, this._settings.updateTimeout);
            });
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
     * @return          {Promise}                                                              A promise once all the adapters have correctly saved the config
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
     * @param                 {String}                      path                 The dotted object path for the value wanted
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
     * @param                 {String}                      path                 The dotted object path for the value wanted
     * @param                 {Mixed}                       value                 The value to set
     * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
     * @return                {Promise}                                           A promise resolved once the setting has been correctly set (and save depending on your instance config)
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxvRUFBOEM7QUFDOUMsd0RBQWtDO0FBQ2xDLHdEQUFrQztBQUVsQyx1REFBaUM7QUFDakMsb0VBQWdEO0FBQ2hELGdFQUEwQztBQUMxQywrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQUNwQyxpQkFBUyxNQUFNLE9BQU87SUFrQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxZQUFZLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQXZEL0I7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBeUJiLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0ZBQWdGLENBQ2pGLENBQUM7U0FDSDtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVsQixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsbUJBQ1osUUFBUSxFQUFFLEVBQUUsRUFDWixjQUFjLEVBQUUsSUFBSSxFQUNwQixTQUFTLEVBQUUsSUFBSSxFQUNmLFFBQVEsRUFBRSxJQUFJLEVBQ2QsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLEtBQUssRUFDZixRQUFRLEVBQUUsSUFBSSxFQUNkLFFBQVEsRUFBRSxJQUFJLEVBQ2QsYUFBYSxFQUFFLEdBQUcsRUFDbEIsMkJBQTJCLEVBQUUsSUFBSSxJQUM5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
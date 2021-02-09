"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const get_1 = __importDefault(require("../object/get"));
const set_1 = __importDefault(require("../object/set"));
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
class SConfig {
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
        this._settings = Object.assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, throwErrorOnUndefinedConfig: true }, settings);
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
                        return resolve(c);
                    }
                    return resolve(this._adapters[adapter].config);
                });
            });
        }
        else if (plainObject_1.default(config)) {
            this._adapters[adapter].config = config;
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
        let value = get_1.default(this._adapters[adapter].config, path);
        if (plainObject_1.default(value)) {
            value = deepMap_1.default(value, (val, prop, fullPath) => {
                // check if we get some things to use as variable
                const isArray = Array.isArray(val);
                if (!isArray)
                    val = [val];
                val = val.map((v) => {
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
                    return val[0];
                return val;
            });
        }
        else if (typeof value === 'string' || Array.isArray(value)) {
            const isArray = Array.isArray(value);
            let val = isArray ? value : [value];
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
                value = val[0];
            else
                value = val;
        }
        if (settings.throwErrorOnUndefinedConfig && value === undefined) {
            throw new Error(`You try to get the config "${path}" on the "${this._name}" SConfig instance but this config does not exists...`);
        }
        return value;
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
}
exports.default = SConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLG9FQUE4QztBQUM5Qyx3REFBa0M7QUFDbEMsd0RBQWtDO0FBR2xDLG9FQUFnRDtBQUNoRCxnRUFBMEM7QUFDMUMsK0VBQXlEO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFDcEMsTUFBcUIsT0FBTztJQWtDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFlBQVksSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBdkQvQjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxJQUFJLENBQUM7UUFFYjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUF5QmIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsQ0FDakYsQ0FBQztTQUNIO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxtQkFDWixRQUFRLEVBQUUsRUFBRSxFQUNaLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsUUFBUSxFQUFFLElBQUksRUFDZCxVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsS0FBSyxFQUNmLFFBQVEsRUFBRSxJQUFJLEVBQ2QsUUFBUSxFQUFFLElBQUksRUFDZCwyQkFBMkIsRUFBRSxJQUFJLElBQzlCLFFBQVEsQ0FDWixDQUFDO1FBRUYsa0NBQWtD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
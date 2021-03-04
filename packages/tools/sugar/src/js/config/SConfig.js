// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "../object/get", "../object/set", "../crypt/md5", "../is/plainObject", "../object/deepMap", "./adapters/SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var md5_1 = __importDefault(require("../crypt/md5"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var deepMap_1 = __importDefault(require("../object/deepMap"));
    var SConfigAdapter_1 = __importDefault(require("./adapters/SConfigAdapter"));
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
    var _SConfigLoadingByAdapter = {};
    return /** @class */ (function () {
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
        function SConfig(name, settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
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
                throw new Error("The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...");
            }
            // save the settings name
            this._name = name;
            // save the settings
            this._settings = __assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, updateTimeout: 500, throwErrorOnUndefinedConfig: true }, settings);
            // init all the adapters if needed
            this._settings.adapters.forEach(function (adapter) {
                if (!adapter instanceof SConfigAdapter_1.default) {
                    throw new Error("You have specified the adapter \"" + (adapter.name || 'unknown') + "\" as adapter for your \"" + _this._name + "\" SConfig instance but this adapter does not extends the SConfigAdapter class...");
                }
                // make sure we have a name for this adapter
                if (!adapter.name) {
                    adapter.name = _this._name + ':' + adapter.constructor.name;
                }
                else {
                    adapter.name = _this._name + ':' + adapter.name;
                }
                _this._adapters[adapter.name] = {
                    instance: adapter,
                    config: {}
                };
            });
            // set the default get adapter if it has not been specified in the settings
            if (!this._settings.defaultAdapter) {
                this._settings.defaultAdapter = Object.keys(this._adapters)[0];
            }
            Object.keys(this._adapters).forEach(function (adapterName) {
                var adapterObj = _this._adapters[adapterName];
                var timeout;
                if (!adapterObj.instance)
                    return;
                adapterObj.instance.on('update', function (path) {
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        // load the updated config
                        _this.load();
                    }, _this._settings.updateTimeout);
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
        SConfig.prototype.load = function (adapter) {
            // make sure we load only once the config
            // if (_SConfigLoadingByAdapter[adapter]) {
            //   return null;
            // }
            // _SConfigLoadingByAdapter[adapter] = true;
            var _this = this;
            if (adapter === void 0) { adapter = this._settings.defaultAdapter; }
            if (!this._adapters[adapter]) {
                throw new Error("You try to load the config from the adapter \"" + adapter + "\" but this adapter does not exists...");
            }
            if (Object.keys(this._adapters[adapter].config).length !== 0) {
                return this._adapters[adapter].config;
            }
            var config = this._adapters[adapter].instance.load();
            if (config instanceof Promise) {
                return new Promise(function (resolve) {
                    config.then(function (c) {
                        if (Object.keys(_this._adapters[adapter].config).length === 0 && c) {
                            _this._adapters[adapter].config = c;
                            _this._adapters[adapter].config.$ = {
                                hash: md5_1.default.encrypt(c),
                                loadedAt: Date.now()
                            };
                            return resolve(c);
                        }
                        return resolve(_this._adapters[adapter].config);
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
                throw new Error("SConfig: Your \"load\" method of the \"" + adapter + "\" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is \"" + config + "\" which is of type \"" + typeof config + "\"...");
            }
        };
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
        SConfig.prototype.save = function (adapters) {
            if (adapters === void 0) { adapters = Object.keys(this._adapters); }
            if (!this._settings.allowSave) {
                throw new Error("You try to save the config on the \"" + this._name + "\" SConfig instance but this instance does not allow to save configs... Set the \"settings.allowSave\" property to allow this action...");
            }
            for (var i = 0; i < adapters.length; i++) {
                var adapter = adapters[i];
                if (adapter && !this._adapters[adapter]) {
                    throw new Error("You try to save the config on the \"" + this._name + "\" SConfig instance using the adapter \"" + adapter + "\" but this adapter does not exists...");
                }
                this._adapters[adapter].instance.save(this._adapters[adapter].config);
            }
            // all saved correctly
            return true;
        };
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
        SConfig.prototype.get = function (path, adapter, settings) {
            var _this = this;
            if (adapter === void 0) { adapter = this._settings.defaultAdapter; }
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            if (adapter && !this._adapters[adapter]) {
                throw new Error("You try to get the config value \"" + path + "\" using the adapter \"" + adapter + "\" but this adapter does not exists...");
            }
            if (Object.keys(this._adapters[adapter].config).length === 0) {
                this.load();
            }
            var value = get_1.default(this._adapters[adapter].config, path);
            if (plainObject_1.default(value)) {
                value = deepMap_1.default(value, function (val, prop, fullPath) {
                    // check if we get some things to use as variable
                    var isArray = Array.isArray(val);
                    if (!isArray)
                        val = [val];
                    val = val.map(function (v) {
                        if (typeof v === 'string') {
                            var reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                            var matches = v.match(reg);
                            if (matches && matches.length) {
                                if (matches.length === 1 && v === matches[0]) {
                                    v = _this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                                    return v;
                                }
                                else {
                                    matches.forEach(function (match) {
                                        v = v.replace(match, _this.get(match.replace('[config.', '').replace(']', ''), adapter));
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
                var isArray = Array.isArray(value);
                var val = isArray ? value : [value];
                val = val.map(function (v) {
                    if (typeof v !== 'string')
                        return v;
                    var reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                    var matches = v.match(reg);
                    if (matches) {
                        if (matches.length === 1 && v === matches[0]) {
                            v = _this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                            return v;
                        }
                        else {
                            matches.forEach(function (match) {
                                v = v.replace(match, _this.get(match.replace('[config.', '').replace(']', ''), adapter));
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
                throw new Error("You try to get the config \"" + path + "\" on the \"" + this._name + "\" SConfig instance but this config does not exists...");
            }
            return value;
        };
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
        SConfig.prototype.set = function (path, value, adapters) {
            var _this = this;
            if (adapters === void 0) { adapters = Object.keys(this._adapters); }
            if (!this._settings.allowSet) {
                throw new Error("You try to set a config value on the \"" + this._name + "\" SConfig instance but this instance does not allow to set values... Set the \"settings.allowSet\" property to allow this action...");
            }
            // check if we allow new config or not
            if (!this._settings.allowNew &&
                get_1.default(this._adapters[this._settings.defaultAdapter].config, path) ===
                    undefined) {
                throw new Error("You try to set the config \"" + path + "\" on the \"" + this._name + "\" SConfig instance but this config does not exists and this instance does not allow for new config creation...");
            }
            adapters.forEach(function (adapter) {
                if (adapter && !_this._adapters[adapter]) {
                    throw new Error("You try to set the config value \"" + path + "\" using the adapter \"" + adapter + "\" but this adapter does not exists...");
                }
                set_1.default(_this._adapters[adapter].config, path, value);
            });
            // check if need to autoSave or not
            if (this._settings.autoSave) {
                return this.save(adapters);
            }
            // return true
            return true;
        };
        return SConfig;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsc0RBQWtDO0lBQ2xDLHNEQUFrQztJQUVsQyxxREFBaUM7SUFDakMsa0VBQWdEO0lBQ2hELDhEQUEwQztJQUMxQyw2RUFBeUQ7SUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxJQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztJQUNwQztRQWtDRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ0gsaUJBQVksSUFBSSxFQUFFLFFBQWE7WUFBL0IsaUJBeUVDO1lBekVpQix5QkFBQSxFQUFBLGFBQWE7WUF2RC9COzs7Ozs7OztlQVFHO1lBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztZQUViOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQXlCYixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsQ0FDakYsQ0FBQzthQUNIO1lBRUQseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxjQUNaLFFBQVEsRUFBRSxFQUFFLEVBQ1osY0FBYyxFQUFFLElBQUksRUFDcEIsU0FBUyxFQUFFLElBQUksRUFDZixRQUFRLEVBQUUsSUFBSSxFQUNkLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxLQUFLLEVBQ2YsUUFBUSxFQUFFLElBQUksRUFDZCxRQUFRLEVBQUUsSUFBSSxFQUNkLGFB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
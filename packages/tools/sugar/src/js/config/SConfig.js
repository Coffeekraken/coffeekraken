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
        define(["require", "exports", "../object/deepMerge", "../object/get", "../object/set", "../is/plainObject", "../object/deepMap", "./adapters/SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var deepMap_1 = __importDefault(require("../object/deepMap"));
    var SConfigAdapter_1 = __importDefault(require("./adapters/SConfigAdapter"));
    /**
     * @name                                            config
     * @namespace           sugar.js.config
     * @type                                            Class
     * @beta
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
            this._settings = __assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, throwErrorOnUndefinedConfig: true }, settings);
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
                            return resolve(c);
                        }
                        return resolve(_this._adapters[adapter].config);
                    });
                });
            }
            else if (plainObject_1.default(config)) {
                this._adapters[adapter].config = config;
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
            // if (typeof value === 'function') {
            //   console.log('COCOC');
            //   const _get = this.get.bind(this);
            //   value = value(_get);
            // }
            if (plainObject_1.default(value)) {
                value = deepMap_1.default(value, function (val, prop, fullPath) {
                    // check if we get some things to use as variable
                    if (typeof val === 'string') {
                        // if (val.substr(0, 7) === '@config') {
                        //   val = this.get(val.replace('@config.', ''), adapter);
                        //   return val;
                        // }
                        var reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                        var matches = val.match(reg);
                        if (matches && matches.length) {
                            if (matches.length === 1 && val === matches[0]) {
                                val = _this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                                return val;
                            }
                            else {
                                matches.forEach(function (match) {
                                    val = val.replace(match, _this.get(match.replace('[config.', '').replace(']', ''), adapter));
                                });
                            }
                            return val;
                        }
                    }
                    return val;
                });
            }
            else if (typeof value === 'string') {
                var reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
                var matches = value.match(reg);
                if (matches) {
                    if (matches.length === 1 && value === matches[0]) {
                        value = this.get(matches[0].replace('[config.', '').replace(']', ''), adapter);
                        return value;
                    }
                    else {
                        matches.forEach(function (match) {
                            value = value.replace(match, _this.get(match.replace('[config.', '').replace(']', ''), adapter));
                        });
                    }
                }
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
//# sourceMappingURL=SConfig.js.map
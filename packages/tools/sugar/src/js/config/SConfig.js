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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsc0RBQWtDO0lBQ2xDLHNEQUFrQztJQUdsQyxrRUFBZ0Q7SUFDaEQsOERBQTBDO0lBQzFDLDZFQUF5RDtJQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCRztJQUNILElBQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0lBQ3BDO1FBa0NFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FxQkc7UUFDSCxpQkFBWSxJQUFJLEVBQUUsUUFBYTtZQUEvQixpQkEyREM7WUEzRGlCLHlCQUFBLEVBQUEsYUFBYTtZQXZEL0I7Ozs7Ozs7O2VBUUc7WUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWI7Ozs7Ozs7O2VBUUc7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBRWY7Ozs7Ozs7O2VBUUc7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBeUJiLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLGdGQUFnRixDQUNqRixDQUFDO2FBQ0g7WUFFRCx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFFbEIsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxTQUFTLGNBQ1osUUFBUSxFQUFFLEVBQUUsRUFDWixjQUFjLEVBQUUsSUFBSSxFQUNwQixTQUFTLEVBQUUsSUFBSSxFQUNmLFFBQVEsRUFBRSxJQUFJLEVBQ2QsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLEtBQUssRUFDZixRQUFRLEVBQUUsSUFBSSxFQUNkLFFBQVEsRUFBRSxJQUFJLEVBQ2QsMkJBQTJCLEVBQUUsSUFB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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _get = _interopRequireDefault(require("../object/get"));

var _set = _interopRequireDefault(require("../object/set"));

var _resolveTokens = _interopRequireDefault(require("../object/resolveTokens"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _deepMap = _interopRequireDefault(require("../object/deepMap"));

var _SConfigAdapter = _interopRequireDefault(require("./adapters/SConfigAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Add a "catch" method that allows to get the saving errors, etc...

/**
 * @name                                            config
 * @namespace                                       sugar.js.config
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are:
 * - For node:
 *  - File system adapter: @coffeekraken/sugar/node/config/adapters/SConfigFsAdapter
 * - For js:
 *  - Localstorage adapter: @coffeekraken/sugar/js/config/adapters/SConfigLsAdapter
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SConfig = /*#__PURE__*/function () {
  /**
   * @name              _name
   * @type              {String}
   * @private
   *
   * The name of the config
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _adapters
   * @type            {Object}
   * @private
   *
   * Save the registered adapters instances
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name             _settings
   * @type              {Object}
   * @private
   *
   * Store the actual settings object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SConfig(name, settings = {}) {
    _classCallCheck(this, SConfig);

    _defineProperty(this, "_name", null);

    _defineProperty(this, "_adapters", {});

    _defineProperty(this, "_settings", {});

    // store the name
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
    } // save the settings name


    this._name = name; // save the settings

    this._settings = {
      adapters: [],
      defaultAdapter: null,
      allowSave: true,
      allowSet: true,
      allowReset: true,
      allowNew: false,
      autoLoad: true,
      autoSave: true,
      throwErrorOnUndefinedConfig: true,
      ...settings
    }; // init all the adapters if needed

    this._settings.adapters.forEach(adapter => {
      if (!adapter instanceof _SConfigAdapter.default) {
        throw new Error(`You have specified the adapter "${adapter.name || 'unknown'}" as adapter for your "${this._name}" SConfig instance but this adapter does not extends the SConfigAdapter class...`);
      } // make sure we have a name for this adapter


      if (!adapter.name) {
        adapter.name = this._name + ':' + adapter.constructor.name;
      } else {
        adapter.name = this._name + ':' + adapter.name;
      }

      this._adapters[adapter.name] = {
        instance: adapter,
        config: {}
      };
    }); // set the default get adapter if it has not been specified in the settings


    if (!this._settings.defaultAdapter) {
      this._settings.defaultAdapter = Object.keys(this._adapters)[0];
    } // load the config from the default adapter if the setting "autoLoad" is true


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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SConfig, [{
    key: "load",
    value: function load(adapter = this._settings.defaultAdapter) {
      if (!this._adapters[adapter]) {
        throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
      }

      const config = this._adapters[adapter].instance.load();

      if (config instanceof Promise) {
        return new Promise(resolve => {
          config.then(c => {
            c = (0, _resolveTokens.default)(JSON.parse(JSON.stringify(c)));
            this._adapters[adapter].config = c;
            resolve(c);
          });
        });
      }

      this._adapters[adapter].config = config;
      return config;
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "save",
    value: function save(adapters = Object.keys(this._adapters)) {
      if (!this._settings.allowSave) {
        throw new Error(`You try to save the config on the "${this._name}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`);
      }

      for (let i = 0; i < adapters.length; i++) {
        const adapter = adapters[i];

        if (adapter && !this._adapters[adapter]) {
          throw new Error(`You try to save the config on the "${this._name}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`);
        }

        this._adapters[adapter].instance.save(this._adapters[adapter].config);
      } // all saved correctly


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
     * @return                {Mixed}                                            The value getted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "get",
    value: function get(path, adapter = this._settings.defaultAdapter) {
      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
      }

      let value = (0, _get.default)(this._adapters[adapter].config, path);

      if ((0, _plainObject.default)(value)) {
        value = (0, _deepMap.default)(value, (val, prop, fullPath) => {
          // check if we get some things to use as variable
          if (typeof val === 'string') {
            const reg = /\[config.[a-zA-Z0-9.]+\]/gm;
            const matches = val.match(reg);

            if (matches && matches.length) {
              matches.forEach(match => {
                val = val.replace(match, this.get(match.replace('[config.', '').replace(']', '')));
              });
              return val;
            }
          } // if (typeof val === 'string' /& val.slice(0,1) === '<')
          // if (typeof val === 'string' && val.substr(0, 7) === '@config') {
          //   return this.get(val.replace('@config.', ''), adapter);
          // }


          return val;
        });
      } else if (typeof value === 'string' && value.substr(0, 7) === '@config') {
        value = this.get(value.replace('@config.', ''), adapter);
      }

      if (this._settings.throwErrorOnUndefinedConfig && value === undefined) {
        throw new Error(`You try to get the config "${path}" on the "${this._name}" SConfig instance but this config does not exists...`);
      }

      return value;
    }
    /**
     * @name                                set
     * @namespace                           sugar.node.config.SConfig
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "set",
    value: function set(path, value, adapters = Object.keys(this._adapters)) {
      if (!this._settings.allowSet) {
        throw new Error(`You try to set a config value on the "${this._name}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
      } // check if we allow new config or not


      if (!this._settings.allowNew && (0, _get.default)(this._adapters[this._settings.defaultAdapter].config, path) === undefined) {
        throw new Error(`You try to set the config "${path}" on the "${this._name}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
      }

      adapters.forEach(adapter => {
        if (adapter && !this._adapters[adapter]) {
          throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
        }

        (0, _set.default)(this._adapters[adapter].config, path, value);
      }); // check if need to autoSave or not

      if (this._settings.autoSave) {
        return this.save(adapters);
      } // return true


      return true;
    }
  }]);

  return SConfig;
}();

exports.default = SConfig;
module.exports = exports.default;
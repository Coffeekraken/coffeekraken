"use strict";

var _set = _interopRequireDefault(require("../../object/set"));

var _get = _interopRequireDefault(require("../../object/get"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _parse = _interopRequireDefault(require("../../string/parse"));

var _stringifyObject = _interopRequireDefault(require("stringify-object"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SConfigAdapter = _interopRequireDefault(require("./SConfigAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  SConfigLsAdapter
 * @namespace             sugar.js.config.adapters
 * @type                  Class
 *
 * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
 * let the SConfig class do the work for you...
 * 
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - defaultConfig ({}) {Object}: This specify the "default" config that you want.
 * - appConfig ({}) {Object}: This specify the "application" level config that you want.
 * - userConfig ({}) {Object}: This specify the "user" level config that you want. It's usually this config that is updated
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SConfigLsAdapter extends _SConfigAdapter.default {
  constructor(settings = {}) {
    super(settings);
  }

  async load() {
    // try to get the config from the localstorage
    const config = (0, _parse.default)(localStorage.getItem(this._settings.name)) || {}; // mix the configs and save them in the instance

    return (0, _deepMerge.default)(config.default || {}, config.app || {}, config.user || {});
  }

  async save(newConfig = {}) {
    localStorage.setItem(this._settings.name, (0, _toString.default)({
      default: this._settings.defaultConfig,
      app: this._settings.appConfig,
      user: newConfig
    }));
    return true;
  }

};
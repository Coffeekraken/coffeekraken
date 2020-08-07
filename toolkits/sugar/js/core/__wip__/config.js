"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("../is/base64"));

var _base2 = _interopRequireDefault(require("../crypt/base64"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _ensureExist = _interopRequireDefault(require("../object/ensureExist"));

var _get = _interopRequireDefault(require("../object/get"));

var _set = _interopRequireDefault(require("../object/set"));

var _json = _interopRequireDefault(require("../is/json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                          config
 * @namespace           js.core
 * @namespace                     Function
 *
 * Access the configuration setted using the "config(path, value)" function
 *
 * @param               {String}                  path                        The dotted config path to get like "log.mail"
 * @param               {Mixed}                   [value=null]                The value to set. Will return the setted value if passed
 * @return              {Mixed}                                               Return the config value wanted
 *
 * @example           js
 * import config from '@coffeekraken/sugar/js/core/js';
 * config('log.mail.host'); // => gmail.google.com
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
let __sugarConfig = window.sConfig || localStorage.getItem('sConfig') || {}; // if (typeof __sugarConfig === 'string' && __isBase64(__sugarConfig)) __sugarConfig = __base64.decrypt(__sugarConfig);
// if (typeof __sugarConfig === 'string' && __isJson(__sugarConfig)) __sugarConfig = JSON.parse(__sugarConfig);


var _default = (path, value = null) => {
  // process the path
  if (path === '.' || path === '' || !path) {
    path = '';
  }

  if ((0, _base.default)(value)) {
    value = _base2.default.decrypt(value);
  }

  if ((0, _json.default)(value)) {
    value = JSON.parse(value);
  }

  if (typeof value === 'object' && (path === '.' || path === '' || !path)) {
    __sugarConfig = (0, _deepMerge.default)(__sugarConfig, value);
    return __sugarConfig;
  }

  let newValue; // check if is a set or get process

  if (value) {
    newValue = (0, _set.default)(__sugarConfig, path, value);
  } else {
    // get the wanted path
    newValue = (0, _get.default)(__sugarConfig, path);
  } // preparing the value to set in the storage


  let configToSave = __sugarConfig;
  if (typeof configToSave !== 'string') configToSave = JSON.stringify(configToSave);

  const encryptedConfig = _base2.default.encrypt(configToSave); // save the new settings


  window.sConfig = encryptedConfig;
  localStorage.setItem('sConfig', encryptedConfig); // return the new settings value

  return newValue;
};

exports.default = _default;
module.exports = exports.default;
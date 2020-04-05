"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(require("../object/ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                  isTransportRegistered
 * @namespace                             sugar.js.log
 * @type                                  Function
 *
 * Check if the passed transport is already registered
 *
 * @param             {String}                name                    The transport name to check
 * @return            {Boolean}                                       true if already registered, false if not
 *
 * @example           js
 * import isTransportRegistered from '@coffeekraken/sugar/js/log/isTransportRegistered';
 * isTransportRegistered('console'); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = name => {
  (0, _ensureExist.default)('window.Sugar._logTransports');
  return Sugar._logTransports[name] ? true : false;
};

exports.default = _default;
module.exports = exports.default;
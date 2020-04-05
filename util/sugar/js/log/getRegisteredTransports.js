"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(require("../object/ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                              getRegisteredTransports
 * @namespace                         sugar.js.log
 * @type                              Function
 *
 * Return an object with all the registered transports functions stored by transport name
 *
 * @return                      {Object}                                    An object in which keys are transports names and values transports functions
 *
 * @example                   js
 * import getRegisteredTransports from '@coffeekraken/sugar/js/log/getRegisteredTransports';
 * getRegisteredTransports(); // => { console: ... }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = () => {
  (0, _ensureExist.default)('window.Sugar._logTransports');
  return Sugar._logTransports ? Sugar._logTransports : {};
};

exports.default = _default;
module.exports = exports.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _es = _interopRequireDefault(require("aggregation/es5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                multipleExtends
 * @namespace           js.class
 * @type                Function
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (...classes) => {
  return (0, _es.default)(...classes);
};

exports.default = _default;
module.exports = exports.default;
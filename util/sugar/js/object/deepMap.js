"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMap;

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            deepMap
 * @namespace           js.object
 * @type            Function
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, (value, prop, fullPath) => {
 *    return '~ ' + value;
 * });
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(object, processor, _path = []) {
  Object.keys(object).forEach(prop => {
    if ((0, _plainObject.default)(object[prop])) {
      object[prop] = deepMap(object[prop], processor, [..._path, prop]); // return;
    }

    const res = processor(object[prop], prop, [..._path, prop].join('.'));
    if (res === -1) delete object[prop];else object[prop] = res;
  });
  return object;
}

module.exports = exports.default;
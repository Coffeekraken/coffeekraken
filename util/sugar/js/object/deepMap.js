"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMap;

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

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
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - processObjects (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
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
function deepMap(object, processor, settings = {}, _path = []) {
  settings = (0, _deepMerge.default)({
    deepFirst: false,
    processObjects: false
  }, settings);
  Object.keys(object).forEach(prop => {
    if (!settings.deepFirst) {
      if ((0, _plainObject.default)(object[prop])) {
        object[prop] = deepMap(object[prop], processor, settings, [..._path, prop]);
        if (!settings.processObjects) return;
      }

      const res = processor(object[prop], prop, [..._path, prop].join('.'));
      if (res === -1) delete object[prop];else object[prop] = res;
    } else {
      const res = processor(object[prop], prop, [..._path, prop].join('.'));
      if (res === -1) delete object[prop];else object[prop] = res;

      if ((0, _plainObject.default)(object[prop])) {
        object[prop] = deepMap(object[prop], processor, settings, [..._path, prop]);
        if (!settings.processObjects) return;
      }
    }
  });
  return object;
}

module.exports = exports.default;
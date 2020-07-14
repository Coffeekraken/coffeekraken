"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepize;

var _set = _interopRequireDefault(require("./set"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          deepize
 * @namespace     js.object
 * @type          Function
 *
 * This function simply take an object like this one:
 * {
 *    'something.cool': 'hello'
 * }
 * and convert it to something like this:
 * {
 *    something: {
 *      cool: 'hello'
 *    }
 * }
 *
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
 *
 * @example       js
 * import deepize from '@coffeekraken/sugar/js/object/deepize';
 * deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepize(object) {
  const finalObject = {};

  for (const key in object) {
    (0, _set.default)(finalObject, key, object[key]);
  }

  return finalObject;
}

module.exports = exports.default;
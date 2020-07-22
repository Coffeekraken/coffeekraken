"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serialize;

var _fastSafeStringify = _interopRequireDefault(require("fast-safe-stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            serialize
 * @namespace       js.class
 * @type            Function
 *
 * This function allows you to serialize a class instance
 * into a JSON formated string that you can then deserialize using
 * the ```js.class.deserialize``` function to get your class instance
 * back.
 *
 * @param       {Mixed}         instaance       The class instance to serialize
 * @return      {String}                        A JSON properly formated string
 *
 * @example       js
 * import serialize from '@coffeekraken/sugar/js/class/serialize';
 * class MyCoolClass {
 *    _myProperty = 'coco';
 * }
 * const myInstance = new MyCoolClass();
 * serialize(myInstance); // => {
 *    '_class' => 'my/cool/class',
 *    '_properties' => {
 *      '_myProperty' => 'coco'
 *    }
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function serialize(instance) {
  return (0, _fastSafeStringify.default)({
    _import: instance.constructor.import,
    _instance: instance
  });
}

module.exports = exports.default;
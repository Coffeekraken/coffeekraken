"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _lodash = _interopRequireDefault(require("lodash.clone"));

var _lodash2 = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                clone
 * @type                Function
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Boolean}       [deep=false]  Specify if you want to clone the object deeply
 *
 * @example       js
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function clone(object, deep) {
  if (deep === void 0) {
    deep = false;
  }

  if (deep) {
    return (0, _lodash2.default)(object);
  }

  return (0, _lodash.default)(object);
}

module.exports = exports.default;
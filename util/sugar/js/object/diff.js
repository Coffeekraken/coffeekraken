"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diff;

var _objectDiff = _interopRequireDefault(require("object-diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      diff
 * @namespace                 sugar.js.object
 * @type                      Function
 * 
 * This function take two objects and return an object that contains only what has been changed between the two.
 * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
 * 
 * @param         {Object}          object1            The first object used for the diff process
 * @param         {Object}          object2            The second object used for the diff process
 * @return        {Object}                             The object that contains only the differences between the two
 * 
 * @example         js
 * import diff from '@coffeekraken/sugar/js/object/diff';
 * const myObject1 = {
 *    hello: 'world', 
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function diff(object1, object2) {
  return (0, _objectDiff.default)(object1, object2);
}

module.exports = exports.default;
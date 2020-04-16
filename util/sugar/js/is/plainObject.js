"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObject;

var _isPlainObject = _interopRequireDefault(require("is-plain-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      plainObject
 * @namespace                 sugar.js.is
 * @type                      Function
 * 
 * Check if the passed object (or array of objects) is/are plain object(s)
 * 
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 * 
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/js/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 * 
 * @see       https://www.npmjs.com/package/is-plain-object
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
  if (!Array.isArray(object)) object = [object];

  for (let i = 0; i < object.length; i++) {
    if (!(0, _isPlainObject.default)(object[i])) return false;
  }

  return true;
}

module.exports = exports.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObject;

/**
 * @name                      plainObject
 * @namespace           js.is
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
  if (!Array.isArray(object)) object = [object];

  for (let i = 0; i < object.length; i++) {
    return typeof object[i] == 'object' && object[i] !== null && object[i].constructor == Object;
  }

  return true;
}

module.exports = exports.default;
"use strict";

/**
 * @name        isBase64
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * const isBase64 = require('@coffeekraken/sugar/node/is/base64');
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function isBase64(value) {
  return Buffer.from(value, 'base64').toString('base64') === value;
};
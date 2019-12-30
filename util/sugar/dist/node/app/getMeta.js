"use strict";

/**
 * @name                  getMeta
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Get the meta data defined using the 'setMeta' function
 *
 * @return            {Object}                              The meta data object setted
 *
 * @example           js
 * const getMeta = require('@coffeekraken/sugar/node/app/getMeta');
 * getMeta(); // => { name: 'My Cool App', version: '1.0.0' }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getMeta() {
  return global._sAppMeta || {};
};
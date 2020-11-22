"use strict";
const __isPath = require('../fs/isPath');
/**
 * @name                            path
 * @namespace           sugar.node.is
 * @type                            Function
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @example       js
 * const isPath = require('@coffeekraken/sugar/node/is/path');
 * isPath('hello/world'); // => true
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function path(path, checkExistence = false) {
    return __isPath(path, checkExistence);
};

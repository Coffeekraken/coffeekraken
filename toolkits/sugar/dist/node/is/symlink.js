"use strict";

const __fs = require('fs');
/**
 * @name            symlink
 * @namespace           node.is
 * @type            Function
 *
 * This function check if the passed string path is a sySlink or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a sySlink, false if not
 *
 * @example     js
 * const isSymlink = require('@coffeekraken/sugar/node/is/symlink');
 * isSymlink('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function isSymlink(path) {
  return __fs.existsSync(path) && __fs.lstatSync(path).isSymbolicLink();
};
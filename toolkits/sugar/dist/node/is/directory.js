"use strict";

var __fs = require('fs');
/**
 * @name            directory
 * @namespace           node.is
 * @type            Function
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @example     js
 * const isDirectory = require('@coffeekraken/sugar/node/is/directory');
 * isDirectory('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function isDirectory(path) {
  return __fs.existsSync(path) && __fs.lstatSync(path).isDirectory();
};
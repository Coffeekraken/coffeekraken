"use strict";

var __isValidPath = require('is-valid-path');

var __fs = require('fs'); // TODO tests

/**
 * @name                            isPath
 * @namespace           node.fs
 * @type                            Function
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @example       js
 * const isPath = require('@coffeekraken/sugar/node/fs/isPath');
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function isPath(path, checkExistence) {
  if (checkExistence === void 0) {
    checkExistence = false;
  }

  // check if the path is valid or not
  if (!__isValidPath(path)) return false; // if we have to check the path existence

  if (checkExistence) {
    if (!__fs.existsSync(path)) return false;
  } // otherwise, all is ok


  return true;
};
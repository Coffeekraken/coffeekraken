"use strict";

const __extension = require('./extension'); // TODO tests

/**
 * @name                       filename
 * @namespace           node.fs
 * @type                        Function
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @example       js
 * const filename = require('@coffeekraken/sugar/node/fs/filename');
 * filename('hello/world.js'); // => world.js
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function filename(path, withExtension) {
  if (withExtension === void 0) {
    withExtension = true;
  }

  let filename = path.split('/').pop();

  if (!withExtension) {
    filename = filename.replace(__extension(filename), '');
  }

  return filename;
};
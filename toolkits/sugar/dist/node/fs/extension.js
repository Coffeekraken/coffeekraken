"use strict";

// TODO tests

/**
 * @name                    extension
 * @namespace           node.fs
 * @type                    Function
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * const extension = require('@coffeekraken/sugar/node/fs/extension');
 * extension('hello/world.jpg'); // => jpg
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function extension(path) {
  return path.split('.').pop();
};
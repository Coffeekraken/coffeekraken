"use strict";

const __findPkgJson = require('find-package-json');
/**
 * @name                    packageRoot
 * @namespace           node.path
 * @type                    Function
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * const packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');
 * const root = packageRoot();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function packageRoot(from, highest) {
  if (from === void 0) {
    from = process.cwd();
  }

  if (highest === void 0) {
    highest = false;
  }

  const f = __findPkgJson(from);

  let file = f.next();

  if (!highest) {
    const filename = file.filename || false;
    if (!filename) return filename;
    return filename.split('/').slice(0, -1).join('/');
  }

  let finalFile;

  while (!file.done) {
    if (file.done) break;
    finalFile = file;
    file = f.next();
  }

  if (finalFile.filename) {
    return finalFile.filename.split('/').slice(0, -1).join('/');
  }

  return false;
};
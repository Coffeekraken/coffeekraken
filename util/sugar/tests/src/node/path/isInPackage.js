const __packageRoot = require('./packageRoot');
const __fs = require('fs');

/**
 * @name                    isInPackage
 * @namespace               sugar.node.path
 * @type                    Function
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * const isInPackage = require('@coffeekraken/sugar/node/path/isInPackage');
 * const root = isInPackage();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function isInPackage(
  name,
  from = process.cwd(),
  highest = false
) {
  const packageRoot = __packageRoot(from, highest);
  if (!packageRoot) return false;
  if (!__fs.existsSync(`${packageRoot}/package.json`)) return false;
  const pkg = require(`${packageRoot}/package.json`);
  let names = name;
  if (typeof names === 'string') names = names.split(',').map((f) => f.trim());
  for (let i = 0; i < names.length; i++) {
    if (names[i] === pkg.name) {
      return true;
    }
  }
  return false;
};

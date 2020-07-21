const __packageRoot = require('./rootPath');
const __fs = require('fs');

/**
 * @name          json
 * @namespace     node.package
 * @type          Function
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @example     js
 * const json = require('@coffeekraken/sugar/node/package/json');
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = function json(from = process.cwd(), highest = false) {
  const path = `${__packageRoot(from, highest)}/package.json`;
  if (!__fs.existsSync(path)) return false;
  return require(path);
};

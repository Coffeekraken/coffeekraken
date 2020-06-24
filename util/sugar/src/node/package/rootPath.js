const __packageRoot = require('../path/packageRoot');

/**
 * @name          rootPath
 * @namespace     node.package
 * @type          Function
 *
 * This function return the absolute path of your current working package
 *
 * @return    {String}          The current working package root path
 *
 * @example     js
 * const json = require('@coffeekraken/sugar/node/package/rootPath');
 * rootPath(); => // /something/cool/myCoolPackage'
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = function rootPath() {
  return __packageRoot();
};

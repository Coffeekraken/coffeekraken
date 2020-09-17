const __packageRoot = require('../path/packageRoot');

/**
 * @name          rootPath
 * @namespace     sugar.node.package
 * @type          Function
 *
 * This function return the absolute path of your current working package
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return    {String}          The current working package root path
 *
 * @example     js
 * const json = require('@coffeekraken/sugar/node/package/rootPath');
 * rootPath(); => // /something/cool/myCoolPackage'
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = function rootPath(from = process.cwd(), highest = false) {
  return __packageRoot(from, highest);
};

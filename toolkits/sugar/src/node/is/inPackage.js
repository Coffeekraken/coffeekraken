const __isInPackage = require('../path/isInPackage');

/**
 * @name            inPackage
 * @namespace           node.is
 * @type            Function
 *
 * This function check if the we are in (one of) the package(s) passed as parameter
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return      {Boolean}                           true if is in the passed package, false if not
 *
 * @example       js
 * const isInPackage = require('@coffeekraken/sugar/node/is/inPackage');
 * isInPackage('@coffeekraken/sugar'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = function inPackage(
  name,
  from = process.cwd(),
  highest = false
) {
  return __isInPackage(name, from, highest);
};

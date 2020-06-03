"use strict";

var _parseArgs = _interopRequireDefault(require("./parseArgs"));

var _completeArgsObject = _interopRequireDefault(require("./completeArgsObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  argsToObject
 * @namespace             sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object|String}        argsObj        The arguments object or string
 * @param       {Object}             definitionObj    The definitionObj object that has to be formated like so:
 *
 * @example       js
 * import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
 * argsToObject('-a Yop, {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      default: 'Plop'
 *    },
 *    myOtherArg: {
 *      type: 'String'
 *    },
 *    lastArg: {
 *      type: 'String',
 *      alias: 'l',
 *      default: 'Nelson'
 *    }
 * });
 * // => { arg1: 'Yop', lastArg: 'Nelson' }
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function argsToObject(argsObj, definitionObj) {
  if (typeof argsObj === 'string') {
    return (0, _parseArgs.default)(argsObj, definitionObj);
  }

  return (0, _completeArgsObject.default)(argsObj, definitionObj);
};
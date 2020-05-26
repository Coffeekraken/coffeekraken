import __parseArgs from './parseArgs';

/**
 * @name                  argsToObject
 * @namespace             sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object|String}        args        The arguments object or string
 * @param       {Object}             definition    The definition object that has to be formated like so:
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
module.exports = function argsToObject(args, definition) {
  if (typeof args === 'string') {
    return __parseArgs(args, definition);
  }
  return args;
};

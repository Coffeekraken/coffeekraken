import __toString from '../string/toString';

/**
 * @name                  argsToString
 * @namespace             sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}        definition    The definition object that has to be formated like so:
 * - argName: The argument name to describe
 *    - type: The type of the value supported
 *    - alias: The alias of the full name like "t", "l", etc...
 *    - default: The default value if nothing is specified
 *    - regexp: A regexp that is used to validate the passed value
 *    - validator: A function to validate the passed value. Has to return true or false
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
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
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// TODO: support deep object structure
// TODO: support required args

module.exports = function argsToString(args, definition) {
  const cliArray = [];
  // loop on passed args
  Object.keys(definition).forEach((argName) => {
    const defObj = definition[argName];
    if (!defObj) return;
    const prefix = defObj.alias ? `-${defObj.alias}` : `--${argName}`;

    let value = args[argName] || definition[argName].default;
    if (value === undefined) {
      return;
    }
    value = __toString(value);

    if (defObj.type.toLowerCase() === 'string') value = `"${value}"`;
    if (defObj.type.toLowerCase() === 'boolean') value = '';
    if (
      defObj.type.toLowerCase() === 'object' ||
      defObj.type.toLowerCase() === 'array'
    )
      value = `"${value}"`;
    cliArray.push(`${prefix} ${value}`);
  });
  return cliArray.join(' ');
};

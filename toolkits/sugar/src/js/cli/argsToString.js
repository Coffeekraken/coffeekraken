import __toString from '../string/toString';
import __parseArgs from './parseArgs';
import __deepMerge from '../object/deepMerge';

/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}        [definitionObj=null]    The definitionObj object that has to be formated like so:
 * - argName: The argument name to describe
 *    - type: The type of the value supported
 *    - alias: The alias of the full name like "t", "l", etc...
 *    - default: The default value if nothing is specified
 *    - regexp: A regexp that is used to validate the passed value
 *    - validator: A function to validate the passed value. Has to return true or false
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definitionObj object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to use the aliases or not in the generated command
 *
 * @todo            check documentation
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

module.exports = function argsToString(
  args,
  definitionObj = null,
  settings = {}
) {
  settings = __deepMerge(
    {
      includeAllArgs: true,
      alias: true
    },
    settings
  );

  if (typeof args === 'string') {
    args = __parseArgs(args, definitionObj);
  }

  if (!definitionObj) {
    let string = '';
    Object.keys(args).forEach((key) => {
      string += ` --${key} ${__toString(args[key])}`;
    });
    return string;
  }

  const cliArray = [];
  // loop on passed args
  Object.keys(definitionObj).forEach((argName) => {
    const defObj = definitionObj[argName];
    if (!defObj) return;
    if (!settings.includeAllArgs && args[argName] === undefined) return;
    const prefix =
      defObj.alias && settings.alias ? `-${defObj.alias}` : `--${argName}`;

    let value;
    if (args && args[argName] !== undefined) value = args[argName];
    else if (definitionObj[argName] && definitionObj[argName].default)
      value = definitionObj[argName].default;
    if (
      value === undefined ||
      value === null
      // || (defObj.type.toLowerCase() === 'boolean' && value === false)
    ) {
      return;
    }
    value = __toString(value);

    if (defObj.type.toLowerCase() === 'string') value = `"${value}"`;
    // if (defObj.type.toLowerCase() === 'boolean') value = '';
    if (
      defObj.type.toLowerCase().includes('object') ||
      defObj.type.toLowerCase().includes('array')
    ) {
      value = `"${value.split('"').join("'")}"`;
    }

    cliArray.push(`${prefix} ${value}`);
  });

  return cliArray.join(' ');
};

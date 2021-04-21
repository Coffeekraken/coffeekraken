// @ts-nocheck

import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __isPlainObject from '../is/plainObject';

/**
 * @name                  argsToString
 * @namespace            js.cli
 * @type                  Function
 * @status              beta
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}      [settings={}]               A settings object to configure your command build process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Test}      Testing when no definition is passed
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// TODO: support deep object structure
// TODO: support required args

function argsToString(args, settings = {}) {
  settings = __deepMerge(
    {
      valueQuote: '"'
    },
    settings
  );

  let string = '';
  Object.keys(args).forEach((key) => {
    const argValue = args[key];
    let str = '';

    if (Array.isArray(argValue)) {
      argValue.forEach((value) => {
        let valueStr;
        if (value === true) {
          valueStr = '';
        } else {
          valueStr =
            value.toString !== undefined && typeof value.toString === 'function'
              ? value.toString()
              : __toString(value);
          if (typeof __parse(valueStr) === 'string') valueStr = `"${valueStr}"`;
        }
        if (settings.valueQuote === '"')
          valueStr = valueStr.replace(/"/g, '\\"');
        if (settings.valueQuote === "'")
          valueStr = valueStr.replace(/'/g, "\\'");
        if (settings.valueQuote === '`')
          valueStr = valueStr.replace(/`/g, '\\`');

        string += ` --${key} ${valueStr}`;
      });
    } else if (__isPlainObject(argValue)) {
      let valueStr = JSON.stringify(argValue);

      if (settings.valueQuote === '"') valueStr = valueStr.replace(/"/g, '\\"');
      if (settings.valueQuote === "'") valueStr = valueStr.replace(/'/g, "\\'");
      if (settings.valueQuote === '`') valueStr = valueStr.replace(/`/g, '\\`');

      string += ` --${key} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
    } else {
      if (argValue === true) {
        str = '';
      } else {
        str =
          argValue.toString !== undefined &&
          typeof argValue.toString === 'function'
            ? argValue.toString()
            : __toString(argValue);
        if (typeof __parse(str) === 'string')
          if (settings.valueQuote === '"') str = str.replace(/"/g, '\\"');
        if (settings.valueQuote === "'") str = str.replace(/'/g, "\\'");
        if (settings.valueQuote === '`') str = str.replace(/`/g, '\\`');

        str = `${settings.valueQuote}${str}${settings.valueQuote}`;
      }
      string += ` --${key} ${str}`;
    }
  });
  return string.replace(/(\s){2,999999}/gm, ' ');
}
export default argsToString;

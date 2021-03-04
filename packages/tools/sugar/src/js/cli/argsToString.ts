// @ts-nocheck
// @shared

import __toString from '../string/toString';
import __parseArgs from './parseArgs';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';

/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 * @status              beta
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to use the aliases or not in the generated command
 * - definition (null) {Object}: Specify a definition object to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Test}      Testing when no definition is passed
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
 *    definition: {
 *      arg1: {
 *        type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
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
      definition: null,
      includeAllArgs: true,
      alias: true
    },
    settings
  );

  if (typeof args === 'string') {
    args = __parseArgs(args, {
      definition: settings.definition
    });
  }
  if (!settings.definition) {
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
              value.toString !== undefined &&
              typeof value.toString === 'function'
                ? value.toString()
                : __toString(value);
            if (typeof __parse(valueStr) === 'string')
              valueStr = `"${valueStr}"`;
          }
          string += ` --${key} ${valueStr}`;
        });
      } else {
        if (argValue === true) {
          str = '';
        } else {
          str =
            argValue.toString !== undefined &&
            typeof argValue.toString === 'function'
              ? argValue.toString()
              : __toString(argValue);
          if (typeof __parse(str) === 'string') str = `"${str}"`;
        }
        string += ` --${key} ${str}`;
      }
    });
    return string.replace(/(\s){2,999999}/gm, ' ');
  }

  const cliArray = [];
  // loop on passed args
  Object.keys(settings.definition).forEach((argName) => {
    const defObj = settings.definition[argName];
    if (!defObj) return;
    if (!settings.includeAllArgs && args[argName] === undefined) return;
    const prefix =
      defObj.alias && settings.alias ? `-${defObj.alias}` : `--${argName}`;

    let value;
    if (args && args[argName] !== undefined) value = args[argName];
    else if (
      settings.definition[argName] &&
      settings.definition[argName].default
    )
      value = settings.definition[argName].default;

    if (value === undefined || value === null) {
      return;
    }

    let valueStr;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val === true) {
          valueStr = '';
        } else {
          valueStr = __toString(val, {
            beautify: false,
            hihglight: false
          });
          if (defObj.type && defObj.type.toLowerCase() === 'string') {
            valueStr = `"${valueStr}"`;
          }
          if (
            (defObj.type && defObj.type.toLowerCase().includes('object')) ||
            (defObj.type && defObj.type.toLowerCase().includes('array'))
          ) {
            valueStr = `"${valueStr.split('"').join("'")}"`;
          }
        }
        cliArray.push(`${prefix} ${valueStr}`);
      });
    } else {
      if (value === true) {
        valueStr = '';
      } else {
        valueStr = __toString(value, {
          beautify: false,
          hihglight: false
        });
        if (defObj.type && defObj.type.toLowerCase() === 'string')
          valueStr = `"${valueStr}"`;
        // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
        if (
          (defObj.type && defObj.type.toLowerCase().includes('object')) ||
          (defObj.type && defObj.type.toLowerCase().includes('array'))
        ) {
          valueStr = `"${valueStr.split('"').join("'")}"`;
        }
      }
      // console.log(prefix, valueStr);
      cliArray.push(`${prefix} ${valueStr}`);
    }
  });

  return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
}
export default argsToString;

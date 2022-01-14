// @ts-nocheck

import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __isPlainObject from '../is/plainObject';

/**
 * @name                  argsToString
 * @namespace            js.cli
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status          beta
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
            valueQuote: '"',
            keepFalsy: false,
        },
        settings,
    );

    let string = '';
    Object.keys(args).forEach((key) => {
        const argValue = args[key];
        let str = '';

        let finalKey = key;
        if (!isNaN(key)) finalKey = '';
        else if (finalKey.length <= 1) finalKey = `-${key}`;
        else finalKey = `--${finalKey}`;

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

                if (valueStr.split(' ').length < 1) {
                    if (settings.valueQuote === '"')
                        valueStr = valueStr.replace(/"/g, '\\"');
                    if (settings.valueQuote === "'")
                        valueStr = valueStr.replace(/'/g, "\\'");
                    if (settings.valueQuote === '`') {
                        valueStr = valueStr.replace(/`/g, '\\`');
                    }
                }
                
                    string += ` ${finalKey} ${valueStr}`;
            });
        } else if (__isPlainObject(argValue)) {

            let valueStr = JSON.stringify(argValue);

            if (valueStr.split(' ').length < 1) {
                if (settings.valueQuote === '"')
                    valueStr = valueStr.replace(/"/g, '\\"');
                if (settings.valueQuote === "'")
                    valueStr = valueStr.replace(/'/g, "\\'");
                if (settings.valueQuote === '`')
                    valueStr = valueStr.replace(/`/g, '\\`');
            }
            string += ` ${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
        } else {
            if (argValue === false) {
                if (!settings.keepFalsy) return;
                str = 'false';
            }
            if (argValue === true) {
                str = '';
            } else {
                str =
                    argValue.toString !== undefined &&
                    typeof argValue.toString === 'function'
                        ? argValue.toString()
                        : __toString(argValue);

                if (typeof __parse(str) === 'string' && str.split(' ').length > 1) {
                    if (settings.valueQuote === '"')
                        str = str.replace(/"/g, '\\"');
                    if (settings.valueQuote === "'") str = str.replace(/'/g, "\\'");
                    if (settings.valueQuote === '`') str = str.replace(/`/g, '\\`');
                }

                if (str.split(' ').length < 1) {
                    str = `${settings.valueQuote}${str}${settings.valueQuote}`;
                } 
            }
            string += ` ${finalKey} ${str}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ').trim();
}
export default argsToString;

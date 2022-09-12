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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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

    function processParam(param, value) {
        const finalKey = param.length > 1 ? `--${param}` : `-${param}`;
        if (value === true) return `${finalKey}`;
        if (value === false && settings.keepFalsy) return `${finalKey} false`;
        if (!value) return '';
        let valueStr =
            value.toString !== undefined && typeof value.toString === 'function'
                ? value.toString()
                : __toString(value);

        if (settings.valueQuote === '"')
            valueStr = valueStr.replace(/"/g, '\\"');
        if (settings.valueQuote === "'")
            valueStr = valueStr.replace(/'/g, "\\'");
        if (settings.valueQuote === '`')
            valueStr = valueStr.replace(/`/g, '\\`');

        return `${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
    }

    let string = '';
    Object.keys(args).forEach((key) => {
        const argValue = args[key];
        let str = '';

        if (Array.isArray(argValue)) {
            argValue.forEach((value) => {
                string += ` ${processParam(key, value)}`;
            });
        } else if (__isPlainObject(argValue)) {
            let valueStr = JSON.stringify(argValue);
            string += ` ${processParam(key, valueStr)}`;
        } else {
            string += ` ${processParam(key, argValue)}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ').trim();
}
export default argsToString;

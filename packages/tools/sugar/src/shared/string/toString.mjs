// @ts-nocheck
import __isNode from '../is/node';
import __chalk from 'chalk';
import __deepMap from '../object/deepMap';
import __isMap from '../is/map';
import __isArray from '../is/array';
import __isBoolean from '../is/boolean';
import __isFunction from '../is/function';
import __isJson from '../is/json';
import __isObject from '../is/object';
import __deepMerge from '../object/deepMerge';
import __mapToObj from '../map/mapToObject';
import { highlight as __cliHighlight } from 'cli-highlight';
import { decycle } from 'json-cyclic';
// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';
/**
 * @name        toString
 * @namespace            js.string
 * @type      Function
 * @stable
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (true) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * - highlight (true) {Boolean}: Specify if you want to color highlight the output like objects, arrays, etc...
 * - theme ({}) {Object}: The theme to use to colorize the output. See https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
 * @return    {String}    The resulting string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function fn(value, settings = {}) {
    settings = __deepMerge({
        beautify: true,
        highlight: true,
        verbose: true,
        theme: {
            number: __chalk.yellow,
            default: __chalk.white,
            keyword: __chalk.blue,
            regexp: __chalk.red,
            string: __chalk.whiteBright,
            class: __chalk.yellow,
            function: __chalk.yellow,
            comment: __chalk.gray,
            variable: __chalk.red,
            attr: __chalk.green
        }
    }, settings);
    // string
    if (typeof value === 'string')
        return value;
    // null
    if (value === null)
        return 'null';
    // undefined
    if (value === undefined)
        return 'undefined';
    // error
    if (value instanceof Error) {
        const errorStr = value.toString();
        let stackStr = value.stack;
        const messageStr = value.message;
        if (settings.beautify) {
            if (__isNode()) {
                const __packageRoot = require('../../node/path/packageRoot').default; // eslint-disable-line
                stackStr = stackStr.replace(errorStr, '').trim();
                stackStr = stackStr
                    .split(`${__packageRoot(process.cwd(), true)}/`)
                    .join('');
                stackStr = `${stackStr
                    .split('\n')
                    .map((l) => {
                    l.match(/[a-zA-Z-0-9\-_\./]+/gm).forEach((str) => {
                        if (str.match(/\//) && str.match(/\.ts$/))
                            l = l.replace(str, `<blue>${str}</blue>`);
                        else if (str.match(/\//))
                            l = l.replace(str, `<cyan>${str}</cyan>`);
                    });
                    l = l.trim().replace(/^at\s/, '<yellow>at</yellow> ');
                    l = l.replace('->', '<yellow>└-></yellow>');
                    l = l.replace(/:([0-9]{1,29}:[0-9]{1,29})/, `:<yellow>$1</yellow>`);
                    return `<yellow>│</yellow> ${l.trim()}`;
                })
                    .join('\n')}`;
            }
        }
        if (settings.verbose) {
            return [
                `<red>${value.constructor.name || 'Error'}</red>`,
                '',
                messageStr,
                '',
                stackStr
            ].join('\n');
        }
        return errorStr;
    }
    // Map
    if (__isMap(value)) {
        value = __mapToObj(value);
    }
    // JSON
    if (__isObject(value) || __isArray(value) || __isJson(value)) {
        try {
            value = decycle(value);
        }
        catch (e) { }
        value = __deepMap(value, ({ value }) => {
            if (value instanceof Map)
                return __mapToObj(value);
            return value;
        });
        let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
        prettyString = prettyString
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/\uFFFF/g, '\\"');
        if (settings.highlight) {
            prettyString = __cliHighlight(prettyString, {
                language: 'js',
                theme: settings.theme
            });
        }
        return prettyString;
    }
    // boolean
    if (__isBoolean(value)) {
        if (value)
            return 'true';
        else
            return 'false';
    }
    // function
    if (__isFunction(value)) {
        return '' + value;
    }
    // stringify
    let returnString = '';
    try {
        value = decycle(value);
        returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    }
    catch (e) {
        try {
            returnString = value.toString();
        }
        catch (e) {
            returnString = value;
        }
    }
    return returnString;
}
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL3N0cmluZy90b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxTQUFTLElBQUksY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLEtB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
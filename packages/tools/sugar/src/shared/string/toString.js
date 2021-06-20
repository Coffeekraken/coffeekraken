// @ts-nocheck
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
        const stackStr = value.stack;
        const messageStr = value.message;
        // if (settings.beautify) {
        //   if (__isNode()) {
        //     const __packageRoot = require('../path/packageRootDir').default; // eslint-disable-line
        //     stackStr = stackStr.replace(errorStr, '').trim();
        //     stackStr = stackStr
        //       .split(`${__packageRoot(process.cwd(), true)}/`)
        //       .join('');
        //     stackStr = `${stackStr
        //       .split('\n')
        //       .map((l) => {
        //         l.match(/[a-zA-Z-0-9\-_\./]+/gm).forEach((str) => {
        //           if (str.match(/\//) && str.match(/\.ts$/))
        //             l = l.replace(str, `<blue>${str}</blue>`);
        //           else if (str.match(/\//))
        //             l = l.replace(str, `<cyan>${str}</cyan>`);
        //         });
        //         l = l.trim().replace(/^at\s/, '<yellow>at</yellow> ');
        //         l = l.replace('->', '<yellow>└-></yellow>');
        //         l = l.replace(/:([0-9]{1,29}:[0-9]{1,29})/, `:<yellow>$1</yellow>`);
        //         return `<yellow>│</yellow> ${l.trim()}`;
        //       })
        //       .join('\n')}`;
        //   }
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsSUFBSSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0Qyw4Q0FBOEM7QUFDOUMsa0ZBQWtGO0FBQ2xGLCtFQUErRTtBQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzlCLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDckIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxPQUFPLENBQUMsV0FBVztZQUMz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
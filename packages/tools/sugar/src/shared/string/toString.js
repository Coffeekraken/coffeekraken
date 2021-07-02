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
// import { highlight as __cliHighlight } from 'cli-highlight';
import { decycle } from 'json-cyclic';
// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';
/**
 * @name        toString
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
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
        return null;
    // undefined
    if (value === undefined)
        return undefined;
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
            // prettyString = __cliHighlight(prettyString, {
            //   language: 'js',
            //   theme: settings.theme
            // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsK0RBQStEO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDM0IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3JCLFFB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
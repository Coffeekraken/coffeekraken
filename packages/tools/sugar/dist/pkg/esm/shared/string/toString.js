// @ts-nocheck
import __chalk from 'chalk';
import __mapToObj from '../convert/mapToObject';
import __isArray from '../is/isArray';
import __isBoolean from '../is/isBoolean';
import __isFunction from '../is/isFunction';
import __isJson from '../is/isJson';
import __isMap from '../is/isMap';
import __isObject from '../is/isObject';
import __deepMap from '../object/deepMap';
import __deepMerge from '../object/deepMerge';
// import { highlight as __cliHighlight } from 'cli-highlight';
import { decycle } from 'json-cyclic';
// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';
/**
 * @name        toString
 * @namespace            shared.string
 * @type      Function
 * @platform          js
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
 * import { __toString } from '@coffeekraken/sugar/string'
 * __toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            attr: __chalk.green,
        },
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
        //       .split(`${__packageRoot(process.cwd(), {
        //         highest: true
        // }
        //     })}/`)
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
                stackStr,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sUUFBUSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxPQUFPLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsK0RBQStEO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzVCLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDckIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxPQUFPLENBQUMsV0FBVztZQUMzQixLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDckIsUUFB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
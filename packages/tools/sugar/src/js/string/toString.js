// @ts-nocheck
// @shared
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
 * @namespace           sugar.js.string
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
        if (typeof value.toString === 'function') {
            return value.toString();
        }
        return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
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
        value = __deepMap(value, (value, prop, fullPath) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBRzVDLE9BQU8sRUFBRSxTQUFTLElBQUksY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNyQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQzNCLEtBQUssRUFB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
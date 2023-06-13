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
 * @snippet         __toString($1)
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
        catch (e) {
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sUUFBUSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxPQUFPLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsK0RBQStEO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDNUIsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUU7WUFDSCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNyQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQzNCLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDdEI7S0FDSixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUztJQUNULElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLE9BQU87SUFDUCxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDaEMsWUFBWTtJQUNaLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUMxQyxRQUFRO0lBQ1IsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFakMsMkJBQTJCO1FBQzNCLHNCQUFzQjtRQUN0Qiw4RkFBOEY7UUFDOUYsd0RBQXdEO1FBQ3hELDBCQUEwQjtRQUMxQixpREFBaUQ7UUFDakQsd0JBQXdCO1FBQ3hCLElBQUk7UUFDSixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLDZCQUE2QjtRQUM3QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDhEQUE4RDtRQUM5RCx1REFBdUQ7UUFDdkQseURBQXlEO1FBQ3pELHNDQUFzQztRQUN0Qyx5REFBeUQ7UUFDekQsY0FBYztRQUNkLGlFQUFpRTtRQUNqRSx1REFBdUQ7UUFDdkQsK0VBQStFO1FBQy9FLG1EQUFtRDtRQUNuRCxXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE9BQU87Z0JBQ0gsUUFBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxPQUFPLFFBQVE7Z0JBQ2pELEVBQUU7Z0JBQ0YsVUFBVTtnQkFDVixFQUFFO2dCQUNGLFFBQVE7YUFDWCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQjtRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ25CO0lBRUQsTUFBTTtJQUNOLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hCLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0I7SUFFRCxPQUFPO0lBQ1AsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMxRCxJQUFJO1lBQ0EsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ1g7UUFFRCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssWUFBWSxHQUFHO2dCQUFFLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDN0IsS0FBSyxFQUNMLElBQUksRUFDSixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUIsQ0FBQztRQUNGLFlBQVksR0FBRyxZQUFZO2FBQ3RCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO2FBQzdCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3BCLGdEQUFnRDtZQUNoRCxvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLE1BQU07U0FDVDtRQUNELE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0lBQ0QsVUFBVTtJQUNWLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLElBQUksS0FBSztZQUFFLE9BQU8sTUFBTSxDQUFDOztZQUNwQixPQUFPLE9BQU8sQ0FBQztLQUN2QjtJQUNELFdBQVc7SUFDWCxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7S0FDckI7SUFDRCxZQUFZO0lBQ1osSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLElBQUk7UUFDQSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6RTtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsSUFBSTtZQUNBLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDeEI7S0FDSjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFDRCxlQUFlLEVBQUUsQ0FBQyJ9
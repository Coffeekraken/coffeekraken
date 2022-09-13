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
    settings = __deepMerge(
        {
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
        },
        settings,
    );

    // string
    if (typeof value === 'string') return value;
    // null
    if (value === null) return null;
    // undefined
    if (value === undefined) return undefined;
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
        } catch (e) {}

        value = __deepMap(value, ({ value }) => {
            if (value instanceof Map) return __mapToObj(value);
            return value;
        });

        let prettyString = JSON.stringify(
            value,
            null,
            settings.beautify ? 4 : 0,
        );
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
        if (value) return 'true';
        else return 'false';
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
    } catch (e) {
        try {
            returnString = value.toString();
        } catch (e) {
            returnString = value;
        }
    }
    return returnString;
}
export default fn;

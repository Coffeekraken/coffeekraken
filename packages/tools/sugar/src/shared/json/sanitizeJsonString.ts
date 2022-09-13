/**
 * @name            sanitizeJsonString
 * @namespace         shared.json
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function simple take a json string and ensure that it will be valid
 * to pass through ```JSON.parse``` function for example.
 * If your string is really messy, if may not work. It take care for things like double quotes in double quotes, etc...
 *
 * @param       {String}            jsonString          The json string to sanitize
 * @return      {String}                                The sanitized string
 *
 * @todo            tests
 *
 * @example         js
 * import { __sanitizeJsonString } from '@coffeekraken/sugar/json';
 * __sanitizeJsonString('{"something": ""cool""}'); // => '{"something":"\"cool\""}'
 *
 * @see             https://gist.github.com/jamischarles/1046671
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __sanitizeJsonString(jsonString: string): string {
    return jsonString
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\f/g, '\\f')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/\&/g, '\\&');
}

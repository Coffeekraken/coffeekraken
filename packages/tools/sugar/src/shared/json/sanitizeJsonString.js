/**
 * @name            sanitizeJsonString
 * @namespace         shared.json
 * @type            Function
 * @platform        node
 * @platform        js
 * @platform        ts
 * @status          stable
 *
 * This function simple take a json string and ensure that it will be valid
 * to pass through ```JSON.parse``` function for example.
 * If your string is really messy, if may not work. It take care for things like double quotes in double quotes, etc...
 *
 * @param       {String}            jsonString          The json string to sanitize
 * @return      {String}                                The sanitized string
 *
 * @todo            tests
 *
 * @example         js
 * import __sanitizeJsonString from '@coffeekraken/sugar/shared/json/sanitizeJsonString';
 * __sanitizeJsonString('{"something": ""cool""}'); // => '{"something":"\"cool\""}'
 *
 * @see             https://gist.github.com/jamischarles/1046671
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sanitizeJsonString(jsonString) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemVKc29uU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FuaXRpemVKc29uU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxVQUFrQjtJQUN6RCxPQUFPLFVBQVU7U0FDWixPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztTQUN0QixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMifQ==
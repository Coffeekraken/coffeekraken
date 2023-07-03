"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @snippet         __sanitizeJsonString($1)
 *
 * @example         js
 * import { __sanitizeJsonString } from '@coffeekraken/sugar/json';
 * __sanitizeJsonString('{"something": ""cool""}'); // => '{"something":"\"cool\""}'
 *
 * @see             https://gist.github.com/jamischarles/1046671
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __sanitizeJsonString(jsonString) {
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
exports.default = __sanitizeJsonString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBd0Isb0JBQW9CLENBQUMsVUFBa0I7SUFDM0QsT0FBTyxVQUFVO1NBQ1osT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDdEIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBVkQsdUNBVUMifQ==
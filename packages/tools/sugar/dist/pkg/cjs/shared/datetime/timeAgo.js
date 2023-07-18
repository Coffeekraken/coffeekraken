"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const js_ago_1 = __importDefault(require("js-ago"));
/**
 * @name                                  timeAgo
 * @namespace            shared.datetime
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * Simple "time" ago for your Unix timestamps and JavaScript Date objects.
 *
 * @param           {Number}             timestamp                 The timestamp to transform
 * @param           {'short'|'medium'|'long'}       [format='medium']       The format you want back
 * @return          {String}                                          The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __timeAgo($1)
 *
 * @example           js
 * import { __timeAgo } from '@coffeekraken/sugar/datetime';
 * __timeAgo(1611344957); // => 7 secs ago
 *
 * @see         https://www.npmjs.com/package/js-ago
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __timeAgo(timestamp, format = 'medium') {
    return (0, js_ago_1.default)(timestamp, {
        format,
    });
}
exports.default = __timeAgo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLG9EQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBd0IsU0FBUyxDQUM3QixTQUFTLEVBQ1QsU0FBc0MsUUFBUTtJQUU5QyxPQUFPLElBQUEsZ0JBQU8sRUFBQyxTQUFTLEVBQUU7UUFDdEIsTUFBTTtLQUNULENBQUMsQ0FBQztBQUNQLENBQUM7QUFQRCw0QkFPQyJ9
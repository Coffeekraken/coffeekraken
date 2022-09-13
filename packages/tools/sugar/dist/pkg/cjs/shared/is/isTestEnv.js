"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/**
 * @name          testEnv
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __isTestEnv } from '@coffeekraken/sugar/is';
 * __isTestEnv(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isTestEnv() {
    var _a;
    return ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'test';
}
exports.default = __isTestEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsV0FBVzs7SUFDL0IsT0FBTyxDQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsMENBQUUsUUFBUSxNQUFLLE1BQU0sQ0FBQztBQUM3QyxDQUFDO0FBRkQsOEJBRUMifQ==
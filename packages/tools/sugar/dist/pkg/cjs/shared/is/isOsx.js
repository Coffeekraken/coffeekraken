"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name                            isOsx
 * @namespace            shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isOsx()
 *
 * @example       js
 * import { __isOsx } from '@coffeekraken/sugar/is';
 * __isOsx(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isOsx() {
    var _a;
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    const platform = ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || (navigator === null || navigator === void 0 ? void 0 : navigator.platform) || 'unknown';
    return platform.toUpperCase().indexOf('MAC') >= 0;
}
exports.default = __isOsx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsT0FBTzs7SUFDM0IsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO0tBQ3hDO0lBQ0QsTUFBTSxRQUFRLEdBQ1YsQ0FBQSxNQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxhQUFhLDBDQUFFLFFBQVEsTUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUSxDQUFBLElBQUksU0FBUyxDQUFDO0lBQzNFLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQVBELDBCQU9DIn0=
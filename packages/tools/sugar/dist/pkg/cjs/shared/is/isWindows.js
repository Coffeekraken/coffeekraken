"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                            isWindows
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
 * @example       js
 * import { __isWindows } from '@coffeekraken/sugar/is';
 * __isWindows(); // => true
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isWindows() {
    var _a;
    if (process && process.platform) {
        return process.platform === 'win32';
    }
    const platform = ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || (navigator === null || navigator === void 0 ? void 0 : navigator.platform) || 'unknown';
    return platform.toUpperCase().indexOf('WIN') > -1;
}
exports.default = __isWindows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsV0FBVzs7SUFDL0IsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0tBQ3ZDO0lBQ0QsTUFBTSxRQUFRLEdBQ1YsQ0FBQSxNQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxhQUFhLDBDQUFFLFFBQVEsTUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUSxDQUFBLElBQUksU0FBUyxDQUFDO0lBQzNFLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBUEQsOEJBT0MifQ==
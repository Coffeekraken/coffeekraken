"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isMobile
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @feature         Take the theme.media.queries.mobile.maxWidth in consideration if accessible
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isMobile()
 *
 * @example 	js
 * import { __isMobile } from 'coffeekraken/sugar/is'
 * if (__isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isMobile() {
    var _a, _b, _c, _d;
    // touch event
    if (!('ontouchstart' in document.documentElement))
        return false;
    // orientation
    if (window.orientation === undefined)
        return false;
    // match media
    const maxWidth = 
    // @ts-ignore
    (_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get('media.queries.mobile.maxWidth')) !== null && _d !== void 0 ? _d : 639;
    if (!window.matchMedia(`only screen and (max-width: ${maxWidth}px)`).matches) {
        return false;
    }
    // limited accuracy
    if (!window.matchMedia('(pointer: coarse)').matches)
        return false;
    // it seems that it's a mobile
    return true;
}
exports.default = __isMobile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QixVQUFVOztJQUM5QixjQUFjO0lBQ2QsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNoRSxjQUFjO0lBQ2QsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNuRCxjQUFjO0lBQ2QsTUFBTSxRQUFRO0lBQ1YsYUFBYTtJQUNiLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7SUFDNUUsSUFDSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsK0JBQStCLFFBQVEsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUMxRTtRQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsbUJBQW1CO0lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2xFLDhCQUE4QjtJQUM5QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbEJELDZCQWtCQyJ9
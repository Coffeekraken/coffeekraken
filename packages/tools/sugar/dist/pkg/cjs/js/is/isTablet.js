"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/**
 * @name        isTablet
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a tablet device
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isTablet } from '@coffeekraken/sugar/is'
 * if (__isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isTablet() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // touch event
    if (!('ontouchstart' in document.documentElement))
        return false;
    // orientation
    if (window.orientation === undefined)
        return false;
    // match media
    const minWidth = (_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get('media.queries.tablet.minWidth')) !== null && _d !== void 0 ? _d : 640, maxWidth = 
    // @ts-ignore
    (_h = (_g = (_f = (_e = document.env) === null || _e === void 0 ? void 0 : _e.SUGAR) === null || _f === void 0 ? void 0 : _f.theme) === null || _g === void 0 ? void 0 : _g.get('media.queries.tablet.maxWidth')) !== null && _h !== void 0 ? _h : 1279;
    if (!window.matchMedia(`only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`).matches) {
        return false;
    }
    // limited accuracy
    if (!window.matchMedia('(pointer: coarse)').matches)
        return false;
    // it seems that it's a tablet
    return true;
}
exports.default = __isTablet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixVQUFVOztJQUM5QixjQUFjO0lBQ2QsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNoRSxjQUFjO0lBQ2QsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNuRCxjQUFjO0lBQ2QsTUFBTSxRQUFRLEdBQ04sTUFBQSxNQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssMENBQUUsR0FBRyxDQUFDLCtCQUErQixDQUFDLG1DQUNoRSxHQUFHLEVBQ1AsUUFBUTtJQUNKLGFBQWE7SUFDYixNQUFBLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsS0FBSywwQ0FBRSxHQUFHLENBQUMsK0JBQStCLENBQUMsbUNBQ2hFLElBQUksQ0FBQztJQUNiLElBQ0ksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNkLCtCQUErQixRQUFRLHVCQUF1QixRQUFRLEtBQUssQ0FDOUUsQ0FBQyxPQUFPLEVBQ1g7UUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELG1CQUFtQjtJQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNsRSw4QkFBOEI7SUFDOUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXhCRCw2QkF3QkMifQ==
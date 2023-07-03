"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              alphaToHex
 * @namespace            shared.color
 * @type              Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Take alpha (0-1) and convert it to hex like "FF", "80", etc...
 *
 * @param       {Number}            alpha           The alpha to convert to hex (0-1)
 * @return          {String}                        The hex string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __alphaToHex($1)
 *
 * @example         js
 * import { __alphaToHex } from '@coffeekraken/sugar/color';
 * __alphaToHex(1); // FF
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __alphaToHex(alpha) {
    const _opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
    return _opacity.toString(16);
}
exports.default = __alphaToHex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsWUFBWSxDQUFDLEtBQWE7SUFDOUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN4RSxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUhELCtCQUdDIn0=
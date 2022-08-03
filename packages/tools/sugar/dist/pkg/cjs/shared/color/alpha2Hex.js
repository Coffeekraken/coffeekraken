"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              alpha2Hex
 * @namespace            js.color
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
 * @example         js
 * import alpha2Hex from '@coffeekraken/sugar/js/color/alpha2Hex';
 * alpha2Hex(1); // FF
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function alpha2Hex(alpha) {
    const _opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
    return _opacity.toString(16);
}
exports.default = alpha2Hex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLFNBQVMsQ0FBQyxLQUFhO0lBQzNDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDeEUsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFIRCw0QkFHQyJ9
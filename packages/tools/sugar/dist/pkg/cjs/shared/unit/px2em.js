"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    px2em
 * @namespace            js.unit
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import px2em from '@coffeekraken/sugar/js/unit/px2em';
 * px2em(36);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function px2em(px, $elm = document.documentElement) {
    return px / parseFloat(getComputedStyle($elm).fontSize || '16px');
}
exports.default = px2em;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlO0lBQzlDLE9BQU8sRUFBRSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9
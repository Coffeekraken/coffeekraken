"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleProperty_1 = __importDefault(require("../style/getStyleProperty"));
/**
 * @name      forceRedraw
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Force the element to be painted again in case of visual issues
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to force the redraw on
 * @return    {HTMLElement}    The HTMLElement to maintain chainability
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import forceRedraw from '@coffeekraken/sugar/js/dom/forceRedraw'
 * forceRedraw($elm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function forceRedraw($elm) {
    const display = (0, getStyleProperty_1.default)($elm, 'display');
    $elm.style.display = 'none';
    $elm.offsetHeight;
    $elm.style.display = display;
    return $elm;
}
exports.default = forceRedraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQWlCO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLElBQUEsMEJBQWtCLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUM3QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=
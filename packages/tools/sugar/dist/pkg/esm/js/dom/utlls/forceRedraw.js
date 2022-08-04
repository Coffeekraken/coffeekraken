// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
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
    const display = __getStyleProperty($elm, 'display');
    $elm.style.display = 'none';
    $elm.offsetHeight;
    $elm.style.display = display;
    return $elm;
}
export default forceRedraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBaUI7SUFDbEMsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUM3QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==
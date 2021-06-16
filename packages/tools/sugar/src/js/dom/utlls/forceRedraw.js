// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
/**
 * @name      forceRedraw
 * @namespace            js.dom.utils
 * @type      Function
 * @platform        js
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function forceRedraw($elm) {
    const display = __getStyleProperty($elm, 'display');
    $elm.style.display = 'none';
    $elm.offsetHeight;
    $elm.style.display = display;
    return $elm;
}
export default forceRedraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yY2VSZWRyYXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JjZVJlZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQWlCO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDN0IsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==
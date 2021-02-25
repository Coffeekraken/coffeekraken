// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
/**
 * @name      forceRedraw
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yY2VSZWRyYXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JjZVJlZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSTtJQUN2QixNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=
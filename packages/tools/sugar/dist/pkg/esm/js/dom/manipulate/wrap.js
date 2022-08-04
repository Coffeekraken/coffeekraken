// @ts-nocheck
/**
 * @name      wrap
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Wrap an HTMLElement inside another `$wrapper` one
 *
 * @param    {HTMLElement}    $toWrap    The element to wrap
 * @param    {HTMLElement}    $wrapper    The wrapper element
 * @return    {HTMLElement}           The toWrap element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import wrap from '@coffeekraken/sugar/js/dom/wrap'
 * const $wrapper = document.createElement('div')
 * // assuming:
 * // <div>
 * //   <span class="wrap">Hello World</span>
 * // </div>
 * wrap(document.querySelector('.wrap'), $wrapper)
 * // output:
 * // <div>
 * //   <div>
 * //     <span class="wrap">Hello World</span>
 * //   </div>
 * // </div>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function wrap($elm, $wrapper) {
    if (typeof $wrapper === 'string') {
        $wrapper = document.createElement($wrapper);
    }
    const $parent = $elm.parentNode;
    const $sibling = $elm.nextSibling;
    if ($sibling) {
        $parent.insertBefore($wrapper, $sibling);
    }
    else {
        $parent.appendChild($wrapper);
    }
    return $wrapper.appendChild($elm);
}
export default wrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQWlCLEVBQUUsUUFBcUI7SUFDbEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDOUIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDL0M7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDbEMsSUFBSSxRQUFRLEVBQUU7UUFDVixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBQ0gsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==
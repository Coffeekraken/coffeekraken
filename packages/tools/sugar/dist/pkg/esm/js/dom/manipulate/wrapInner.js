// @ts-nocheck
/**
 * @name      wrapInner
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Wrap the content of the passed `$parent` inside a the passed HTMLElement `$wrapper`
 *
 * @param    {HTMLElement}    $parent    The parent to wrap inner
 * @param    {HTMLElement}    $wrapper    The wrapper element
 * @return    {HTMLElement}             Return the parent element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __wrapInner } from '@coffeekraken/sugar/dom'
 * const $myWrapper = document.createElement('div')
 * // assuming
 * // <div class="container">
 * //   <span>Hello World</span>
 * // </div>
 * __wrapInner(document.querySelector('.container'), $myWrapper)
 * // return
 * // <div class="container">
 * //   <div>
 * //     <span>Hello World</span>
 * //   </div>
 * // </div>
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel@gmail.com)
 */
export default function __wrapInner($parent, $wrapper) {
    if (typeof $wrapper === 'string') {
        $wrapper = document.createElement($wrapper);
    }
    $parent.appendChild($wrapper);
    while ($parent.firstChild !== $wrapper) {
        $wrapper.appendChild($parent.firstChild);
    }
    return $parent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixPQUFvQixFQUNwQixRQUFxQjtJQUVyQixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsT0FBTyxPQUFPLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM1QztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==
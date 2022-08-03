"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = wrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBaUIsRUFBRSxRQUFxQjtJQUNsRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQztJQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNsQyxJQUFJLFFBQVEsRUFBRTtRQUNWLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzVDO1NBQU07UUFDSCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxrQkFBZSxJQUFJLENBQUMifQ==
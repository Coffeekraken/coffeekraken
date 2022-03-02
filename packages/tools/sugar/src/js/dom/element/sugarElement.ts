import __scrollTop from '../scroll/scrollTop';
import __offset from '../offset/offset';
import __visibleSurface from './visibleSurface';

/**
 * @name            sugarElement
 * @namespace       js.dom.element
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function takes a standard HTMLElement and enhance it with some sugar like `element.visibleSurface`, `element.relTop`, `element.parentBounds`, etc...
 * 
 * @feature         `element.visibleSurface` to get some surface info like `percentage`, `percentageX`, etc...
 *
 * @param       {HTMLElement}       elm             The element you want to enhance
 * @return      {HTMLElement}                  The enhanced element
 *
 * @example         js
 * import sugarElement from '@coffeekraken/sugar/js/dom/element/sugarElement';
 * const $myElement = document.querySelector('#my-element');
 * sugarElement($myElement);
 * $myElement.visibleSurface.percentage; // => 50
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function sugarElement($elm: HTMLElement): HTMLElement {
    // visibleSurface
    let visibleSurface;
    // @ts-ignore
    if (!$elm.visibleSurface) {
        Object.defineProperty($elm, 'visibleSurface', {
            get() {
                // if (visibleSurface) return visibleSurface;
                visibleSurface = __visibleSurface($elm);
                return visibleSurface;
            }
        });
        Object.defineProperty($elm, 'resetVisibleSurface', {
            get() {
                return function() {
                    visibleSurface = null;
                }
            }
        });
    }
    function resetVisibleSurface() {
        // @ts-ignore
        visibleSurface = null;
    }
    document.addEventListener('scroll', resetVisibleSurface);
    document.addEventListener('resize', resetVisibleSurface);

    // relTop
    // @ts-ignore
    if (!$elm.relTop) {
        Object.defineProperty($elm, 'relTop', {
            get() {
                const parentBounds = $elm.parentElement?.getBoundingClientRect();
                const bounds = $elm.getBoundingClientRect();
                return bounds.top - (parentBounds?.top ?? 0);
            } 
        });
    }
    // relLeft
    // @ts-ignore
    if (!$elm.relLeft) {
        Object.defineProperty($elm, 'relLeft', {
            get() {
                const parentBounds = $elm.parentElement?.getBoundingClientRect();
                const bounds = $elm.getBoundingClientRect();
                return bounds.left - (parentBounds?.left ?? 0);
            } 
        });
    }

    // originRelTop
    // @ts-ignore
    if (!$elm.originRelTop) {
        const originRelTop = $elm.relTop;
        Object.defineProperty($elm, 'originRelTop', {
            get() {
                return originRelTop;
            } 
        });
    }
    // originRelLeft
    // @ts-ignore
    if (!$elm.originRelLeft) {
        const originRelLeft = $elm.relLeft;
        Object.defineProperty($elm, 'originRelLeft', {
            get() {
                return originRelLeft;
            } 
        });
    }

    return $elm;
}

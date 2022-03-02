
import __offset from '../offset/offset';
import __querySelectorUp from '../query/querySelectorUp';
import __traverseUp from '../traverse/up';
import __scrollTop from '../scroll/scrollTop';
import __scrollLeft from '../scroll/scrollLeft';

/**
 * @name            visibleSurface
 * @namespace       js.dom.element
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function returns you an object with informations about the visible surface of the element like the `percentage`, `percentageX`, etc...
 * 
 *
 * @param       {HTMLElement}       elm             The element you want to enhance
 * @return      {HTMLElement}                  The enhanced element
 *
 * @example         js
 * import visibleSurface from '@coffeekraken/sugar/js/dom/element/visibleSurface';
 * const $myElement = document.querySelector('#my-element');
 * const data = visibleSurface($myElement);
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IVisibleSurfaceResult {
    percentage: number;
    percentageX: number;
    percentageY: number;
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface IVisibleSurfaceSettings {

}

export default function visibleSurface($elm: HTMLElement, settings?: IVisibleSurfaceSettings = {}): IVisibleSurfaceResult {
    let $overflowParent = <HTMLElement>__traverseUp($elm, $item => {
        const style = window.getComputedStyle($item);
        if (style.overflow === 'hidden') return $item;
        return false;
    });

    let rootBoundingRect;
    if ($overflowParent) {
        rootBoundingRect = $overflowParent.getBoundingClientRect();
    } else {
        rootBoundingRect = {
            top: __scrollTop(),
            left: __scrollLeft(),
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        }
    }
    
    const boundingRect = $elm.getBoundingClientRect();

    const left = boundingRect.left - rootBoundingRect.left,
        top = boundingRect.top - rootBoundingRect.top;

    let percentageX, percentageY;

    if (boundingRect.top < rootBoundingRect.top) {
        percentageY = 100 / boundingRect.height * (rootBoundingRect.top - boundingRect.top);
    } else if (top + boundingRect.height < rootBoundingRect.height) {
        percentageY = 100;
    } else if (top + boundingRect.height > rootBoundingRect.height) {
        percentageY = 100 / boundingRect.height * (rootBoundingRect.height - top);
        if (percentageY < 0) percentageY = 0;
    } else if (top > rootBoundingRect.height || top < rootBoundingRect.height * -1) {
        percentageY = 0;
    } else {
        const offsetY = boundingRect.height - top;
        percentageY =  100 - Math.abs(100 / rootBoundingRect.height * (rootBoundingRect.height - offsetY));
    }

    if (boundingRect.left < rootBoundingRect.left) {
        percentageX = 100 / boundingRect.width * (rootBoundingRect.left - boundingRect.left);
    } else if (left + boundingRect.width < rootBoundingRect.width) {
        percentageX = 100;
    } else if (left + boundingRect.width > rootBoundingRect.width) {
        percentageX = 100 / boundingRect.width * (rootBoundingRect.width - left);
        if (percentageX < 0) percentageX = 0;
    } else if (left > rootBoundingRect.width || left < rootBoundingRect.width * -1) {
        percentageX = 0;
    } else {
        const offsetY = boundingRect.width - left;
        percentageX =  100 - Math.abs(100 / rootBoundingRect.width * (rootBoundingRect.width - offsetY));
    }

    const surfaceX = boundingRect.width / 100 * percentageX,
        surfaceY = boundingRect.height / 100 * percentageY;

    const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;

    return {
        percentage,
        percentageX: percentageY > 0 ? percentageX : 0,
        percentageY: percentageX > 0 ? percentageY : 0,
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        x: percentageX > 0 && percentageY > 0 ? left : undefined,
        y: percentageX > 0 && percentageY > 0 ? top : undefined
    };
}

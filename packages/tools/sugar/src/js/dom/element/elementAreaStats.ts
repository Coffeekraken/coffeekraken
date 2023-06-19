import __scrollLeft from '../distance/scrollLeft';
import __scrollTop from '../distance/scrollTop';
import __traverseUp from '../traverse/traverseUp';

/**
 * @name            elementAreaStats
 * @namespace       js.dom.element
 * @type            Function
 * @platform          js
 * @status          beta
 *
 * This function returns you an object with informations about the visible surface of the element like the `percentage`, `percentageX`, etc...
 *
 * @param       {HTMLElement}       elm             The element you want to enhance
 * @return      {HTMLElement}                  The enhanced element
 *
 * @setting         {HTMLElement|'visible'}     [relativeTo='visible']         The element to calculate the visible surface relative to
 *
 * @snippet         __elementAreaStats($1)
 *
 * @example         js
 * import { __elementAreaStats } from '@coffeekraken/sugar/dom';
 * const $myElement = document.querySelector('#my-element');
 * const data =  __elementAreaStats($myElement);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IAreaStatsResult {
    percentage: number;
    percentageX: number;
    percentageY: number;
    centerOffsetX: number;
    centerOffsetY: number;
    width: number;
    height: number;
    top: number;
    relTop: number;
    left: number;
    relLeft: number;
}

export interface IAreaStatsSettings {
    relativeTo?: HTMLElement | 'visible';
}

export default function __elementAreaStats(
    $elm: HTMLElement,
    settings?: IAreaStatsSettings,
): IAreaStatsResult {
    const finalSettings = <IAreaStatsSettings>{
        relativeTo: 'visible',
        ...(settings ?? {}),
    };

    if (finalSettings.relativeTo === 'visible') {
        finalSettings.relativeTo = <HTMLElement>__traverseUp($elm, ($item) => {
            const style = window.getComputedStyle($item);
            if (style.overflow === 'hidden') return $item;
            return false;
        });
    }

    let rootBoundingRect;
    if (
        finalSettings?.relativeTo &&
        finalSettings.relativeTo instanceof HTMLElement
    ) {
        rootBoundingRect = finalSettings?.relativeTo.getBoundingClientRect();
    } else {
        rootBoundingRect = {
            top: __scrollTop(),
            left: __scrollLeft(),
            width: Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0,
            ),
            height: Math.max(
                document.documentElement.clientHeight || 0,
                window.innerHeight || 0,
            ),
        };
    }

    const boundingRect = $elm.getBoundingClientRect();

    const left = boundingRect.left - rootBoundingRect.left,
        top = boundingRect.top - rootBoundingRect.top;

    let percentageX, percentageY;

    // percentageX
    if (boundingRect.left + boundingRect.width < rootBoundingRect.left) {
        // fully out on left
        percentageX = 0;
    } else if (
        boundingRect.left >
        rootBoundingRect.left + rootBoundingRect.width
    ) {
        // fully out on right
        percentageX = 0;
    } else if (
        boundingRect.left >= rootBoundingRect.left &&
        boundingRect.left + boundingRect.width <=
            rootBoundingRect.left + rootBoundingRect.width
    ) {
        // fully inside
        percentageX = 100;
    } else if (
        boundingRect.left < rootBoundingRect.left &&
        boundingRect.left + boundingRect.width >
            rootBoundingRect.left + rootBoundingRect.width
    ) {
        // partially outside on left and right
        percentageX = (100 / boundingRect.width) * rootBoundingRect.width;
    } else if (
        boundingRect.left < rootBoundingRect.left &&
        boundingRect.left + boundingRect.width <=
            rootBoundingRect.left + rootBoundingRect.width
    ) {
        // partially inside on left
        percentageX =
            (100 / boundingRect.width) *
            (boundingRect.left + boundingRect.width - rootBoundingRect.left);
    } else if (
        boundingRect.left < rootBoundingRect.left + rootBoundingRect.width &&
        boundingRect.left + boundingRect.width >
            rootBoundingRect.left + rootBoundingRect.width
    ) {
        // partially inside on right
        percentageX =
            (100 / boundingRect.width) *
            (boundingRect.width -
                (boundingRect.left +
                    boundingRect.width -
                    (rootBoundingRect.left + rootBoundingRect.width)));
    }

    // percentageY
    if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
        // fully out on top
        percentageY = 0;
    } else if (
        boundingRect.top >
        rootBoundingRect.top + rootBoundingRect.height
    ) {
        // fully out on bottom
        percentageY = 0;
    } else if (
        boundingRect.top >= rootBoundingRect.top &&
        boundingRect.top + boundingRect.height <=
            rootBoundingRect.top + rootBoundingRect.height
    ) {
        // fully inside
        percentageY = 100;
    } else if (
        boundingRect.top < rootBoundingRect.top &&
        boundingRect.top + boundingRect.height >
            rootBoundingRect.top + rootBoundingRect.height
    ) {
        // partially outside on top and bottom
        percentageY = (100 / boundingRect.height) * rootBoundingRect.height;
    } else if (
        boundingRect.top < rootBoundingRect.top &&
        boundingRect.top + boundingRect.height <=
            rootBoundingRect.top + rootBoundingRect.height
    ) {
        // partially inside on top
        percentageY =
            (100 / boundingRect.height) *
            (boundingRect.top + boundingRect.height - rootBoundingRect.top);
    } else if (
        boundingRect.top < rootBoundingRect.top + rootBoundingRect.height &&
        boundingRect.top + boundingRect.height >
            rootBoundingRect.top + rootBoundingRect.height
    ) {
        // partially inside on bottom
        percentageY =
            (100 / boundingRect.height) *
            (boundingRect.height -
                (boundingRect.top +
                    boundingRect.height -
                    (rootBoundingRect.top + rootBoundingRect.height)));
    }

    const surfaceX = (boundingRect.width / 100) * percentageX,
        surfaceY = (boundingRect.height / 100) * percentageY;

    const percentage =
        percentageX > 0 && percentageY > 0
            ? (100 / 200) * (percentageX + percentageY)
            : 0;

    return {
        percentage,
        percentageX: percentageY > 0 ? percentageX : 0,
        percentageY: percentageX > 0 ? percentageY : 0,
        centerOffsetX:
            (rootBoundingRect.width * 0.5 - left - boundingRect.width * 0.5) *
            -1,
        centerOffsetY:
            (rootBoundingRect.height * 0.5 - top - boundingRect.height * 0.5) *
            -1,
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        left: boundingRect.left,
        relLeft: left,
        top: boundingRect.top,
        relTop: top,
    };
}

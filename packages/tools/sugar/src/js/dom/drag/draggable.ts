import __onDrag from '../detect/onDrag';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __getTranslateProperties from '../../dom/style/getTranslateProperties';
import __querySelectorLive from '../query/querySelectorLive';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __wrapInner from '../manipulate/wrapInner';
import __wrap from '../manipulate/wrap';
import __clamp from '../../../shared/math/clamp';

import __easeOutQuad from '../../../shared/easing/easeOutQuad';

/**
 * @name      draggable
 * @namespace            js.dom.drag
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Simulate the drag gesture with optional inertia and direction restriction
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to apply the draggable behavior
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import draggable from '@coffeekraken/sugar/js/drag/draggable';
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IDraggableSettings {
    horizontal:    boolean;
    vertical:      boolean;
}

export default function draggable($elm: HTMLElement, settings?: IDraggableSettings): HTMLElement {

    const finalSettings = <IDraggableSettings>{
        horizontal: true,
        vertical: true,
        ...settings ?? {}
    };

    const id = $elm.getAttribute('draggable-id') ?? __uniqid();
    $elm.setAttribute('draggable-id', id);

    let translateX = 0, easingScrollInterval,
        translateY = 0;

    __injectStyle(`
        [draggable-id] {
            user-select: none;
        }
    `, 's-draggable');

    const $child = <HTMLElement>$elm.firstElementChild;

    if (!$child) {
        throw new Error(`[draggable] The draggable element must have at least one child that will be translated`);
    }

    __onDrag($elm, (state) => {
        const translates = __getTranslateProperties($child);

        switch(state.type) {
            case 'start':
                translateX = translates.x;
                translateY = translates.y;
                easingScrollInterval?.cancel?.();
            break;
            case 'end':

                let duration = 1000 / 2000 * Math.abs(state.pixelsXBySecond);
                if (duration > 2000) duration = 2000;
                if (duration < 500) duration = 500;


                // easingScrollInterval = __easeInterval(duration, (percentage) => {
                //     const offsetX = state.pixelsXBySecond / 100 * percentage; 
                //     let translateX = translates.x + offsetX;

                //     const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                //     if (translateX + state.deltaX < lastItemLeft * -1) {
                //         translateX = lastItemLeft * -1;
                //     } else if (translateX + state.deltaX <= 0) {
                //         translateX = translateX + state.deltaX;
                //     } else if (translateX + state.deltaX > 0) {
                //         translateX = 0;
                //     }

                //     $elm.style.transform = `translateX(${translateX}px)`;
                // }, {
                //     easing: __easeOut,
                //     onEnd: () => {
                //         // const mostDisplaysItem = this._getMostDisplayedItem();
                //         // const translates = __getTranslateProperties($elm);

                //         // easingScrollInterval = __easeInterval(700, (per) => {
                //         //     const offsetX = mostDisplaysItem.originRelLeft * -1 / 100 * per;

                //         //     const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                //         //     let translateX = translates.x + offsetX;
                //         //     if (translateX + state.deltaX < lastItemLeft * -1) {
                //         //         translateX = lastItemLeft * -1;
                //         //     } else if (translateX + state.deltaX <= 0) {
                //         //         // console.log(translateX, state.deltaX);
                //         //         translateX = translateX + state.deltaX;
                //         //     } else if (translateX + state.deltaX > 0) {
                //         //         translateX = 0;
                //         //     }

                //         //     $elm.style.transform = `translateX(${translateX}px)`;
                //         // });
                //     }
                // });
            break;
            default:

                const childBounds = $child.getBoundingClientRect(),
                    elmBounds = $elm.getBoundingClientRect();

                let computedTranslateX = translateX + state.deltaX;

                const offsetX = childBounds.left - elmBounds.left;

                const maxOffsetX = 150;

                if (computedTranslateX >= maxOffsetX) {
                    computedTranslateX = maxOffsetX;
                } else if (computedTranslateX > 0) {
                    const damp = 1 - __clamp(__easeOutQuad(1 / maxOffsetX * state.deltaX), 0, 1); 
                    const newComputedX = __clamp(maxOffsetX * damp, 0, maxOffsetX);
                    computedTranslateX = maxOffsetX - newComputedX;
                }



                let translateStr = ``;
                if (finalSettings.horizontal) translateStr += `translateX(${computedTranslateX}px)`;
                if (finalSettings.vertical) translateStr += ` translateY(${translateY + state.deltaY}px)`;



                $child.style.transform = translateStr;

                // scope if needed
                // if ($child.getBoundingClientRect().right < 0) {
                //     $child.style.transform = `translateX(-100%)`;
                //     return;
                // }   
                // if (translateX + state.deltaX > 0) {
                //     $child.style.transform = `translateX(0px)`;
                //     return;
                // }
            break;
        }
    });


    return $elm;
}
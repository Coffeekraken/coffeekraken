import __onDrag from '../detect/onDrag';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __getTranslateProperties from '../style/getTranslateProperties';
import __querySelectorLive from '../query/querySelectorLive';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __wrapInner from '../manipulate/wrapInner';
import __wrap from '../manipulate/wrap';
import __clamp from '../../../shared/math/clamp';
import __areaStats from '../element/areaStats';

import __easeClamp from '../../../shared/math/easeClamp';

import __easeOutQuad from '../../../shared/easing/easeOutQuad';
import easeInterval from '../../../shared/function/easeInterval';

/**
 * @name      slideable
 * @namespace            js.dom.drag
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Simulate the slide gesture with optional inertia and direction restriction
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to apply the slideable behavior
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import slideable from '@coffeekraken/sugar/js/drag/slideable';
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISlideableSettings {
    direction: 'vertical' | 'horizontal';
    maxOffset: number;
    maxOffsetX: number;
    maxOffsetY: number;
    refocus: number;
}

function _getMostDisplayedItem($items: HTMLElement[]): HTMLElement {

    let higherSurface = 0, $itemObj;

    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = __areaStats($item, {
            relativeTo: <HTMLElement>$item.parentNode?.parentNode
        });
        if (areaStats.percentage > higherSurface) {
            $itemObj = $item;
            higherSurface = areaStats.percentage;
        }
    }

    // if (!$itemObj) {
    //     const firstItem = $items[0];

    //     if (firstItem.originRelLeft >= this._$itemsContainer.getBoundingClientRect().width) {
    //         $itemObj = firstItem;
    //     } else {
    //         $itemObj = this._$items[this._$items.length - 1];
    //     }

    // }

    return $itemObj ?? $items[0];

}

export default function slideable($elm: HTMLElement, settings?: ISlideableSettings): HTMLElement {

    const finalSettings = <ISlideableSettings>{
        direction: 'horizontal',
        maxOffset: 10,
        maxOffsetX: undefined,
        maxOffsetY: undefined,
        refocus: true,
        onRefocus: undefined,
        ...settings ?? {}
    };
    finalSettings.maxOffsetX = finalSettings.maxOffsetX ?? finalSettings.maxOffset;
    finalSettings.maxOffsetY = finalSettings.maxOffsetY ?? finalSettings.maxOffset;

    const id = $elm.getAttribute('slideable-id') ?? __uniqid();
    $elm.setAttribute('slideable-id', id);

    let translateX = 0, easingScrollInterval,
        translateY = 0;

    __injectStyle(`
        [slideable-id] {
            user-select: none;
        }
    `, 's-slideable');

    const $child = <HTMLElement>$elm.firstElementChild;

    if (!$child) {
        throw new Error(`[slideable] The slideable element must have at least one child that will be translated`);
    }

    let lastComputedTranslatesStr = '';
    let cancelFromClick = false;

    __onDrag($elm, (state) => {
        const translates = __getTranslateProperties($child);
        switch(state.type) {
            case 'start':
                translateX = translates.x;
                translateY = translates.y;
                cancelFromClick = true;
                easingScrollInterval?.cancel?.();
                setTimeout(() => {
                    cancelFromClick = false;
                });
            break;
            case 'end':

                const pixelsBySecond = __clamp(finalSettings.direction === 'horizontal' ? state.pixelsXBySecond : state.pixelsYBySecond, -2000, 2000);
                const duration = __clamp(Math.abs(pixelsBySecond), 100, 1000);

                let sameIdx = 0;

                easingScrollInterval = __easeInterval(duration, (percentage) => {
                    const offsetX = pixelsBySecond / 100 * percentage,
                        offsetY = pixelsBySecond / 100 * percentage; 

                    let computedTranslateX, computedTranslateY;

                    if (finalSettings.direction === 'horizontal') {
                        computedTranslateX = translates.x + offsetX;
                        computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
                        computedTranslateX *= -1;
                    } else {
                        computedTranslateY = translates.y + offsetY;
                        computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
                        computedTranslateY *= -1;
                    }

                    if (lastComputedTranslatesStr === `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`) {
                        sameIdx++;
                        if (sameIdx >= 10) {
                            easingScrollInterval.cancel();
                            sameIdx = 0;
                            return;
                        }
                    }
                    lastComputedTranslatesStr = `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`;


                    // generate transform string
                    let translateStr = ``;
                    if (finalSettings.direction === 'horizontal') translateStr += `translateX(${computedTranslateX}px)`;
                    else translateStr += ` translateY(${computedTranslateY}px)`;

                    // apply translation
                    $child.style.transform = translateStr;
                }, {
                    easing: __easeOut
                });

                easingScrollInterval.on('finally', (data) => {

                    if (cancelFromClick) return;

                    // stop if not refocus wanted
                    if (!finalSettings.refocus) return;

                    const translates = __getTranslateProperties($child);

                    const $mostDisplaysItem = _getMostDisplayedItem($child.children);

                    finalSettings.onRefocus?.($mostDisplaysItem);

                    const diffX = $mostDisplaysItem.getBoundingClientRect().left - $elm.getBoundingClientRect().left,
                        diffY = $mostDisplaysItem.getBoundingClientRect().top - $elm.getBoundingClientRect().top;

                    easingScrollInterval = __easeInterval(500, (per) => {
                        const offsetX = diffX / 100 * per,
                            offsetY = diffY / 100 * per;

                        let translateStr = ``;
                        if (finalSettings.direction === 'horizontal') translateStr += `translateX(${translates.x + offsetX * -1}px)`;
                        else translateStr += ` translateY(${translates.y + offsetY * -1}px)`;

                        $child.style.transform = translateStr;
                    });

                });

            break;
            default:

                let computedTranslateY, computedTranslateX;

                if (finalSettings.direction === 'horizontal') {
                    computedTranslateX = translateX + state.deltaX;
                    computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
                    computedTranslateX *= -1;
                } else {
                    computedTranslateY = translateY + state.deltaY;
                    computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
                    computedTranslateY *= -1;
                }

                // generate transform string
                let translateStr = ``;
                if (finalSettings.direction === 'horizontal') translateStr += `translateX(${computedTranslateX}px)`;
                else translateStr += ` translateY(${computedTranslateY}px)`;

                // apply translation
                $child.style.transform = translateStr;

            break;
        }
    });


    return $elm;
}
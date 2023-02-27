import __SPromise from '@coffeekraken/s-promise';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import { __elementAreaStats, __onDrag } from '@coffeekraken/sugar/dom';
import __uniqid from '../../../js/string/uniqid';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __clamp from '../../../shared/math/clamp';
import __easeClamp from '../../../shared/math/easeClamp';
import __injectStyle from '../inject/injectStyle';

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
 * @snippet         __slideable($1)
 *
 * @example 	js
 * import { __slideable } from '@coffeekraken/sugar/dom';
 * __slideable($myElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISlideableSettings {
    direction: 'vertical' | 'horizontal';
    friction: number;
    maxOffset: number;
    maxOffsetX: number;
    maxOffsetY: number;
    onStart: Function;
    onDrag: Function;
    onEnd: Function;
    onRefocusStart: Function;
    onRefocusEnd: Function;
    refocus: number;
}

function _getMostDisplayedItem($items: HTMLElement[]): HTMLElement {
    let higherSurface = 0,
        $itemObj;

    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = __elementAreaStats($item, {
            relativeTo: <HTMLElement>$item.parentNode?.parentNode,
        });
        if (areaStats.percentage > higherSurface) {
            $itemObj = $item;
            higherSurface = areaStats.percentage;
        }
    }

    return $itemObj ?? $items[0];
}

export default function slideable(
    $elm: HTMLElement,
    settings?: Partial<ISlideableSettings>,
): __SPromise {
    return new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings = <ISlideableSettings>{
            direction: 'horizontal',
            friction: 0.7,
            maxOffset: 10,
            maxOffsetX: undefined,
            maxOffsetY: undefined,
            refocus: true,
            onStart: undefined,
            onDrag: undefined,
            onEnd: undefined,
            onRefocusStart: undefined,
            onRefocusEnd: undefined,
            ...(settings ?? {}),
        };
        finalSettings.maxOffsetX =
            finalSettings.maxOffsetX ?? finalSettings.maxOffset;
        finalSettings.maxOffsetY =
            finalSettings.maxOffsetY ?? finalSettings.maxOffset;

        const id = $elm.getAttribute('slideable-id') ?? __uniqid();
        $elm.setAttribute('slideable-id', id);

        let translateX = 0,
            easingScrollInterval,
            translateY = 0;

        __injectStyle(
            `
            [slideable-id] {
                user-select: none;
            }
        `,
            's-slideable',
        );

        const $child = <HTMLElement>$elm.firstElementChild;

        if (!$child) {
            throw new Error(
                `[slideable] The slideable element must have at least one child that will be translated`,
            );
        }

        const $sChild = new __SSugarElement($child);

        let lastComputedTranslatesStr = '';
        let cancelFromClick = false;

        __onDrag($elm, (state) => {
            const translates = $sChild.getTranslates();
            switch (state.type) {
                case 'start':
                    translateX = translates.x;
                    translateY = translates.y;
                    cancelFromClick = true;
                    easingScrollInterval?.cancel?.();
                    setTimeout(() => {
                        cancelFromClick = false;
                    });
                    emit('start', state);
                    finalSettings.onStart?.(state);
                    break;
                case 'end':
                    const pixelsBySecond = __clamp(
                        finalSettings.direction === 'horizontal'
                            ? state.speedX
                            : state.speedY,
                        -2000,
                        2000,
                    );
                    const duration =
                        __clamp(Math.abs(pixelsBySecond), 100, 1000) *
                        (1 - finalSettings.friction);
                    let sameIdx = 0;

                    emit('end', state);
                    finalSettings.onEnd?.(state);

                    easingScrollInterval = __easeInterval(
                        duration,
                        (percentage) => {
                            let offsetX = (pixelsBySecond / 100) * percentage,
                                offsetY = (pixelsBySecond / 100) * percentage;

                            offsetX *= 1 - finalSettings.friction;
                            offsetY *= 1 - finalSettings.friction;

                            let computedTranslateX, computedTranslateY;

                            if (finalSettings.direction === 'horizontal') {
                                computedTranslateX = translates.x + offsetX;
                                computedTranslateX = __easeClamp(
                                    computedTranslateX * -1,
                                    finalSettings.maxOffsetX * -1,
                                    0,
                                    $child.scrollWidth - $child.offsetWidth,
                                    $child.scrollWidth -
                                        $child.offsetWidth +
                                        finalSettings.maxOffsetX,
                                );
                                computedTranslateX *= -1;
                            } else {
                                computedTranslateY = translates.y + offsetY;
                                computedTranslateY = __easeClamp(
                                    computedTranslateY * -1,
                                    finalSettings.maxOffsetY * -1,
                                    0,
                                    $child.scrollHeight - $child.offsetHeight,
                                    $child.scrollHeight -
                                        $child.offsetHeight +
                                        finalSettings.maxOffsetY,
                                );
                                computedTranslateY *= -1;
                            }

                            if (
                                lastComputedTranslatesStr ===
                                `${computedTranslateX || 'x'}-${
                                    computedTranslateY || 'y'
                                }`
                            ) {
                                sameIdx++;
                                if (sameIdx >= 10) {
                                    easingScrollInterval.cancel();
                                    sameIdx = 0;
                                    return;
                                }
                            }
                            lastComputedTranslatesStr = `${
                                computedTranslateX || 'x'
                            }-${computedTranslateY || 'y'}`;

                            // apply translation
                            if (finalSettings.direction === 'horizontal') {
                                $sChild.setTranslate(computedTranslateX);
                            } else {
                                $sChild.setTranslate(0, computedTranslateY);
                            }
                        },
                        {
                            easing: __easeOut,
                        },
                    );

                    easingScrollInterval.on('finally', (data) => {
                        if (cancelFromClick) return;

                        // stop if not refocus wanted
                        if (!finalSettings.refocus) {
                            resolve(data);
                            return;
                        }

                        const translates = $sChild.getTranslates();

                        // @ts-ignore
                        const $mostDisplaysItem = _getMostDisplayedItem(
                            $child.children,
                        );

                        emit('refocusStart', $mostDisplaysItem);
                        finalSettings.onRefocusStart?.($mostDisplaysItem);

                        const diffX =
                                $mostDisplaysItem.getBoundingClientRect().left -
                                $elm.getBoundingClientRect().left,
                            diffY =
                                $mostDisplaysItem.getBoundingClientRect().top -
                                $elm.getBoundingClientRect().top;

                        easingScrollInterval = __easeInterval(500, (per) => {
                            const offsetX = (diffX / 100) * per,
                                offsetY = (diffY / 100) * per;

                            if (finalSettings.direction === 'horizontal') {
                                $sChild.setTranslate(
                                    translates.x + offsetX * -1,
                                );
                            } else {
                                $sChild.setTranslate(
                                    0,
                                    translates.y + offsetY * -1,
                                );
                            }

                            if (per >= 100) {
                                emit('refocusEnd', $mostDisplaysItem);
                                resolve(data);
                            }
                        });
                    });

                    break;
                default:
                    let computedTranslateY, computedTranslateX;

                    if (finalSettings.direction === 'horizontal') {
                        computedTranslateX = translateX + state.deltaX;
                        computedTranslateX = __easeClamp(
                            computedTranslateX * -1,
                            finalSettings.maxOffsetX * -1,
                            0,
                            $child.scrollWidth - $child.offsetWidth,
                            $child.scrollWidth -
                                $child.offsetWidth +
                                finalSettings.maxOffsetX,
                        );
                        computedTranslateX *= -1;
                    } else {
                        computedTranslateY = translateY + state.deltaY;
                        computedTranslateY = __easeClamp(
                            computedTranslateY * -1,
                            finalSettings.maxOffsetY * -1,
                            0,
                            $child.scrollHeight - $child.offsetHeight,
                            $child.scrollHeight -
                                $child.offsetHeight +
                                finalSettings.maxOffsetY,
                        );
                        computedTranslateY *= -1;
                    }

                    if (finalSettings.direction === 'horizontal') {
                        $sChild.setTranslate(computedTranslateX);
                    } else {
                        $sChild.setTranslate(0, computedTranslateY);
                    }

                    emit('drag', state);
                    finalSettings.onDrag?.(state);

                    break;
            }
        });
    });
}

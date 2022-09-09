import __SPromise from '@coffeekraken/s-promise';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import { __onDrag } from '@coffeekraken/sugar/dom';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __clamp from '../../../shared/math/clamp';
import __easeClamp from '../../../shared/math/easeClamp';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import { __elementAreaStats } from '@coffeekraken/sugar/dom';
function _getMostDisplayedItem($items) {
    var _a;
    let higherSurface = 0, $itemObj;
    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = __elementAreaStats($item, {
            relativeTo: (_a = $item.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode,
        });
        if (areaStats.percentage > higherSurface) {
            $itemObj = $item;
            higherSurface = areaStats.percentage;
        }
    }
    return $itemObj !== null && $itemObj !== void 0 ? $itemObj : $items[0];
}
export default function slideable($elm, settings) {
    return new __SPromise(({ resolve, reject, emit }) => {
        var _a, _b, _c;
        const finalSettings = Object.assign({ direction: 'horizontal', friction: 0.7, maxOffset: 10, maxOffsetX: undefined, maxOffsetY: undefined, refocus: true, onStart: undefined, onDrag: undefined, onEnd: undefined, onRefocusStart: undefined, onRefocusEnd: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        finalSettings.maxOffsetX =
            (_a = finalSettings.maxOffsetX) !== null && _a !== void 0 ? _a : finalSettings.maxOffset;
        finalSettings.maxOffsetY =
            (_b = finalSettings.maxOffsetY) !== null && _b !== void 0 ? _b : finalSettings.maxOffset;
        const id = (_c = $elm.getAttribute('slideable-id')) !== null && _c !== void 0 ? _c : __uniqid();
        $elm.setAttribute('slideable-id', id);
        let translateX = 0, easingScrollInterval, translateY = 0;
        __injectStyle(`
            [slideable-id] {
                user-select: none;
            }
        `, 's-slideable');
        const $child = $elm.firstElementChild;
        if (!$child) {
            throw new Error(`[slideable] The slideable element must have at least one child that will be translated`);
        }
        const $sChild = new __SSugarElement($child);
        let lastComputedTranslatesStr = '';
        let cancelFromClick = false;
        __onDrag($elm, (state) => {
            var _a, _b, _c, _d;
            const translates = $sChild.getTranslates();
            switch (state.type) {
                case 'start':
                    translateX = translates.x;
                    translateY = translates.y;
                    cancelFromClick = true;
                    (_a = easingScrollInterval === null || easingScrollInterval === void 0 ? void 0 : easingScrollInterval.cancel) === null || _a === void 0 ? void 0 : _a.call(easingScrollInterval);
                    setTimeout(() => {
                        cancelFromClick = false;
                    });
                    emit('start', state);
                    (_b = finalSettings.onStart) === null || _b === void 0 ? void 0 : _b.call(finalSettings, state);
                    break;
                case 'end':
                    const pixelsBySecond = __clamp(finalSettings.direction === 'horizontal'
                        ? state.speedX
                        : state.speedY, -2000, 2000);
                    const duration = __clamp(Math.abs(pixelsBySecond), 100, 1000) *
                        (1 - finalSettings.friction);
                    let sameIdx = 0;
                    emit('end', state);
                    (_c = finalSettings.onEnd) === null || _c === void 0 ? void 0 : _c.call(finalSettings, state);
                    easingScrollInterval = __easeInterval(duration, (percentage) => {
                        let offsetX = (pixelsBySecond / 100) * percentage, offsetY = (pixelsBySecond / 100) * percentage;
                        offsetX *= 1 - finalSettings.friction;
                        offsetY *= 1 - finalSettings.friction;
                        let computedTranslateX, computedTranslateY;
                        if (finalSettings.direction === 'horizontal') {
                            computedTranslateX = translates.x + offsetX;
                            computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth -
                                $child.offsetWidth +
                                finalSettings.maxOffsetX);
                            computedTranslateX *= -1;
                        }
                        else {
                            computedTranslateY = translates.y + offsetY;
                            computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight -
                                $child.offsetHeight +
                                finalSettings.maxOffsetY);
                            computedTranslateY *= -1;
                        }
                        if (lastComputedTranslatesStr ===
                            `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`) {
                            sameIdx++;
                            if (sameIdx >= 10) {
                                easingScrollInterval.cancel();
                                sameIdx = 0;
                                return;
                            }
                        }
                        lastComputedTranslatesStr = `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`;
                        // apply translation
                        if (finalSettings.direction === 'horizontal') {
                            $sChild.setTranslate(computedTranslateX);
                        }
                        else {
                            $sChild.setTranslate(0, computedTranslateY);
                        }
                    }, {
                        easing: __easeOut,
                    });
                    easingScrollInterval.on('finally', (data) => {
                        var _a;
                        if (cancelFromClick)
                            return;
                        // stop if not refocus wanted
                        if (!finalSettings.refocus) {
                            resolve(data);
                            return;
                        }
                        const translates = $sChild.getTranslates();
                        // @ts-ignore
                        const $mostDisplaysItem = _getMostDisplayedItem($child.children);
                        emit('refocusStart', $mostDisplaysItem);
                        (_a = finalSettings.onRefocusStart) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $mostDisplaysItem);
                        const diffX = $mostDisplaysItem.getBoundingClientRect().left -
                            $elm.getBoundingClientRect().left, diffY = $mostDisplaysItem.getBoundingClientRect().top -
                            $elm.getBoundingClientRect().top;
                        easingScrollInterval = __easeInterval(500, (per) => {
                            const offsetX = (diffX / 100) * per, offsetY = (diffY / 100) * per;
                            if (finalSettings.direction === 'horizontal') {
                                $sChild.setTranslate(translates.x + offsetX * -1);
                            }
                            else {
                                $sChild.setTranslate(0, translates.y + offsetY * -1);
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
                        computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth -
                            $child.offsetWidth +
                            finalSettings.maxOffsetX);
                        computedTranslateX *= -1;
                    }
                    else {
                        computedTranslateY = translateY + state.deltaY;
                        computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight -
                            $child.offsetHeight +
                            finalSettings.maxOffsetY);
                        computedTranslateY *= -1;
                    }
                    if (finalSettings.direction === 'horizontal') {
                        $sChild.setTranslate(computedTranslateX);
                    }
                    else {
                        $sChild.setTranslate(0, computedTranslateY);
                    }
                    emit('drag', state);
                    (_d = finalSettings.onDrag) === null || _d === void 0 ? void 0 : _d.call(finalSettings, state);
                    break;
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLFNBQVMsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRCxPQUFPLGNBQWMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLE9BQU8sTUFBTSw0QkFBNEIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQTJDN0QsU0FBUyxxQkFBcUIsQ0FBQyxNQUFxQjs7SUFDaEQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUNqQixRQUFRLENBQUM7SUFFYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxFQUFFO1lBQ3hDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxH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
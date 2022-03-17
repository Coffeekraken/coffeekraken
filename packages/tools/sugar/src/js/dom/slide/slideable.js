import __SPromise from '@coffeekraken/s-promise';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __clamp from '../../../shared/math/clamp';
import __easeClamp from '../../../shared/math/easeClamp';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __onDrag from '../detect/onDrag';
import __areaStats from '../element/areaStats';
function _getMostDisplayedItem($items) {
    var _a;
    let higherSurface = 0, $itemObj;
    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = __areaStats($item, {
            relativeTo: (_a = $item.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode
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
        const finalSettings = Object.assign({ direction: 'horizontal', friction: 0.7, maxOffset: 10, maxOffsetX: undefined, maxOffsetY: undefined, refocus: true, onStart: undefined, onDrag: undefined, onEnd: undefined, onRefocusStart: undefined, onRefocusEnd: undefined }, settings !== null && settings !== void 0 ? settings : {});
        finalSettings.maxOffsetX = (_a = finalSettings.maxOffsetX) !== null && _a !== void 0 ? _a : finalSettings.maxOffset;
        finalSettings.maxOffsetY = (_b = finalSettings.maxOffsetY) !== null && _b !== void 0 ? _b : finalSettings.maxOffset;
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
                    const pixelsBySecond = __clamp(finalSettings.direction === 'horizontal' ? state.speedX : state.speedY, -2000, 2000);
                    const duration = __clamp(Math.abs(pixelsBySecond), 100, 1000) * (1 - finalSettings.friction);
                    let sameIdx = 0;
                    emit('end', state);
                    (_c = finalSettings.onEnd) === null || _c === void 0 ? void 0 : _c.call(finalSettings, state);
                    easingScrollInterval = __easeInterval(duration, (percentage) => {
                        let offsetX = pixelsBySecond / 100 * percentage, offsetY = pixelsBySecond / 100 * percentage;
                        offsetX *= 1 - finalSettings.friction;
                        offsetY *= 1 - finalSettings.friction;
                        let computedTranslateX, computedTranslateY;
                        if (finalSettings.direction === 'horizontal') {
                            computedTranslateX = translates.x + offsetX;
                            computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
                            computedTranslateX *= -1;
                        }
                        else {
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
                        // apply translation
                        if (finalSettings.direction === 'horizontal') {
                            $sChild.setTranslate(computedTranslateX);
                        }
                        else {
                            $sChild.setTranslate(0, computedTranslateY);
                        }
                    }, {
                        easing: __easeOut
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
                        const diffX = $mostDisplaysItem.getBoundingClientRect().left - $elm.getBoundingClientRect().left, diffY = $mostDisplaysItem.getBoundingClientRect().top - $elm.getBoundingClientRect().top;
                        easingScrollInterval = __easeInterval(500, (per) => {
                            const offsetX = diffX / 100 * per, offsetY = diffY / 100 * per;
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
                        computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
                        computedTranslateX *= -1;
                    }
                    else {
                        computedTranslateY = translateY + state.deltaY;
                        computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pELE9BQU8sUUFBUSxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBMkMvQyxTQUFTLHFCQUFxQixDQUFDLE1BQXFCOztJQUVoRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2pDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLE1BQU0sQ0FBQyxDQUFD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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import __uniqid from '../../../js/string/uniqid.js';
import __easeOut from '../../../shared/easing/easeOutQuad.js';
import __easeInterval from '../../../shared/function/easeInterval.js';
import __clamp from '../../../shared/math/clamp.js';
import __easeClamp from '../../../shared/math/easeClamp.js';
import __onDrag from '../detect/onDrag.js';
import __elementAreaStats from '../element/elementAreaStats.js';
import __injectStyle from '../inject/injectStyle.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sUUFBUSxNQUFNLDhCQUE4QixDQUFDO0FBQ3BELE9BQU8sU0FBUyxNQUFNLHVDQUF1QyxDQUFDO0FBQzlELE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sT0FBTyxNQUFNLCtCQUErQixDQUFDO0FBQ3BELE9BQU8sV0FBVyxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sa0JBQWtCLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxhQUFhLE1BQU0sMEJBQTBCLENBQUM7QUE2Q3JELFNBQVMscUJBQXFCLENBQUMsTUFBcUI7O0lBQ2hELElBQUksYUFBYSxHQUFHLENBQUMsRUFDakIsUUFBUSxDQUFDO0lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssRUFBRTtZQUN4QyxVQUFVLEVBQWUsTUFBQSxLQUFLLENBQUMsVUFBVSwwQ0FBRSxVQUFVO1NBQ3hELENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxDQUFDLFVBQVUsR0FBRyxhQUFhLEVBQUU7WUFDdEMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixhQUFhLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUN4QztLQUNKO0lBRUQsT0FBTyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUM3QixJQUFpQixFQUNqQixRQUFzQztJQUV0QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQ2hELE1BQU0sYUFBYSxHQUFHLGdCQUNsQixTQUFTLEVBQUUsWUFBWSxFQUN2QixRQUFRLEVBQUUsR0FBRyxFQUNiLFNBQVMsRUFBRSxFQUFFLEVBQ2IsVUFBVSxFQUFFLFNBQVMsRUFDckIsVUFBVSxFQUFFLFNBQVMsRUFDckIsT0FBTyxFQUFFLElBQUksRUFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixNQUFNLEVBQUUsU0FBUyxFQUNqQixLQUFLLEVBQUUsU0FBUyxFQUNoQixjQUFjLEVBQUUsU0FBUyxFQUN6QixZQUFZLEVBQUUsU0FBUyxJQUNwQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsYUFBYSxDQUFDLFVBQVU7WUFDcEIsTUFBQSxhQUFhLENBQUMsVUFBVSxtQ0FBSSxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3hELGFBQWEsQ0FBQyxVQUFVO1lBQ3BCLE1BQUEsYUFBYSxDQUFDLFVBQVUsbUNBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUV4RCxNQUFNLEVBQUUsR0FBRyxNQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLG1DQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLElBQUksVUFBVSxHQUFHLENBQUMsRUFDZCxvQkFBb0IsRUFDcEIsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixhQUFhLENBQ1Q7Ozs7U0FJSCxFQUNHLGFBQWEsQ0FDaEIsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFbkQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ1gsd0ZBQXdGLENBQzNGLENBQUM7U0FDTDtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLElBQUkseUJBQXlCLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUU1QixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQ3JCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLEtBQUssT0FBTztvQkFDUixVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLE1BQUEsb0JBQW9CLGFBQXBCLG9CQUFvQix1QkFBcEIsb0JBQW9CLENBQUUsTUFBTSxvRUFBSSxDQUFDO29CQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3JCLE1BQUEsYUFBYSxDQUFDLE9BQU8sOERBQUcsS0FBSyxDQUFDLENBQUM7b0JBQy9CLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FDMUIsYUFBYSxDQUFDLFNBQVMsS0FBSyxZQUFZO3dCQUNwQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU07d0JBQ2QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ2xCLENBQUMsSUFBSSxFQUNMLElBQUksQ0FDUCxDQUFDO29CQUNGLE1BQU0sUUFBUSxHQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7d0JBQzVDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDakMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNuQixNQUFBLGFBQWEsQ0FBQyxLQUFLLDhEQUFHLEtBQUssQ0FBQyxDQUFDO29CQUU3QixvQkFBb0IsR0FBRyxjQUFjLENBQ2pDLFFBQVEsRUFDUixDQUFDLFVBQVUsRUFBRSxFQUFFO3dCQUNYLElBQUksT0FBTyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFDN0MsT0FBTyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzt3QkFFbEQsT0FBTyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO3dCQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7d0JBRXRDLElBQUksa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7d0JBRTNDLElBQUksYUFBYSxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7NEJBQzFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDOzRCQUM1QyxrQkFBa0IsR0FBRyxXQUFXLENBQzVCLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUN2QixhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUM3QixDQUFDLEVBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUN2QyxNQUFNLENBQUMsV0FBVztnQ0FDZCxNQUFNLENBQUMsV0FBVztnQ0FDbEIsYUFBYSxDQUFDLFVBQVUsQ0FDL0IsQ0FBQzs0QkFDRixrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDNUI7NkJBQU07NEJBQ0gsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7NEJBQzVDLGtCQUFrQixHQUFHLFdBQVcsQ0FDNUIsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQ3ZCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQzdCLENBQUMsRUFDRCxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQ3pDLE1BQU0sQ0FBQyxZQUFZO2dDQUNmLE1BQU0sQ0FBQyxZQUFZO2dDQUNuQixhQUFhLENBQUMsVUFBVSxDQUMvQixDQUFDOzRCQUNGLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUM1Qjt3QkFFRCxJQUNJLHlCQUF5Qjs0QkFDekIsR0FBRyxrQkFBa0IsSUFBSSxHQUFHLElBQ3hCLGtCQUFrQixJQUFJLEdBQzFCLEVBQUUsRUFDSjs0QkFDRSxPQUFPLEVBQUUsQ0FBQzs0QkFDVixJQUFJLE9BQU8sSUFBSSxFQUFFLEVBQUU7Z0NBQ2Ysb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQzlCLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0NBQ1osT0FBTzs2QkFDVjt5QkFDSjt3QkFDRCx5QkFBeUIsR0FBRyxHQUN4QixrQkFBa0IsSUFBSSxHQUMxQixJQUFJLGtCQUFrQixJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUVoQyxvQkFBb0I7d0JBQ3BCLElBQUksYUFBYSxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7NEJBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt5QkFDNUM7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzt5QkFDL0M7b0JBQ0wsQ0FBQyxFQUNEO3dCQUNJLE1BQU0sRUFBRSxTQUFTO3FCQUNwQixDQUNKLENBQUM7b0JBRUYsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzt3QkFDeEMsSUFBSSxlQUFlOzRCQUFFLE9BQU87d0JBRTVCLDZCQUE2Qjt3QkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7NEJBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDZCxPQUFPO3lCQUNWO3dCQUVELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFFM0MsYUFBYTt3QkFDYixNQUFNLGlCQUFpQixHQUFHLHFCQUFxQixDQUMzQyxNQUFNLENBQUMsUUFBUSxDQUNsQixDQUFDO3dCQUVGLElBQUksQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzt3QkFDeEMsTUFBQSxhQUFhLENBQUMsY0FBYyw4REFBRyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUVsRCxNQUFNLEtBQUssR0FDSCxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUk7NEJBQzlDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksRUFDckMsS0FBSyxHQUNELGlCQUFpQixDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRzs0QkFDN0MsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO3dCQUV6QyxvQkFBb0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQy9DLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFDL0IsT0FBTyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs0QkFFbEMsSUFBSSxhQUFhLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTtnQ0FDMUMsT0FBTyxDQUFDLFlBQVksQ0FDaEIsVUFBVSxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQzlCLENBQUM7NkJBQ0w7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLFlBQVksQ0FDaEIsQ0FBQyxFQUNELFVBQVUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUM5QixDQUFDOzZCQUNMOzRCQUVELElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtnQ0FDWixJQUFJLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0NBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDakI7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTTtnQkFDVjtvQkFDSSxJQUFJLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUUzQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO3dCQUMxQyxrQkFBa0IsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDL0Msa0JBQWtCLEdBQUcsV0FBVyxDQUM1QixrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFDdkIsYUFBYSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFDN0IsQ0FBQyxFQUNELE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFDdkMsTUFBTSxDQUFDLFdBQVc7NEJBQ2QsTUFBTSxDQUFDLFdBQVc7NEJBQ2xCLGFBQWEsQ0FBQyxVQUFVLENBQy9CLENBQUM7d0JBQ0Ysa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNILGtCQUFrQixHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUMvQyxrQkFBa0IsR0FBRyxXQUFXLENBQzVCLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUN2QixhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUM3QixDQUFDLEVBQ0QsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxFQUN6QyxNQUFNLENBQUMsWUFBWTs0QkFDZixNQUFNLENBQUMsWUFBWTs0QkFDbkIsYUFBYSxDQUFDLFVBQVUsQ0FDL0IsQ0FBQzt3QkFDRixrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDNUI7b0JBRUQsSUFBSSxhQUFhLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTt3QkFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUM1Qzt5QkFBTTt3QkFDSCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3FCQUMvQztvQkFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwQixNQUFBLGFBQWEsQ0FBQyxNQUFNLDhEQUFHLEtBQUssQ0FBQyxDQUFDO29CQUU5QixNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9
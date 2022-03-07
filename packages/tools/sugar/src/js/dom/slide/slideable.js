import __onDrag from '../detect/onDrag';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __getTranslateProperties from '../style/getTranslateProperties';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __clamp from '../../../shared/math/clamp';
import __areaStats from '../element/areaStats';
import __easeClamp from '../../../shared/math/easeClamp';
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
    // if (!$itemObj) {
    //     const firstItem = $items[0];
    //     if (firstItem.originRelLeft >= this._$itemsContainer.getBoundingClientRect().width) {
    //         $itemObj = firstItem;
    //     } else {
    //         $itemObj = this._$items[this._$items.length - 1];
    //     }
    // }
    return $itemObj !== null && $itemObj !== void 0 ? $itemObj : $items[0];
}
export default function slideable($elm, settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ direction: 'horizontal', maxOffset: 10, maxOffsetX: undefined, maxOffsetY: undefined, refocus: true, onRefocus: undefined }, settings !== null && settings !== void 0 ? settings : {});
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
    let lastComputedTranslatesStr = '';
    let cancelFromClick = false;
    __onDrag($elm, (state) => {
        var _a;
        const translates = __getTranslateProperties($child);
        switch (state.type) {
            case 'start':
                translateX = translates.x;
                translateY = translates.y;
                cancelFromClick = true;
                (_a = easingScrollInterval === null || easingScrollInterval === void 0 ? void 0 : easingScrollInterval.cancel) === null || _a === void 0 ? void 0 : _a.call(easingScrollInterval);
                setTimeout(() => {
                    cancelFromClick = false;
                });
                break;
            case 'end':
                const pixelsBySecond = __clamp(finalSettings.direction === 'horizontal' ? state.pixelsXBySecond : state.pixelsYBySecond, -2000, 2000);
                const duration = __clamp(Math.abs(pixelsBySecond), 100, 1000);
                let sameIdx = 0;
                easingScrollInterval = __easeInterval(duration, (percentage) => {
                    const offsetX = pixelsBySecond / 100 * percentage, offsetY = pixelsBySecond / 100 * percentage;
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
                    // generate transform string
                    let translateStr = ``;
                    if (finalSettings.direction === 'horizontal')
                        translateStr += `translateX(${computedTranslateX}px)`;
                    else
                        translateStr += ` translateY(${computedTranslateY}px)`;
                    // apply translation
                    $child.style.transform = translateStr;
                }, {
                    easing: __easeOut
                });
                easingScrollInterval.on('finally', (data) => {
                    var _a;
                    if (cancelFromClick)
                        return;
                    // stop if not refocus wanted
                    if (!finalSettings.refocus)
                        return;
                    const translates = __getTranslateProperties($child);
                    const $mostDisplaysItem = _getMostDisplayedItem($child.children);
                    (_a = finalSettings.onRefocus) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $mostDisplaysItem);
                    const diffX = $mostDisplaysItem.getBoundingClientRect().left - $elm.getBoundingClientRect().left, diffY = $mostDisplaysItem.getBoundingClientRect().top - $elm.getBoundingClientRect().top;
                    easingScrollInterval = __easeInterval(500, (per) => {
                        const offsetX = diffX / 100 * per, offsetY = diffY / 100 * per;
                        let translateStr = ``;
                        if (finalSettings.direction === 'horizontal')
                            translateStr += `translateX(${translates.x + offsetX * -1}px)`;
                        else
                            translateStr += ` translateY(${translates.y + offsetY * -1}px)`;
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
                }
                else {
                    computedTranslateY = translateY + state.deltaY;
                    computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
                    computedTranslateY *= -1;
                }
                // generate transform string
                let translateStr = ``;
                if (finalSettings.direction === 'horizontal')
                    translateStr += `translateX(${computedTranslateX}px)`;
                else
                    translateStr += ` translateY(${computedTranslateY}px)`;
                // apply translation
                $child.style.transform = translateStr;
                break;
        }
    });
    return $elm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sd0JBQXdCLE1BQU0saUNBQWlDLENBQUM7QUFFdkUsT0FBTyxRQUFRLE1BQU0sK0JBQStCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFHL0MsT0FBTyxPQUFPLE1BQU0sNEJBQTRCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFFL0MsT0FBTyxXQUFXLE1BQU0sZ0NBQWdDLENBQUM7QUF1Q3pELFNBQVMscUJBQXFCLENBQUMsTUFBcUI7O0lBRWhELElBQUksYUFBYSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDakMsVUFBVSxFQUFlLE1BQUEsS0FBSyxDQUFDLFVBQVUsMENBQUUsVUFBVTtTQUN4RCxDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxFQUFFO1lBQ3RDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsYUFBYSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDeEM7S0FDSjtJQUVELG1CQUFtQjtJQUNuQixtQ0FBbUM7SUFFbkMsNEZBQTRGO0lBQzVGLGdDQUFnQztJQUNoQyxlQUFlO0lBQ2YsNERBQTREO0lBQzVELFFBQVE7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
import __onDrag from '../detect/onDrag';
import __easeOut from '../../../shared/easing/easeOutQuad';
import __easeInterval from '../../../shared/function/easeInterval';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __clamp from '../../../shared/math/clamp';
import __areaStats from '../element/areaStats';
import __SSugarElement from '@coffeekraken/s-sugar-element';
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
    const $sElm = new __SSugarElement($elm);
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
    const $sChild = new __SSugarElement($child);
    let lastComputedTranslatesStr = '';
    let cancelFromClick = false;
    __onDrag($elm, (state) => {
        var _a;
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
                    if (!finalSettings.refocus)
                        return;
                    const translates = $sChild.getTranslates();
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
                        if (finalSettings.direction === 'horizontal') {
                            $sChild.setTranslate(translates.x + offsetX * -1);
                        }
                        else {
                            $sChild.setTranslate(0, translates.y + offsetY * -1);
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
                // generate transform string
                // let translateStr = ``;
                // if (finalSettings.direction === 'horizontal') translateStr += `translateX(${computedTranslateX}px)`;
                // else translateStr += ` translateY(${computedTranslateY}px)`;
                if (finalSettings.direction === 'horizontal') {
                    $sChild.setTranslate(computedTranslateX);
                }
                else {
                    $sChild.setTranslate(0, computedTranslateY);
                }
                // apply translation
                // $child.style.transform = translateStr;
                break;
        }
    });
    return $elm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDO0FBR25FLE9BQU8sUUFBUSxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBRy9DLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBRy9DLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBSTVELE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBdUN6RCxTQUFTLHFCQUFxQixDQUFDLE1BQXFCOztJQUVoRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2pDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxtQkFBbUI7SUFDbkIsbUNBQW1DO0lBRW5DLDRGQUE0RjtJQUM1RixnQ0FBZ0M7SUFDaEMsZUFBZTtJQUNmLDREQUE0RDtJQUM1RCxRQUFRO0lB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
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
                const pixelsBySecond = __clamp(finalSettings.direction === 'horizontal' ? state.speedX : state.speedY, -2000, 2000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDO0FBR25FLE9BQU8sUUFBUSxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBRy9DLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBRy9DLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBSTVELE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBdUN6RCxTQUFTLHFCQUFxQixDQUFDLE1BQXFCOztJQUVoRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2pDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVqQyxDQUFDO0FBRUQsTUFBTSxD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
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
    const finalSettings = Object.assign({ direction: 'horizontal', friction: 0.5, maxOffset: 10, maxOffsetX: undefined, maxOffsetY: undefined, refocus: true, onRefocus: undefined }, settings !== null && settings !== void 0 ? settings : {});
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
                const duration = __clamp(Math.abs(pixelsBySecond), 100, 1000) * (1 - finalSettings.friction);
                let sameIdx = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDO0FBR25FLE9BQU8sUUFBUSxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBRy9DLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBRy9DLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBSTVELE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBd0N6RCxTQUFTLHFCQUFxQixDQUFDLE1BQXFCOztJQUVoRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2pDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVqQyxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsSUFBaUIsRUFBRSxRQUE2Qjs7SUFFOUUsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFFBQVEsRUFBRSxHQUFHLEVBQ2IsU0FBUyxFQUFFLEVBQUUsRUFDYixVQUFVLEVBQUUsU0FBUyxFQUNyQixVQUFVLEVBQUUsU0FBUyxFQUNyQixPQUFPLEVBQUUsSUFBSSxFQUNiLFNBQVMsRUFBRSxTQUFTLElBQ2pCLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUNGLGFBQWEsQ0FBQyxVQUFVLEdBQUcsTUFBQSxhQUFhLENBQUMsVUFBVSxtQ0FBSSxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQy9FLGFBQWEsQ0FBQyxVQUFVLEdBQUcsTUFBQSxhQUFhLENBQUMsVUFBVSxtQ0FBSSxhQUFhLENBQUMsU0FBUyxDQUFDO0lBRS9FLE1BQU0sRUFBRSxHQUFHLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsbUNBQUksUUFBUSxFQUFFLENBQUM7SUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixFQUNwQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLGFBQWEsQ0FBQzs7OztLQUliLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFbEIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUVuRCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RkFBd0YsQ0FBQyxDQUFDO0tBQzdHO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsSUFBSSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7SUFDbkMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBRTVCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7UUFDckIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNDLFFBQU8sS0FBSyxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssT0FBTztnQkFDUixVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQUEsb0JBQW9CLGFBQXBCLG9CQUFvQix1QkFBcEIsb0JBQW9CLENBQUUsTUFBTSwrQ0FBNUIsb0JBQW9CLENBQVksQ0FBQztnQkFDakMsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztnQkFDUCxNQUFNO1lBQ04sS0FBSyxLQUFLO2dCQUVOLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEgsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUVoQixvQkFBb0IsR0FBRyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzNELElBQUksT0FBTyxHQUFHLGNBQWMsR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUMzQyxPQUFPLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7b0JBRWhELE9BQU8sSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUV0QyxJQUFJLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUUzQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO3dCQUMxQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQzt3QkFDNUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN6TSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7d0JBQzVDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDN00sa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQzVCO29CQUVELElBQUkseUJBQXlCLEtBQUssR0FBRyxrQkFBa0IsSUFBSSxHQUFHLElBQUksa0JBQWtCLElBQUksR0FBRyxFQUFFLEVBQUU7d0JBQzNGLE9BQU8sRUFBRSxDQUFDO3dCQUNWLElBQUksT0FBTyxJQUFJLEVBQUUsRUFBRTs0QkFDZixvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDOUIsT0FBTyxHQUFHLENBQUMsQ0FBQzs0QkFDWixPQUFPO3lCQUNWO3FCQUNKO29CQUNELHlCQUF5QixHQUFHLEdBQUcsa0JBQWtCLElBQUksR0FBRyxJQUFJLGtCQUFrQixJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUV4RixvQkFBb0I7b0JBQ3BCLElBQUksYUFBYSxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7d0JBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQkFDNUM7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztxQkFDL0M7Z0JBQ0wsQ0FBQyxFQUFFO29CQUNDLE1BQU0sRUFBRSxTQUFTO2lCQUNwQixDQUFDLENBQUM7Z0JBRUgsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztvQkFFeEMsSUFBSSxlQUFlO3dCQUFFLE9BQU87b0JBRTVCLDZCQUE2QjtvQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPO3dCQUFFLE9BQU87b0JBRW5DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFM0MsTUFBTSxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWpFLE1BQUEsYUFBYSxDQUFDLFNBQVMsK0NBQXZCLGFBQWEsRUFBYSxpQkFBaUIsQ0FBQyxDQUFDO29CQUU3QyxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEVBQzVGLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBRTdGLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLE9BQU8sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzt3QkFFaEMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO3dCQUN0QixJQUFJLGFBQWEsQ0FBQyxTQUFTLEtBQUssWUFBWTs0QkFBRSxZQUFZLElBQUksY0FBYyxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOzs0QkFDeEcsWUFBWSxJQUFJLGVBQWUsVUFBVSxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFFckUsSUFBSSxhQUFhLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTs0QkFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNyRDs2QkFBTTs0QkFDSCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4RDtvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFUCxDQUFDLENBQUMsQ0FBQztnQkFFUCxNQUFNO1lBQ047Z0JBRUksSUFBSSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQztnQkFFM0MsSUFBSSxhQUFhLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTtvQkFDMUMsa0JBQWtCLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQy9DLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDek0sa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNILGtCQUFrQixHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUMvQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdNLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM1QjtnQkFFRCw0QkFBNEI7Z0JBQzVCLHlCQUF5QjtnQkFDekIsdUdBQXVHO2dCQUN2RywrREFBK0Q7Z0JBRS9ELElBQUksYUFBYSxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7b0JBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDL0M7Z0JBRUQsb0JBQW9CO2dCQUNwQix5Q0FBeUM7Z0JBRTdDLE1BQU07U0FDVDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBR0gsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
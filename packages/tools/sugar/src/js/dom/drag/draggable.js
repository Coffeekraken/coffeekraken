import __onDrag from '../detect/onDrag';
import __getTranslateProperties from '../../dom/style/getTranslateProperties';
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../css/injectStyle';
import __clamp from '../../../shared/math/clamp';
import __easeOutQuad from '../../../shared/easing/easeOutQuad';
export default function draggable($elm, settings) {
    var _a;
    const finalSettings = Object.assign({ horizontal: true, vertical: true }, settings !== null && settings !== void 0 ? settings : {});
    const id = (_a = $elm.getAttribute('draggable-id')) !== null && _a !== void 0 ? _a : __uniqid();
    $elm.setAttribute('draggable-id', id);
    let translateX = 0, easingScrollInterval, translateY = 0;
    __injectStyle(`
        [draggable-id] {
            user-select: none;
        }
    `, 's-draggable');
    const $child = $elm.firstElementChild;
    if (!$child) {
        throw new Error(`[draggable] The draggable element must have at least one child that will be translated`);
    }
    __onDrag($elm, (state) => {
        var _a;
        const translates = __getTranslateProperties($child);
        switch (state.type) {
            case 'start':
                translateX = translates.x;
                translateY = translates.y;
                (_a = easingScrollInterval === null || easingScrollInterval === void 0 ? void 0 : easingScrollInterval.cancel) === null || _a === void 0 ? void 0 : _a.call(easingScrollInterval);
                break;
            case 'end':
                let duration = 1000 / 2000 * Math.abs(state.pixelsXBySecond);
                if (duration > 2000)
                    duration = 2000;
                if (duration < 500)
                    duration = 500;
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
                const childBounds = $child.getBoundingClientRect(), elmBounds = $elm.getBoundingClientRect();
                let computedTranslateX = translateX + state.deltaX;
                const offsetX = childBounds.left - elmBounds.left;
                const maxOffsetX = 150;
                if (computedTranslateX >= maxOffsetX) {
                    computedTranslateX = maxOffsetX;
                }
                else if (computedTranslateX > 0) {
                    const damp = 1 - __clamp(__easeOutQuad(1 / maxOffsetX * state.deltaX), 0, 1);
                    const newComputedX = __clamp(maxOffsetX * damp, 0, maxOffsetX);
                    computedTranslateX = maxOffsetX - newComputedX;
                }
                let translateStr = ``;
                if (finalSettings.horizontal)
                    translateStr += `translateX(${computedTranslateX}px)`;
                if (finalSettings.vertical)
                    translateStr += ` translateY(${translateY + state.deltaY}px)`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBR3hDLE9BQU8sd0JBQXdCLE1BQU0sd0NBQXdDLENBQUM7QUFFOUUsT0FBTyxRQUFRLE1BQU0sK0JBQStCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFHL0MsT0FBTyxPQUFPLE1BQU0sNEJBQTRCLENBQUM7QUFFakQsT0FBTyxhQUFhLE1BQU0sb0NBQW9DLENBQUM7QUFpQy9ELE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLElBQWlCLEVBQUUsUUFBNkI7O0lBRTlFLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sRUFBRSxHQUFHLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsbUNBQUksUUFBUSxFQUFFLENBQUM7SUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixFQUNwQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLGFBQWEsQ0FBQzs7OztLQUliLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFbEIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUVuRCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RkFBd0YsQ0FBQyxDQUFDO0tBQzdHO0lBRUQsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFOztRQUNyQixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FB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
import __traverseUp from '../traverse/up';
import __scrollTop from '../scroll/scrollTop';
import __scrollLeft from '../scroll/scrollLeft';
export default function areaStats($elm, settings) {
    const finalSettings = Object.assign({ relativeTo: 'visible' }, settings !== null && settings !== void 0 ? settings : {});
    if (finalSettings.relativeTo === 'visible') {
        finalSettings.relativeTo = __traverseUp($elm, $item => {
            const style = window.getComputedStyle($item);
            if (style.overflow === 'hidden')
                return $item;
            return false;
        });
    }
    let rootBoundingRect;
    if ((finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo) && finalSettings.relativeTo instanceof HTMLElement) {
        rootBoundingRect = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo.getBoundingClientRect();
    }
    else {
        rootBoundingRect = {
            top: __scrollTop(),
            left: __scrollLeft(),
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    }
    const boundingRect = $elm.getBoundingClientRect();
    const left = boundingRect.left - rootBoundingRect.left, top = boundingRect.top - rootBoundingRect.top;
    let percentageX, percentageY;
    // percentageX
    if (boundingRect.left + boundingRect.width < rootBoundingRect.left) {
        // fully out on left
        percentageX = 0;
    }
    else if (boundingRect.left > rootBoundingRect.left + rootBoundingRect.width) {
        // fully out on right
        percentageX = 0;
    }
    else if (boundingRect.left >= rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
        // fully inside
        percentageX = 100;
    }
    else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
        // partially outside on left and right
        percentageX = 100 / boundingRect.width * rootBoundingRect.width;
    }
    else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
        // partially inside on left
        percentageX = 100 / boundingRect.width * (boundingRect.left + boundingRect.width - rootBoundingRect.left);
    }
    else if (boundingRect.left < rootBoundingRect.left + rootBoundingRect.width && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
        // partially inside on right
        percentageX = 100 / boundingRect.width * (boundingRect.width - ((boundingRect.left + boundingRect.width) - (rootBoundingRect.left + rootBoundingRect.width)));
    }
    // percentageY
    if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
        // fully out on top
        percentageY = 0;
    }
    else if (boundingRect.top > rootBoundingRect.top + rootBoundingRect.height) {
        // fully out on bottom
        percentageY = 0;
    }
    else if (boundingRect.top >= rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
        // fully inside
        percentageY = 100;
    }
    else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
        // partially outside on top and bottom
        percentageY = 100 / boundingRect.height * rootBoundingRect.height;
    }
    else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
        // partially inside on top
        percentageY = 100 / boundingRect.height * (boundingRect.top + boundingRect.height - rootBoundingRect.top);
    }
    else if (boundingRect.top < rootBoundingRect.top + rootBoundingRect.height && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
        // partially inside on bottom
        percentageY = 100 / boundingRect.height * (boundingRect.height - ((boundingRect.top + boundingRect.height) - (rootBoundingRect.top + rootBoundingRect.height)));
    }
    const surfaceX = boundingRect.width / 100 * percentageX, surfaceY = boundingRect.height / 100 * percentageY;
    const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;
    return {
        percentage,
        percentageX: percentageY > 0 ? percentageX : 0,
        percentageY: percentageX > 0 ? percentageY : 0,
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        left: boundingRect.left,
        relLeft: left,
        top: boundingRect.top,
        relTop: top
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYVN0YXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJlYVN0YXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sWUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBd0NoRCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxJQUFpQixFQUFFLFFBQTZCO0lBRTlFLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixVQUFVLEVBQUUsU0FBUyxJQUNsQixRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUM7SUFFRixJQUFJLGFBQWEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQ3hDLGFBQWEsQ0FBQyxVQUFVLEdBQWdCLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDL0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzlDLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLGdCQUFnQixDQUFDO0lBQ3JCLElBQUksQ0FBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsVUFBVSxLQUFJLGFBQWEsQ0FBQyxVQUFVLFlBQVksV0FBVyxFQUFFO1FBQzlFLGdCQUFnQixHQUFHLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUN4RTtTQUFNO1FBQ0gsZ0JBQWdCLEdBQUc7WUFDZixHQUFHLEVBQUUsV0FBVyxFQUFFO1lBQ2xCLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FB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
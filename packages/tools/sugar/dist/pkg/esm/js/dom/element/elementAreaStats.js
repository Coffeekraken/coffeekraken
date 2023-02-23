import { __scrollLeft, __scrollTop, __traverseUp, } from '@coffeekraken/sugar/dom';
export default function __elementAreaStats($elm, settings) {
    const finalSettings = Object.assign({ relativeTo: 'visible' }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.relativeTo === 'visible') {
        finalSettings.relativeTo = __traverseUp($elm, ($item) => {
            const style = window.getComputedStyle($item);
            if (style.overflow === 'hidden')
                return $item;
            return false;
        });
    }
    let rootBoundingRect;
    if ((finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo) &&
        finalSettings.relativeTo instanceof HTMLElement) {
        rootBoundingRect = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo.getBoundingClientRect();
    }
    else {
        rootBoundingRect = {
            top: __scrollTop(),
            left: __scrollLeft(),
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
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
    else if (boundingRect.left >
        rootBoundingRect.left + rootBoundingRect.width) {
        // fully out on right
        percentageX = 0;
    }
    else if (boundingRect.left >= rootBoundingRect.left &&
        boundingRect.left + boundingRect.width <=
            rootBoundingRect.left + rootBoundingRect.width) {
        // fully inside
        percentageX = 100;
    }
    else if (boundingRect.left < rootBoundingRect.left &&
        boundingRect.left + boundingRect.width >
            rootBoundingRect.left + rootBoundingRect.width) {
        // partially outside on left and right
        percentageX = (100 / boundingRect.width) * rootBoundingRect.width;
    }
    else if (boundingRect.left < rootBoundingRect.left &&
        boundingRect.left + boundingRect.width <=
            rootBoundingRect.left + rootBoundingRect.width) {
        // partially inside on left
        percentageX =
            (100 / boundingRect.width) *
                (boundingRect.left + boundingRect.width - rootBoundingRect.left);
    }
    else if (boundingRect.left < rootBoundingRect.left + rootBoundingRect.width &&
        boundingRect.left + boundingRect.width >
            rootBoundingRect.left + rootBoundingRect.width) {
        // partially inside on right
        percentageX =
            (100 / boundingRect.width) *
                (boundingRect.width -
                    (boundingRect.left +
                        boundingRect.width -
                        (rootBoundingRect.left + rootBoundingRect.width)));
    }
    // percentageY
    if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
        // fully out on top
        percentageY = 0;
    }
    else if (boundingRect.top >
        rootBoundingRect.top + rootBoundingRect.height) {
        // fully out on bottom
        percentageY = 0;
    }
    else if (boundingRect.top >= rootBoundingRect.top &&
        boundingRect.top + boundingRect.height <=
            rootBoundingRect.top + rootBoundingRect.height) {
        // fully inside
        percentageY = 100;
    }
    else if (boundingRect.top < rootBoundingRect.top &&
        boundingRect.top + boundingRect.height >
            rootBoundingRect.top + rootBoundingRect.height) {
        // partially outside on top and bottom
        percentageY = (100 / boundingRect.height) * rootBoundingRect.height;
    }
    else if (boundingRect.top < rootBoundingRect.top &&
        boundingRect.top + boundingRect.height <=
            rootBoundingRect.top + rootBoundingRect.height) {
        // partially inside on top
        percentageY =
            (100 / boundingRect.height) *
                (boundingRect.top + boundingRect.height - rootBoundingRect.top);
    }
    else if (boundingRect.top < rootBoundingRect.top + rootBoundingRect.height &&
        boundingRect.top + boundingRect.height >
            rootBoundingRect.top + rootBoundingRect.height) {
        // partially inside on bottom
        percentageY =
            (100 / boundingRect.height) *
                (boundingRect.height -
                    (boundingRect.top +
                        boundingRect.height -
                        (rootBoundingRect.top + rootBoundingRect.height)));
    }
    const surfaceX = (boundingRect.width / 100) * percentageX, surfaceY = (boundingRect.height / 100) * percentageY;
    const percentage = percentageX > 0 && percentageY > 0
        ? (100 / 200) * (percentageX + percentageY)
        : 0;
    return {
        percentage,
        percentageX: percentageY > 0 ? percentageX : 0,
        percentageY: percentageX > 0 ? percentageY : 0,
        centerOffsetX: (rootBoundingRect.width * 0.5 - left - boundingRect.width * 0.5) *
            -1,
        centerOffsetY: (rootBoundingRect.height * 0.5 - top - boundingRect.height * 0.5) *
            -1,
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        left: boundingRect.left,
        relLeft: left,
        top: boundingRect.top,
        relTop: top,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksR0FDZixNQUFNLHlCQUF5QixDQUFDO0FBNENqQyxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUN0QyxJQUFpQixFQUNqQixRQUE2QjtJQUU3QixNQUFNLGFBQWEsR0FBRyxnQkFDbEIsVUFBVSxFQUFFLFNBQVMsSUFDbEIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksYUFBYSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDeEMsYUFBYSxDQUFDLFVBQVUsR0FBZ0IsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUM5QyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQixJQUNJLENBQUEsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFVBQVU7UUFDekIsYUFBYSxDQUFDLFVBQVUsWUFBWSxXQUFXLEVBQ2pEO1FBQ0UsZ0JBQWdCLEdBQUcsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQ3hFO1NBQU07UUFDSCxnQkFBZ0IsR0FBRztZQUNmLEdBQUcsRUFBRSxXQUFXLEVBQUU7WUFDbEIsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FDWCxRQUFRLENBQUMs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
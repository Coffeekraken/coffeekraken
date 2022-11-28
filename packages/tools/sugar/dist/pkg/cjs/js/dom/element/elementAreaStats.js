"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __elementAreaStats($elm, settings) {
    const finalSettings = Object.assign({ relativeTo: 'visible' }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.relativeTo === 'visible') {
        finalSettings.relativeTo = (0, dom_1.__traverseUp)($elm, ($item) => {
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
            top: (0, dom_1.__scrollTop)(),
            left: (0, dom_1.__scrollLeft)(),
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
exports.default = __elementAreaStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBSWlDO0FBMENqQyxTQUF3QixrQkFBa0IsQ0FDdEMsSUFBaUIsRUFDakIsUUFBNkI7SUFFN0IsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLFVBQVUsRUFBRSxTQUFTLElBQ2xCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLGFBQWEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQ3hDLGFBQWEsQ0FBQyxVQUFVLEdBQWdCLElBQUEsa0JBQVksRUFBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDOUMsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksZ0JBQWdCLENBQUM7SUFDckIsSUFDSSxDQUFBLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxVQUFVO1FBQ3pCLGFBQWEsQ0FBQyxVQUFVLFlBQVksV0FBVyxFQUNqRDtRQUNFLGdCQUFnQixHQUFHLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUN4RTtTQUFNO1FBQ0gsZ0JBQWdCLEdBQUc7WUFDZixHQUFHLEVBQUUsSUFBQSxpQkFBVyxHQUFFO1lBQ2xCLElBQUksRUFBRSxJQUFBLGtCQUFZLEdBQUU7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUN6QyxNQUFNLENBQUMsVUFB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
import { __scrollLeft } from '@coffeekraken/sugar/dom';
import __scrollTop from '../scroll/scrollTop';
import __traverseUp from '../traverse/up';
export default function areaStats($elm, settings) {
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
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        left: boundingRect.left,
        relLeft: left,
        top: boundingRect.top,
        relTop: top,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQXdDMUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQzdCLElBQWlCLEVBQ2pCLFFBQTZCO0lBRTdCLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixVQUFVLEVBQUUsU0FBUyxJQUNsQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxhQUFhLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtRQUN4QyxhQUFhLENBQUMsVUFBVSxHQUFnQixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzlDLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLGdCQUFnQixDQUFDO0lBQ3JCLElBQ0ksQ0FBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsVUFBVTtRQUN6QixhQUFhLENBQUMsVUFBVSxZQUFZLFdBQVcsRUFDakQ7UUFDRSxnQkFBZ0IsR0FBRyxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7S0FDeEU7U0FBTTtRQUNILGdCQUFnQixHQUFHO1lBQ2YsR0FBRyxFQUFFLFdBQVcsRUFBRTtZQUNsQixJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUNYLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLENBQUMsRUFDekMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQ3pCO1lBQ0QsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQ1osUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUMxQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FDMUI7U0FDSixDQUFDO0tBQ0w7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUVsRCxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFDbEQsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO0lBRWxELElBQUksV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUU3QixjQUFjO0lBQ2QsSUFBSSxZQUFZLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO1FBQ2hFLG9CQUFvQjtRQUNwQixXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO1NBQU0sSUFDSCxZQUFZLENBQUMsSUFBSTtRQUNqQixnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUNoRDtRQUNFLHFCQUFxQjtRQUNyQixXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO1NBQU0sSUFDSCxZQUFZLENBQUMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLElBQUk7UUFDMUMsWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSztZQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUNwRDtRQUNFLGVBQWU7UUFDZixXQUFXLEdBQUcsR0FBRyxDQUFDO0tBQ3JCO1NBQU0sSUFDSCxZQUFZLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUk7UUFDekMsWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSztZQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUNwRDtRQUNFLHNDQUFzQztRQUN0QyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztLQUNyRTtTQUFNLElBQ0gsWUFBWSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJO1FBQ3pDLFlBQVksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUs7WUFDbEMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFDcEQ7UUFDRSwyQkFBMkI7UUFDM0IsV0FBVztZQUNQLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hFO1NBQU0sSUFDSCxZQUFZLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLO1FBQ2xFLFlBQVksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUs7WUFDbEMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFDcEQ7UUFDRSw0QkFBNEI7UUFDNUIsV0FBVztZQUNQLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLENBQUMsWUFBWSxDQUFDLEtBQUs7b0JBQ2YsQ0FBQyxZQUFZLENBQUMsSUFBSTt3QkFDZCxZQUFZLENBQUMsS0FBSzt3QkFDbEIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsY0FBYztJQUNkLElBQUksWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtRQUNoRSxtQkFBbUI7UUFDbkIsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUNuQjtTQUFNLElBQ0gsWUFBWSxDQUFDLEdBQUc7UUFDaEIsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFDaEQ7UUFDRSxzQkFBc0I7UUFDdEIsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUNuQjtTQUFNLElBQ0gsWUFBWSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHO1FBQ3hDLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU07WUFDbEMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFDcEQ7UUFDRSxlQUFlO1FBQ2YsV0FBVyxHQUFHLEdBQUcsQ0FBQztLQUNyQjtTQUFNLElBQ0gsWUFBWSxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHO1FBQ3ZDLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU07WUFDbEMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFDcEQ7UUFDRSxzQ0FBc0M7UUFDdEMsV0FBVyxHQUFHLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7S0FDdkU7U0FBTSxJQUNILFlBQVksQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRztRQUN2QyxZQUFZLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNO1lBQ2xDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQ3BEO1FBQ0UsMEJBQTBCO1FBQzFCLFdBQVc7WUFDUCxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUMzQixDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN2RTtTQUFNLElBQ0gsWUFBWSxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsTUFBTTtRQUNqRSxZQUFZLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNO1lBQ2xDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQ3BEO1FBQ0UsNkJBQTZCO1FBQzdCLFdBQVc7WUFDUCxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUMzQixDQUFDLFlBQVksQ0FBQyxNQUFNO29CQUNoQixDQUFDLFlBQVksQ0FBQyxHQUFHO3dCQUNiLFlBQVksQ0FBQyxNQUFNO3dCQUNuQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUNyRCxRQUFRLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUV6RCxNQUFNLFVBQVUsR0FDWixXQUFXLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVaLE9BQU87UUFDSCxVQUFVO1FBQ1YsV0FBVyxFQUFFLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxXQUFXLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLEVBQUUsV0FBVyxHQUFHLENBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO1FBQ3ZCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHO1FBQ3JCLE1BQU0sRUFBRSxHQUFHO0tBQ2QsQ0FBQztBQUNOLENBQUMifQ==
import __traverseUp from '../traverse/up';
import __scrollTop from '../scroll/scrollTop';
import __scrollLeft from '../scroll/scrollLeft';
export default function visibleSurface($elm, settings = {}) {
    let $overflowParent = __traverseUp($elm, $item => {
        const style = window.getComputedStyle($item);
        if (style.overflow === 'hidden')
            return $item;
        return false;
    });
    let rootBoundingRect;
    if ($overflowParent) {
        rootBoundingRect = $overflowParent.getBoundingClientRect();
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
    if (boundingRect.top < rootBoundingRect.top) {
        percentageY = 100 / boundingRect.height * (rootBoundingRect.top - boundingRect.top);
    }
    else if (top + boundingRect.height < rootBoundingRect.height) {
        percentageY = 100;
    }
    else if (top + boundingRect.height > rootBoundingRect.height) {
        percentageY = 100 / boundingRect.height * (rootBoundingRect.height - top);
        if (percentageY < 0)
            percentageY = 0;
    }
    else if (top > rootBoundingRect.height || top < rootBoundingRect.height * -1) {
        percentageY = 0;
    }
    else {
        const offsetY = boundingRect.height - top;
        percentageY = 100 - Math.abs(100 / rootBoundingRect.height * (rootBoundingRect.height - offsetY));
    }
    if (boundingRect.left < rootBoundingRect.left) {
        percentageX = 100 / boundingRect.width * (rootBoundingRect.left - boundingRect.left);
    }
    else if (left + boundingRect.width < rootBoundingRect.width) {
        percentageX = 100;
    }
    else if (left + boundingRect.width > rootBoundingRect.width) {
        percentageX = 100 / boundingRect.width * (rootBoundingRect.width - left);
        if (percentageX < 0)
            percentageX = 0;
    }
    else if (left > rootBoundingRect.width || left < rootBoundingRect.width * -1) {
        percentageX = 0;
    }
    else {
        const offsetY = boundingRect.width - left;
        percentageX = 100 - Math.abs(100 / rootBoundingRect.width * (rootBoundingRect.width - offsetY));
    }
    const surfaceX = boundingRect.width / 100 * percentageX, surfaceY = boundingRect.height / 100 * percentageY;
    const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;
    return {
        percentage,
        percentageX: percentageY > 0 ? percentageX : 0,
        percentageY: percentageX > 0 ? percentageY : 0,
        width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
        height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
        x: percentageX > 0 && percentageY > 0 ? left : undefined,
        y: percentageX > 0 && percentageY > 0 ? top : undefined
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZVN1cmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXNpYmxlU3VyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSxzQkFBc0IsQ0FBQztBQXFDaEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsSUFBaUIsRUFBRSxXQUFxQyxFQUFFO0lBQzdGLElBQUksZUFBZSxHQUFnQixZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzFELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQixJQUFJLGVBQWUsRUFBRTtRQUNqQixnQkFBZ0IsR0FBRyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUM5RDtTQUFNO1FBQ0gsZ0JBQWdCLEdBQUc7WUFDZixHQUFHLEVBQUUsV0FBVyxFQUFFO1lBQ2xCLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUN4RixDQUFBO0tBQ0o7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJ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V0FBVyxDQUFDO0lBRXZELE1BQU0sVUFBVSxHQUFHLFdBQVcsR0FBRyxDQUFDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBHLE9BQU87UUFDSCxVQUFVO1FBQ1YsV0FBVyxFQUFFLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxXQUFXLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLEVBQUUsV0FBVyxHQUFHLENBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3hELENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztLQUMxRCxDQUFDO0FBQ04sQ0FBQyJ9
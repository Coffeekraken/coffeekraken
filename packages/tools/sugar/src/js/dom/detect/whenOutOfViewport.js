// @ts-nocheck
import __isInViewport from './isInViewport';
import __throttle from '../../shared/function/throttle';
import __closest from './query/closest';
// TODO tests
/**
 * @name      whenOutOfViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @stable
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{Number} 					[offset=50] 		An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
 * whenOutOfViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenOutOfViewport(elm, offset = 50) {
    return new Promise((resolve, reject) => {
        if (window.IntersectionObserver) {
            let isInViewport = false;
            const _cb = () => {
                if (!isInViewport) {
                    observer.disconnect();
                    resolve(elm);
                }
            };
            const observer = new IntersectionObserver((entries, observer) => {
                if (!entries.length)
                    return;
                const entry = entries[0];
                if (entry.intersectionRatio > 0) {
                    isInViewport = true;
                }
                else {
                    isInViewport = false;
                }
                _cb();
            }, {
                root: null,
                rootMargin: `${offset}px`,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            });
            observer.observe(elm);
        }
        else {
            // try to get the closest element that has an overflow
            let scrollContainerElm = document;
            if (!elm._inViewportContainer) {
                const overflowContainer = __closest(elm, '[data-in-viewport-container]');
                if (overflowContainer) {
                    scrollContainerElm = overflowContainer;
                    elm._inViewportContainer = overflowContainer;
                }
            }
            else {
                scrollContainerElm = elm._inViewportContainer;
            }
            let isInViewport = true;
            const _cb = () => {
                if (!isInViewport) {
                    scrollContainerElm.removeEventListener('scroll', checkViewport);
                    window.removeEventListener('resize', checkViewport);
                    resolve(elm);
                }
            };
            const checkViewport = __throttle((e) => {
                isInViewport = __isInViewport(elm, offset);
                _cb();
            }, 100);
            // listen for resize
            scrollContainerElm.addEventListener('scroll', checkViewport);
            window.addEventListener('resize', checkViewport);
            setTimeout(() => {
                checkViewport(null);
            });
        }
    });
}
export default whenOutOfViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxVQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFeEMsYUFBYTtBQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsRUFBRTtJQUN6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLElBQUksTUFBTSxDQUFDLG9CQUFvQixFQUFFO1lBQy9CLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztZQUN6QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakIsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUN2QyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUMvQixZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDTCxZQUFZLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjtnQkFDRCxHQUFHLEVBQUUsQ0FBQztZQUNSLENBQUMsRUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixVQUFVLEVBQUUsR0FBRyxNQUFNLElBQUk7Z0JBQ3pCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDL0QsQ0FDRixDQUFDO1lBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsc0RBQXNEO1lBQ3RELElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUNqQyxHQUFHLEVBQ0gsOEJBQThCLENBQy9CLENBQUM7Z0JBQ0YsSUFBSSxpQkFBaUIsRUFBRTtvQkFDckIsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7b0JBQ3ZDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztpQkFDOUM7YUFDRjtpQkFBTTtnQkFDTCxrQkFBa0IsR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDL0M7WUFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDeEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDaEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxHQUFHLEVBQUUsQ0FBQztZQUNSLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVSLG9CQUFvQjtZQUNwQixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9
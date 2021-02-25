// @ts-nocheck
import __isInViewport from './isInViewport';
import __throttle from '../function/throttle';
import __closest from './closest';
// TODO tests
/**
 * @name      whenOutOfViewport
 * @namespace           sugar.js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBRWxDLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUU7SUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtZQUMvQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDdkMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDL0IsWUFBWSxHQUFHLElBQUksQ0FBQztpQkFDckI7cUJBQU07b0JBQ0wsWUFBWSxHQUFHLEtBQUssQ0FBQztpQkFDdEI7Z0JBQ0QsR0FBRyxFQUFFLENBQUM7WUFDUixDQUFDLEVBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsVUFBVSxFQUFFLEdBQUcsTUFBTSxJQUFJO2dCQUN6QixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQy9ELENBQ0YsQ0FBQztZQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLHNEQUFzRDtZQUN0RCxJQUFJLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FDakMsR0FBRyxFQUNILDhCQUE4QixDQUMvQixDQUFDO2dCQUNGLElBQUksaUJBQWlCLEVBQUU7b0JBQ3JCLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO29CQUN2QyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUM7aUJBQzlDO2FBQ0Y7aUJBQU07Z0JBQ0wsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQy9DO1lBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ2hFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQztZQUNGLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxZQUFZLEdBQUcsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDM0MsR0FBRyxFQUFFLENBQUM7WUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFUixvQkFBb0I7WUFDcEIsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==
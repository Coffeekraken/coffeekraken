// @ts-nocheck
import __isInViewport from './isInViewport';
import __throttle from '../../shared/function/throttle';
import __closest from './query/closest';
function whenOutOfViewport(elm, settings = {}) {
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
                rootMargin: `${settings.offset}px`,
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
                isInViewport = __isInViewport(elm, settings.offset);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxVQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUF3Q3hDLFNBQVMsaUJBQWlCLENBQUMsR0FBZ0IsRUFBRSxXQUFnRCxFQUFFO0lBQzdGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7WUFDL0IsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQ3ZDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQUUsT0FBTztnQkFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQy9CLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNMLFlBQVksR0FBRyxLQUFLLENBQUM7aUJBQ3RCO2dCQUNELEdBQUcsRUFBRSxDQUFDO1lBQ1IsQ0FBQyxFQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUk7Z0JBQ2xDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDL0QsQ0FDRixDQUFDO1lBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsc0RBQXNEO1lBQ3RELElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUNqQyxHQUFHLEVBQ0gsOEJBQThCLENBQy9CLENBQUM7Z0JBQ0YsSUFBSSxpQkFBaUIsRUFBRTtvQkFDckIsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7b0JBQ3ZDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztpQkFDOUM7YUFDRjtpQkFBTTtnQkFDTCxrQkFBa0IsR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDL0M7WUFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDeEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDaEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxFQUFFLENBQUM7WUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFUixvQkFBb0I7WUFDcEIsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==
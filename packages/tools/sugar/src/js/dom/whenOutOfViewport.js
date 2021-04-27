// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isInViewport", "../../shared/function/throttle", "./closest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const isInViewport_1 = __importDefault(require("./isInViewport"));
    const throttle_1 = __importDefault(require("../../shared/function/throttle"));
    const closest_1 = __importDefault(require("./closest"));
    // TODO tests
    /**
     * @name      whenOutOfViewport
     * @namespace            js.dom
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
                    const overflowContainer = closest_1.default(elm, '[data-in-viewport-container]');
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
                const checkViewport = throttle_1.default((e) => {
                    isInViewport = isInViewport_1.default(elm, offset);
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
    exports.default = whenOutOfViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBNEM7SUFDNUMsOEVBQXdEO0lBQ3hELHdEQUFrQztJQUVsQyxhQUFhO0lBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7Z0JBQy9CLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2pCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUN2QyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO3dCQUFFLE9BQU87b0JBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO3dCQUMvQixZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUNyQjt5QkFBTTt3QkFDTCxZQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUN0QjtvQkFDRCxHQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLEVBQ0Q7b0JBQ0UsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFFLEdBQUcsTUFBTSxJQUFJO29CQUN6QixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUMvRCxDQUNGLENBQUM7Z0JBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxzREFBc0Q7Z0JBQ3RELElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixNQUFNLGlCQUFpQixHQUFHLGlCQUFTLENBQ2pDLEdBQUcsRUFDSCw4QkFBOEIsQ0FDL0IsQ0FBQztvQkFDRixJQUFJLGlCQUFpQixFQUFFO3dCQUNyQixrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQzt3QkFDdkMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDO3FCQUM5QztpQkFDRjtxQkFBTTtvQkFDTCxrQkFBa0IsR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUM7aUJBQy9DO2dCQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDeEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2pCLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQzt3QkFDaEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQzt3QkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQztnQkFDRixNQUFNLGFBQWEsR0FBRyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3JDLFlBQVksR0FBRyxzQkFBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDM0MsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVSLG9CQUFvQjtnQkFDcEIsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGlCQUFpQixDQUFDIn0=
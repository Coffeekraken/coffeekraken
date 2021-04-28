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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3doZW5PdXRPZlZpZXdwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUE0QztJQUM1Qyw4RUFBd0Q7SUFDeEQsd0RBQWtDO0lBRWxDLGFBQWE7SUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtnQkFDL0IsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDakIsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Q7Z0JBQ0gsQ0FBQyxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQ3ZDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07d0JBQUUsT0FBTztvQkFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7d0JBQy9CLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLFlBQVksR0FBRyxLQUFLLENBQUM7cUJBQ3RCO29CQUNELEdBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsRUFDRDtvQkFDRSxJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsR0FBRyxNQUFNLElBQUk7b0JBQ3pCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQy9ELENBQ0YsQ0FBQztnQkFFRixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLHNEQUFzRDtnQkFDdEQsSUFBSSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7b0JBQzdCLE1BQU0saUJBQWlCLEdBQUcsaUJBQVMsQ0FDakMsR0FBRyxFQUNILDhCQUE4QixDQUMvQixDQUFDO29CQUNGLElBQUksaUJBQWlCLEVBQUU7d0JBQ3JCLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO3dCQUN2QyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUM7cUJBQzlDO2lCQUNGO3FCQUFNO29CQUNMLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDL0M7Z0JBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDakIsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUNoRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Q7Z0JBQ0gsQ0FBQyxDQUFDO2dCQUNGLE1BQU0sYUFBYSxHQUFHLGtCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDckMsWUFBWSxHQUFHLHNCQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUMzQyxHQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRVIsb0JBQW9CO2dCQUNwQixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pELFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==
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
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var throttle_1 = __importDefault(require("../../shared/function/throttle"));
    var closest_1 = __importDefault(require("./closest"));
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
    function whenOutOfViewport(elm, offset) {
        if (offset === void 0) { offset = 50; }
        return new Promise(function (resolve, reject) {
            if (window.IntersectionObserver) {
                var isInViewport_2 = false;
                var _cb_1 = function () {
                    if (!isInViewport_2) {
                        observer_1.disconnect();
                        resolve(elm);
                    }
                };
                var observer_1 = new IntersectionObserver(function (entries, observer) {
                    if (!entries.length)
                        return;
                    var entry = entries[0];
                    if (entry.intersectionRatio > 0) {
                        isInViewport_2 = true;
                    }
                    else {
                        isInViewport_2 = false;
                    }
                    _cb_1();
                }, {
                    root: null,
                    rootMargin: offset + "px",
                    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                });
                observer_1.observe(elm);
            }
            else {
                // try to get the closest element that has an overflow
                var scrollContainerElm_1 = document;
                if (!elm._inViewportContainer) {
                    var overflowContainer = closest_1.default(elm, '[data-in-viewport-container]');
                    if (overflowContainer) {
                        scrollContainerElm_1 = overflowContainer;
                        elm._inViewportContainer = overflowContainer;
                    }
                }
                else {
                    scrollContainerElm_1 = elm._inViewportContainer;
                }
                var isInViewport_3 = true;
                var _cb_2 = function () {
                    if (!isInViewport_3) {
                        scrollContainerElm_1.removeEventListener('scroll', checkViewport_1);
                        window.removeEventListener('resize', checkViewport_1);
                        resolve(elm);
                    }
                };
                var checkViewport_1 = throttle_1.default(function (e) {
                    isInViewport_3 = isInViewport_1.default(elm, offset);
                    _cb_2();
                }, 100);
                // listen for resize
                scrollContainerElm_1.addEventListener('scroll', checkViewport_1);
                window.addEventListener('resize', checkViewport_1);
                setTimeout(function () {
                    checkViewport_1(null);
                });
            }
        });
    }
    exports.default = whenOutOfViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxnRUFBNEM7SUFDNUMsNEVBQXdEO0lBQ3hELHNEQUFrQztJQUVsQyxhQUFhO0lBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE1BQVc7UUFBWCx1QkFBQSxFQUFBLFdBQVc7UUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dCQUMvQixJQUFJLGNBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQU0sS0FBRyxHQUFHO29CQUNWLElBQUksQ0FBQyxjQUFZLEVBQUU7d0JBQ2pCLFVBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQztnQkFFRixJQUFNLFVBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUN2QyxVQUFDLE9BQU8sRUFBRSxRQUFRO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07d0JBQUUsT0FBTztvQkFDNUIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7d0JBQy9CLGNBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLGNBQVksR0FBRyxLQUFLLENBQUM7cUJBQ3RCO29CQUNELEtBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsRUFDRDtvQkFDRSxJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUssTUFBTSxPQUFJO29CQUN6QixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUMvRCxDQUNGLENBQUM7Z0JBRUYsVUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxzREFBc0Q7Z0JBQ3RELElBQUksb0JBQWtCLEdBQUcsUUFBUSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixJQUFNLGlCQUFpQixHQUFHLGlCQUFTLENBQ2pDLEdBQUcsRUFDSCw4QkFBOEIsQ0FDL0IsQ0FBQztvQkFDRixJQUFJLGlCQUFpQixFQUFFO3dCQUNyQixvQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQzt3QkFDdkMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDO3FCQUM5QztpQkFDRjtxQkFBTTtvQkFDTCxvQkFBa0IsR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUM7aUJBQy9DO2dCQUVELElBQUksY0FBWSxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBTSxLQUFHLEdBQUc7b0JBQ1YsSUFBSSxDQUFDLGNBQVksRUFBRTt3QkFDakIsb0JBQWtCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxDQUFDO3dCQUNoRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxDQUFDO3dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Q7Z0JBQ0gsQ0FBQyxDQUFDO2dCQUNGLElBQU0sZUFBYSxHQUFHLGtCQUFVLENBQUMsVUFBQyxDQUFDO29CQUNqQyxjQUFZLEdBQUcsc0JBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzNDLEtBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFUixvQkFBb0I7Z0JBQ3BCLG9CQUFrQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQztnQkFDakQsVUFBVSxDQUFDO29CQUNULGVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGlCQUFpQixDQUFDIn0=
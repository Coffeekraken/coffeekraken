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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vd2hlbk91dE9mVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0VBQTRDO0lBQzVDLDRFQUF3RDtJQUN4RCxzREFBa0M7SUFFbEMsYUFBYTtJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFXO1FBQVgsdUJBQUEsRUFBQSxXQUFXO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtnQkFDL0IsSUFBSSxjQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFNLEtBQUcsR0FBRztvQkFDVixJQUFJLENBQUMsY0FBWSxFQUFFO3dCQUNqQixVQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUM7Z0JBRUYsSUFBTSxVQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDdkMsVUFBQyxPQUFPLEVBQUUsUUFBUTtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO3dCQUFFLE9BQU87b0JBQzVCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO3dCQUMvQixjQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUNyQjt5QkFBTTt3QkFDTCxjQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUN0QjtvQkFDRCxLQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLEVBQ0Q7b0JBQ0UsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFLLE1BQU0sT0FBSTtvQkFDekIsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDL0QsQ0FDRixDQUFDO2dCQUVGLFVBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsc0RBQXNEO2dCQUN0RCxJQUFJLG9CQUFrQixHQUFHLFFBQVEsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDN0IsSUFBTSxpQkFBaUIsR0FBRyxpQkFBUyxDQUNqQyxHQUFHLEVBQ0gsOEJBQThCLENBQy9CLENBQUM7b0JBQ0YsSUFBSSxpQkFBaUIsRUFBRTt3QkFDckIsb0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7d0JBQ3ZDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztxQkFDOUM7aUJBQ0Y7cUJBQU07b0JBQ0wsb0JBQWtCLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2lCQUMvQztnQkFFRCxJQUFJLGNBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQU0sS0FBRyxHQUFHO29CQUNWLElBQUksQ0FBQyxjQUFZLEVBQUU7d0JBQ2pCLG9CQUFrQixDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQzt3QkFDaEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQzt3QkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQztnQkFDRixJQUFNLGVBQWEsR0FBRyxrQkFBVSxDQUFDLFVBQUMsQ0FBQztvQkFDakMsY0FBWSxHQUFHLHNCQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUMzQyxLQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRVIsb0JBQW9CO2dCQUNwQixvQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZUFBYSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZUFBYSxDQUFDLENBQUM7Z0JBQ2pELFVBQVUsQ0FBQztvQkFDVCxlQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9
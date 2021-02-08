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
        define(["require", "exports", "./isInViewport", "../function/throttle", "./closest"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var throttle_1 = __importDefault(require("../function/throttle"));
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
    return whenOutOfViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbk91dE9mVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuT3V0T2ZWaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUE0QztJQUM1QyxrRUFBOEM7SUFDOUMsc0RBQWtDO0lBRWxDLGFBQWE7SUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsTUFBVztRQUFYLHVCQUFBLEVBQUEsV0FBVztRQUN6QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7Z0JBQy9CLElBQUksY0FBWSxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBTSxLQUFHLEdBQUc7b0JBQ1YsSUFBSSxDQUFDLGNBQVksRUFBRTt3QkFDakIsVUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Q7Z0JBQ0gsQ0FBQyxDQUFDO2dCQUVGLElBQU0sVUFBUSxHQUFHLElBQUksb0JBQW9CLENBQ3ZDLFVBQUMsT0FBTyxFQUFFLFFBQVE7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTt3QkFBRSxPQUFPO29CQUM1QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTt3QkFDL0IsY0FBWSxHQUFHLElBQUksQ0FBQztxQkFDckI7eUJBQU07d0JBQ0wsY0FBWSxHQUFHLEtBQUssQ0FBQztxQkFDdEI7b0JBQ0QsS0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxFQUNEO29CQUNFLElBQUksRUFBRSxJQUFJO29CQUNWLFVBQVUsRUFBSyxNQUFNLE9BQUk7b0JBQ3pCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQy9ELENBQ0YsQ0FBQztnQkFFRixVQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLHNEQUFzRDtnQkFDdEQsSUFBSSxvQkFBa0IsR0FBRyxRQUFRLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7b0JBQzdCLElBQU0saUJBQWlCLEdBQUcsaUJBQVMsQ0FDakMsR0FBRyxFQUNILDhCQUE4QixDQUMvQixDQUFDO29CQUNGLElBQUksaUJBQWlCLEVBQUU7d0JBQ3JCLG9CQUFrQixHQUFHLGlCQUFpQixDQUFDO3dCQUN2QyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUM7cUJBQzlDO2lCQUNGO3FCQUFNO29CQUNMLG9CQUFrQixHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDL0M7Z0JBRUQsSUFBSSxjQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFNLEtBQUcsR0FBRztvQkFDVixJQUFJLENBQUMsY0FBWSxFQUFFO3dCQUNqQixvQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsZUFBYSxDQUFDLENBQUM7d0JBQ2hFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsZUFBYSxDQUFDLENBQUM7d0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUM7Z0JBQ0YsSUFBTSxlQUFhLEdBQUcsa0JBQVUsQ0FBQyxVQUFDLENBQUM7b0JBQ2pDLGNBQVksR0FBRyxzQkFBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDM0MsS0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVSLG9CQUFvQjtnQkFDcEIsb0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxDQUFDO2dCQUNqRCxVQUFVLENBQUM7b0JBQ1QsZUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBUyxpQkFBaUIsQ0FBQyJ9
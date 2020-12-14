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
//# sourceMappingURL=module.js.map
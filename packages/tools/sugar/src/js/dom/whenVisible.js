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
        define(["require", "exports", "./isVisible", "./closestNotVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isVisible_1 = __importDefault(require("./isVisible"));
    var closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
    /**
     * @name      whenVisible
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Monitor an HTMLElement to be notified when it is visible
     *
     * @param 		{HTMLElement} 				elm 		The element to monitor
     * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
     * @return 		(Promise) 								The promise that will be resolved when the element is visible
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
     * whenVisible(myCoolHTMLElement).then((elm) => {
     * 		// do something with your element that is now visible
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function whenVisible(elm, cb) {
        if (cb === void 0) { cb = null; }
        return new Promise(function (resolve, reject) {
            // variables
            var isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
            var _cb = function () {
                if (isSelfVisible && areParentsVisible) {
                    // process callbacks
                    if (cb)
                        cb(elm);
                    resolve(elm);
                    // remove the event listeners
                    elm.removeEventListener('transitionend', _eventCb);
                    elm.removeEventListener('animationstart', _eventCb);
                    elm.removeEventListener('animationend', _eventCb);
                    // remove the event listeners
                    if (closestNotVisible) {
                        closestNotVisible.removeEventListener('transitionend', _eventCb);
                        closestNotVisible.removeEventListener('animationstart', _eventCb);
                        closestNotVisible.removeEventListener('animationend', _eventCb);
                    }
                }
            };
            // function called on each transitionend, start, etc...
            var _eventCb = function (e) {
                // wait just a little time to check again
                setTimeout(function () {
                    if (e.target === elm) {
                        if (isVisible_1.default(elm)) {
                            isSelfVisible = true;
                            if (selfObserver && selfObserver.disconnect) {
                                selfObserver.disconnect();
                            }
                            // remove the event listeners
                            elm.removeEventListener('transitionend', _eventCb);
                            elm.removeEventListener('animationstart', _eventCb);
                            elm.removeEventListener('animationend', _eventCb);
                        }
                    }
                    else if (e.target === closestNotVisible) {
                        if (isVisible_1.default(closestNotVisible)) {
                            areParentsVisible = true;
                            if (parentObserver && parentObserver.disconnect) {
                                parentObserver.disconnect();
                            }
                            // remove the event listeners
                            closestNotVisible.removeEventListener('transitionend', _eventCb);
                            closestNotVisible.removeEventListener('animationstart', _eventCb);
                            closestNotVisible.removeEventListener('animationend', _eventCb);
                        }
                    }
                    // callback
                    _cb();
                });
            };
            // check if element itself is not visible
            if (!isVisible_1.default(elm)) {
                selfObserver = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        // check that is the style whos changed
                        if (mutation.attributeName === 'style' ||
                            mutation.attributeName === 'class') {
                            // check if is visible
                            if (isVisible_1.default(mutation.target)) {
                                // update
                                isSelfVisible = true;
                                // callback
                                _cb();
                                // stop observe
                                selfObserver.disconnect();
                            }
                        }
                    });
                });
                selfObserver.observe(elm, { attributes: true });
                // listen for animationstart to check if the element is visible
                elm.addEventListener('animationstart', _eventCb);
                elm.addEventListener('animationend', _eventCb);
                elm.addEventListener('transitionend', _eventCb);
            }
            else {
                isSelfVisible = true;
            }
            // get the closest not visible element
            // if found, we monitor it to check when it is visible
            closestNotVisible = closestNotVisible_1.default(elm);
            if (closestNotVisible) {
                parentObserver = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        // check that is the style whos changed
                        if (mutation.attributeName === 'style' ||
                            mutation.attributeName === 'class') {
                            // check if is visible
                            if (isVisible_1.default(mutation.target)) {
                                // update
                                areParentsVisible = true;
                                // callback
                                _cb();
                                // stop observe
                                parentObserver.disconnect();
                            }
                        }
                    });
                });
                parentObserver.observe(closestNotVisible, { attributes: true });
                // listen for animationstart to check if the element is visible
                closestNotVisible.addEventListener('animationstart', _eventCb);
                closestNotVisible.addEventListener('animationend', _eventCb);
                closestNotVisible.addEventListener('transitionend', _eventCb);
            }
            else {
                areParentsVisible = true;
            }
            // callback
            _cb();
        });
    }
    return whenVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFzQztJQUN0QywwRUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFTO1FBQVQsbUJBQUEsRUFBQSxTQUFTO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxZQUFZO1lBQ1osSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUN2QixpQkFBaUIsR0FBRyxLQUFLLEVBQ3pCLGlCQUFpQixHQUFHLElBQUksRUFDeEIsWUFBWSxHQUFHLElBQUksRUFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztZQUV4QixJQUFNLEdBQUcsR0FBRztnQkFDVixJQUFJLGFBQWEsSUFBSSxpQkFBaUIsRUFBRTtvQkFDdEMsb0JBQW9CO29CQUNwQixJQUFJLEVBQUU7d0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2IsNkJBQTZCO29CQUM3QixHQUFHLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xELDZCQUE2QjtvQkFDN0IsSUFBSSxpQkFBaUIsRUFBRTt3QkFDckIsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUNqRSxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFD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
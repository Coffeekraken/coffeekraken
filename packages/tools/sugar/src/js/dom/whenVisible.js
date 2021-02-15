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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = whenVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwREFBc0M7SUFDdEMsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBUztRQUFULG1CQUFBLEVBQUEsU0FBUztRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsWUFBWTtZQUNaLElBQUksYUFBYSxHQUFHLEtBQUssRUFDdkIsaUJBQWlCLEdBQUcsS0FBSyxFQUN6QixpQkFBaUIsR0FBRyxJQUFJLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEVBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFFeEIsSUFBTSxHQUFHLEdBQUc7Z0JBQ1YsSUFBSSxhQUFhLElBQUksaUJBQWlCLEVBQUU7b0JBQ3RDLG9CQUFvQjtvQkFDcEIsSUFBSSxFQUFFO3dCQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNiLDZCQUE2QjtvQkFDN0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNwRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCw2QkFBNkI7b0JBQzdCLElBQUksaUJBQWlCLEVBQUU7d0JBQ3JCLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDakUsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JB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
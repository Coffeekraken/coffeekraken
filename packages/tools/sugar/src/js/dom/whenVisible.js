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
    const isVisible_1 = __importDefault(require("./isVisible"));
    const closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
    /**
     * @name      whenVisible
     * @namespace            js.dom
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
    function whenVisible(elm, cb = null) {
        return new Promise((resolve, reject) => {
            // variables
            let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
            const _cb = () => {
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
            const _eventCb = (e) => {
                // wait just a little time to check again
                setTimeout(() => {
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
                selfObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
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
                parentObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBc0M7SUFDdEMsNEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUk7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxZQUFZO1lBQ1osSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUN2QixpQkFBaUIsR0FBRyxLQUFLLEVBQ3pCLGlCQUFpQixHQUFHLElBQUksRUFDeEIsWUFBWSxHQUFHLElBQUksRUFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztZQUV4QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxhQUFhLElBQUksaUJBQWlCLEVBQUU7b0JBQ3RDLG9CQUFvQjtvQkFDcEIsSUFBSSxFQUFFO3dCQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNiLDZCQUE2QjtvQkFDN0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNwRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCw2QkFBNkI7b0JBQzdCLElBQUksaUJBQWlCLEVBQUU7d0JBQ3JCLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDakUsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFD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
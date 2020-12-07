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
//# sourceMappingURL=whenVisible.js.map
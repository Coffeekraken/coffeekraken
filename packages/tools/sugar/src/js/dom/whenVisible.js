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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3doZW5WaXNpYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUFzQztJQUN0Qyw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFlBQVk7WUFDWixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQ3ZCLGlCQUFpQixHQUFHLEtBQUssRUFDekIsaUJBQWlCLEdBQUcsSUFBSSxFQUN4QixZQUFZLEdBQUcsSUFBSSxFQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO1lBRXhCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLGFBQWEsSUFBSSxpQkFBaUIsRUFBRTtvQkFDdEMsb0JBQW9CO29CQUNwQixJQUFJLEVBQUU7d0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2IsNkJBQTZCO29CQUM3QixHQUFHLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xELDZCQUE2QjtvQkFDN0IsSUFBSSxpQkFBaUIsRUFBRTt3QkFDckIsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFFBQVEs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
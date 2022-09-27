"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name      whenVisible
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          stable
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				$elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element is visible
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenVisible } from '@coffeekraken/sugar/js/dom/whenVisible'
 * __whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenVisible($elm, cb = null) {
    return new Promise((resolve, reject) => {
        // variables
        let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
        const _cb = () => {
            var _a, _b;
            if (isSelfVisible) {
                (_a = selfObserver === null || selfObserver === void 0 ? void 0 : selfObserver.disconnect) === null || _a === void 0 ? void 0 : _a.call(selfObserver);
                // remove the event listeners
                $elm.removeEventListener('transitionend', _eventCb);
                $elm.removeEventListener('animationstart', _eventCb);
                $elm.removeEventListener('animationend', _eventCb);
            }
            if (areParentsVisible) {
                (_b = parentObserver === null || parentObserver === void 0 ? void 0 : parentObserver.disconnect) === null || _b === void 0 ? void 0 : _b.call(parentObserver);
                // remove the event listeners
                if (closestNotVisible) {
                    closestNotVisible.removeEventListener('transitionend', _eventCb);
                    closestNotVisible.removeEventListener('animationstart', _eventCb);
                    closestNotVisible.removeEventListener('animationend', _eventCb);
                }
            }
            if (isSelfVisible && areParentsVisible) {
                // process callbacks
                cb === null || cb === void 0 ? void 0 : cb($elm);
                resolve($elm);
                // remove the event listeners
                $elm.removeEventListener('transitionend', _eventCb);
                $elm.removeEventListener('animationstart', _eventCb);
                $elm.removeEventListener('animationend', _eventCb);
            }
        };
        // function called on each transitionend, start, etc...
        const _eventCb = (e) => {
            // update status
            isSelfVisible = (0, dom_1.__isVisible)($elm);
            if (closestNotVisible) {
                areParentsVisible = (0, dom_1.__isVisible)(closestNotVisible);
            }
            // callback
            _cb($elm);
        };
        // check if element itself is not visible
        if (!(0, dom_1.__isVisible)($elm)) {
            selfObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if ((0, dom_1.__isVisible)(mutation.target)) {
                            // update
                            isSelfVisible = true;
                            // callback
                            _cb($elm);
                            // stop observe
                            selfObserver.disconnect();
                        }
                    }
                });
            });
            selfObserver.observe($elm, { attributes: true });
            // listen for animationstart to check if the element is visible
            $elm.addEventListener('animationstart', _eventCb);
            $elm.addEventListener('animationend', _eventCb);
            $elm.addEventListener('transitionend', _eventCb);
        }
        else {
            isSelfVisible = true;
        }
        // get the closest not visible element
        // if found, we monitor it to check when it is visible
        closestNotVisible = (0, dom_1.__closestNotVisible)($elm);
        if (closestNotVisible) {
            parentObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if ((0, dom_1.__isVisible)(mutation.target)) {
                            // update
                            areParentsVisible = true;
                            // callback
                            _cb($elm);
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
        _cb($elm);
    });
}
exports.default = __whenVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUEyRTtBQUUzRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBd0IsYUFBYSxDQUNqQyxJQUFpQixFQUNqQixLQUFlLElBQUk7SUFFbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxZQUFZO1FBQ1osSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUNyQixpQkFBaUIsR0FBRyxLQUFLLEVBQ3pCLGlCQUFpQixHQUFHLElBQUksRUFDeEIsWUFBWSxHQUFHLElBQUksRUFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUxQixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7O1lBQ2IsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsTUFBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsVUFBVSw0REFBSSxDQUFDO2dCQUM3Qiw2QkFBNkI7Z0JBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLE1BQUEsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFVBQVUsOERBQUksQ0FBQztnQkFDL0IsNkJBQTZCO2dCQUM3QixJQUFJLGlCQUFpQixFQUFFO29CQUNuQixpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FDakMsZUFBZSxFQUNmLFFBQVEsQ0FDWCxDQUFDO29CQUNGLGlCQUFpQixDQUFDLG1CQUFtQixDQUNqQyxnQkFBZ0IsRUFDaEIs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
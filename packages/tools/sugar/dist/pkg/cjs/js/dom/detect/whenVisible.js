"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const visible_1 = __importDefault(require("../is/visible"));
const closestNotVisible_1 = __importDefault(require("../query/closestNotVisible"));
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
 * import __whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
 * __whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenVisible($elm, cb = null) {
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
            isSelfVisible = (0, visible_1.default)($elm);
            if (closestNotVisible) {
                areParentsVisible = (0, visible_1.default)(closestNotVisible);
            }
            // callback
            _cb($elm);
        };
        // check if element itself is not visible
        if (!(0, visible_1.default)($elm)) {
            selfObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if ((0, visible_1.default)(mutation.target)) {
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
        closestNotVisible = (0, closestNotVisible_1.default)($elm);
        if (closestNotVisible) {
            parentObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if ((0, visible_1.default)(mutation.target)) {
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
exports.default = whenVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUF3QztBQUN4QyxtRkFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLFdBQVcsQ0FDL0IsSUFBaUIsRUFDakIsS0FBZSxJQUFJO0lBRW5CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsWUFBWTtRQUNaLElBQUksYUFBYSxHQUFHLEtBQUssRUFDckIsaUJBQWlCLEdBQUcsS0FBSyxFQUN6QixpQkFBaUIsR0FBRyxJQUFJLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEVBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFOztZQUNiLElBQUksYUFBYSxFQUFFO2dCQUNmLE1BQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFVBQVUsNERBQUksQ0FBQztnQkFDN0IsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDdEQ7WUFFRCxJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxVQUFVLDhEQUFJLENBQUM7Z0JBQy9CLDZCQUE2QjtnQkFDN0IsSUFBSSxpQkFBaUIsRUFBRTtvQkFDbkIsaUJBQWlCLENBQUMsbUJBQW1CLENBQ2pDLGVBQWUsRUFDZixRQUFRLENBQ1gsQ0FBQztvQkFDRixpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FD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
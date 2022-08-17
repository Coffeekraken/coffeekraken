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
 * @param 		{HTMLElement} 				elm 		The element to monitor
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
                    if ((0, visible_1.default)(elm)) {
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
                    if ((0, visible_1.default)(closestNotVisible)) {
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
                _cb($elm);
            });
        };
        // check if element itself is not visible
        if (!(0, visible_1.default)(elm)) {
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
        closestNotVisible = (0, closestNotVisible_1.default)(elm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUF3QztBQUN4QyxtRkFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLFdBQVcsQ0FDL0IsR0FBZ0IsRUFDaEIsS0FBZSxJQUFJO0lBRW5CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsWUFBWTtRQUNaLElBQUksYUFBYSxHQUFHLEtBQUssRUFDckIsaUJBQWlCLEdBQUcsS0FBSyxFQUN6QixpQkFBaUIsR0FBRyxJQUFJLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEVBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2IsSUFBSSxhQUFhLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3BDLG9CQUFvQjtnQkFDcEIsSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLDZCQUE2QjtnQkFDN0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbkQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCw2QkFBNkI7Z0JBQzdCLElBQUksaUJBQWlCLEVBQUU7b0JBQ25CLGlCQUFpQixDQUFDLG1CQUFtQixDQUNqQyxlQUFlLEVBQ2YsUUFBUSxDQUNYLENBQUM7b0JBQ0YsaUJBQWlCLENBQUMsbUJBQW1CLENBQ2pDLGdCQUFnQixFQUNoQixRQUFRLENBQ1gsQ0FBQztvQkFDRixpQkFB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
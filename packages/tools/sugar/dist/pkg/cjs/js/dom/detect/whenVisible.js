"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const string_1 = require("@coffeekraken/sugar/string");
const dom_1 = require("@coffeekraken/sugar/dom");
function __whenVisible($elm, settings) {
    const pro = new s_promise_1.default(({ resolve, reject, emit }) => {
        const finalSettings = Object.assign({ whenVisible: null, whenInvisible: null, once: true }, (settings !== null && settings !== void 0 ? settings : {}));
        // store status for all listeners
        if (!$elm._whenVisibleStatus) {
            $elm._whenVisibleStatus = {};
        }
        // variables
        let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
        // generate a uniqid for this listener
        const id = (0, string_1.__uniqid)();
        var observer = new IntersectionObserver(function (entries) {
            var _a, _b;
            if (entries[0]['intersectionRatio'] == 0) {
                // prevent from triggering multiple times the callback
                // for this listener if already invisible
                if (!$elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = false;
                // process callbacks
                (_a = finalSettings.whenInvisible) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $elm);
                // event
                emit('invisible', $elm);
            }
            else {
                // "once" settings support
                if (finalSettings.once) {
                    observer.disconnect();
                }
                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if ($elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = true;
                // process callbacks
                (_b = finalSettings.whenVisible) === null || _b === void 0 ? void 0 : _b.call(finalSettings, $elm);
                // event
                emit('visible', $elm);
                // resolve the promise only if the "once"
                // setting is true
                if (finalSettings.once) {
                    resolve($elm);
                }
            }
        });
        observer.observe($elm);
        pro.on('cancel', () => {
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
        });
        return pro;
        const _cb = () => {
            var _a, _b, _c;
            if (isSelfVisible) {
                // "once" settings support
                if (finalSettings.once) {
                    (_a = selfObserver === null || selfObserver === void 0 ? void 0 : selfObserver.disconnect) === null || _a === void 0 ? void 0 : _a.call(selfObserver);
                    // remove the event listeners
                    $elm.removeEventListener('transitionend', _eventCb);
                    $elm.removeEventListener('animationstart', _eventCb);
                    $elm.removeEventListener('animationend', _eventCb);
                }
            }
            if (areParentsVisible) {
                // "once" settings support
                if (finalSettings.once) {
                    (_b = parentObserver === null || parentObserver === void 0 ? void 0 : parentObserver.disconnect) === null || _b === void 0 ? void 0 : _b.call(parentObserver);
                    // remove the event listeners
                    if (closestNotVisible) {
                        closestNotVisible.removeEventListener('transitionend', _eventCb);
                        closestNotVisible.removeEventListener('animationstart', _eventCb);
                        closestNotVisible.removeEventListener('animationend', _eventCb);
                    }
                }
            }
            if (isSelfVisible && areParentsVisible) {
                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if ($elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = true;
                // process callbacks
                whenVisible === null || whenVisible === void 0 ? void 0 : whenVisible($elm);
                // event
                emit('visible', $elm);
                if (finalSettings.once) {
                    resolve($elm);
                }
            }
            else {
                // prevent from triggering multiple times the callback
                // for this listener if already invisible
                if (!$elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = false;
                // process callbacks
                (_c = finalSettings.whenInvisible) === null || _c === void 0 ? void 0 : _c.call(finalSettings, $elm);
                // event
                emit('invisible', $elm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCx1REFBc0Q7QUFFdEQsaURBQTJFO0FBcUMzRSxTQUF3QixhQUFhLENBQ2pDLElBQWlCLEVBQ2pCLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3JELE1BQU0sYUFBYSxtQkFDZixXQUFXLEVBQUUsSUFBSSxFQUNqQixhQUFhLEVBQUUsSUFBSSxFQUNuQixJQUFJLEVBQUUsSUFBSSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1NBQ2hDO1FBRUQsWUFBWTtRQUNaLElBQUksYUFBYSxHQUFHLEtBQUssRUFDckIsaUJBQWlCLEdBQUcsS0FBSyxFQUN6QixpQkFBaUIsR0FBRyxJQUFJLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEVBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFMUIsc0NBQXNDO1FBQ3RDLE1BQU0sRUFBRSxHQUFHLElBQUEsaUJBQVEsR0FBRSxDQUFDO1FBRXRCLElBQUksUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBVSxPQUFPOztZQUNyRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEMsc0RBQXNEO2dCQUN0RCx5Q0FBeUM7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzlCLE9BQU87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
// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';
import { __closestNotVisible, __isVisible } from '@coffeekraken/sugar/dom';
export default function __whenVisible($elm, settings) {
    const pro = new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings = Object.assign({ whenVisible: null, whenInvisible: null, once: true }, (settings !== null && settings !== void 0 ? settings : {}));
        // store status for all listeners
        if (!$elm._whenVisibleStatus) {
            $elm._whenVisibleStatus = {};
        }
        // variables
        let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
        // generate a uniqid for this listener
        const id = __uniqid();
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
            isSelfVisible = __isVisible($elm);
            if (closestNotVisible) {
                areParentsVisible = __isVisible(closestNotVisible);
            }
            // callback
            _cb($elm);
        };
        // check if element itself is not visible
        if (!__isVisible($elm)) {
            selfObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if (__isVisible(mutation.target)) {
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
        closestNotVisible = __closestNotVisible($elm);
        if (closestNotVisible) {
            parentObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class') {
                        // check if is visible
                        if (__isVisible(mutation.target)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBcUMzRSxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FDakMsSUFBaUIsRUFDakIsUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNyRCxNQUFNLGFBQWEsbUJBQ2YsV0FBVyxFQUFFLElBQUksRUFDakIsYUFBYSxFQUFFLElBQUksRUFDbkIsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztTQUNoQztRQUVELFlBQVk7UUFDWixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLGlCQUFpQixHQUFHLEtBQUssRUFDekIsaUJBQWlCLEdBQUcsSUFBSSxFQUN4QixZQUFZLEdBQUcsSUFBSSxFQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTFCLHNDQUFzQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUV0QixJQUFJLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsT0FBTzs7WUFDckQsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7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
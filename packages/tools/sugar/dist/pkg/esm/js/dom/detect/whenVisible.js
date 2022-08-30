// @ts-nocheck
import __isVisible from '../is/visible';
import __closestNotVisible from '../query/closestNotVisible';
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
export default function whenVisible($elm, cb = null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxtQkFBbUIsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLElBQWlCLEVBQ2pCLEtBQWUsSUFBSTtJQUVuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFlBQVk7UUFDWixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLGlCQUFpQixHQUFHLEtBQUssRUFDekIsaUJBQWlCLEdBQUcsSUFBSSxFQUN4QixZQUFZLEdBQUcsSUFBSSxFQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTs7WUFDYixJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxVQUFVLDREQUFJLENBQUM7Z0JBQzdCLDZCQUE2QjtnQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3REO1lBRUQsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsVUFBVSw4REFBSSxDQUFDO2dCQUMvQiw2QkFBNkI7Z0JBQzdCLElBQUksaUJBQWlCLEVBQUU7b0JBQ25CLGlCQUFpQixDQUFDLG1CQUFtQixDQUNqQyxlQUFl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
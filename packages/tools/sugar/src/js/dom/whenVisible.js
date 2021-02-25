// @ts-nocheck
import __isVisible from './isVisible';
import __closestNotVisible from './closestNotVisible';
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
                    if (__isVisible(elm)) {
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
                    if (__isVisible(closestNotVisible)) {
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
        if (!__isVisible(elm)) {
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
        closestNotVisible = __closestNotVisible(elm);
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
export default whenVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sbUJBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLFlBQVk7UUFDWixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQ3ZCLGlCQUFpQixHQUFHLEtBQUssRUFDekIsaUJBQWlCLEdBQUcsSUFBSSxFQUN4QixZQUFZLEdBQUcsSUFBSSxFQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNmLElBQUksYUFBYSxJQUFJLGlCQUFpQixFQUFFO2dCQUN0QyxvQkFBb0I7Z0JBQ3BCLElBQUksRUFBRTtvQkFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDYiw2QkFBNkI7Z0JBQzdCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25ELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsNkJBQTZCO2dCQUM3QixJQUFJLGlCQUFpQixFQUFFO29CQUNyQixpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2pFLGlCQUFpQixDQUFDLG1CQUFtQixD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
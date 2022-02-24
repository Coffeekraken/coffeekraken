// @ts-nocheck
import __isVisible from '../is/visible';
import __closestNotVisible from '../query/closestNotVisible';
/**
 * @name      whenVisible
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @feature       Promise based API
 * @feature       Callback support
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sbUJBQW1CLE1BQU0sNEJBQTRCLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBZ0IsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUM1QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFlBQVk7UUFDWixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLGlCQUFpQixHQUFHLEtBQUssRUFDekIsaUJBQWlCLEdBQUcsSUFBSSxFQUN4QixZQUFZLEdBQUcsSUFBSSxFQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNiLElBQUksYUFBYSxJQUFJLGlCQUFpQixFQUFFO2dCQUNwQyxvQkFBb0I7Z0JBQ3BCLElBQUksRUFBRTtvQkFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDYiw2QkFBNkI7Z0JBQzdCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25ELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsNkJBQTZCO2dCQUM3QixJQUFJLGlCQUFpQixFQUFFO29CQUNuQixpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FDakMsZUFBZSxFQUNmLFFBQVEsQ0FDWCxDQUFDO29CQUNGLGlCQUFpQixDQUFDLG1C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
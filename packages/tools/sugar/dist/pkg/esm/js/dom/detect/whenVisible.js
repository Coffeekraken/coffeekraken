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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxtQkFBbUIsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFnQixFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsWUFBWTtRQUNaLElBQUksYUFBYSxHQUFHLEtBQUssRUFDckIsaUJBQWlCLEdBQUcsS0FBSyxFQUN6QixpQkFBaUIsR0FBRyxJQUFJLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEVBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2IsSUFBSSxhQUFhLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3BDLG9CQUFvQjtnQkFDcEIsSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLDZCQUE2QjtnQkFDN0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbkQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCw2QkFBNkI7Z0JBQzdCLElBQUksaUJBQWlCLEVBQUU7b0JBQ25CLGlCQUFpQixDQUFDLG1CQUFtQixDQUNqQyxlQUFlLEVBQ2YsUUFBUSxDQUNYLENBQUM7b0JBQ0YsaUJBQWlCLENBQUMsbUJBQW1CLENBQ2pD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
// @ts-nocheck

/**
 * @name      onSwipe
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Detect swipes gestures on touch devices.
 *
 * @feature     Multi directional swipe detection (left, up, right, down)
 * @feature     Threshold setting
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to detect the swipe
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import onSwipe from '@coffeekraken/sugar/js/dom/onSwipe'
 * onSwipe(myCoolElm, (swipe) => {
 * 	// check the swipe direction
 * 	if (swipe.left) {
 * 		// do something...
 * 	}
 * 	// support : left, right, up, down
 * 	// etc...
 * }, {
 * 	threshold : 50
 * });
 *
 * @see 		https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IOnSwipeSettings {
    threshold: number;
}

function onSwipe(elm, cb, settings: Partial<IOnSwipeSettings> = {}) {
    settings = {
        threshold: 100,
        ...settings,
    };

    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    const gesuredZone = elm;
    gesuredZone.addEventListener(
        'touchstart',
        function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        },
        false,
    );

    gesuredZone.addEventListener(
        'touchend',
        function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesure();
        },
        false,
    );

    function handleGesure() {
        const swipeNfo = {
            distanceX: Math.abs(touchendX - touchstartX),
            distanceY: Math.abs(touchendY - touchstartY),
        };
        if (touchendX + settings.threshold < touchstartX) {
            swipeNfo.left = true;
        }
        if (touchendX - settings.threshold > touchstartX) {
            swipeNfo.right = true;
        }
        if (touchendY + settings.threshold < touchstartY) {
            swipeNfo.up = true;
        }
        if (touchendY - settings.threshold > touchstartY) {
            swipeNfo.down = true;
        }
        if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
            cb(swipeNfo);
        }
    }
}
export default onSwipe;

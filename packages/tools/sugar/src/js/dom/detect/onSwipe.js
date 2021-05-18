// @ts-nocheck
/**
 * @name      onSwipe
 * @namespace            js.dom.detect
 * @type      Function
 * @stable
 *
 * Detect swipes gestures on touch devices.
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @since         1.0.0
 * @see 		https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d 	Based on
 */
function onSwipe(elm, cb, threshold = 100) {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    const gesuredZone = elm;
    gesuredZone.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    gesuredZone.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesure();
    }, false);
    function handleGesure() {
        const swipeNfo = {
            distanceX: Math.abs(touchendX - touchstartX),
            distanceY: Math.abs(touchendY - touchstartY)
        };
        if (touchendX + threshold < touchstartX) {
            swipeNfo.left = true;
        }
        if (touchendX - threshold > touchstartX) {
            swipeNfo.right = true;
        }
        if (touchendY + threshold < touchstartY) {
            swipeNfo.up = true;
        }
        if (touchendY - threshold > touchstartY) {
            swipeNfo.down = true;
        }
        if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
            cb(swipeNfo);
        }
    }
}
export default onSwipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Td2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9uU3dpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBUyxHQUFHLEdBQUc7SUFDdkMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixXQUFXLENBQUMsZ0JBQWdCLENBQzFCLFlBQVksRUFDWixVQUFVLEtBQUs7UUFDYixXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2hELENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQztJQUVGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FDMUIsVUFBVSxFQUNWLFVBQVUsS0FBSztRQUNiLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFDO0lBRUYsU0FBUyxZQUFZO1FBQ25CLE1BQU0sUUFBUSxHQUFHO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUM1QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1NBQzdDLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUN2QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDdkMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ25FLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNkO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9
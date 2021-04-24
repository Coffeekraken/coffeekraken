// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      onSwipe
     * @namespace            js.dom
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
    function onSwipe(elm, cb, threshold) {
        if (threshold === void 0) { threshold = 100; }
        var touchstartX = 0;
        var touchstartY = 0;
        var touchendX = 0;
        var touchendY = 0;
        var gesuredZone = elm;
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
            var swipeNfo = {
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
    exports.default = onSwipe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Td2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9uU3dpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0gsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxTQUFlO1FBQWYsMEJBQUEsRUFBQSxlQUFlO1FBQ3ZDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDeEIsV0FBVyxDQUFDLGdCQUFnQixDQUMxQixZQUFZLEVBQ1osVUFBVSxLQUFLO1lBQ2IsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzlDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNoRCxDQUFDLEVBQ0QsS0FBSyxDQUNOLENBQUM7UUFFRixXQUFXLENBQUMsZ0JBQWdCLENBQzFCLFVBQVUsRUFDVixVQUFVLEtBQUs7WUFDYixTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDNUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzVDLFlBQVksRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQztRQUVGLFNBQVMsWUFBWTtZQUNuQixJQUFNLFFBQVEsR0FBRztnQkFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2dCQUM1QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2FBQzdDLENBQUM7WUFDRixJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUNELElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3ZDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDdkMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDcEI7WUFDRCxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUNELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDbkUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2Q7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9
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
     * @namespace           sugar.js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Td2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9vblN3aXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBZTtRQUFmLDBCQUFBLEVBQUEsZUFBZTtRQUN2QyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FDMUIsWUFBWSxFQUNaLFVBQVUsS0FBSztZQUNiLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUM5QyxXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDaEQsQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFDO1FBRUYsV0FBVyxDQUFDLGdCQUFnQixDQUMxQixVQUFVLEVBQ1YsVUFBVSxLQUFLO1lBQ2IsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzVDLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUM1QyxZQUFZLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQ0QsS0FBSyxDQUNOLENBQUM7UUFFRixTQUFTLFlBQVk7WUFDbkIsSUFBTSxRQUFRLEdBQUc7Z0JBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztnQkFDNUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQzthQUM3QyxDQUFDO1lBQ0YsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDdkMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDdEI7WUFDRCxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUN2QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUNELElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3ZDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDdkMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDdEI7WUFDRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25FLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNkO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==
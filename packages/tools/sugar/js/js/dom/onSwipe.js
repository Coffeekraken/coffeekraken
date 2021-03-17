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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Td2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vb25Td2lwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFNBQWU7UUFBZiwwQkFBQSxFQUFBLGVBQWU7UUFDdkMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixXQUFXLENBQUMsZ0JBQWdCLENBQzFCLFlBQVksRUFDWixVQUFVLEtBQUs7WUFDYixXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDOUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2hELENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQztRQUVGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FDMUIsVUFBVSxFQUNWLFVBQVUsS0FBSztZQUNiLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUM1QyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDNUMsWUFBWSxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFDO1FBRUYsU0FBUyxZQUFZO1lBQ25CLElBQU0sUUFBUSxHQUFHO2dCQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7Z0JBQzVDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7YUFDN0MsQ0FBQztZQUNGLElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDdkMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFDRCxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUN2QyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNwQjtZQUNELElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFO2dCQUNuRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDZDtRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=
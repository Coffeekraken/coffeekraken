// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      detectInOutDirection
     * @namespace           sugar.js.dom
     * @type      Function
     * @status              wip
     *
     * Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
     * The first one is the `onIn` callback, and the second one is the `onOut`.
     *
     * @param    {HTMLElement}    $elm    The element to listen for mouseover and mouseout on
     * @param    {Function}    onIn    The onIn callback. The direction and the $elm will be passed to it
     * @param    {Function}    onOut    The onOut callback. The direction and the $elm will be passed to it
     * @return    {HTMLElement}    The $elm to maintain chainability
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import detectInOutDirection from '@coffeekraken/sugar/js/dom/detectInOutDirection'
     * const detect = detectInOutDirection(myElm).in(direction => {
     *    // do something...
     * }).out(direction => {
     *    // do something...
     * }).then(value => {
     *    // do something
     *    console.log(value); // => { action: 'in', direction: 'up' };
     * });
     *
     * // cancel the detection process
     * detect.cancel();
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function detectInOutDirection($elm) {
        var mouseEnterHandler, mouseLeaveHandler;
        var promise = new SPromise_1.default(function (_a) {
            var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
            mouseEnterHandler = function (e) {
                emit('in', direction);
                emit('then', {
                    action: 'in',
                    direction: direction
                });
            };
            mouseLeaveHandler = function (e) {
                emit('out', direction);
                emit('then', {
                    action: 'out',
                    direction: direction
                });
            };
            // detect when mouseenter/leave the element
            $elm.addEventListener('mouseenter', mouseEnterHandler);
            $elm.addEventListener('mouseleave', mouseLeaveHandler);
        }, {
            id: 'detectInOutDirection'
        }).on('finally', function () {
            $elm.removeEventListener('mouseenter', mouseEnterHandler);
            $elm.removeEventListener('mouseleave', mouseLeaveHandler);
        });
        return promise;
    }
    var oldX = 0, oldY = 0, direction = null;
    var threshold = 0;
    document.addEventListener('mousemove', function (e) {
        calculateDirection(e);
    });
    document.addEventListener('touchstart', function (e) {
        calculateDirection(e);
    });
    function calculateDirection(e) {
        var directionX = 0, directionY = 0, diffX = 0, diffY = 0;
        if (e.pageX < oldX - threshold) {
            directionX = 'left';
            diffX = oldX - e.pageX;
            oldX = e.pageX;
        }
        else if (e.pageX > oldX + threshold) {
            directionX = 'right';
            diffX = e.pageX - oldX;
            oldX = e.pageX;
        }
        if (e.pageY < oldY - threshold) {
            directionY = 'up';
            diffY = oldY - e.pageY;
            oldY = e.pageY;
        }
        else if (e.pageY > oldY + threshold) {
            directionY = 'down';
            diffY = e.pageY - oldY;
            oldY = e.pageY;
        }
        if (directionX && directionY) {
            direction = diffX > diffY ? directionX : directionY;
        }
        else if (directionX) {
            direction = directionX;
        }
        else if (directionY) {
            direction = directionY;
        }
        else {
            direction = null;
        }
    }
    return detectInOutDirection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRlY3RJbk91dERpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLGlFQUE2QztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBSTtRQUNoQyxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO1FBRXpDLElBQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FDNUIsVUFBQyxFQUF5QjtnQkFBdkIsT0FBTyxhQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsSUFBSSxVQUFBO1lBQ3RCLGlCQUFpQixHQUFHLFVBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxNQUFNLEVBQUUsSUFBSTtvQkFDWixTQUFTLFdBQUE7aUJBQ1YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsaUJBQWlCLEdBQUcsVUFBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLE1BQU0sRUFBRSxLQUFLO29CQUNiLFNBQVMsV0FBQTtpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsc0JBQXNCO1NBQzNCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ2QsSUFBSSxDQUFD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
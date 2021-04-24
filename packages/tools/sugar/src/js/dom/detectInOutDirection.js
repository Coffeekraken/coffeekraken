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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      detectInOutDirection
     * @namespace            js.dom
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
        var promise = new s_promise_1.default(function (_a) {
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
    exports.default = detectInOutDirection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRlY3RJbk91dERpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQ0c7SUFDSCxTQUFTLG9CQUFvQixDQUFDLElBQUk7UUFDaEMsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztRQUV6QyxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQzVCLFVBQUMsRUFBeUI7Z0JBQXZCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtZQUN0QixpQkFBaUIsR0FBRyxVQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osU0FBUyxXQUFBO2lCQUNWLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUNGLGlCQUFpQixHQUFHLFVBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxNQUFNLEVBQUUsS0FBSztvQkFDYixTQUFTLFdBQUE7aUJBQ1YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLHNCQUFzQjtTQUMzQixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNkLElBQUksQ0FB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
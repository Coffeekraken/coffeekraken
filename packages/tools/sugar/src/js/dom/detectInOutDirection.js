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
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
        let mouseEnterHandler, mouseLeaveHandler;
        const promise = new s_promise_1.default(({ resolve, reject, emit }) => {
            mouseEnterHandler = (e) => {
                emit('in', direction);
                emit('then', {
                    action: 'in',
                    direction
                });
            };
            mouseLeaveHandler = (e) => {
                emit('out', direction);
                emit('then', {
                    action: 'out',
                    direction
                });
            };
            // detect when mouseenter/leave the element
            $elm.addEventListener('mouseenter', mouseEnterHandler);
            $elm.addEventListener('mouseleave', mouseLeaveHandler);
        }, {
            id: 'detectInOutDirection'
        }).on('finally', () => {
            $elm.removeEventListener('mouseenter', mouseEnterHandler);
            $elm.removeEventListener('mouseleave', mouseLeaveHandler);
        });
        return promise;
    }
    let oldX = 0, oldY = 0, direction = null;
    const threshold = 0;
    document.addEventListener('mousemove', (e) => {
        calculateDirection(e);
    });
    document.addEventListener('touchstart', (e) => {
        calculateDirection(e);
    });
    function calculateDirection(e) {
        let directionX = 0, directionY = 0, diffX = 0, diffY = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRlY3RJbk91dERpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQ0c7SUFDSCxTQUFTLG9CQUFvQixDQUFDLElBQUk7UUFDaEMsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztRQUV6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQzVCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxNQUFNLEVBQUUsSUFBSTtvQkFDWixTQUFTO2lCQUNWLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUNGLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsU0FBUztpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsc0JBQXNCO1NBQzNCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZ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
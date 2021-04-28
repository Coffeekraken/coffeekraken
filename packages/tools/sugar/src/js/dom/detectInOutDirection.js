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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2RldGVjdEluT3V0RGlyZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBSTtRQUNoQyxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO1FBRXpDLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FDNUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLE1BQU0sRUFBRSxJQUFJO29CQUNaLFNBQVM7aUJBQ1YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxNQUFNLEVBQUUsS0FBSztvQkFDYixTQUFTO2lCQUNWLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUNGLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxzQkFBc0I7U0FDM0IsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUNWLElBQUksR0FBRyxDQUFDLEVBQ1IsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDcEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzNDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzVDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNCLElBQUksVUFBVSxHQUFHLENBQUMsRUFDaEIsVUFBVSxHQUFHLENBQUMsRUFDZCxLQUFLLEdBQUcsQ0FBQyxFQUNULEtBQUssR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtZQUM5QixVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjthQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFO1lBQ3JDLFVBQVUsR0FBRyxPQUFPLENBQUM7WUFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7WUFDOUIsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDaEI7YUFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtZQUNyQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUM1QixTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDckQ7YUFBTSxJQUFJLFVBQVUsRUFBRTtZQUNyQixTQUFTLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxVQUFVLEVBQUU7WUFDckIsU0FBUyxHQUFHLFVBQVUsQ0FBQztTQUN4QjthQUFNO1lBQ0wsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtJQUNILENBQUM7SUFDRCxrQkFBZSxvQkFBb0IsQ0FBQyJ9
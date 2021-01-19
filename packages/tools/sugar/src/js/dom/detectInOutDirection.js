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
     * @wip
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
//# sourceMappingURL=detectInOutDirection.js.map
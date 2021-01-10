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
        define(["require", "exports", "../promise/SPromise", "./isInViewport", "./whenInViewport", "./whenOutOfViewport"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var whenInViewport_1 = __importDefault(require("./whenInViewport"));
    var whenOutOfViewport_1 = __importDefault(require("./whenOutOfViewport"));
    /**
     * @name      inViewportStatusChange
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Monitor when the passed element enter or exit the viewport
     *
     * @param 		{HTMLElement} 						elm  		The element to monitor
     * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
     * inViewportStatusChange(myElm).enter($elm => {
     *    // do something...
     * }).exit($elm => {
     *    // do something...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inViewportStatusChange($elm) {
        var isFinished = false;
        return new SPromise_1.default(function (resolve, reject, trigger) {
            function _whenIn() {
                whenInViewport_1.default($elm).then(function () {
                    if (isFinished)
                        return;
                    trigger('enter', $elm);
                    _whenOut();
                });
            }
            function _whenOut() {
                whenOutOfViewport_1.default($elm).then(function () {
                    if (isFinished)
                        return;
                    trigger('exit', $elm);
                    _whenIn();
                });
            }
            // if not in viewport at start
            if (!isInViewport_1.default($elm)) {
                _whenOut();
            }
            else {
                _whenIn();
            }
        }, {
            id: 'inViewportStatisChange'
        }).on('finally', function () {
            isFinished = true;
        });
    }
    return inViewportStatusChange;
});
//# sourceMappingURL=inViewportStatusChange.js.map
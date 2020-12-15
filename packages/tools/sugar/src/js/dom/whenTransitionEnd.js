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
        define(["require", "exports", "./getTransitionProperties"], factory);
    }
})(function (require, exports) {
    "use strict";
    var getTransitionProperties_1 = __importDefault(require("./getTransitionProperties"));
    /**
     * @name      whenTransitionEnd
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Monitor an HTMLElement to be notified when his transition has ended
     *
     * @param 		{HTMLElement} 				elm 		The element to monitor
     * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
     * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
     * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
     * 		// do something with your element transition has ended...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function whenTransitionEnd(elm, cb) {
        if (cb === void 0) { cb = null; }
        return new Promise(function (resolve, reject) {
            var transition = getTransitionProperties_1.default(elm);
            setTimeout(function () {
                resolve();
                cb && cb();
            }, transition.totalDuration);
        });
    }
    return whenTransitionEnd;
});
//# sourceMappingURL=whenTransitionEnd.js.map
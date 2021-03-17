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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = whenTransitionEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblRyYW5zaXRpb25FbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL3doZW5UcmFuc2l0aW9uRW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNGQUFrRTtJQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBUztRQUFULG1CQUFBLEVBQUEsU0FBUztRQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBTSxVQUFVLEdBQUcsaUNBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsVUFBVSxDQUFDO2dCQUNULE9BQU8sRUFBRSxDQUFDO2dCQUNWLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNiLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==
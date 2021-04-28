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
    const getTransitionProperties_1 = __importDefault(require("./getTransitionProperties"));
    /**
     * @name      whenTransitionEnd
     * @namespace            js.dom
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
    function whenTransitionEnd(elm, cb = null) {
        return new Promise((resolve, reject) => {
            const transition = getTransitionProperties_1.default(elm);
            setTimeout(() => {
                resolve();
                cb && cb();
            }, transition.totalDuration);
        });
    }
    exports.default = whenTransitionEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblRyYW5zaXRpb25FbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3doZW5UcmFuc2l0aW9uRW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdGQUFrRTtJQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUk7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLFVBQVUsR0FBRyxpQ0FBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNiLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==
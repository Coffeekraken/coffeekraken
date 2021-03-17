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
        define(["require", "exports", "./scrollTo", "../../shared/easing/easeInOutQuint"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scrollTo_1 = __importDefault(require("./scrollTo"));
    var easeInOutQuint_1 = __importDefault(require("../../shared/easing/easeInOutQuint"));
    /**
     * @name      scrollToLocationHash
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Scroll to the location hash if an hash is present.
     * This function will try to get the target element from the hash and scroll to it
     *
     * @param    {Integer}    [duration=500]    The scroll duration
     * @param    {Integer}    [offset=0]    A pixel value to offset the scroll with
     * @param    {Function}    [easing=__easeing]    An easing function to use to scroll
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import __scrollToLocationHash from '@coffeekraken/sugar/js/dom/scrollToLocationHash'
     * __scrollToLocationHash(500, 0)
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
     */
    function scrollToLocationHash(duration, offset, easing) {
        if (duration === void 0) { duration = 500; }
        if (offset === void 0) { offset = 0; }
        if (easing === void 0) { easing = easeInOutQuint_1.default; }
        // check if we have an hash in the url
        var hash = document.location.hash;
        // if not, do nothing
        if (!hash)
            return;
        // try to get the hash target in the page
        var targetElm = document.querySelector(hash);
        // if no target found, do nothing
        if (!targetElm)
            return;
        // tell the browser that we handle the scroll restoration manually
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // scroll to target
        scrollTo_1.default(targetElm, duration, easing, offset, 'top');
    }
    exports.default = scrollToLocationHash;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9Mb2NhdGlvbkhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kb20vc2Nyb2xsVG9Mb2NhdGlvbkhhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0RBQW9DO0lBQ3BDLHNGQUEyRDtJQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLG9CQUFvQixDQUFDLFFBQWMsRUFBRSxNQUFVLEVBQUUsTUFBa0I7UUFBOUMseUJBQUEsRUFBQSxjQUFjO1FBQUUsdUJBQUEsRUFBQSxVQUFVO1FBQUUsdUJBQUEsRUFBQSxTQUFTLHdCQUFTO1FBQzFFLHNDQUFzQztRQUN0QyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVwQyxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBRWxCLHlDQUF5QztRQUN6QyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFFdkIsa0VBQWtFO1FBQ2xFLElBQUksbUJBQW1CLElBQUksT0FBTyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7U0FDdEM7UUFFRCxtQkFBbUI7UUFDbkIsa0JBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=
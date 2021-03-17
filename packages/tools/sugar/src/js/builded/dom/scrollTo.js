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
        define(["require", "exports", "../../shared/easing/easeInOutQuad", "./requestAnimationFrame"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var easeInOutQuad_1 = __importDefault(require("../../shared/easing/easeInOutQuad"));
    var requestAnimationFrame_1 = __importDefault(require("./requestAnimationFrame"));
    /**
     * @name      scrollTo
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Function that let you make a smooth page scroll to a specific element in the page
     *
     * @param 		{HTMLElement} 				target 			The element to scroll to
     * @param 		{Number} 					[duration=1000] 		The animation duration
     * @param 		{Function} 					[easing=easeInOutQuad] 			An easing Function
     * @param 		{Number} 					[offset=0] 			The destination offset
     * @param 		{String} 					[align='top'] 			The destination align (top, center, bottom)
     * @param 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTo'
     * import easeInOutQuad from '@coffeekraken/sugar/js/easings/easeInOutQuad'
     * scrollTo(myCoolHTMLElement);
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var isUserScrolling = false;
    var userScrollingTimeout;
    var isScrollingHappening = false;
    document.addEventListener('mousewheel', function (e) {
        if (!isScrollingHappening)
            return;
        isUserScrolling = true;
        clearTimeout(userScrollingTimeout);
        userScrollingTimeout = setTimeout(function () {
            isUserScrolling = false;
        }, 200);
    });
    function scrollTo(target, duration, easing, offset, align, onFinish) {
        if (duration === void 0) { duration = 1000; }
        if (easing === void 0) { easing = easeInOutQuad_1.default; }
        if (offset === void 0) { offset = 0; }
        if (align === void 0) { align = 'top'; }
        if (onFinish === void 0) { onFinish = null; }
        var docElem = document.documentElement; // to facilitate minification better
        var windowHeight = docElem.clientHeight;
        var maxScroll = 'scrollMaxY' in window
            ? window.scrollMaxY
            : docElem.scrollHeight - windowHeight;
        var currentY = window.pageYOffset;
        isScrollingHappening = true;
        var targetY = currentY;
        var elementBounds = isNaN(target) ? target.getBoundingClientRect() : 0;
        if (align === 'center') {
            targetY += elementBounds.top + elementBounds.height / 2;
            targetY -= windowHeight / 2;
            targetY -= offset;
        }
        else if (align === 'bottom') {
            targetY += elementBounds.bottom;
            targetY -= windowHeight;
            targetY += offset;
        }
        else {
            // top, undefined
            targetY += elementBounds.top;
            targetY -= offset;
        }
        targetY = Math.max(Math.min(maxScroll, targetY), 0);
        var deltaY = targetY - currentY;
        var obj = {
            targetY: targetY,
            deltaY: deltaY,
            duration: duration,
            easing: easing,
            onFinish: onFinish,
            startTime: Date.now(),
            lastY: currentY,
            step: scrollTo.step
        };
        requestAnimationFrame_1.default(obj.step.bind(obj));
    }
    scrollTo.step = function () {
        if (this.lastY !== window.pageYOffset && this.onFinish) {
            isScrollingHappening = false;
            this.onFinish();
            return;
        }
        // Calculate how much time has passed
        var t = Math.min((Date.now() - this.startTime) / this.duration, 1);
        // Scroll window amount determined by easing
        var y = this.targetY - (1 - this.easing(t)) * this.deltaY;
        window.scrollTo(window.scrollX, y);
        // Continue animation as long as duration hasn't surpassed
        if (t !== 1 && !isUserScrolling) {
            this.lastY = window.pageYOffset;
            requestAnimationFrame_1.default(this.step.bind(this));
        }
        else {
            isScrollingHappening = false;
            if (this.onFinish)
                this.onFinish();
        }
    };
    exports.default = scrollTo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kb20vc2Nyb2xsVG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0ZBQThEO0lBQzlELGtGQUE0RDtJQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBSSxvQkFBb0IsQ0FBQztJQUN6QixJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUNqQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsb0JBQW9CO1lBQUUsT0FBTztRQUNsQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25DLG9CQUFvQixHQUFHLFVBQVUsQ0FBQztZQUNoQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxRQUFRLENBQ2YsTUFBTSxFQUNOLFFBQWUsRUFDZixNQUFzQixFQUN0QixNQUFVLEVBQ1YsS0FBYSxFQUNiLFFBQWU7UUFKZix5QkFBQSxFQUFBLGVBQWU7UUFDZix1QkFBQSxFQUFBLFNBQVMsdUJBQWE7UUFDdEIsdUJBQUEsRUFBQSxVQUFVO1FBQ1Ysc0JBQUEsRUFBQSxhQUFhO1FBQ2IseUJBQUEsRUFBQSxlQUFlO1FBRWYsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9DQUFvQztRQUM5RSxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQU0sU0FBUyxHQUNiLFlBQVksSUFBSSxNQUFNO1lBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUNuQixDQUFDLENBQUMsT0FBTyxDQUFD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
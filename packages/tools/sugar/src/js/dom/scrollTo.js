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
        define(["require", "exports", "../easing/easeInOutQuad", "./requestAnimationFrame"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var easeInOutQuad_1 = __importDefault(require("../easing/easeInOutQuad"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBb0Q7SUFDcEQsa0ZBQTREO0lBQzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztJQUM1QixJQUFJLG9CQUFvQixDQUFDO0lBQ3pCLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxvQkFBb0I7WUFBRSxPQUFPO1FBQ2xDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbkMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLFFBQVEsQ0FDZixNQUFNLEVBQ04sUUFBZSxFQUNmLE1BQXNCLEVBQ3RCLE1BQVUsRUFDVixLQUFhLEVBQ2IsUUFBZTtRQUpmLHlCQUFBLEVBQUEsZUFBZTtRQUNmLHVCQUFBLEVBQUEsU0FBUyx1QkFBYTtRQUN0Qix1QkFBQSxFQUFBLFVBQVU7UUFDVixzQkFBQSxFQUFBLGFBQWE7UUFDYix5QkFBQSxFQUFBLGVBQWU7UUFFZixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsb0NBQW9DO1FBQzlFLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDMUMsSUFBTSxTQUFTLEdBQ2IsWUFBWSxJQUFJLE1BQU07WUFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ25CLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFH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
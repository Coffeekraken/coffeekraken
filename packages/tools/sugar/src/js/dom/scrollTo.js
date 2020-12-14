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
    return scrollTo;
});
//# sourceMappingURL=module.js.map
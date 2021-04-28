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
    const easeInOutQuad_1 = __importDefault(require("../../shared/easing/easeInOutQuad"));
    const requestAnimationFrame_1 = __importDefault(require("./requestAnimationFrame"));
    /**
     * @name      scrollTo
     * @namespace            js.dom
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
    let isUserScrolling = false;
    let userScrollingTimeout;
    let isScrollingHappening = false;
    document.addEventListener('mousewheel', (e) => {
        if (!isScrollingHappening)
            return;
        isUserScrolling = true;
        clearTimeout(userScrollingTimeout);
        userScrollingTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 200);
    });
    function scrollTo(target, duration = 1000, easing = easeInOutQuad_1.default, offset = 0, align = 'top', onFinish = null) {
        const docElem = document.documentElement; // to facilitate minification better
        const windowHeight = docElem.clientHeight;
        const maxScroll = 'scrollMaxY' in window
            ? window.scrollMaxY
            : docElem.scrollHeight - windowHeight;
        const currentY = window.pageYOffset;
        isScrollingHappening = true;
        let targetY = currentY;
        const elementBounds = isNaN(target) ? target.getBoundingClientRect() : 0;
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
        const deltaY = targetY - currentY;
        const obj = {
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
        const t = Math.min((Date.now() - this.startTime) / this.duration, 1);
        // Scroll window amount determined by easing
        const y = this.targetY - (1 - this.easing(t)) * this.deltaY;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3Njcm9sbFRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNGQUE4RDtJQUM5RCxvRkFBNEQ7SUFDNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzVCLElBQUksb0JBQW9CLENBQUM7SUFDekIsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxvQkFBb0I7WUFBRSxPQUFPO1FBQ2xDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbkMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNyQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxRQUFRLENBQ2YsTUFBTSxFQUNOLFFBQVEsR0FBRyxJQUFJLEVBQ2YsTUFBTSxHQUFHLHVCQUFhLEVBQ3RCLE1BQU0sR0FBRyxDQUFDLEVBQ1YsS0FBSyxHQUFHLEtBQUssRUFDYixRQUFRLEdBQUcsSUFBSTtRQUVmLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQ0FBb0M7UUFDOUUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMxQyxNQUFNLFNBQVMsR0FDYixZQUFZLElBQUksTUFBTTtZQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVU7WUFDbkIsQ0FBQyxDQUFD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
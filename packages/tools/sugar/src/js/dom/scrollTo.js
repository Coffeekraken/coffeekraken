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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRkFBOEQ7SUFDOUQsb0ZBQTREO0lBQzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztJQUM1QixJQUFJLG9CQUFvQixDQUFDO0lBQ3pCLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsb0JBQW9CO1lBQUUsT0FBTztRQUNsQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25DLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDckMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsUUFBUSxDQUNmLE1BQU0sRUFDTixRQUFRLEdBQUcsSUFBSSxFQUNmLE1BQU0sR0FBRyx1QkFBYSxFQUN0QixNQUFNLEdBQUcsQ0FBQyxFQUNWLEtBQUssR0FBRyxLQUFLLEVBQ2IsUUFBUSxHQUFHLElBQUk7UUFFZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsb0NBQW9DO1FBQzlFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQ2IsWUFBWSxJQUFJLE1BQU07WUFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ25CLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRXBDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDdkIsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN0QixPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN4RCxPQUFPLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksTUFBTSxDQUFDO1NBQ25CO2FBQU0sSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxZQUFZLENBQUM7WUFDeEIsT0FBTyxJQUFJLE1BQU0sQ0FBQztTQUNuQjthQUFNO1lBQ0wsaUJBQWlCO1lBQ2pCLE9BQU8sSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxNQUFNLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBRWxDLE1BQU0sR0FBRyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3JCLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1NBQ3BCLENBQUM7UUFDRiwrQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBSSxHQUFHO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0RCxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDUjtRQUVELHFDQUFxQztRQUNyQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJFLDRDQUE0QztRQUM1QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuQywwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNoQywrQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDLENBQUM7SUFFRixrQkFBZSxRQUFRLENBQUMifQ==
// @ts-nocheck
import easeInOutQuad from '../easing/easeInOutQuad';
import requestAnimationFrame from './requestAnimationFrame';
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
function scrollTo(target, duration = 1000, easing = easeInOutQuad, offset = 0, align = 'top', onFinish = null) {
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
    requestAnimationFrame(obj.step.bind(obj));
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
        requestAnimationFrame(this.step.bind(this));
    }
    else {
        isScrollingHappening = false;
        if (this.onFinish)
            this.onFinish();
    }
};
export default scrollTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxxQkFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFDNUIsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztBQUNqQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDNUMsSUFBSSxDQUFDLG9CQUFvQjtRQUFFLE9BQU87SUFDbEMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN2QixZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxvQkFBb0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3JDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLFFBQVEsQ0FDZixNQUFNLEVBQ04sUUFBUSxHQUFHLElBQUksRUFDZixNQUFNLEdBQUcsYUFBYSxFQUN0QixNQUFNLEdBQUcsQ0FBQyxFQUNWLEtBQUssR0FBRyxLQUFLLEVBQ2IsUUFBUSxHQUFHLElBQUk7SUFFZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsb0NBQW9DO0lBQzlFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDMUMsTUFBTSxTQUFTLEdBQ2IsWUFBWSxJQUFJLE1BQU07UUFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1FBQ25CLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUMx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
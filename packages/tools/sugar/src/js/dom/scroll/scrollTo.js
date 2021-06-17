// @ts-nocheck
import easeInOutQuad from '../../../shared/easing/easeInOutQuad';
import requestAnimationFrame from '../utlls/requestAnimationFrame';
/**
 * @name      scrollTo
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform        js
 * @status          beta
 *
 * Function that let you make a smooth page scroll to a specific element in the page
 *
 * @feature       Promise based API
 * @feature       Tweak the scroll behavior like duration, easing, etc...
 *
 * @setting 		{Number} 					[duration=1000] 		The animation duration
 * @setting 		{Function} 					[easing=easeInOutQuad] 			An easing Function
 * @setting 		{Number} 					[offset=0] 			The destination offset
 * @setting 		{String} 					[align='top'] 			The destination align (top, center, bottom)
 * @setting 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
 *
 * @param 		{HTMLElement} 				target 			The element to scroll to
 * @param       {IScrollToSettings}     [settings={}]       Some settings to tweak the scroll behavior
 * @return      {Promise}           A promise resolved once the scroll has ended
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
function scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ duration: 500, easing: easeInOutQuad, offset: 0, align: 'top', onFinish: null }, settings);
        const docElem = document.documentElement; // to facilitate minification better
        const windowHeight = window.innerHeight;
        const maxScroll = docElem.scrollHeight - windowHeight;
        const currentY = window.pageYOffset;
        isScrollingHappening = true;
        let targetY = currentY;
        const elementBounds = isNaN(target) ? target.getBoundingClientRect() : 0;
        if (settings.align === 'center') {
            targetY += elementBounds.top + elementBounds.height / 2;
            targetY -= windowHeight / 2;
            targetY -= settings.offset;
        }
        else if (settings.align === 'bottom') {
            targetY += elementBounds.bottom;
            targetY -= windowHeight;
            targetY += settings.offset;
        }
        else {
            // top, undefined
            targetY += elementBounds.top;
            targetY -= settings.offset;
        }
        targetY = Math.max(Math.min(maxScroll, targetY), 0);
        const deltaY = targetY - currentY;
        const obj = {
            targetY: targetY,
            deltaY: deltaY,
            duration: settings.duration,
            easing: settings.easing,
            onFinish() {
                settings.onFinish && settings.onFinish();
                resolve();
            },
            startTime: Date.now(),
            lastY: currentY,
            step: scrollTo.step
        };
        requestAnimationFrame(obj.step.bind(obj));
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxxQkFBcUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQzVCLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVDLElBQUksQ0FBQyxvQkFBb0I7UUFBRSxPQUFPO0lBQ2xDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNyQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDO0FBVUgsU0FBUyxRQUFRLENBQ2YsTUFBbUIsRUFDbkIsV0FBdUMsRUFBRTtJQUd6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXJDLFFBQVEsbUJBQ04sUUFBUSxFQUFFLEdBQUcsRUFDYixNQUFNLEVBQUUsYUFBYSxFQUNyQixNQUFNLEVBQUUsQ0FBQyxFQUNULEtBQUssRUFBRSxLQUFLLEVBQ1osUUFBUSxFQUFFLElBQUksSUFDWCxRQUFRLENBQ1osQ0FBQTtRQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQ0FBb0M7UUFDOUUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN4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
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
        settings = Object.assign({ duration: 1000, easing: easeInOutQuad, offset: 0, align: 'top', onFinish: null }, settings);
        const docElem = document.documentElement; // to facilitate minification better
        const windowHeight = docElem.clientHeight;
        const maxScroll = 'scrollMaxY' in window
            ? window.scrollMaxY
            : docElem.scrollHeight - windowHeight;
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
                settings.onFinish && settingds.onFinish();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxxQkFBcUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQzVCLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVDLElBQUksQ0FBQyxvQkFBb0I7UUFBRSxPQUFPO0lBQ2xDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNyQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDO0FBVUgsU0FBUyxRQUFRLENBQ2YsTUFBbUIsRUFDbkIsV0FBdUMsRUFBRTtJQUd6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXJDLFFBQVEsbUJBQ04sUUFBUSxFQUFFLElBQUksRUFDZCxNQUFNLEVBQUUsYUFBYSxFQUNyQixNQUFNLEVBQUUsQ0FBQyxFQUNULEtBQUssRUFBRSxLQUFLLEVBQ1osUUFBUSxFQUFFLElBQUksSUFDWCxRQUFRLENBQ1osQ0FBQTtRQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQ0FBb0M7UUFDOUUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMx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
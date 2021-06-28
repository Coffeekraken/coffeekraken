// @ts-nocheck
import easeInOutQuad from '../../../shared/easing/easeInOutQuad';
import requestAnimationFrame from '../utlls/requestAnimationFrame';
/**
 * @name      scrollTo
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxxQkFBcUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUM1QixJQUFJLG9CQUFvQixDQUFDO0FBQ3pCLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM1QyxJQUFJLENBQUMsb0JBQW9CO1FBQUUsT0FBTztJQUNsQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDckMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDVixDQUFDLENBQUMsQ0FBQztBQVVILFNBQVMsUUFBUSxDQUNmLE1BQW1CLEVBQ25CLFdBQXVDLEVBQUU7SUFHekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUVyQyxRQUFRLG1CQUNOLFFBQVEsRUFBRSxHQUFHLEVBQ2IsTUFBTSxFQUFFLGFBQWEsRUFDckIsTUFBTSxFQUFFLENBQUMsRUFDVCxLQUFLLEVBQUUsS0FBSyxFQUNaLFFBQVEsRUFBRSxJQUFJLElBQ1gsUUFBUSxDQUNaLENBQUE7UUFFRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsb0NBQW9DO1FBQzlFLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFD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
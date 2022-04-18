// @ts-nocheck

import easeInOutQuad from '../../../shared/easing/easeInOutQuad';
import requestAnimationFrame from '../utlls/requestAnimationFrame';
import __isUserScrolling from '../is/userScrolling';

/**
 * @name      scrollTo
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
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
 * import scrollTop from '@coffeekraken/sugar/js/dom/scroll/scrollTo'
 * import easeInOutQuad from '@coffeekraken/sugar/js/easings/easeInOutQuad'
 * scrollTo(myCoolHTMLElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IScrollToSettings {
    $elm: HTMLElement;
    duration: number;
    easing: Function;
    offset: number;
    offsetX: number;
    offsetY: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end';
    onFinish: Function;
}

function scrollTo(
    target: HTMLElement | 'top' | 'bottom' | 'left' | 'right',
    settings: Partial<IScrollToSettings> = {},
): Promise<any> {
    return new Promise((resolve, reject) => {
        settings = {
            $elm: window,
            duration: 500,
            easing: easeInOutQuad,
            offset: 0,
            offsetX: undefined,
            offsetY: undefined,
            align: 'start',
            justify: 'start',
            onFinish: null,
            ...settings,
        };

        // remap element if needed
        if (settings.$elm === document.body) settings.$elm = window;
        if (settings.$elm === document) settings.$elm = window;

        const $scrollElm =
            settings.$elm === window ? document.body : settings.$elm;

        let elmHeight =
            settings.$elm === window
                ? window.innerHeight
                : settings.$elm.offsetHeight;
        let elmWidth =
            settings.$elm === window
                ? window.innerWidth
                : settings.$elm.offsetWidth;

        let elmTop =
            settings.$elm === window
                ? 0
                : settings.$elm?.getBoundingClientRect().top;
        let elmLeft =
            settings.$elm === window
                ? 0
                : settings.$elm?.getBoundingClientRect().left;

        let maxScrollY = $scrollElm.scrollHeight - elmHeight;
        let maxScrollX = $scrollElm.scrollWidth - elmWidth;

        const currentY =
            settings.$elm === window
                ? window.pageYOffset
                : settings.$elm?.scrollTop;
        const currentX =
            settings.$elm === window
                ? window.pageXOffset
                : settings.$elm?.scrollLeft;

        // handle paddings
        if (settings.$elm !== window) {
            const computedScrollStyles = window.getComputedStyle(settings.$elm);
            maxScrollY += parseInt(computedScrollStyles.paddingTop);
            maxScrollY += parseInt(computedScrollStyles.paddingBottom);
            maxScrollX += parseInt(computedScrollStyles.paddingLeft);
            maxScrollX += parseInt(computedScrollStyles.paddingRight);
        }

        let targetY = currentY,
            targetX = currentX;
        let targetBounds;
        try {
            targetBounds = target.getBoundingClientRect();
        } catch (e) {
            targetBounds = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }

        const offsetY = settings.offsetY ?? settings.offset;
        const offsetX = settings.offsetX ?? settings.offset;

        if (target === 'top') {
            targetY = 0;
        } else if (target === 'bottom') {
            targetY =
                settings.$elm?.scrollHeight ??
                document.documentElement.scrollHeight;
        }

        if (target === 'left') {
            targetX = 0;
        } else if (target === 'right') {
            targetY =
                settings.$elm?.scrollWidth ??
                document.documentElement.scrollWidth;
        }

        // y
        if (settings.align === 'center') {
            targetY += targetBounds.top + targetBounds.height / 2;
            targetY -= elmHeight / 2;
            targetY -= offsetY;
        } else if (settings.align === 'end') {
            targetY += targetBounds.bottom;
            targetY -= elmHeight;
            targetY += offsetY;
        } else {
            // start, undefined
            targetY += targetBounds.top;
            targetY -= offsetY;
        }

        targetY = Math.max(Math.min(maxScrollY, targetY), 0);
        const deltaY = targetY - currentY - elmTop;

        // x
        if (settings.justify === 'center') {
            targetX += targetBounds.left + targetBounds.width / 2;
            targetX -= elmWidth / 2;
            targetX -= offsetX;
        } else if (settings.justify === 'end') {
            targetX += targetBounds.right;
            targetX -= elmWidth;
            targetX += offsetX;
        } else {
            // start, undefined
            targetX += targetBounds.left;
            targetX -= offsetX;
        }
        targetX = Math.max(Math.min(maxScrollX, targetX), 0);
        const deltaX = targetX - currentX - elmLeft;

        // element position
        if (settings.$elm?.getBoundingClientRect) {
            const elmBounds = settings.$elm.getBoundingClientRect();
            targetY -= elmBounds.top;
            targetX -= elmBounds.left;
        }

        const obj = {
            targetY,
            targetX,
            deltaY,
            deltaX,
            currentY,
            currentX,
            duration: settings.duration,
            easing: settings.easing,
            $elm: settings.$elm,
            onFinish() {
                settings.onFinish && settings.onFinish();
                resolve();
            },
            startTime: Date.now(),
            step: scrollTo.step,
        };

        requestAnimationFrame(obj.step.bind(obj));
    });
}

scrollTo.step = function () {
    // Calculate how much time has passed
    const t = Math.min((Date.now() - this.startTime) / this.duration, 1);

    let $scrollElm = this.$elm;
    if (this.$elm === document.body || this.$elm === document) {
        $scrollElm = window;
    }

    // Scroll window amount determined by easing
    const x = this.targetX - (1 - this.easing(t)) * this.deltaX;
    const y = this.targetY - (1 - this.easing(t)) * this.deltaY;

    $scrollElm.scrollTo(x, y);

    if (__isUserScrolling(this.$elm)) return;

    // Continue animation as long as duration hasn't surpassed
    if (t !== 1) {
        requestAnimationFrame(this.step.bind(this));
    } else {
        if (this.onFinish) this.onFinish();
    }
};

export default scrollTo;

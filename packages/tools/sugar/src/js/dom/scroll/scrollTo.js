// @ts-nocheck
import easeInOutQuad from '../../../shared/easing/easeInOutQuad';
import requestAnimationFrame from '../utlls/requestAnimationFrame';
import __isUserScrolling from '../is/userScrolling';
function scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d;
        settings = Object.assign({ $elm: window, duration: 500, easing: easeInOutQuad, offset: 0, offsetX: undefined, offsetY: undefined, align: 'start', justify: 'start', onFinish: null }, settings);
        // remap element if needed
        if (settings.$elm === document.body)
            settings.$elm = window;
        if (settings.$elm === document)
            settings.$elm = window;
        const $scrollElm = settings.$elm === window ? document.body : settings.$elm;
        let elmHeight = settings.$elm === window ? window.innerHeight : settings.$elm.offsetHeight;
        let elmWidth = settings.$elm === window ? window.innerWidth : settings.$elm.offsetWidth;
        let maxScrollY = $scrollElm.scrollHeight - elmHeight;
        let maxScrollX = $scrollElm.scrollWidth - elmWidth;
        const currentY = settings.$elm === window ? window.pageYOffset : (_a = settings.$elm) === null || _a === void 0 ? void 0 : _a.scrollTop;
        const currentX = settings.$elm === window ? window.pageXOffset : (_b = settings.$elm) === null || _b === void 0 ? void 0 : _b.scrollLeft;
        // handle paddings
        if (settings.$elm !== window) {
            const computedScrollStyles = window.getComputedStyle(settings.$elm);
            maxScrollY += parseInt(computedScrollStyles.paddingTop);
            maxScrollY += parseInt(computedScrollStyles.paddingBottom);
            maxScrollX += parseInt(computedScrollStyles.paddingLeft);
            maxScrollX += parseInt(computedScrollStyles.paddingRight);
        }
        let targetY = currentY, targetX = currentX;
        const elementBounds = target.getBoundingClientRect();
        const offsetY = (_c = settings.offsetY) !== null && _c !== void 0 ? _c : settings.offset;
        const offsetX = (_d = settings.offsetX) !== null && _d !== void 0 ? _d : settings.offset;
        // y
        if (settings.align === 'center') {
            targetY += elementBounds.top + elementBounds.height / 2;
            targetY -= elmHeight / 2;
            targetY -= offsetY;
        }
        else if (settings.align === 'end') {
            targetY += elementBounds.bottom;
            targetY -= elmHeight;
            targetY += offsetY;
        }
        else {
            // start, undefined
            targetY += elementBounds.top;
            targetY -= offsetY;
        }
        targetY = Math.max(Math.min(maxScrollY, targetY), 0);
        const deltaY = targetY - currentY;
        // x
        if (settings.justify === 'center') {
            targetX += elementBounds.left + elementBounds.width / 2;
            targetX -= elmWidth / 2;
            targetX -= offsetX;
        }
        else if (settings.justify === 'end') {
            targetX += elementBounds.right;
            targetX -= elmWidth;
            targetX += offsetX;
        }
        else {
            // start, undefined
            targetX += elementBounds.left;
            targetX -= offsetX;
        }
        targetX = Math.max(Math.min(maxScrollX, targetX), 0);
        const deltaX = targetX - currentX;
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
    if (__isUserScrolling(this.$elm))
        return;
    // Continue animation as long as duration hasn't surpassed
    if (t !== 1) {
        requestAnimationFrame(this.step.bind(this));
    }
    else {
        if (this.onFinish)
            this.onFinish();
    }
};
export default scrollTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxxQkFBcUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBZ0RwRCxTQUFTLFFBQVEsQ0FDYixNQUFtQixFQUNuQixXQUF1QyxFQUFFO0lBRXpDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ25DLFFBQVEsbUJBQ0osSUFBSSxFQUFFLE1BQU0sRUFDWixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSxhQUFhLEVBQ3JCLE1BQU0sRUFBRSxDQUFDLEVBQ1QsT0FBTyxFQUFFLFNBQVMsRUFDbEIsT0FBTyxFQUFFLFNBQVMsRUFDbEIsS0FBSyxFQUFFLE9BQU8sRUFDZCxPQUFPLEVBQUUsT0FBTyxFQUNoQixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsQ0FDZCxDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTtZQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzVELElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFFdkQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFNUUsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEs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
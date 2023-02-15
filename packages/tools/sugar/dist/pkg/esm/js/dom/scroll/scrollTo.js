// @ts-nocheck
import { __isUserScrolling } from '@coffeekraken/sugar/dom';
import easeInOutQuad from '../../../shared/easing/easeInOutQuad';
import requestAnimationFrame from '../utilities/requestAnimationFrame';
export default function __scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        settings = Object.assign({ $elm: window, duration: 500, easing: easeInOutQuad, offset: 0, offsetX: undefined, offsetY: undefined, align: 'start', justify: 'start', onFinish: null }, settings);
        // remap element if needed
        if (settings.$elm === document.body)
            settings.$elm = window;
        if (settings.$elm === document)
            settings.$elm = window;
        const $scrollElm = settings.$elm === window ? document.body : settings.$elm;
        let elmHeight = settings.$elm === window
            ? window.innerHeight
            : settings.$elm.offsetHeight;
        let elmWidth = settings.$elm === window
            ? window.innerWidth
            : settings.$elm.offsetWidth;
        let elmTop = settings.$elm === window
            ? 0
            : (_a = settings.$elm) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top;
        let elmLeft = settings.$elm === window
            ? 0
            : (_b = settings.$elm) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left;
        let maxScrollY = $scrollElm.scrollHeight - elmHeight;
        let maxScrollX = $scrollElm.scrollWidth - elmWidth;
        const currentY = settings.$elm === window
            ? window.pageYOffset
            : (_c = settings.$elm) === null || _c === void 0 ? void 0 : _c.scrollTop;
        const currentX = settings.$elm === window
            ? window.pageXOffset
            : (_d = settings.$elm) === null || _d === void 0 ? void 0 : _d.scrollLeft;
        // handle paddings
        if (settings.$elm !== window) {
            const computedScrollStyles = window.getComputedStyle(settings.$elm);
            maxScrollY += parseInt(computedScrollStyles.paddingTop);
            maxScrollY += parseInt(computedScrollStyles.paddingBottom);
            maxScrollX += parseInt(computedScrollStyles.paddingLeft);
            maxScrollX += parseInt(computedScrollStyles.paddingRight);
        }
        let targetY = currentY, targetX = currentX;
        let targetBounds;
        try {
            targetBounds = target.getBoundingClientRect();
        }
        catch (e) {
            targetBounds = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }
        const offsetY = (_e = settings.offsetY) !== null && _e !== void 0 ? _e : settings.offset;
        const offsetX = (_f = settings.offsetX) !== null && _f !== void 0 ? _f : settings.offset;
        if (target === 'top') {
            targetY = 0;
        }
        else if (target === 'bottom') {
            targetY =
                (_h = (_g = settings.$elm) === null || _g === void 0 ? void 0 : _g.scrollHeight) !== null && _h !== void 0 ? _h : document.documentElement.scrollHeight;
        }
        if (target === 'left') {
            targetX = 0;
        }
        else if (target === 'right') {
            targetY =
                (_k = (_j = settings.$elm) === null || _j === void 0 ? void 0 : _j.scrollWidth) !== null && _k !== void 0 ? _k : document.documentElement.scrollWidth;
        }
        // y
        if (settings.align === 'center') {
            targetY += targetBounds.top + targetBounds.height / 2;
            targetY -= elmHeight / 2;
            targetY -= offsetY;
        }
        else if (settings.align === 'end') {
            targetY += targetBounds.bottom;
            targetY -= elmHeight;
            targetY += offsetY;
        }
        else {
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
        }
        else if (settings.justify === 'end') {
            targetX += targetBounds.right;
            targetX -= elmWidth;
            targetX += offsetX;
        }
        else {
            // start, undefined
            targetX += targetBounds.left;
            targetX -= offsetX;
        }
        targetX = Math.max(Math.min(maxScrollX, targetX), 0);
        const deltaX = targetX - currentX - elmLeft;
        // element position
        if ((_l = settings.$elm) === null || _l === void 0 ? void 0 : _l.getBoundingClientRect) {
            const elmBounds = settings.$elm.getBoundingClientRect();
            targetY -= elmBounds.top;
            targetX -= elmBounds.left;
        }
        console.log('__scro', settings.$elm === window ? 'window' : 'node');
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
            step: __scrollTo.step,
        };
        requestAnimationFrame(obj.step.bind(obj));
    });
}
__scrollTo.step = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLHFCQUFxQixNQUFNLG9DQUFvQyxDQUFDO0FBaUR2RSxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsTUFBeUQsRUFDekQsV0FBdUMsRUFBRTtJQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztRQUNuQyxRQUFRLG1CQUNKLElBQUksRUFBRSxNQUFNLEVBQ1osUUFBUSxFQUFFLEdBQUcsRUFDYixNQUFNLEVBQUUsYUFBYSxFQUNyQixNQUFNLEVBQUUsQ0FBQyxFQUNULE9BQU8sRUFBRSxTQUFTLEVBQ2xCLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLEtBQUssRUFBRSxPQUFPLEVBQ2QsT0FBTyxFQUFFLE9BQU8sRUFDaEIsUUFBUSxFQUFFLElBQUksSUFDWCxRQUFRLENBQ2QsQ0FBQztRQUVGLDBCQUEwQjtRQUMxQixJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUk7WUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUM1RCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBRXZELE1BQU0sVUFBVSxHQUNaLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRTdELElBQUksU0FBUyxHQUNULFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLFdB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
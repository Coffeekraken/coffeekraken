var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __isUserScrolling from '../is/isUserScrolling.js';
import easeInOutQuad from '../../../shared/easing/easeInOutQuad.js';
import requestAnimationFrame from '../utilities/requestAnimationFrame.js';
export default function __scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        settings = Object.assign({ $elm: window, duration: (_f = (_e = (_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, 'scroll')) === null || _e === void 0 ? void 0 : _e.duration) !== null && _f !== void 0 ? _f : 500, easing: easeInOutQuad, offset: 0, offsetX: (_l = (_k = (_j = (_h = (_g = document.env) === null || _g === void 0 ? void 0 : _g.SUGAR) === null || _h === void 0 ? void 0 : _h.theme) === null || _j === void 0 ? void 0 : _j.get) === null || _k === void 0 ? void 0 : _k.call(_j, 'scroll')) === null || _l === void 0 ? void 0 : _l.offsetX, offsetY: (_r = (_q = (_p = (_o = (_m = document.env) === null || _m === void 0 ? void 0 : _m.SUGAR) === null || _o === void 0 ? void 0 : _o.theme) === null || _p === void 0 ? void 0 : _p.get) === null || _q === void 0 ? void 0 : _q.call(_p, 'scroll')) === null || _r === void 0 ? void 0 : _r.offsetY, align: 'start', justify: 'start', onFinish: null, force: false }, settings);
        // remap element if needed
        if (settings.$elm === document.body)
            settings.$elm = window;
        if (settings.$elm === document)
            settings.$elm = window;
        if (settings.$elm === document.querySelector('html'))
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
            : (_s = settings.$elm) === null || _s === void 0 ? void 0 : _s.getBoundingClientRect().top;
        let elmLeft = settings.$elm === window
            ? 0
            : (_t = settings.$elm) === null || _t === void 0 ? void 0 : _t.getBoundingClientRect().left;
        let maxScrollY = $scrollElm.scrollHeight - elmHeight;
        let maxScrollX = $scrollElm.scrollWidth - elmWidth;
        const currentY = settings.$elm === window
            ? window.pageYOffset
            : (_u = settings.$elm) === null || _u === void 0 ? void 0 : _u.scrollTop;
        const currentX = settings.$elm === window
            ? window.pageXOffset
            : (_v = settings.$elm) === null || _v === void 0 ? void 0 : _v.scrollLeft;
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
            if (window.getComputedStyle(target).display === 'none') {
                target.style.display = 'block';
            }
            targetBounds = target.getBoundingClientRect();
            target.style.display = null;
        }
        catch (e) {
            targetBounds = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }
        const offsetY = (_w = settings.offsetY) !== null && _w !== void 0 ? _w : settings.offset;
        const offsetX = (_x = settings.offsetX) !== null && _x !== void 0 ? _x : settings.offset;
        if (target === 'top') {
            targetY = 0;
        }
        else if (target === 'bottom') {
            targetY =
                (_z = (_y = settings.$elm) === null || _y === void 0 ? void 0 : _y.scrollHeight) !== null && _z !== void 0 ? _z : document.documentElement.scrollHeight;
        }
        if (target === 'left') {
            targetX = 0;
        }
        else if (target === 'right') {
            targetY =
                (_1 = (_0 = settings.$elm) === null || _0 === void 0 ? void 0 : _0.scrollWidth) !== null && _1 !== void 0 ? _1 : document.documentElement.scrollWidth;
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
        if ((_2 = settings.$elm) === null || _2 === void 0 ? void 0 : _2.getBoundingClientRect) {
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
            force: settings.force,
            $elm: settings.$elm,
            onFinish() {
                settings.onFinish && settings.onFinish();
                resolve();
            },
            startTime: Date.now(),
            step: __scrollTo.step,
        };
        requestAnimationFrame(obj.step.bind(obj));
    }));
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
    if (!this.force && __isUserScrolling(this.$elm))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBRXpELE9BQU8sYUFBYSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BFLE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUFvRDFFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUM5QixNQUF5RCxFQUN6RCxXQUF1QyxFQUFFO0lBRXpDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3pDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLE1BQU0sRUFDWixRQUFRLEVBQ0osTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsbURBQUcsUUFBUSxDQUFDLDBDQUFFLFFBQVEsbUNBQUksR0FBRyxFQUNoRSxNQUFNLEVBQUUsYUFBYSxFQUNyQixNQUFNLEVBQUUsQ0FBQyxFQUNULE9BQU8sRUFBRSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsbURBQUcsUUFBUSxDQUFDLDBDQUFFLE9BQU8sRUFDN0QsT0FBTyxFQUFFLE1BQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssMENBQUUsR0FBRyxtREFBRyxRQUFRLENBQUMsMENBQUUsT0FBTyxFQUM3RCxLQUFLLEVBQUUsT0FBTyxFQUNkLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFFBQVEsRUFBRSxJQUFJLEVBQ2QsS0FBSyxFQUFFLEtBQUssSUFDVCxRQUFRLENBQ2QsQ0FBQztRQUVGLDBCQUEwQjtRQUMxQixJQUFJLFFBQVEs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
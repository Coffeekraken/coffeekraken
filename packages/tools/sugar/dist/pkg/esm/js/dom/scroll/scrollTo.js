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
        settings = Object.assign({ $elm: window, duration: (_f = (_e = (_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, 'scroll')) === null || _e === void 0 ? void 0 : _e.duration) !== null && _f !== void 0 ? _f : 500, easing: easeInOutQuad, offsetX: (_l = (_k = (_j = (_h = (_g = document.env) === null || _g === void 0 ? void 0 : _g.SUGAR) === null || _h === void 0 ? void 0 : _h.theme) === null || _j === void 0 ? void 0 : _j.get) === null || _k === void 0 ? void 0 : _k.call(_j, 'scroll')) === null || _l === void 0 ? void 0 : _l.offsetX, offsetY: (_r = (_q = (_p = (_o = (_m = document.env) === null || _m === void 0 ? void 0 : _m.SUGAR) === null || _o === void 0 ? void 0 : _o.theme) === null || _p === void 0 ? void 0 : _p.get) === null || _q === void 0 ? void 0 : _q.call(_p, 'scroll')) === null || _r === void 0 ? void 0 : _r.offsetY, align: 'start', justify: 'start', onFinish: null, force: false }, settings);
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
        const offsetY = (_w = settings.offsetY) !== null && _w !== void 0 ? _w : 0;
        const offsetX = (_x = settings.offsetX) !== null && _x !== void 0 ? _x : 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBRXpELE9BQU8sYUFBYSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BFLE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUFtRDFFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUM5QixNQUF5RCxFQUN6RCxXQUF1QyxFQUFFO0lBRXpDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3pDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLE1BQU0sRUFDWixRQUFRLEVBQ0osTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsbURBQUcsUUFBUSxDQUFDLDBDQUFFLFFBQVEsbUNBQUksR0FBRyxFQUNoRSxNQUFNLEVBQUUsYUFBYSxFQUNyQixPQUFPLEVBQUUsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsS0FBSywwQ0FBRSxHQUFHLG1EQUFHLFFBQVEsQ0FBQywwQ0FBRSxPQUFPLEVBQzdELE9BQU8sRUFBRSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsbURBQUcsUUFBUSxDQUFDLDBDQUFFLE9BQU8sRUFDN0QsS0FBSyxFQUFFLE9BQU8sRUFDZCxPQUFPLEVBQUUsT0FBTyxFQUNoQixRQUFRLEVBQUUsSUFBSSxFQUNkLEtBQUssRUFBRSxLQUFLLElBQ1QsUUFBUSxDQUNkLENBQUM7UUFFRiwwQkFBMEI7UUFDMUIsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEs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
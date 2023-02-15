"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const easeInOutQuad_1 = __importDefault(require("../../../shared/easing/easeInOutQuad"));
const requestAnimationFrame_1 = __importDefault(require("../utilities/requestAnimationFrame"));
function __scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        settings = Object.assign({ $elm: window, duration: 500, easing: easeInOutQuad_1.default, offset: 0, offsetX: undefined, offsetY: undefined, align: 'start', justify: 'start', onFinish: null }, settings);
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
        (0, requestAnimationFrame_1.default)(obj.step.bind(obj));
    });
}
exports.default = __scrollTo;
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
    if ((0, dom_1.__isUserScrolling)(this.$elm))
        return;
    // Continue animation as long as duration hasn't surpassed
    if (t !== 1) {
        (0, requestAnimationFrame_1.default)(this.step.bind(this));
    }
    else {
        if (this.onFinish)
            this.onFinish();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE0RDtBQUM1RCx5RkFBaUU7QUFDakUsK0ZBQXVFO0FBaUR2RSxTQUF3QixVQUFVLENBQzlCLE1BQXlELEVBQ3pELFdBQXVDLEVBQUU7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7UUFDbkMsUUFBUSxtQkFDSixJQUFJLEVBQUUsTUFBTSxFQUNaLFFBQVEsRUFBRSxHQUFHLEVBQ2IsTUFBTSxFQUFFLHVCQUFhLEVBQ3JCLE1BQU0sRUFBRSxDQUFDLEVBQ1QsT0FBTyxFQUFFLFNBQVMsRUFDbEIsT0FBTyxFQUFFLFNBQVMsRUFDbEIsS0FBSyxFQUFFLE9BQU8sRUFDZCxPQUFPLEVBQUUsT0FBTyxFQUNoQixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsQ0FDZCxDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTtZQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzVELElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFFdkQsTUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFN0QsSUFBSSxTQUFTLEdBQ1QsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVztZQUNwQixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQ1IsUUFBUSxDQUFDLElB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
import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import easeInOutQuad from "../../../shared/easing/easeInOutQuad";
import requestAnimationFrame from "../utlls/requestAnimationFrame";
import __isUserScrolling from "../is/userScrolling";
function scrollTo(target, settings = {}) {
  return new Promise((resolve, reject) => {
    var _a, _b, _c, _d, _e;
    settings = __spreadValues({
      $elm: window,
      duration: 500,
      easing: easeInOutQuad,
      offset: 0,
      offsetX: void 0,
      offsetY: void 0,
      align: "start",
      justify: "start",
      onFinish: null
    }, settings);
    if (settings.$elm === document.body)
      settings.$elm = window;
    if (settings.$elm === document)
      settings.$elm = window;
    const $scrollElm = settings.$elm === window ? document.body : settings.$elm;
    let elmHeight = settings.$elm === window ? window.innerHeight : settings.$elm.offsetHeight;
    let elmWidth = settings.$elm === window ? window.innerWidth : settings.$elm.offsetWidth;
    let maxScrollY = $scrollElm.scrollHeight - elmHeight;
    let maxScrollX = $scrollElm.scrollWidth - elmWidth;
    const currentY = settings.$elm === window ? window.pageYOffset : (_a = settings.$elm) == null ? void 0 : _a.scrollTop;
    const currentX = settings.$elm === window ? window.pageXOffset : (_b = settings.$elm) == null ? void 0 : _b.scrollLeft;
    if (settings.$elm !== window) {
      const computedScrollStyles = window.getComputedStyle(settings.$elm);
      maxScrollY += parseInt(computedScrollStyles.paddingTop);
      maxScrollY += parseInt(computedScrollStyles.paddingBottom);
      maxScrollX += parseInt(computedScrollStyles.paddingLeft);
      maxScrollX += parseInt(computedScrollStyles.paddingRight);
    }
    let targetY = currentY, targetX = currentX;
    const targetBounds = target.getBoundingClientRect();
    const offsetY = (_c = settings.offsetY) != null ? _c : settings.offset;
    const offsetX = (_d = settings.offsetX) != null ? _d : settings.offset;
    if (settings.align === "center") {
      targetY += targetBounds.top + targetBounds.height / 2;
      targetY -= elmHeight / 2;
      targetY -= offsetY;
    } else if (settings.align === "end") {
      targetY += targetBounds.bottom;
      targetY -= elmHeight;
      targetY += offsetY;
    } else {
      targetY += targetBounds.top;
      targetY -= offsetY;
    }
    targetY = Math.max(Math.min(maxScrollY, targetY), 0);
    const deltaY = targetY - currentY;
    if (settings.justify === "center") {
      targetX += targetBounds.left + targetBounds.width / 2;
      targetX -= elmWidth / 2;
      targetX -= offsetX;
    } else if (settings.justify === "end") {
      targetX += targetBounds.right;
      targetX -= elmWidth;
      targetX += offsetX;
    } else {
      targetX += targetBounds.left;
      targetX -= offsetX;
    }
    targetX = Math.max(Math.min(maxScrollX, targetX), 0);
    const deltaX = targetX - currentX;
    if ((_e = settings.$elm) == null ? void 0 : _e.getBoundingClientRect) {
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
      step: scrollTo.step
    };
    requestAnimationFrame(obj.step.bind(obj));
  });
}
scrollTo.step = function() {
  const t = Math.min((Date.now() - this.startTime) / this.duration, 1);
  let $scrollElm = this.$elm;
  if (this.$elm === document.body || this.$elm === document) {
    $scrollElm = window;
  }
  const x = this.targetX - (1 - this.easing(t)) * this.deltaX;
  const y = this.targetY - (1 - this.easing(t)) * this.deltaY;
  $scrollElm.scrollTo(x, y);
  if (__isUserScrolling(this.$elm))
    return;
  if (t !== 1) {
    requestAnimationFrame(this.step.bind(this));
  } else {
    if (this.onFinish)
      this.onFinish();
  }
};
var scrollTo_default = scrollTo;
export {
  scrollTo_default as default
};

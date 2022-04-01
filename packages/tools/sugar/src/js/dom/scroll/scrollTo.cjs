import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var scrollTo_exports = {};
__export(scrollTo_exports, {
  default: () => scrollTo_default
});
module.exports = __toCommonJS(scrollTo_exports);
var import_easeInOutQuad = __toESM(require("../../../shared/easing/easeInOutQuad"), 1);
var import_requestAnimationFrame = __toESM(require("../utlls/requestAnimationFrame"), 1);
var import_userScrolling = __toESM(require("../is/userScrolling"), 1);
function scrollTo(target, settings = {}) {
  return new Promise((resolve, reject) => {
    var _a, _b, _c, _d, _e;
    settings = __spreadValues({
      $elm: window,
      duration: 500,
      easing: import_easeInOutQuad.default,
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
    (0, import_requestAnimationFrame.default)(obj.step.bind(obj));
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
  if ((0, import_userScrolling.default)(this.$elm))
    return;
  if (t !== 1) {
    (0, import_requestAnimationFrame.default)(this.step.bind(this));
  } else {
    if (this.onFinish)
      this.onFinish();
  }
};
var scrollTo_default = scrollTo;

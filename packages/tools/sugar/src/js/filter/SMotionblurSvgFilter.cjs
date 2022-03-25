var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var SMotionblurSvgFilter_exports = {};
__export(SMotionblurSvgFilter_exports, {
  default: () => SMotionblurSvgFilter
});
module.exports = __toCommonJS(SMotionblurSvgFilter_exports);
var import_offset = __toESM(require("../dom/offset/offset"));
var import_SSvgFilter = __toESM(require("./SSvgFilter"));
var import_fastdom = __toESM(require("fastdom"));
var import_forceRedraw = __toESM(require("../dom/utlls/forceRedraw"));
class SMotionblurSvgFilter extends import_SSvgFilter.default {
  constructor(amount = 0.5) {
    super(`
			<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
		`);
    this.amount = 0.5;
    this._isMoving = false;
    this._startMoveTimeout = null;
    this.amount = parseFloat(amount);
    this._animationFrame = null;
    this._blur = this.filter.querySelector("feGaussianBlur");
  }
  applyTo(elm) {
    super.applyTo(elm);
    this._onMotionStartFn = this._onMotionStart.bind(this);
    this._onMotionStopFn = this._onMotionStop.bind(this);
    elm.addEventListener("transitionstart", this._onMotionStartFn);
    elm.addEventListener("animationstart", this._onMotionStartFn);
    elm.addEventListener("dragstart", this._onMotionStartFn);
    elm.addEventListener("transitionend", this._onMotionStopFn);
    elm.addEventListener("animationend", this._onMotionStopFn);
    elm.addEventListener("dragend", this._onMotionStopFn);
    this._lastPos = (0, import_offset.default)(this.elms[0]);
  }
  unapplyFrom(elm) {
    elm.removeEventListener("animationStart", this._onMotionStartFn);
    elm.removeEventListener("transitionstart", this._onMotionStartFn);
    elm.removeEventListener("dragstart", this._onMotionStartFn);
    elm.removeEventListener("transitionend", this._onMotionStopFn);
    elm.removeEventListener("animationend", this._onMotionStopFn);
    elm.removeEventListener("dragend", this._onMotionStopFn);
    super.unapplyFrom(elm);
  }
  _onMotionStart(e) {
    if (e.target !== this.elms[0])
      return;
    clearTimeout(this._startMoveTimeout);
    this._startMoveTimeout = setTimeout(() => {
      this._isMoving = true;
      this._handleFilter();
    });
  }
  _onMotionStop(e) {
    if (e.target !== this.elms[0])
      return;
    if (!this._isMoving)
      return;
    this._isMoving = false;
    import_fastdom.default.mutate(() => {
      this._blur.setAttribute("stdDeviation", 0 + "," + 0);
      (0, import_forceRedraw.default)(this.elms[0]);
    });
  }
  _handleFilter() {
    if (!this._isMoving)
      return;
    const diff = this._setMotionBlur();
    this._animationFrame = requestAnimationFrame(() => {
      this._handleFilter();
    });
  }
  _setMotionBlur() {
    this._currentPos = (0, import_offset.default)(this.elms[0]);
    const xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
    const yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
    this._blur.setAttribute("stdDeviation", xDiff + "," + yDiff);
    this._lastPos = (0, import_offset.default)(this.elms[0]);
    return {
      x: xDiff,
      y: yDiff
    };
  }
  destroy() {
    cancelAnimationFrame(this._animationFrame);
    super.destroy();
  }
}

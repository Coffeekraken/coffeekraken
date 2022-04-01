import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __offset from "../dom/offset/offset";
import SSvgFilter from "./SSvgFilter";
import fastdom from "fastdom";
import forceRedraw from "../dom/utlls/forceRedraw";
class SMotionblurSvgFilter extends SSvgFilter {
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
    this._lastPos = __offset(this.elms[0]);
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
    fastdom.mutate(() => {
      this._blur.setAttribute("stdDeviation", 0 + "," + 0);
      forceRedraw(this.elms[0]);
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
    this._currentPos = __offset(this.elms[0]);
    const xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
    const yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
    this._blur.setAttribute("stdDeviation", xDiff + "," + yDiff);
    this._lastPos = __offset(this.elms[0]);
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
export {
  SMotionblurSvgFilter as default
};

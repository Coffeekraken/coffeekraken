"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _offset = _interopRequireDefault(require("../dom/offset"));

var _SSvgFilter = _interopRequireDefault(require("./SSvgFilter"));

var _fastdom = _interopRequireDefault(require("fastdom"));

var _forceRedraw = _interopRequireDefault(require("../dom/forceRedraw"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		SMotionblurSvgFilter
 * @namespace       sugar.js.filter
 * @type      Class
 *
 * This class represent a motion blur svg filter that will blur your
 * element depending on his movements, direction and speed
 *
 * @example 		js
 * const filter = new SMotionblurSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 * // now when your element will move, it will be blured accordingly
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SMotionblurSvgFilter extends _SSvgFilter.default {
  /**
   * Store the amount of motion blur to apply
   * @type 	{Number}
   */

  /**
   * Store the status of the animation
   * @type 		{Boolean}
   */

  /**
   * @constructor
   * @param 		{Number} 		amount 			The motion blur amount
   */
  constructor(amount = 0.5) {
    super(`
			<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
		`); // settings

    _defineProperty(this, "amount", 0.5);

    _defineProperty(this, "_isMoving", false);

    _defineProperty(this, "_startMoveTimeout", null);

    this.amount = parseFloat(amount); // variables

    this._animationFrame = null; // filter elements

    this._blur = this.filter.querySelector("feGaussianBlur");
  }
  /**
   * Apply the filter to element
   * @override
   * @param 		{HTMLElement} 		elm 		The element on which to apply the filter
   */


  applyTo(elm) {
    // call parent method
    super.applyTo(elm); // listen to animation, transitionstart and move event

    this._onMotionStartFn = this._onMotionStart.bind(this);
    this._onMotionStopFn = this._onMotionStop.bind(this);
    elm.addEventListener("transitionstart", this._onMotionStartFn);
    elm.addEventListener("animationstart", this._onMotionStartFn);
    elm.addEventListener("dragstart", this._onMotionStartFn);
    elm.addEventListener("transitionend", this._onMotionStopFn);
    elm.addEventListener("animationend", this._onMotionStopFn);
    elm.addEventListener("dragend", this._onMotionStopFn);
    this._lastPos = (0, _offset.default)(this.elms[0]);
  }
  /**
   * Remove the filter from element
   * @override
   * @param 	{HTMLElement} 	elm 	The element to unapply the filter from
   */


  unapplyFrom(elm) {
    // remove event listeners
    elm.removeEventListener("animationStart", this._onMotionStartFn);
    elm.removeEventListener("transitionstart", this._onMotionStartFn);
    elm.removeEventListener("dragstart", this._onMotionStartFn);
    elm.removeEventListener("transitionend", this._onMotionStopFn);
    elm.removeEventListener("animationend", this._onMotionStopFn);
    elm.removeEventListener("dragend", this._onMotionStopFn); // call parent

    super.unapplyFrom(elm);
  }
  /**
   * When the animation, transition or draging start
   */


  _onMotionStart(e) {
    if (e.target !== this.elms[0]) return;
    clearTimeout(this._startMoveTimeout);
    this._startMoveTimeout = setTimeout(() => {
      this._isMoving = true; // handle filter

      this._handleFilter();
    });
  }
  /**
   * Transition / animation end
   */


  _onMotionStop(e) {
    if (e.target !== this.elms[0]) return;
    if (!this._isMoving) return; // update is moving status

    this._isMoving = false;

    _fastdom.default.mutate(() => {
      // set the blur
      this._blur.setAttribute("stdDeviation", 0 + "," + 0); // redraw the element to ensure proper display


      (0, _forceRedraw.default)(this.elms[0]);
    });
  }
  /**
   * Handle filter
   * @param 		{Boolean} 		recusrive 			If the function need to be called again at the end of it's execution
   */


  _handleFilter() {
    // animation or move is finished
    if (!this._isMoving) return; // set the motion blur and get the moving difference

    let diff = this._setMotionBlur(); // recusrive call to apply the blur with requestAnimationFrame for performances


    this._animationFrame = requestAnimationFrame(() => {
      this._handleFilter();
    });
  }
  /**
   * Set motion blur
   */


  _setMotionBlur() {
    this._currentPos = (0, _offset.default)(this.elms[0]);
    let xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
    let yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount; // set the blur

    this._blur.setAttribute("stdDeviation", xDiff + "," + yDiff); // update lastPos


    this._lastPos = (0, _offset.default)(this.elms[0]); // return the diff

    return {
      x: xDiff,
      y: yDiff
    };
  }
  /**
   * Destroy the filter
   * @override
   */


  destroy() {
    cancelAnimationFrame(this._animationFrame);
    super.destroy();
  }

}

exports.default = SMotionblurSvgFilter;
module.exports = exports.default;
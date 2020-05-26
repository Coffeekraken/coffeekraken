"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _offset = _interopRequireDefault(require("../dom/offset"));

var _SSvgFilter2 = _interopRequireDefault(require("./SSvgFilter"));

var _fastdom = _interopRequireDefault(require("fastdom"));

var _forceRedraw = _interopRequireDefault(require("../dom/forceRedraw"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO tests

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
let SMotionblurSvgFilter = /*#__PURE__*/function (_SSvgFilter) {
  _inherits(SMotionblurSvgFilter, _SSvgFilter);

  var _super = _createSuper(SMotionblurSvgFilter);

  /**
   * @name        amount
   * @type        Number
   * @default     0.5
   * 
   * Store the amount of motion blur to apply
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _isMoving
   * @type        Boolean
   * 
   * Store the status of the animation
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _startMoveTimeout
   * @type        Number
   * 
   * Store the starting moment when the element move
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * 
   * Constructor
   * 
   * @param 		{Number} 		[amount=0.5] 			The motion blur amount
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SMotionblurSvgFilter(amount = 0.5) {
    var _this;

    _classCallCheck(this, SMotionblurSvgFilter);

    _this = _super.call(this, `
			<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
		`); // settings

    _defineProperty(_assertThisInitialized(_this), "amount", 0.5);

    _defineProperty(_assertThisInitialized(_this), "_isMoving", false);

    _defineProperty(_assertThisInitialized(_this), "_startMoveTimeout", null);

    _this.amount = parseFloat(amount); // variables

    _this._animationFrame = null; // filter elements

    _this._blur = _this.filter.querySelector("feGaussianBlur");
    return _this;
  }
  /**
   * @name      applyTo
   * @type      Function
   * @override
   * 
   * Apply the filter to element
   * 
   * @param 		{HTMLElement} 		elm 		The element on which to apply the filter
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SMotionblurSvgFilter, [{
    key: "applyTo",
    value: function applyTo(elm) {
      // call parent method
      _get(_getPrototypeOf(SMotionblurSvgFilter.prototype), "applyTo", this).call(this, elm); // listen to animation, transitionstart and move event


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
     * @name            unapplyFrom
     * @type            Function
     * @override
     * 
     * Remove the filter from element
     * 
     * @param 	{HTMLElement} 	elm 	The element to unapply the filter from
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "unapplyFrom",
    value: function unapplyFrom(elm) {
      // remove event listeners
      elm.removeEventListener("animationStart", this._onMotionStartFn);
      elm.removeEventListener("transitionstart", this._onMotionStartFn);
      elm.removeEventListener("dragstart", this._onMotionStartFn);
      elm.removeEventListener("transitionend", this._onMotionStopFn);
      elm.removeEventListener("animationend", this._onMotionStopFn);
      elm.removeEventListener("dragend", this._onMotionStopFn); // call parent

      _get(_getPrototypeOf(SMotionblurSvgFilter.prototype), "unapplyFrom", this).call(this, elm);
    }
    /**
     * @name          _onMotionStart
     * @type          Function
     * @private
     * 
     * When the animation, transition or draging start
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_onMotionStart",
    value: function _onMotionStart(e) {
      if (e.target !== this.elms[0]) return;
      clearTimeout(this._startMoveTimeout);
      this._startMoveTimeout = setTimeout(() => {
        this._isMoving = true; // handle filter

        this._handleFilter();
      });
    }
    /**
     * @name          _onMotionStop
     * @type          Function
     * @private
     * 
     * Transition / animation end
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_onMotionStop",
    value: function _onMotionStop(e) {
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
     * @name          _handleFilter
     * @type          Function
     * @private
     * 
     * Handle filter
     * 
     * @param 		{Boolean} 		recusrive 			If the function need to be called again at the end of it's execution
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_handleFilter",
    value: function _handleFilter() {
      // animation or move is finished
      if (!this._isMoving) return; // set the motion blur and get the moving difference

      let diff = this._setMotionBlur(); // recusrive call to apply the blur with requestAnimationFrame for performances


      this._animationFrame = requestAnimationFrame(() => {
        this._handleFilter();
      });
    }
    /**
     * @name            _setMotionBlur
     * @type            Function
     * @private
     * 
     * Set motion blur
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_setMotionBlur",
    value: function _setMotionBlur() {
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
     * @name        destroy
     * @type        Function
     * @override
     * 
     * Destroy the filter
     * 
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "destroy",
    value: function destroy() {
      cancelAnimationFrame(this._animationFrame);

      _get(_getPrototypeOf(SMotionblurSvgFilter.prototype), "destroy", this).call(this);
    }
  }]);

  return SMotionblurSvgFilter;
}(_SSvgFilter2.default);

exports.default = SMotionblurSvgFilter;
module.exports = exports.default;
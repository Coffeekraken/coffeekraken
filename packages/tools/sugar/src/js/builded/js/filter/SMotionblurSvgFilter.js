// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dom/offset", "./SSvgFilter", "fastdom", "../dom/forceRedraw"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var offset_1 = __importDefault(require("../dom/offset"));
    var SSvgFilter_1 = __importDefault(require("./SSvgFilter"));
    var fastdom_1 = __importDefault(require("fastdom"));
    var forceRedraw_1 = __importDefault(require("../dom/forceRedraw"));
    /**
     * @name 		SMotionblurSvgFilter
     * @namespace           sugar.js.filter
     * @type      Class
     * @stable
     *
     * This class represent a motion blur svg filter that will blur your
     * element depending on his movements, direction and speed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 		js
     * const filter = new SMotionblurSvgFilter();
     * filter.applyTo(myCoolHTMLElement);
     * // now when your element will move, it will be blured accordingly
     *
     * @since         1.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SMotionblurSvgFilter = /** @class */ (function (_super) {
        __extends(SMotionblurSvgFilter, _super);
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param 		{Number} 		[amount=0.5] 			The motion blur amount
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SMotionblurSvgFilter(amount) {
            if (amount === void 0) { amount = 0.5; }
            var _this = _super.call(this, "\n\t\t\t<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"0,0\" />\n\t\t") || this;
            /**
             * @name        amount
             * @type        Number
             * @default     0.5
             *
             * Store the amount of motion blur to apply
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.amount = 0.5;
            /**
             * @name        _isMoving
             * @type        Boolean
             *
             * Store the status of the animation
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._isMoving = false;
            /**
             * @name        _startMoveTimeout
             * @type        Number
             *
             * Store the starting moment when the element move
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._startMoveTimeout = null;
            // settings
            _this.amount = parseFloat(amount);
            // variables
            _this._animationFrame = null;
            // filter elements
            _this._blur = _this.filter.querySelector('feGaussianBlur');
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype.applyTo = function (elm) {
            // call parent method
            _super.prototype.applyTo.call(this, elm);
            // listen to animation, transitionstart and move event
            this._onMotionStartFn = this._onMotionStart.bind(this);
            this._onMotionStopFn = this._onMotionStop.bind(this);
            elm.addEventListener('transitionstart', this._onMotionStartFn);
            elm.addEventListener('animationstart', this._onMotionStartFn);
            elm.addEventListener('dragstart', this._onMotionStartFn);
            elm.addEventListener('transitionend', this._onMotionStopFn);
            elm.addEventListener('animationend', this._onMotionStopFn);
            elm.addEventListener('dragend', this._onMotionStopFn);
            this._lastPos = offset_1.default(this.elms[0]);
        };
        /**
         * @name            unapplyFrom
         * @type            Function
         * @override
         *
         * Remove the filter from element
         *
         * @param 	{HTMLElement} 	elm 	The element to unapply the filter from
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype.unapplyFrom = function (elm) {
            // remove event listeners
            elm.removeEventListener('animationStart', this._onMotionStartFn);
            elm.removeEventListener('transitionstart', this._onMotionStartFn);
            elm.removeEventListener('dragstart', this._onMotionStartFn);
            elm.removeEventListener('transitionend', this._onMotionStopFn);
            elm.removeEventListener('animationend', this._onMotionStopFn);
            elm.removeEventListener('dragend', this._onMotionStopFn);
            // call parent
            _super.prototype.unapplyFrom.call(this, elm);
        };
        /**
         * @name          _onMotionStart
         * @type          Function
         * @private
         *
         * When the animation, transition or draging start
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype._onMotionStart = function (e) {
            var _this = this;
            if (e.target !== this.elms[0])
                return;
            clearTimeout(this._startMoveTimeout);
            this._startMoveTimeout = setTimeout(function () {
                _this._isMoving = true;
                // handle filter
                _this._handleFilter();
            });
        };
        /**
         * @name          _onMotionStop
         * @type          Function
         * @private
         *
         * Transition / animation end
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype._onMotionStop = function (e) {
            var _this = this;
            if (e.target !== this.elms[0])
                return;
            if (!this._isMoving)
                return;
            // update is moving status
            this._isMoving = false;
            fastdom_1.default.mutate(function () {
                // set the blur
                _this._blur.setAttribute('stdDeviation', 0 + ',' + 0);
                // redraw the element to ensure proper display
                forceRedraw_1.default(_this.elms[0]);
            });
        };
        /**
         * @name          _handleFilter
         * @type          Function
         * @private
         *
         * Handle filter
         *
         * @param 		{Boolean} 		recusrive 			If the function need to be called again at the end of it's execution
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype._handleFilter = function () {
            var _this = this;
            // animation or move is finished
            if (!this._isMoving)
                return;
            // set the motion blur and get the moving difference
            var diff = this._setMotionBlur();
            // recusrive call to apply the blur with requestAnimationFrame for performances
            this._animationFrame = requestAnimationFrame(function () {
                _this._handleFilter();
            });
        };
        /**
         * @name            _setMotionBlur
         * @type            Function
         * @private
         *
         * Set motion blur
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype._setMotionBlur = function () {
            this._currentPos = offset_1.default(this.elms[0]);
            var xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
            var yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
            // set the blur
            this._blur.setAttribute('stdDeviation', xDiff + ',' + yDiff);
            // update lastPos
            this._lastPos = offset_1.default(this.elms[0]);
            // return the diff
            return {
                x: xDiff,
                y: yDiff
            };
        };
        /**
         * @name        destroy
         * @type        Function
         * @override
         *
         * Destroy the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SMotionblurSvgFilter.prototype.destroy = function () {
            cancelAnimationFrame(this._animationFrame);
            _super.prototype.destroy.call(this);
        };
        return SMotionblurSvgFilter;
    }(SSvgFilter_1.default));
    exports.default = SMotionblurSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01vdGlvbmJsdXJTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9maWx0ZXIvU01vdGlvbmJsdXJTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQseURBQXFDO0lBQ3JDLDREQUFzQztJQUN0QyxvREFBOEI7SUFDOUIsbUVBQTZDO0lBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNIO1FBQWtELHdDQUFVO1FBZ0MxRDs7Ozs7Ozs7O1dBU0c7UUFDSCw4QkFBWSxNQUFZO1lBQVosdUJBQUEsRUFBQSxZQUFZO1lBQXhCLFlBQ0Usa0JBQU0sNEVBRVAsQ0FBQyxTQVVEO1lBdEREOzs7Ozs7OztlQVFHO1lBQ0gsWUFBTSxHQUFHLEdBQUcsQ0FBQztZQUViOzs7Ozs7O2VBT0c7WUFDSCxlQUFTLEdBQUcsS0FBSyxDQUFDO1lBRWxCOzs7Ozs7O2VBT0c7WUFDSCx1QkFBaUIsR0FBRyxJQUFJLENBQUM7WUFpQnZCLFdBQVc7WUFDWCxLQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqQyxZQUFZO1lBQ1osS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFFNUIsa0JBQWtCO1lBQ2xCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7UUFDM0QsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxzQ0FBTyxHQUFQLFVBQVEsR0FBRztZQUNULHFCQUFxQjtZQUNyQixpQkFBTSxPQUFPLFlBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZUFB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
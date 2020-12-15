// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
    var offset_1 = __importDefault(require("../dom/offset"));
    var SSvgFilter_1 = __importDefault(require("./SSvgFilter"));
    var fastdom_1 = __importDefault(require("fastdom"));
    var forceRedraw_1 = __importDefault(require("../dom/forceRedraw"));
    return /** @class */ (function (_super) {
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
});
//# sourceMappingURL=SMotionblurSvgFilter.js.map
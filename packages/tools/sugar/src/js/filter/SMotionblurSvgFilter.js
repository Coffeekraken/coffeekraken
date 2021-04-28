// @ts-nocheck
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
    const offset_1 = __importDefault(require("../dom/offset"));
    const SSvgFilter_1 = __importDefault(require("./SSvgFilter"));
    const fastdom_1 = __importDefault(require("fastdom"));
    const forceRedraw_1 = __importDefault(require("../dom/forceRedraw"));
    /**
     * @name 		SMotionblurSvgFilter
     * @namespace            js.filter
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
    class SMotionblurSvgFilter extends SSvgFilter_1.default {
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
        constructor(amount = 0.5) {
            super(`
			<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
		`);
            /**
             * @name        amount
             * @type        Number
             * @default     0.5
             *
             * Store the amount of motion blur to apply
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this.amount = 0.5;
            /**
             * @name        _isMoving
             * @type        Boolean
             *
             * Store the status of the animation
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._isMoving = false;
            /**
             * @name        _startMoveTimeout
             * @type        Number
             *
             * Store the starting moment when the element move
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._startMoveTimeout = null;
            // settings
            this.amount = parseFloat(amount);
            // variables
            this._animationFrame = null;
            // filter elements
            this._blur = this.filter.querySelector('feGaussianBlur');
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
        applyTo(elm) {
            // call parent method
            super.applyTo(elm);
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        unapplyFrom(elm) {
            // remove event listeners
            elm.removeEventListener('animationStart', this._onMotionStartFn);
            elm.removeEventListener('transitionstart', this._onMotionStartFn);
            elm.removeEventListener('dragstart', this._onMotionStartFn);
            elm.removeEventListener('transitionend', this._onMotionStopFn);
            elm.removeEventListener('animationend', this._onMotionStopFn);
            elm.removeEventListener('dragend', this._onMotionStopFn);
            // call parent
            super.unapplyFrom(elm);
        }
        /**
         * @name          _onMotionStart
         * @type          Function
         * @private
         *
         * When the animation, transition or draging start
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _onMotionStart(e) {
            if (e.target !== this.elms[0])
                return;
            clearTimeout(this._startMoveTimeout);
            this._startMoveTimeout = setTimeout(() => {
                this._isMoving = true;
                // handle filter
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _onMotionStop(e) {
            if (e.target !== this.elms[0])
                return;
            if (!this._isMoving)
                return;
            // update is moving status
            this._isMoving = false;
            fastdom_1.default.mutate(() => {
                // set the blur
                this._blur.setAttribute('stdDeviation', 0 + ',' + 0);
                // redraw the element to ensure proper display
                forceRedraw_1.default(this.elms[0]);
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _handleFilter() {
            // animation or move is finished
            if (!this._isMoving)
                return;
            // set the motion blur and get the moving difference
            const diff = this._setMotionBlur();
            // recusrive call to apply the blur with requestAnimationFrame for performances
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _setMotionBlur() {
            this._currentPos = offset_1.default(this.elms[0]);
            const xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
            const yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
            // set the blur
            this._blur.setAttribute('stdDeviation', xDiff + ',' + yDiff);
            // update lastPos
            this._lastPos = offset_1.default(this.elms[0]);
            // return the diff
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        destroy() {
            cancelAnimationFrame(this._animationFrame);
            super.destroy();
        }
    }
    exports.default = SMotionblurSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01vdGlvbmJsdXJTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZmlsdGVyL1NNb3Rpb25ibHVyU3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJEQUFxQztJQUNyQyw4REFBc0M7SUFDdEMsc0RBQThCO0lBQzlCLHFFQUE2QztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxNQUFxQixvQkFBcUIsU0FBUSxvQkFBVTtRQWdDMUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxNQUFNLEdBQUcsR0FBRztZQUN0QixLQUFLLENBQUM7O0dBRVAsQ0FBQyxDQUFDO1lBNUNIOzs7Ozs7OztlQVFHO1lBQ0gsV0FBTSxHQUFHLEdBQUcsQ0FBQztZQUViOzs7Ozs7O2VBT0c7WUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFDO1lBRWxCOzs7Ozs7O2VBT0c7WUFDSCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFpQnZCLFdBQVc7WUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqQyxZQUFZO1lBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFFNUIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sQ0FBQyxHQUFHO1lBQ1QscUJBQXFCO1lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJ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
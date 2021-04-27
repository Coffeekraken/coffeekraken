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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01vdGlvbmJsdXJTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTW90aW9uYmx1clN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwyREFBcUM7SUFDckMsOERBQXNDO0lBQ3RDLHNEQUE4QjtJQUM5QixxRUFBNkM7SUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsTUFBcUIsb0JBQXFCLFNBQVEsb0JBQVU7UUFnQzFEOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksTUFBTSxHQUFHLEdBQUc7WUFDdEIsS0FBSyxDQUFDOztHQUVQLENBQUMsQ0FBQztZQTVDSDs7Ozs7Ozs7ZUFRRztZQUNILFdBQU0sR0FBRyxHQUFHLENBQUM7WUFFYjs7Ozs7OztlQU9HO1lBQ0gsY0FBUyxHQUFHLEtBQUssQ0FBQztZQUVsQjs7Ozs7OztlQU9HO1lBQ0gsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1lBaUJ2QixXQUFXO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFakMsWUFBWTtZQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBRTVCLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLENBQUMsR0FBRztZQUNULHFCQUFxQjtZQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FB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
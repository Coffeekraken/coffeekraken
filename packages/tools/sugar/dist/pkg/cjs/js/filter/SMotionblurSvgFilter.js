"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const filter_1 = require("@coffeekraken/sugar/filter");
/**
 * @name 		SMotionblurSvgFilter
 * @namespace            js.filter
 * @type      Class
 * @platform          js
 * @status      beta
 *
 * This class represent a motion blur svg filter that will blur your
 * element depending on his movements, direction and speed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * import { __SMotionblurSvgFilter } from '@coffeekraken/sugar/filter';
 * const filter = new  __SMotionblurSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 * // now when your element will move, it will be blured accordingly
 *
 @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class __SMotionblurSvgFilter extends filter_1.__SSvgFilter {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param 		{Number} 		[amount=0.5] 			The motion blur amount
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.amount = 0.5;
        /**
         * @name        _isMoving
         * @type        Boolean
         *
         * Store the status of the animation
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._isMoving = false;
        /**
         * @name        _startMoveTimeout
         * @type        Number
         *
         * Store the starting moment when the element move
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        this._lastPos = (0, dom_1.__offsetFromViewport)(this.elms[0]);
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _onMotionStop(e) {
        if (e.target !== this.elms[0])
            return;
        if (!this._isMoving)
            return;
        // update is moving status
        this._isMoving = false;
        // set the blur
        this._blur.setAttribute('stdDeviation', 0 + ',' + 0);
        // redraw the element to ensure proper display
        (0, dom_1.__forceRedraw)(this.elms[0]);
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _setMotionBlur() {
        this._currentPos = (0, dom_1.__offsetFromViewport)(this.elms[0]);
        const xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
        const yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
        // set the blur
        this._blur.setAttribute('stdDeviation', xDiff + ',' + yDiff);
        // update lastPos
        this._lastPos = (0, dom_1.__offsetFromViewport)(this.elms[0]);
        // return the diff
        return {
            x: xDiff,
            y: yDiff,
        };
    }
    /**
     * @name        destroy
     * @type        Function
     * @override
     *
     * Destroy the filter
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    destroy() {
        cancelAnimationFrame(this._animationFrame);
        super.destroy();
    }
}
exports.default = __SMotionblurSvgFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE4RTtBQUM5RSx1REFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFxQixzQkFBdUIsU0FBUSxxQkFBWTtJQWdDNUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFNLEdBQUcsR0FBRztRQUNwQixLQUFLLENBQUM7O0dBRVgsQ0FBQyxDQUFDO1FBNUNEOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUViOzs7Ozs7O1dBT0c7UUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCOzs7Ozs7O1dBT0c7UUFDSCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFpQnJCLFdBQVc7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxZQUFZO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sQ0FBQyxHQUFHO1FBQ1AscUJBQXFCO1FBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENB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
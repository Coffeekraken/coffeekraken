// @ts-nocheck
import __offset from '../dom/offset/offset';
import forceRedraw from '../dom/utlls/forceRedraw';
import SSvgFilter from './SSvgFilter';
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
 * const filter = new SMotionblurSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 * // now when your element will move, it will be blured accordingly
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMotionblurSvgFilter extends SSvgFilter {
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
        this._lastPos = __offset(this.elms[0]);
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
        forceRedraw(this.elms[0]);
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
        this._currentPos = __offset(this.elms[0]);
        const xDiff = Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
        const yDiff = Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;
        // set the blur
        this._blur.setAttribute('stdDeviation', xDiff + ',' + yDiff);
        // update lastPos
        this._lastPos = __offset(this.elms[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsVUFBVTtJQWdDeEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFNLEdBQUcsR0FBRztRQUNwQixLQUFLLENBQUM7O0dBRVgsQ0FBQyxDQUFDO1FBNUNEOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUViOzs7Ozs7O1dBT0c7UUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCOzs7Ozs7O1dBT0c7UUFDSCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFpQnJCLFdBQVc7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxZQUFZO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sQ0FBQyxHQUFHO1FBQ1AscUJBQXFCO1FBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxh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
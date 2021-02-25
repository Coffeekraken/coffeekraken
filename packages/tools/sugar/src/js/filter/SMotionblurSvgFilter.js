// @ts-nocheck
import __offset from '../dom/offset';
import SSvgFilter from './SSvgFilter';
import fastdom from 'fastdom';
import forceRedraw from '../dom/forceRedraw';
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
export default class SMotionblurSvgFilter extends SSvgFilter {
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
        fastdom.mutate(() => {
            // set the blur
            this._blur.setAttribute('stdDeviation', 0 + ',' + 0);
            // redraw the element to ensure proper display
            forceRedraw(this.elms[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01vdGlvbmJsdXJTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTW90aW9uYmx1clN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxVQUFVO0lBZ0MxRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxHQUFHO1FBQ3RCLEtBQUssQ0FBQzs7R0FFUCxDQUFDLENBQUM7UUE1Q0g7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsR0FBRyxDQUFDO1FBRWI7Ozs7Ozs7V0FPRztRQUNILGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEI7Ozs7Ozs7V0FPRztRQUNILHNCQUFpQixHQUFHLElBQUksQ0FBQztRQWlCdkIsV0FBVztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLFlBQVk7UUFDWixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxDQUFDLEdBQUc7UUFDVCxxQkFBcUI7UUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxD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
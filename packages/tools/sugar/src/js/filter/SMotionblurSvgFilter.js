// @ts-nocheck
import __offset from '../dom/offset/offset';
import SSvgFilter from './SSvgFilter';
import fastdom from 'fastdom';
import forceRedraw from '../dom/utlls/forceRedraw';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01vdGlvbmJsdXJTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTW90aW9uYmx1clN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLFVBQVU7SUFnQzFEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksTUFBTSxHQUFHLEdBQUc7UUFDdEIsS0FBSyxDQUFDOztHQUVQLENBQUMsQ0FBQztRQTVDSDs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBRyxHQUFHLENBQUM7UUFFYjs7Ozs7OztXQU9HO1FBQ0gsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQjs7Ozs7OztXQU9HO1FBQ0gsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBaUJ2QixXQUFXO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakMsWUFBWTtRQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLENBQUMsR0FBRztRQUNULHFCQUFxQjtRQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJ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
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
     * @name        amount
     * @type        Number
     * @default     0.5
     *
     * Store the amount of motion blur to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    amount = 0.5;

    /**
     * @name        _isMoving
     * @type        Boolean
     *
     * Store the status of the animation
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _isMoving = false;

    /**
     * @name        _startMoveTimeout
     * @type        Number
     *
     * Store the starting moment when the element move
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _startMoveTimeout = null;

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
        if (e.target !== this.elms[0]) return;
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
        if (e.target !== this.elms[0]) return;
        if (!this._isMoving) return;
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
        if (!this._isMoving) return;

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
        const xDiff =
            Math.abs(this._currentPos.left - this._lastPos.left) * this.amount;
        const yDiff =
            Math.abs(this._currentPos.top - this._lastPos.top) * this.amount;

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

// @ts-nocheck

import __SSvgFilter from './SSvgFilter';

/**
 * @name 		        SOutlineSvgFilter
 * @namespace            js.filter
 * @type            Class
 * @extends 	    	SSvgFilter
 * @platform          js
 * @status        beta
 *
 * This class represent an outline filter that can be applied on any HTMLElement.
 *
 * @snippet         __SOutlineSvgFilter()
 * const filter = new __SOutlineSvgFilter();
 * filter.applyTo($1);
 *
 * @example 		js
 * import {__SOutlineSvgFilter } from '@coffeekraken/sugar/filter';
 * const filter = new __SOutlineSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class __SOutlineSvgFilter extends __SSvgFilter {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @param 		{Number} 		[radius=8] 		The amount of effect to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(radius = 8) {
        super(`
			<feMorphology operator="dilate" radius="${radius}"
			in="SourceGraphic" result="THICKNESS" />
			<feComposite operator="out" in="THICKNESS" in2="SourceGraphic" ></feComposite>
		`);
        this._$morphology = this.filter.querySelector('feMorphology');
    }

    /**
     * @name          radius
     * @type          Number
     *
     * Get/Set the radius to produce the effect
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set radius(value) {
        this._$morphology.setAttribute('radius', value);
    }
    get radius() {
        return parseFloat(this._$morphology.getAttribute('radius'));
    }
}

// @ts-nocheck

import * as rematrix from 'rematrix';

/**
 * @name      getScaleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get a scale properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Number}                                     The scale property
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __getScaleProperty } from '@coffeekraken/sugar/dom'
 * const props = __getScaleProperty(myCoolHTMLElement);
 * // output format
 * // 2
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getScaleProperty($elm: HTMLElement): number {
    if (!window.getComputedStyle) return;
    const style = getComputedStyle($elm);
    const transform =
        style.transform ||
        style.webkitTransform ||
        style.mozTransform ||
        style.msTransform;
    if (!transform) return 1;

    const matrix = rematrix.fromString(transform).toString();
    var values = matrix.split(','),
        pi = Math.PI,
        sinB = parseFloat(values[8]),
        b = Math.round((Math.asin(sinB) * 180) / pi),
        cosB = Math.cos((b * pi) / 180),
        matrixVal10 = parseFloat(values[9]),
        a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
        matrixVal1 = parseFloat(values[0]),
        c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);

    return {
        x: a,
        y: b,
        z: c,
    };
}

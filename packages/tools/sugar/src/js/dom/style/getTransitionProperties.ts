// @ts-nocheck

import __convertTime from '../../../shared/datetime/convertTime.js';
import __getStyleProperty from './getStyleProperty.js';

/**
 * @name      getTransitionProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        wip
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      refactor
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getTransitionProperties($1)
 *
 * @example  	js
 * import { getTransitionProperties } from '@coffeekraken/sugar/dom'
 * const props = __getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function splitIfNeeded(what, separator) {
    if (what.includes?.(separator)) {
        return what.split(separator).map((item) => item.trim());
    }
    return [what];
}

function getTransitionProperties(elm: HTMLElement) {
    // get the transition properties
    const property = __getStyleProperty(elm, 'transition-property');
    const duration = __getStyleProperty(elm, 'transition-duration') || 0;
    const timingFunction = __getStyleProperty(
        elm,
        'transition-timing-function',
    );
    const delay = __getStyleProperty(elm, 'transition-delay');

    // return the transition object
    const props = {
        property: splitIfNeeded(property, ','),
        duration: splitIfNeeded(duration, ',').map((value) =>
            __convertTime(value, 'ms'),
        ),
        delay: splitIfNeeded(delay, ',').map((value) =>
            __convertTime(value, 'ms'),
        ),
        timingFunction: splitIfNeeded(timingFunction, ','),
    };
    let totalDuration = 0;
    let i = 0;
    const delays = [0].concat(props.delay);
    [0].concat(props.duration).forEach((val) => {
        if (val + delays[i] > totalDuration) {
            totalDuration = val + delays[i];
        }
        i++;
    });
    props.totalDuration = totalDuration;
    return props;
}
export default getTransitionProperties;

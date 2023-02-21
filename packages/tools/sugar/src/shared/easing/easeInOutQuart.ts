// @ts-nocheck

/**
 * @name      easeInOutQuart
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Ease in out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeInOutQuart } from '@coffeekraken/sugar/easing';
 * __easeInOutQuart(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

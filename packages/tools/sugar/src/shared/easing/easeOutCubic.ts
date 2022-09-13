// @ts-nocheck

/**
 * @name      easeOutCubic
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Ease out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeOutCubic } from '@coffeekraken/sugar/easing';
 * __easeOutCubic(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeOutCubic(t) {
    return --t * t * t + 1;
}

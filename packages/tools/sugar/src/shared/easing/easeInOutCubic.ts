// @ts-nocheck

/**
 * @name      easeInOutCubic
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Ease in out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeInOutCubic } from '@coffeekraken/sugar/easing';
 * __easeInOutCubic(0.4);
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

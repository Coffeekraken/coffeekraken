// @ts-nocheck

/**
 * @name      easeOutQuint
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Ease out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeOutQuint } from '@coffeekraken/sugar/easing';
 * __easeOutQuint(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
}

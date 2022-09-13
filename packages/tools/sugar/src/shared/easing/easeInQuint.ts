// @ts-nocheck

/**
 * @name      easeInQuint
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Ease in quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeInQuint } from '@coffeekraken/sugar/easing';
 * __easeInQuint(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeInQuint(t) {
    return t * t * t * t * t;
}

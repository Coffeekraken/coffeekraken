// @ts-nocheck

/**
 * @name      linear
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Ease linear function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __linear } from '@coffeekraken/sugar/easing';
 * __linear(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __linear(t) {
    return t;
}

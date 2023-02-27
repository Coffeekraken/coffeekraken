// @ts-nocheck

/**
 * @name        isNumber
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isNumber($1)
 * 
 * @example 	js
 * import { __isNumber } from '@coffeekraken/sugar/is';
 * __isNumber(12) => true
 * __isNumber(22.3) => true
 * __isNumber('20') => false
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isNumber(source) {
    return !isNaN(parseFloat(source)) && isFinite(source);
}

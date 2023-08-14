// @ts-nocheck

/**
 * @name        isUrl
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid url
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isUrl($1)
 *
 * @example 	js
 * import { __isUrl } from '@coffeekraken/sugar/is';
 * __isUrl('http://google.com') => true
 * __isUrl('ftp://web.coco.com:2222') => false
 * __isUrl('hello') => false
 *
 * @see             https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isUrl(data) {
    try {
        return Boolean(new URL(data));
    } catch (e) {
        return false;
    }
}

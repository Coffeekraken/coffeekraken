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
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLElBQUk7SUFDaEMsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDakM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyJ9
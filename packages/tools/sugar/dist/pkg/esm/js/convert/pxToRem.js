// @ts-nocheck
/**
 * @name                    pxToRem
 * @namespace            js.convert
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __pxToRem($1)
 *
 * @example         js
 * import { __pxToRem } from '@coffeekraken/sugar/convert';
 * __pxToRem(36);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __pxToRem(px) {
    return (px /
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLEVBQUU7SUFDaEMsT0FBTyxDQUNILEVBQUU7UUFDRixVQUFVLENBQ04sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQ2hFLENBQ0osQ0FBQztBQUNOLENBQUMifQ==
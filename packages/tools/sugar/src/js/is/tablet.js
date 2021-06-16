// @ts-nocheck
import MobileDetect from 'mobile-detect';
/**
 * @name        isTablet
 * @namespace            js.is
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Detect if is a tablet device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/js/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTablet(ua = navigator.userAgent) {
    const md = new MobileDetect(ua);
    return md.tablet() !== null;
}
export default isTablet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFibGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBQ2hELE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==
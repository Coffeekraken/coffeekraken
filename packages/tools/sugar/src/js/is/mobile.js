// @ts-nocheck
import MobileDetect from 'mobile-detect';
/**
 * @name        isMobile
 * @namespace            js.is
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMobile(ua = navigator.userAgent) {
    const md = new MobileDetect(ua);
    return md.mobile() !== null;
}
export default isMobile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9iaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBQ2hELE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==
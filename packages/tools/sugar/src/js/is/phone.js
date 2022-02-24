// @ts-nocheck
import MobileDetect from 'mobile-detect';
/**
 * @name        isPhone
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isPhone(ua = navigator.userAgent) {
    const md = new MobileDetect(ua);
    return md.phone() !== null;
}
export default isPhone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsS0FBYSxTQUFTLENBQUMsU0FBUztJQUM3QyxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFDL0IsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=
// @ts-nocheck
/**
 * @name        isIe
 * @namespace            js.is
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is ie, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isIe from '@coffeekraken/sugar/js/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isIe(ua = navigator.userAgent) {
    return ua.indexOf('MSIE') > -1;
}
export default isIe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsSUFBSSxDQUFDLEtBQWEsU0FBUyxDQUFDLFNBQVM7SUFDNUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9
// @ts-nocheck
/**
 * @name        isOpera
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is opera, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isOpera from '@coffeekraken/sugar/js/is/opera'
 * if (isOpera()) {
 *   // do something cool
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isOpera(ua = navigator.userAgent) {
    return ua.toLowerCase().indexOf('op') > -1;
}
export default isOpera;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQWEsU0FBUyxDQUFDLFNBQVM7SUFDN0MsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9
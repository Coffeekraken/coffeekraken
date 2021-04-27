// @ts-nocheck
// TODO tests
/**
 * @name                            linux
 * @namespace            js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/js/is/linux';
 * isLinux(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function linux() {
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}
export default linux;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2lzL2xpbnV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxhQUFhO0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxLQUFLO0lBQ1osSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMvQixPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=
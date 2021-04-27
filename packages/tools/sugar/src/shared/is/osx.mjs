// @ts-nocheck
// TODO tests
/**
 * @name                            osx
 * @namespace            js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/osx';
 * isOsx(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function osx() {
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
export default osx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3N4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9pcy9vc3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLEdBQUc7SUFDVixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQy9CLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7S0FDdEM7SUFDRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBQ0QsZUFBZSxHQUFHLENBQUMifQ==
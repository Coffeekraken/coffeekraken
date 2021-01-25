"use strict";
// @ts-nocheck
// @shared
// TODO tests
/**
 * @name                            osx
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
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
module.exports = osx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3N4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3N4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLEdBQUc7SUFDVixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQy9CLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7S0FDdEM7SUFDRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBQ0QsaUJBQVMsR0FBRyxDQUFDIn0=
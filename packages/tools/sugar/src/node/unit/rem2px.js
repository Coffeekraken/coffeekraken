"use strict";
// @ts-nocheck
// @shared
/**
 * @name                    rem2px
 * @namespace           sugar.js.unit
 * @type                    Function
 * @stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import rem2px from '@coffeekraken/sugar/js/unit/rem2px';
 * rem2px(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rem2px(rem) {
    return (rem *
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
module.exports = rem2px;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtMnB4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVtMnB4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxHQUFHO0lBQ2pCLE9BQU8sQ0FDTCxHQUFHO1FBQ0gsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLENBQzFFLENBQUM7QUFDSixDQUFDO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIn0=
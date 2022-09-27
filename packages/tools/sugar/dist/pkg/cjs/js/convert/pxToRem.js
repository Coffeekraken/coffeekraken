"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @example         js
 * import { __pxToRem } from '@coffeekraken/sugar/convert';
 * __pxToRem(36);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __pxToRem(px) {
    return (px /
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
exports.default = __pxToRem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLFNBQVMsQ0FBQyxFQUFFO0lBQ2hDLE9BQU8sQ0FDSCxFQUFFO1FBQ0YsVUFBVSxDQUNOLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUNoRSxDQUNKLENBQUM7QUFDTixDQUFDO0FBUEQsNEJBT0MifQ==
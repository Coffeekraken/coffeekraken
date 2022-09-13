import __isCjs from './isCjs';
import __isEsm from './isEsm';
/**
 * @name          isSystem
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on is one of the passed system names like "esm" or "cjs".
 *
 * @param       {('esm'|'cjs')[]}    systemNames    An array of system names to check against
 * @return      {Boolean}           true if the current system is one of the passed system names, false otherwise
 *
 * @example       js
 * import { __isModuleSystem } from '@coffeekraken/sugar/is';
 * __isModuleSystem('esm'); // => true
 * __isModuleSystem('cjs'); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isModuleSystem(systemNames) {
    if (!Array.isArray(systemNames))
        systemNames = [systemNames];
    for (let i = 0; i < systemNames.length; i++) {
        if (__isCjs() && systemNames[i] === 'cjs')
            return true;
        if (__isEsm() && systemNames[i] === 'esm')
            return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsV0FBOEI7SUFFOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQUUsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZELElBQUksT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztLQUMxRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==
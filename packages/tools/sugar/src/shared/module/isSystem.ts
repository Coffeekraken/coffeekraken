import __isCjs from './isCjs';
import __isEsm from './isEsm';

/**
 * @name          isSystem
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on is one of the passed system names like "esm" or "cjs".
 *
 * @param       {('esm'|'cjs')[]}    systemNames    An array of system names to check against
 * @return      {Boolean}           true if the current system is one of the passed system names, false otherwise
 *
 * @example       js
 * import __isSystem from '@coffeekraken/sugar/shared/module/isSystem';
 * __isSystem('esm'); // => true
 * __isSystem('cjs'); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function isSystem(systemNames: ('esm' | 'cjs')[]): boolean {
    if (!Array.isArray(systemNames)) systemNames = [systemNames];
    for (let i = 0; i < systemNames.length; i++) {
        if (__isCjs() && systemNames[i] === 'cjs') return true;
        if (__isEsm() && systemNames[i] === 'esm') return true;
    }
    return false;
}

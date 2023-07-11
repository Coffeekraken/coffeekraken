import __isCjs from '../is/isCjs.js';
import __isEsm from '../is/isEsm.js';

/**
 * @name          currentModuleSystem
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return the current module system the code is running on like "cjs" or "esm".
 *
 * @return      {('esm'|'cjs')}           The module system the code is running on
 *
 * @snippet         __currentModuleSystem()
 *
 * @example       js
 * import { __currentModuleSystem } from '@coffeekraken/sugar/module';
 * __currentModuleSystem(); // => 'cjs'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export type TCurrentSystem = 'esm' | 'cjs';

export default function __currentModuleSystem(): TCurrentSystem {
    if (__isEsm()) return 'esm';
    if (__isCjs()) return 'cjs';
}

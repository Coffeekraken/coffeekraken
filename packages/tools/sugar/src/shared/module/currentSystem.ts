import __isEsm from './isEsm';
import __isCjs from './isCjs';

/**
 * @name          currentSystem
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return the current module system the code is running on like "cjs" or "esm".
 *
 * @return      {('esm'|'cjs')}           The module system the code is running on
 *
 * @example       js
 * import __currentSystem from '@coffeekraken/sugar/shared/module/currentSystem';
 * __currentSystem(); // => 'cjs'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export type TCurrentSystem = 'esm' | 'cjs';

export default function currentSystem(): TCurrentSystem {
    if (__isEsm()) return 'esm';
    if (__isCjs()) return 'cjs';
}

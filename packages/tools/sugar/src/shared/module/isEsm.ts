import __isCjs from './isCjs';

/**
 * @name          isEsm
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @example       js
 * import __isEsm from '@coffeekraken/sugar/shared/module/isEsm';
 * __isEsm(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function isEsm(): boolean {
    return !__isCjs();
}

// @ts-nocheck
/**
 * @name          testEnv
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isTestEnv()
 * 
 * @example       js
 * import { __isTestEnv } from '@coffeekraken/sugar/is';
 * __isTestEnv(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isTestEnv() {
    return process?.env?.NODE_ENV === 'test';
}

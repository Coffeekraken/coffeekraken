// @ts-nocheck

// TODO tests

/**
 * @name                            isOsx
 * @namespace            shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isOsx()
 * 
 * @example       js
 * import { __isOsx } from '@coffeekraken/sugar/is';
 * __isOsx(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isOsx() {
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    const platform =
        navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
    return platform.toUpperCase().indexOf('MAC') >= 0;
}

// @ts-nocheck

/**
 * @name                            isWindows
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
 * @snippet         __isWindows()
 * 
 * @example       js
 * import { __isWindows } from '@coffeekraken/sugar/is';
 * __isWindows(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isWindows() {
    if (process && process.platform) {
        return process.platform === 'win32';
    }
    const platform =
        navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
    return platform.toUpperCase().indexOf('WIN') > -1;
}

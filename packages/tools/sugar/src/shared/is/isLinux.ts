// @ts-nocheck

// TODO tests

/**
 * @name                            isLinux
 * @namespace            shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isLinux($1)
 * 
 * @example       js
 * import { __isLinux } from '@coffeekraken/sugar/is';
 * __isLinux(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isLinux() {
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    const platform =
        navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
    return platform.toUpperCase().indexOf('LINUX') >= 0;
}

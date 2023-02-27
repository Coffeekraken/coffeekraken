// @ts-nocheck

/**
 * @name                                      isNode
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isNode()
 * 
 * @example               js
 * import { __isNode } from '@coffeekraken/sugar/is';
 * __isNode(); // => true
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isNode() {
    return (
        typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node'
    );
}

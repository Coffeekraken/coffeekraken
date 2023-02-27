// @ts-nocheck

import __tmpDir from 'temp-dir';

/**
 * @name                            systemTmpDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the system temp directory path
 *
 * @return                {String}                      The real os temp directory path
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __systemTmpDir()
 * 
 * @example             js
 * import { __systemTmpDir } from '@coffeekraken/sugar/path';
 * __systemTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function __systemTmpDir() {
    return __tmpDir;
}

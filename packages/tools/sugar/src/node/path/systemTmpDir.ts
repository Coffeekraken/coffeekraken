// @ts-nocheck

import __tmpDir from 'temp-dir';
import __fs from 'fs-extra';

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
 * @example             js
 * import systemTmpDir from '@coffeekraken/node/fs/systemTmpDir';
 * systemTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function () {
    const tmpDir = __tmpDir;
    return tmpDir;
}

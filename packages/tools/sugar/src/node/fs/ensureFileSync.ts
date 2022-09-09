// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        ensureFileSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @example       js
 * import { __ensureFileSync } from '@coffeekraken/sugar/fs';
 * __ensureFileSync('my/cool/file.jpg');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __ensureFileSync(file) {
    __fs.ensureFileSync(file);
}

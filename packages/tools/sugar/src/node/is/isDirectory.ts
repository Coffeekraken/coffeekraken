// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';

/**
 * @name            isDirectory
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isDirectory($1)
 *
 * @example     js
 * import { __isDirectory } from '@coffeekraken/sugar/is';
 * __isDirectory('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isDirectory(path, settings = {}) {
    settings = __deepMerge(
        {
            symlink: true,
        },
        settings,
    );

    let isMatching = __fs.existsSync(path);
    if (!isMatching) return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
    } else {
        isMatching = isMatching && __fs.lstatSync(path).isDirectory();
    }
    return isMatching;
}
